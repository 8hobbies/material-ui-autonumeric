# Material UI-AutoNumeric: [AutoNumeric][]-Powered [Material UI][] Components

[![npm version](https://badge.fury.io/js/material-ui-autonumeric.svg)](https://badge.fury.io/js/material-ui-autonumeric)
[![Pipeline](https://github.com/8hobbies/material-ui-autonumeric/actions/workflows/runtime.yml/badge.svg)](https://github.com/8hobbies/material-ui-autonumeric/actions/workflows/runtime.yml)
[![GitLab Mirror](https://img.shields.io/badge/GitLab-mirror-blue?logo=gitlab)](https://gitlab.com/8hobbies/material-ui-autonumeric)
[![Demo](https://img.shields.io/badge/Demo-blue)](https://material-ui-autonumeric.8hob.io/demo)

[AutoNumeric][] is a powerful library that automatically formats numbers and currencies.
Material UI-AutoNumeric brings that power to [Material UI][].

## Install

```bash
npm install --save material-ui-autonumeric
```

(If you are on an earlier MUI version such as v5, install v1.x of this package.)

## Usage

The usage examples below use `AutoNumericTextField`. The usage is similar for:

- `AutoNumericOutlinedInput`
- `AutoNumericFilledInput`
- `AutoNumericMaterialUIInput` (Corresponding to [`Input`][])
- `AutoNumericInputBase`

### Most basic usage

```tsx
<AutoNumericTextField />
```

creates an [TextField component][] that is automatically formatted by AutoNumeric.

### Customize the input

```tsx
<AutoNumericTextField
  inputProps={{ defaultValue: "99.99" }}
  autoNumericOptions={{ suffixText: "%" }}
/>
```

### Use predefined AutoNumeric options

```tsx
<AutoNumericTextField
  inputProps={{ defaultValue: "10000" }}
  autoNumericOptions={
    AutoNumeric.getPredefinedOptions().commaDecimalCharDotSeparator
  }
/>
```

### Interact with `AutoNumericTextField` via a React state

```tsx
const [controlledInputState, setControlledInputState] = useState("100000");

<AutoNumericTextField
  valueState={{
    state: controlledInputState,
    stateSetter: setControlledInputState,
  }}
/>
<button
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
```

## API References

- `AutoNumericTextField({props, autoNumericOptions, valueState})`
- `AutoNumericOutlinedInput({props, autoNumericOptions, valueState})`
- `AutoNumericFilledInput({props, autoNumericOptions, valueState})`
- `AutoNumericMaterialUIInput({props, autoNumericOptions, valueState})`
- `AutoNumericInputBase({props, autoNumericOptions, valueState})`

Material UI components integrated with [AutoNumeric][] and permits interaction with a React state.
Respectively, they wrap

- [`TextField`](https://mui.com/material-ui/api/text-field/)
- [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/)
- [`FilledInput`](https://mui.com/material-ui/api/filled-input/)
- [`Input`](https://mui.com/material-ui/api/input/)
- [`InputBase`](https://mui.com/material-ui/api/input-base/)

### Parameters

- **props**: Options passed to the underlying Material UI component. Same type as the props of the
  underlying Material UI component.
- **autoNumericOptions**: Options passed to `AutoNumeric`. Same as [AutoNumeric options][].
- **valueState**: The state and state setter from the parent component to be passed into this
  component.
  - **valueState.state**: The state from the parent component to be passed in.
  - **valueState.stateSetter**: The callback function that sets
    `options.valueState.state`.

## Demo

A Demo is [available](https://material-ui-autonumeric.8hob.io/demo).

## Contributing

Source code is available on [GitHub][].

To report a bug, visit the [issue tracker][].

After obtaining the source code, first run `npm install` from the source
directory. To run test, run `npm run test-once`. To build for production, run
`npm pack`. To build the documentation, run `npm install` from the `docs/`
directory and then run `npm run doc` from the root source directory.

To send your contribution, open a [pull request][].

## Related Project

If you use [React][] but not Material UI, check out [react-autonumeric][].

## License

```text
Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>

Licensed under the Apache License, Version 2.0(the "License");
you may not use files in this project except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[AutoNumeric options]: https://docs.autonumeric.org/Documentation/configuration%20options/
[AutoNumeric]: https://autonumeric.org/
[GitHub]: https://github.com/8hobbies/material-ui-autonumeric
[issue tracker]: https://github.com/8hobbies/material-ui-autonumeric/issues
[pull request]: https://github.com/8hobbies/material-ui-autonumeric/pulls
[Material UI]: https://mui.com/material-ui/
[TextField component]: https://mui.com/material-ui/api/text-field/
[`Input`]: https://mui.com/material-ui/api/input/
[React]: https://react.dev/
[react-autonumeric]: https://react-autonumeric.8hob.io/
