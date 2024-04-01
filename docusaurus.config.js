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
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left',
          },
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
                to: '/docs/cn-pat-law',
              },
              {
                label: '实施细则',
                to: '/docs/cn-pat-reg',
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
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
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
        content: 'IPKB is a non-profit & non-commercial website, developed solely as a tool for me.',
        // backgroundColor: '#fafbfc',
        // textColor: '#091E42',
        isCloseable: true,
      },
    }),

    plugins: [
      [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath){ 
          if (existingPath === "/docs/cn-pat-law"){
            return existingPath.replace('/docs/cn-pat-law', '/A');
          }else if ( existingPath === "/docs/cn-pat-reg"){
            return existingPath.replace('/docs/cn-pat-reg', '/R')
          }
          return undefined;
        }
      }
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
          language: ["en", "zh"],
          explicitSearchResultPath: true,
          highlightSearchTermsOnTargetPage: false,
          ignoreCssSelectors: [".theme-admonition"]
        },
      ],
    ],
};

export default config;
