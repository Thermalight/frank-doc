import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Element, ElementLabels, FrankDoc, RawFrankDoc } from './frankdoc.types';
import { DEFAULT_RETURN_CHARACTER } from './app.constants';

export type Filter = {
  name: string;
  labels: FilterLabels[];
};

export type FilterLabels = {
  name: string;
  elements: string[];
};

type HSL = {
  hue: number;
  saturation: number;
  lightness: number;
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly frankDoc: WritableSignal<FrankDoc | null> = signal(null);
  readonly rawFrankDoc: WritableSignal<RawFrankDoc | null> = signal(null);
  readonly filters: WritableSignal<Filter[]> = signal([]);
  readonly darkmode: WritableSignal<boolean> = signal(false);
  hasLoaded: boolean = false;
  previousSearchQuery: string = '';

  private readonly applicationLoadedSubject: Subject<void> = new Subject();
  readonly applicationLoaded$: Observable<void> = this.applicationLoadedSubject.asObservable();

  private readonly http: HttpClient = inject(HttpClient);

  triggerApplicationLoaded(): void {
    this.hasLoaded = true;
    this.applicationLoadedSubject.next();
    this.applicationLoadedSubject.complete();
  }

  getFrankDoc(): Observable<RawFrankDoc> {
    return this.http.get<RawFrankDoc>(`${environment.frankDocUrl}?cache=${Date.now()}`);
  }

  fullNameToSimpleName(fullName: string): string {
    return fullName.slice(fullName.lastIndexOf('.') + 1);
  }

  filterElementsBySelectedFilters(elements: Element[], selectedFilters: ElementLabels): Element[] {
    if (this.getSelectedFiltersLength(selectedFilters) === 0) return elements;
    return elements.filter((element) => {
      if (!element.labels) return false;
      for (const labelKey of Object.keys(element.labels)) {
        if (!selectedFilters[labelKey]) continue;
        for (const labelItem of element.labels[labelKey]) {
          if (selectedFilters[labelKey].includes(labelItem)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  getFirstFilter(labels?: Record<string, string[]>): string {
    if (!labels) return DEFAULT_RETURN_CHARACTER;
    const labelGroups = Object.keys(labels);
    if (labelGroups.length === 0) return DEFAULT_RETURN_CHARACTER;
    return labelGroups[0];
  }

  getFirstLabel(labels?: Record<string, string[]>): string {
    if (!labels) return DEFAULT_RETURN_CHARACTER;
    const labelGroups = Object.keys(labels);
    if (labelGroups.length === 0) return DEFAULT_RETURN_CHARACTER;
    return labels[labelGroups[0]][0];
  }

  getLabelColor(name: string): string {
    return this.HSLToHex(this.createHSLColorFromString(name, 78));
  }

  scrollToElement(selectors: string): void {
    const element = document.querySelector(selectors);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private getSelectedFiltersLength(selectedFilters: ElementLabels): number {
    if (Object.values(selectedFilters).length === 0) return 0;
    return Object.values(selectedFilters).reduce((acc, val) => acc + val.length, 0);
  }

  private createHSLColorFromString(string: string, lightness: number): HSL {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash += string.codePointAt(i) ?? 0;
    }

    const hue = hash % 360;

    return { hue, saturation: 90, lightness };
  }

  private HSLToHex(hsl: HSL): string {
    const { hue, saturation, lightness } = hsl;

    const hDecimal = lightness / 100;
    const a = (saturation * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number): string => {
      const k = (n + hue / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
}
