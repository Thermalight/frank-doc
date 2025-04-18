import { InitFilterToggleDirective } from './init-filter-toggle.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: ``,
  imports: [
    /*InitFilterToggleDirective*/
  ],
})
class TestComponent {}

describe('InitFilterToggleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let des: DebugElement[];
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [InitFilterToggleDirective, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(InitFilterToggleDirective));
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
