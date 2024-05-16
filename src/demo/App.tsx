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

import "bootstrap/dist/css/bootstrap.css";

import AutoNumeric from "autonumeric";
import { AutoNumericTextField } from "../lib/AutoNumericTextField.js";
import { useState } from "react";

export default function App(): JSX.Element {
  const [controlledInputState, setControlledInputState] = useState(
    AutoNumeric.format("100000"),
  );
  return (
    <>
      <h1>
        <a href="https://mui-autonumeric.8hob.io">MUI-AutoNumeric</a> Demo
      </h1>
      <div className="form-group mb-3">
        <label>
          Most basic usage
          <AutoNumericTextField
            textFieldProps={{ className: "form-control" }}
          />
        </label>
      </div>

      <div className="form-group mb-3">
        <label>
          Customize the input
          <AutoNumericTextField
            textFieldProps={{
              defaultValue: "99.99",
              className: "form-control",
            }}
            autoNumericOptions={{ suffixText: "%" }}
          />
        </label>
      </div>

      <div className="form-group mb-3">
        <label>
          Use predefined AutoNumeric options
          <AutoNumericTextField
            textFieldProps={{
              defaultValue: "10000",
              className: "form-control",
            }}
            autoNumericOptions={
              AutoNumeric.getPredefinedOptions().commaDecimalCharDotSeparator
            }
          />
        </label>
      </div>

      <div className="form-group mb-3">
        <label>
          Interact with AutoNumericTextField via a React state
          <AutoNumericTextField
            textFieldProps={{ className: "form-control" }}
            valueState={{
              state: controlledInputState,
              stateSetter: setControlledInputState,
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              setControlledInputState(
                (
                  Number(AutoNumeric.unformat(controlledInputState)) + 1
                ).toString(),
              );
            }}
          >
            Add one
          </button>
        </label>
      </div>
    </>
  );
}
