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

import {
  AutoNumericOutlinedInput,
  AutoNumericTextField,
} from "../lib/AutoNumericTextField.js";
import { Button, Stack, Typography } from "@mui/material";
import AutoNumeric from "autonumeric";
import { useState } from "react";

type DemoComponent =
  | typeof AutoNumericTextField
  | typeof AutoNumericOutlinedInput;

function Demo({ Comp }: { Comp: DemoComponent }): JSX.Element {
  const [controlledInputState, setControlledInputState] = useState(
    AutoNumeric.format("100000"),
  );

  return (
    <>
      <Typography variant="h2">{Comp.name}</Typography>
      <div>
        <Comp
          props={{
            label: "Most basic usage",
          }}
        />
      </div>

      <div>
        <Comp
          props={{
            label: "Customize the input",
            defaultValue: "99.99",
            className: "form-control",
          }}
          autoNumericOptions={{ suffixText: "%" }}
        />
      </div>

      <div>
        <Comp
          props={{
            label: "Use predefined AutoNumeric options",
            defaultValue: "10000",
            className: "form-control",
          }}
          autoNumericOptions={
            AutoNumeric.getPredefinedOptions().commaDecimalCharDotSeparator
          }
        />
      </div>

      <div>
        <Comp
          props={{ label: "Interact with Comp via a React state" }}
          valueState={{
            state: controlledInputState,
            stateSetter: setControlledInputState,
          }}
        />
        <Button
          onClick={() => {
            setControlledInputState(
              (
                Number(AutoNumeric.unformat(controlledInputState)) + 1
              ).toString(),
            );
          }}
        >
          Add one
        </Button>
      </div>
    </>
  );
}

export default function App(): JSX.Element {
  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h1">
          <a href="https://mui-autonumeric.8hob.io">MUI-AutoNumeric</a> Demo
        </Typography>
        <Demo Comp={AutoNumericTextField} />
        <Demo Comp={AutoNumericOutlinedInput} />
      </Stack>
    </>
  );
}
