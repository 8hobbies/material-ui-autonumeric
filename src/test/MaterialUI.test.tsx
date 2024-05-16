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

import AutoNumeric, { CallbackOptions } from "autonumeric";
import {
  AutoNumericOutlinedInput,
  AutoNumericTextField,
} from "../lib/index.js";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { userEvent } from "@testing-library/user-event";

for (const Component of [
  AutoNumericTextField,
  AutoNumericOutlinedInput,
] as const) {
  describe(Component.name, () => {
    function ControlledAutoNumericComponentWrapper({
      props,
      autoNumericOptions,
    }: {
      props?: Parameters<typeof AutoNumericTextField>[0]["props"] &
        Parameters<typeof AutoNumericOutlinedInput>[0]["props"];
      autoNumericOptions?: CallbackOptions;
    }): JSX.Element {
      const [state, setState] = useState("");
      return (
        <Component
          props={props}
          autoNumericOptions={autoNumericOptions}
          valueState={{ state, stateSetter: setState }}
        />
      );
    }

    for (const testCase of [
      { name: "AutoNumeric Component", Component },
      {
        name: "ControlledAutoNumericComponentWrapper",
        Component: ControlledAutoNumericComponentWrapper,
      },
    ] as const) {
      test(`No argument given to ${testCase.name}, format based on default`, async () => {
        const user = userEvent.setup();
        render(<testCase.Component />);

        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, "1111");
        expect(inputElement).toHaveDisplayValue("1,111");
      });

      test(`When ${testCase.name} onChange event registered, it is respected`, async () => {
        let counter = 0;

        const user = userEvent.setup();
        render(
          <testCase.Component
            props={{
              onChange: () => {
                counter += 1;
              },
            }}
          />,
        );

        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, "1111");
        expect(counter).toBe(4);
      });

      test(`When Autonumeric options are given, they are respected in ${testCase.name}`, async () => {
        const user = userEvent.setup();
        render(
          <testCase.Component
            autoNumericOptions={
              AutoNumeric.getPredefinedOptions().NorthAmerican
            }
          />,
        );

        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, "1111");
        expect(inputElement).toHaveDisplayValue("$1,111");
      });
    }

    test("Controlled AutoNumeric component changes the input state", async () => {
      function ControlledAutoNumericComponentWrapperWithState({
        stateParent,
      }: {
        stateParent: { state: string };
      }): JSX.Element {
        const [state, setState] = useState("");
        stateParent.state = state;
        return <Component valueState={{ state, stateSetter: setState }} />;
      }

      const stateParent = { state: "" };
      const user = userEvent.setup();
      render(
        <ControlledAutoNumericComponentWrapperWithState
          stateParent={stateParent}
        />,
      );

      const inputElement = screen.getByRole("textbox");
      await user.type(inputElement, "1111");
      expect(stateParent.state).toBe("1,111");
    });

    test("Controlled AutoNumeric component changes the input state", async () => {
      function ControlledAutoNumericComponentWrapperWithState({
        stateParent,
      }: {
        stateParent: { state: string };
      }): JSX.Element {
        const [state, setState] = useState("");
        stateParent.state = state;
        return <Component valueState={{ state, stateSetter: setState }} />;
      }

      const stateParent = { state: "" };
      const user = userEvent.setup();
      render(
        <ControlledAutoNumericComponentWrapperWithState
          stateParent={stateParent}
        />,
      );

      const inputElement = screen.getByRole("textbox");
      await user.type(inputElement, "1111");
      expect(stateParent.state).toBe("1,111");
    });

    test("Changing the input state changes the display value", async () => {
      function TestApp(): JSX.Element {
        const [state, setState] = useState("");
        return (
          <>
            <button
              onClick={() => {
                setState(AutoNumeric.format("1111"));
              }}
            />
            <Component valueState={{ state, stateSetter: setState }} />
          </>
        );
      }

      const user = userEvent.setup();
      render(<TestApp />);

      const inputElement = screen.getByRole("textbox");
      expect(inputElement).toHaveDisplayValue(""); // Ensure that initially there's no text.
      await user.click(screen.getByRole("button")); // Set the state.
      expect(inputElement).toHaveDisplayValue("1,111.00");
    });

    test("Updates its state upon onBlur", async () => {
      function TestApp(): JSX.Element {
        const [state, setState] = useState("1");
        return (
          <>
            <Component
              valueState={{ state, stateSetter: setState }}
              autoNumericOptions={{ emptyInputBehavior: "zero" }}
            />
          </>
        );
      }

      const user = userEvent.setup();
      render(<TestApp />);

      const inputElement = screen.getByRole("textbox");
      await user.clear(inputElement);
      await user.keyboard("{Tab}");
      expect(inputElement).toHaveDisplayValue("0.00");
    });
  });
}
