import { default as baseConfigs } from "@8hobbies/eslint-conf-baseline";
import configs from "@8hobbies/eslint-conf-react-baseline";

const reactConfig = configs.recommended(import.meta.dirname, true);
reactConfig[reactConfig.length - 1].files = ["**/*.ts", "**/*.tsx"];

export default [
  {
    ignores: ["./types/"],
  },
  ...baseConfigs.recommended,
  ...reactConfig,
];
