// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IPKB',
  tagline: 'Intellectual Property Knowledge Base',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ipkb.jasonchen.icu',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'n1cogrv', // Usually your GitHub org/user name.
  projectName: 'ipkb', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/n1cogrv/ipkb/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/n1cogrv/ipkb/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ipkb-social-card.png',
      navbar: {
        title: 'Intellectual Property Knowledge Base',
        logo: {
          alt: 'IPKB',
          src: 'img/logo.svg',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'legaltextSidebar',
            position: 'left',
            label: 'Docs',
          },
          // {
          //   to: '/blog', 
          //   label: 'Blog', 
          //   position: 'left',
          // },
          {
            to: '/about',
            label: 'About',
            position: 'left',
          },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/n1cogrv/ipkb',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '法律法规',
            items: [
              {
                label: '专利法',
                to: '/docs/patent-law',
              },
              {
                label: '实施细则',
                to: '/docs/patent-regulations',
              },
              {
                label: 'MPEP',
                href: 'https://www.uspto.gov/web/offices/pac/mpep/index.html',
              },
              {
                label: 'WIPO Lex',
                href: 'https://www.wipo.int/wipolex/'
              },
            ]
          },
          {
            title: '快速访问',
            items: [
              {
                label: 'Google Patent',
                href: 'https://patents.google.com/',
              },
              {
                label: 'Global Dossier',
                href: 'https://globaldossier.uspto.gov/',
              },
              {
                label: 'Espacenet',
                href: 'https://worldwide.espacenet.com/patent/',
              },
              {
                label: '国知局审查信息查询',
                href: 'https://cpquery.cponline.cnipa.gov.cn/',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '关于本站',
                to: '/about',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/n1cogrv/ipkb',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Intellectual Property Knowledge Base by <a href="https://github.com/n1cogrv">Jason Chen</a>. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'developmentAnnouncementBar',
        content: 'IPKB is a non-profit & non-commercial website.',
        // backgroundColor: '#fafbfc',
        // textColor: '#091E42',
        isCloseable: true,
      },
      metadata: [
        {
          name: 'keywords',
          content: 'IPKB, ipkb, 知产智库, 知识产权, 专利法, patent law china, intellectual property knowledge base',
        },
      ],
    }),

    headTags: [
      {
        tagName: 'script',
        attributes: {
          type: 'application/ld+json',
        },
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Organization',
          name: 'Intellectual Property Knowledge Base',
          url: 'https://ipkb.jasonchen.icu/',
          logo: 'https://ipkb.jasonchen.icu/img/logo.svg',
          maintainer: 'Jason Chen',
        }),
      }
    ],

    plugins: [
      [
        '@docusaurus/plugin-pwa',
        {
          offlineModeActivationStrategies: [
            'appInstalled',
            'standalone',
            'queryString',
          ],
          injectManifestConfig: {
            globPatterns: [
              '**/*.{pdf,docx,doc}',
            ],
          },
          pwaHead: [
            {
              tagName: 'link',
              rel: 'icon',
              href: '/img/ipkb.png',
            },
            {
              tagName: 'link',
              rel: 'manifest',
              href: '/manifest.json',
            },
            {
              tagName: 'meta',
              name: 'theme-color',
              content: 'rgb(29, 121, 22)',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-capable',
              content: 'yes',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-status-bar-style',
              content: '#1d7916',
            },
            {
              tagName: 'link',
              rel: 'apple-touch-icon',
              href: '/img/ipkb.png',
            },
            {
              tagName: 'link',
              rel: 'mask-icon',
              href: '/img/logo.svg',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileImage',
              content: '/img/ipkb.png',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileColor',
              content: '#1d7916',
            },
          ],
        },
      ],
      [
        'vercel-analytics',
        {
          mode: 'auto',
        },
      ],
    ],

    themes: [
      [
        "@easyops-cn/docusaurus-search-local",
        {
          hashed: true,
          indexDocs: true,
          indexBlog: false,
          indexPages: false,
          searchResultLimits: 8,
          searchResultContextMaxLength: 10,
          language: ["en", "zh"],
          explicitSearchResultPath: true,
          highlightSearchTermsOnTargetPage: false,
          ignoreCssSelectors: ["div.theme-admonition"],
          ignoreFiles: ["docs/index.html"],
          removeDefaultStopWordFilter: true,
          zhUserDictPath: "dict.dic",
        },
      ],
    ],
};

export default config;
