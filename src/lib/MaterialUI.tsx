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

import {
  FilledInput,
  Input,
  InputBase,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { AutoNumericMUIInputBase } from "./AutoNumericMUIInputBase.js";
import type { CallbackOptions } from "autonumeric";

type Props<Component extends React.FunctionComponent> =
  Parameters<Component>[0] & { inputRef?: undefined };

/** List of MUI components that with input-style behaviors. */
type SupportedMUIInputComponents =
  | typeof TextField
  | typeof OutlinedInput
  | typeof Input
  | typeof FilledInput
  | typeof InputBase;

// Creates AutoNumeric MUI components, absorbs much of the boilerplate.
function createAutoNumericMUIComponent<
  Component extends SupportedMUIInputComponents,
>(comp: Component) {
  return ({
    props,
    autoNumericOptions,
    valueState,
  }: {
    props?: Readonly<Props<Component>>;
    autoNumericOptions?: Readonly<CallbackOptions>;
    valueState?: {
      state: Readonly<string>;
      stateSetter: React.Dispatch<React.SetStateAction<string>>;
    };
  }): JSX.Element => {
    return (
      <AutoNumericMUIInputBase
        comp={comp}
        props={props}
        autoNumericOptions={autoNumericOptions}
        valueState={valueState}
      />
    );
  };
}

export const AutoNumericTextField = createAutoNumericMUIComponent(TextField);
export const AutoNumericOutlinedInput =
  createAutoNumericMUIComponent(OutlinedInput);
export const AutoNumericFilledInput =
  createAutoNumericMUIComponent(FilledInput);
export const AutoNumericMaterialUIInput = createAutoNumericMUIComponent(Input);
export const AutoNumericInputBase = createAutoNumericMUIComponent(InputBase);

/** List of AutoNumeric MUI components. */
export const autoNumericMUIComponents = [
  { name: "AutoNumericTextField", Component: AutoNumericTextField },
  { name: "AutoNumericOutlinedInput", Component: AutoNumericOutlinedInput },
  { name: "AutoNumericFilledInput", Component: AutoNumericFilledInput },
  { name: "AutoNumericMaterialUIInput", Component: AutoNumericMaterialUIInput },
  { name: "AutoNumericInputBase", Component: AutoNumericInputBase },
] as const;
