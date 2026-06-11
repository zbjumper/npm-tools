import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "@zbkit/tools",
  description: "TypeScript 实用工具库",
  base: '/zbkit/tools/',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/api/array' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: 'Array 数组', link: '/api/array' },
            { text: 'Guard 断言', link: '/api/guard' },
            { text: 'Objects 对象', link: '/api/objects' },
            { text: 'Time 时间', link: '/api/time' },
            { text: 'Type 类型', link: '/api/type' },
            { text: 'Regexp 正则', link: '/api/regexp' },
            { text: 'Math 数学', link: '/api/math' },
          ]
        }
      ]
    },

    outline: { label: '页面导航', level: [2, 3] },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zbjumper/npm-tools' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © Bill Zhang'
    },
  }
})
