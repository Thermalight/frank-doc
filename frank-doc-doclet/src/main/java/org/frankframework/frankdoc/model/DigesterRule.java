/*
   Copyright 2021 WeAreFrank!

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
package org.frankframework.frankdoc.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * Java representation of a digester rule specified in the digester-rules.xml file.
 *
 * Copied from package nl.nn.adapterframework.configuration.digester.
 *
 */
public class DigesterRule {

	/**
	 * The digester rule's pattern.
	 */
	private @Getter @Setter String pattern;

	/**
	 * The 'object-create-rule' attribute.
	 */
	private @Getter @Setter String object;

	/**
	 * The 'factory-create-rule' attribute.
	 * When non specified it uses the GenericFactory. When specified as
	 * NULL-String it does not use a factory.
	 */
	private @Getter @Setter String factory;

	/**
	 * The 'set-next-rule' attribute. Register the just-created-object on it's parent.
	 */
	private @Getter @Setter String registerMethod;

	/**
	 * The 'set-top-rule' attribute. Register the parent on the just-created-object.
	 */
	private @Getter @Setter String selfRegisterMethod;

	/**
	 * The 'registerTextMethod()' attribute. Add the element body text to the parent.
	 */
	private @Getter @Setter String registerTextMethod;

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
