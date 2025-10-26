import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HayFrp Learn",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  description: "HayFrp Learn",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    returnToTopLabel: "返回顶部",
    darkModeSwitchTitle: "切换到深色模式",
    logo: "/favicon.ico",
    nav: [
      { text: "主页", link: "/" },
      { text: "官网", link: "https://www.hayfrp.com/" },
      { text: "控制台", link: "https://console.hayfrp.com/" },
    ],
    sidebar: [
      {
        text: "目录",
        collapsed: false,
        items: [
          {
            text: "知识文档",
            link: "what",
            items: [
              {
                text: "什么是HayFrp",
                link: "what",
              },
              {
                text: "用户协议",
                link: "terms",
              },
              {
                text: "隐私政策",
                link: "privacy-policy",
              },
              {
                text: "团队架构",
                link: "team",
              },
            ],
          },
          {
            text: "使用文档",
            link: "usage",
          },
          {
            text: "技术文档",
            link: "api-doc",
            items: [
              {
                text: "HayFrp OPENAPI",
                link: "api-doc",
                items: [
                  {
                    text: "First - 用户账号",
                    link: "api-doc#first-用户账号api-总计9个",
                  },
                  {
                    text: "Second - 隧道",
                    link: "api-doc#second-隧道-总计8个",
                  },
                  {
                    text: "Third - 杂项",
                    link: "api-doc#third-杂项-总计6个",
                  },
                ],
              },
              {
                text: "HayFrp 错误代码",
                link: "errcode",
              },
            ],
          },
        ],
      },
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "选择",
                  navigateText: "导航",
                  navigateUpKeyAriaLabel: "向上选择",
                  navigateDownKeyAriaLabel: "向下选择",
                  closeText: "关闭",
                  closeKeyAriaLabel: "关闭",
                },
              },
            },
          },
        },
      },
    },
    footer: {
      message: "Powered by Vitepress",
      copyright: `版权所有 © 2023-${new Date().getFullYear()} HayFrp Team`,
    },
    outline: {
      label: "页面导航",
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg id="qq" t="1570181112474" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2916" width="128" height="128"> <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="5041"></path> </svg>',
        },
        link: "https://qm.qq.com/q/hJ0anVxInS",
      },
    ],
  },
});
