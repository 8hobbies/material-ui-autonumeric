/** @license Apache-2.0
 *
 * Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ChangeEvent, ChangeEventHandler, JSX } from "react";
import { AutoNumericComponent } from "react-autonumeric";
import type { CallbackOptions } from "autonumeric";

type AutoNumericComponentProps = Parameters<
  typeof AutoNumericComponent
>[0]["props"];

type Props = AutoNumericComponentProps & {
  onChange?: ChangeEventHandler;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export function AutoNumericMUIInputBase({
  comp,
  props,
  autoNumericOptions,
  valueState,
}: {
  comp: React.FunctionComponent;
  props?: Readonly<Props>;
  autoNumericOptions?: Readonly<CallbackOptions>;
  valueState?: {
    state: Readonly<string>;
    stateSetter: React.Dispatch<React.SetStateAction<string>>;
  };
}): JSX.Element {
  const stateProps =
    valueState !== undefined
      ? ({
          value: valueState.state,
          onChange: (e: ChangeEvent<HTMLInputElement>): void => {
            // For input, it is required set value in onChange.
            valueState.stateSetter(e.currentTarget.value);
            if (props?.onChange !== undefined) {
              props.onChange(e);
            }
          },
          onBlur: (
            e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
          ): void => {
            valueState.stateSetter(e.currentTarget.value);
            if (props?.onBlur !== undefined) {
              props.onBlur(e);
            }
          },
        } satisfies Parameters<typeof comp>[0])
      : {};
  return (
    <AutoNumericComponent
      element={comp}
      refKey="inputRef"
      props={{ ...props, ...stateProps }}
      autoNumericOptions={autoNumericOptions}
      state={valueState?.state}
    />
  );
}
