// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Irrelevant Subject',
    siteDescription: "Ένα τυχαίο blog για τυχαία πράγματα.",
    plugins: [
        {
            use: 'gridsome-plugin-tailwindcss',
            options: {
                tailwindConfig: './tailwind.config.js',
                purgeConfig: {
                    whitelist: ['svg-inline--fa', 'table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm'],
                    whitelistPatterns: [/fa-$/, /blockquote$/, /code$/, /pre$/, /table$/, /table-$/, /vueperslide$/, /vueperslide-$/]
                },
                presetEnvConfig: {},
                shouldPurge: false,
                shouldImport: false,
                shouldTimeTravel: false,
                shouldPurgeUnusedKeyframes: true,
            }
        },
        {
            use: `gridsome-plugin-netlify-cms`,
            options: {
                publicPath: `/admin`
            }
        },
        {
            use: 'gridsome-source-static-meta',
            options: {
                path: 'content/site/*.json'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Author',
                path: './content/author/*.md'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Blog',
                path: './content/blog/**/*.md',
                refs: {
                    author: 'Author',
                    tags: {
                        typeName: 'Tag',
                        create: true
                    },
                    category: {
                        typeName: 'Category',
                        create: true
                    }
                }
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'CustomPage',
                path: './content/pages/*.md'
            }
        },
        {
            use: 'gridsome-plugin-flexsearch',
            options: {
                searchFields: ['title', 'content'],
                collections: [{
                    typeName: 'Blog',
                    indexName: 'Blog',
                    fields: ['title', 'category', 'excerpt', 'content', 'path']
                }]
            }
        }
    ],
    transformers: {
        remark: {
            plugins: [
                'remark-autolink-headings',
                'remark-attr',
                ['gridsome-plugin-remark-prismjs-all', {
                    noInlineHighlight: false,
                    showLineNumbers: false,
                }],
                require('./packages/gridsome-plugin-remark-figure')
            ],

            processImages: false

        }
    },
    templates: {
        Blog: [{
            path: '/posts/:id'
        }],
        CustomPage: [{
            path: '/:id-:image_caption',
            component: '~/templates/CustomPage.vue'
        }],
        Category: [{
            path: '/category/:title',
            component: '~/templates/Category.vue'
        }],
        Author: [{
            path: '/author/:id',
            component: '~/templates/Author.vue'
        }],
        Tag: [{
            path: '/tags/:title',
            component: '~/templates/Tag.vue'
        }]
    },
    chainWebpack: config => {
        config.resolve.alias.set('@pageImage', '@/assets/images');
    }
}