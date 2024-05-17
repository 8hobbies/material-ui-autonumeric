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
  AutoNumericTextField,
  autoNumericMUIComponents,
} from "../lib/MaterialUI.js";
import {
  Button,
  FormControl,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import AutoNumeric from "autonumeric";
import { useState } from "react";

type DemoComponent = (typeof autoNumericMUIComponents)[number]["Component"];

function Demo({
  name,
  Comp,
}: {
  name: string;
  Comp: DemoComponent;
}): JSX.Element {
  const basicUsageLabel = "Most basic usage" as const;
  const customInputLabel = "Customize the input" as const;
  const predefinedAutoNumericOptionsLabel =
    "Use predefined AutoNumeric options" as const;
  const interactionLabel = "Interact with Comp via a React state" as const;
  const isTextField = Comp === AutoNumericTextField;

  const [controlledInputState, setControlledInputState] = useState(
    AutoNumeric.format("100000"),
  );

  return (
    <>
      <Typography variant="h2">{name}</Typography>
      <FormControl variant="standard">
        {!isTextField && (
          <InputLabel htmlFor={`basic-usage-${name}`}>
            {basicUsageLabel}
          </InputLabel>
        )}
        <Comp
          props={{
            id: `basic-usage-${name}`,
            label: basicUsageLabel,
          }}
        />
      </FormControl>

      <FormControl variant="standard">
        {!isTextField && (
          <InputLabel htmlFor={`custom-input-${name}`}>
            {customInputLabel}
          </InputLabel>
        )}
        <Comp
          props={{
            id: `custom-input-${name}`,
            label: customInputLabel,
            defaultValue: "99.99",
          }}
          autoNumericOptions={{ suffixText: "%" }}
        />
      </FormControl>

      <FormControl variant="standard">
        {!isTextField && (
          <InputLabel htmlFor={`predefined-auto-numeric-options-${name}`}>
            {predefinedAutoNumericOptionsLabel}
          </InputLabel>
        )}
        <Comp
          props={{
            id: `predefined-auto-numeric-options-${name}`,
            label: predefinedAutoNumericOptionsLabel,
            defaultValue: "10000",
          }}
          autoNumericOptions={
            AutoNumeric.getPredefinedOptions().commaDecimalCharDotSeparator
          }
        />
      </FormControl>

      <FormControl variant="standard">
        {!isTextField && (
          <InputLabel htmlFor={`interaction-${name}`}>
            {interactionLabel}
          </InputLabel>
        )}
        <Comp
          props={{ id: `interaction-${name}`, label: interactionLabel }}
          valueState={{
            state: controlledInputState,
            stateSetter: setControlledInputState,
          }}
        />
        <Button
          variant="contained"
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
      </FormControl>
    </>
  );
}

export default function App(): JSX.Element {
  return (
    <>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h1">
          <a href="https://mui-autonumeric.8hob.io">MUI-AutoNumeric</a> Demo
        </Typography>
        {autoNumericMUIComponents.map((comp) => (
          <Demo name={comp.name} Comp={comp.Component} />
        ))}
      </Stack>
    </>
  );
}
