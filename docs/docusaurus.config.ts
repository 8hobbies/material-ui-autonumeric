import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Material UI-AutoNumeric",
  tagline: "AutoNumeric-Powered Material UI Components",

  url: "https://material-ui-autonumeric.8hob.io",
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          editUrl:
            "https://github.com/8hobbies/material-ui-autonumeric/tree/master/",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Material UI-AutoNumeric",
      logo: {
        alt: "8 Hobbies Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://material-ui-autonumeric.8hob.io/demo",
          position: "right",
          label: "Demo",
        },
        {
          href: "https://github.com/8hobbies/material-ui-autonumeric",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Report Bugs",
              href: "https://github.com/8hobbies/material-ui-autonumeric/issues",
            },
            {
              label: "Discussions",
              href: "https://github.com/8hobbies/material-ui-autonumeric/discussions",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/8hobbies/material-ui-autonumeric",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 8 Hobbies, LLC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
