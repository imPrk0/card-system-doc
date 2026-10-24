import { defineConfig } from 'vitepress';

const updateSidebar = [
    {
        text: '更新教程',
        link: '/update'
    },
    {
        text: '旧版本更新教程',
        collapsed: true,
        items: [
            {
                text: 'V2 版本更新教程',
                link: '/update-v2'
            }
        ]
    },
    {
        text: '更新日志',
        collapsed: true,
        items: [
            {
                text: 'V3 版本更新日志',
                link: '/changelog/v3'
            }
        ]
    }
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: 'docs',
    lang: 'zh-CN',

    title: '发卡系统文档',
    titleTemplate: ':title - 发卡系统文档',
    description: '发卡系统的文档。',
    markdown: {
        theme: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-mocha'
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '安装',
                activeMatch: '/install/',
                items: [
                    {
                        text: '面板安装',
                        items: [
                            {
                                text: '宝塔面板 / aaPanel',
                                link: '/install/aapanel'
                            },
                            {
                                text: '1Panel',
                                link: '/install/1panel'
                            }
                        ]
                    },
                    {
                        text: 'Docker',
                        link: '/install/docker'
                    },
                    {
                        text: '手动安装',
                        link: '/install/manual'
                    }
                ]
            },
            {
                text: '更新',
                activeMatch: '/update',
                link: '/update'
            },
            {
                text: '开发文档',
                activeMatch: '/dev/',
                link: '/dev/'
            },
            {
                text: '重要通知',
                activeMatch: '/notice',
                link: '/notice/'
            },
            {
                text: '更新日志',
                activeMatch: '/changelog',
                link: '/changelog/v3'
            }
        ],

        sidebar: {
            '/install/': [
                {
                    text: '面板安装',
                    items: [
                        {
                            text: '宝塔面板 / aaPanel',
                            link: '/install/aapanel'
                        },
                        {
                            text: '1Panel',
                            link: '/install/1panel'
                        }
                    ]
                },
                {
                    text: 'Docker',
                    link: '/install/docker'
                },
                {
                    text: '手动安装',
                    link: '/install/manual'
                }
            ],
            '/update': updateSidebar,
            '/dev': [
                {
                    text: '开发说明',
                    link: '/dev/'
                }
            ],
            '/notice': [
                {
                    text: '重要通知',
                    link: '/notice/'
                },
                {
                    text: '2026年',
                    collapsed: false,
                    items: [
                        {
                            text: '10月',
                            collapsed: false,
                            items: [
                                {
                                    text: '【紧急】PHP 严重漏洞通知',
                                    link: '/notice/2026/10/critical-vulnerabilities-in-php-php2shell'
                                }
                            ]
                        }
                    ]
                }
            ],
            '/changelog': updateSidebar
        },

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/Tai7sy/card-system'
            }
        ]
    }
});
