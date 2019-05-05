const { resolve } = require('path')

// workaround vuepress #1525
const App = require('@vuepress/core/lib/node/App')
App.prototype.addPage = async function (options) {
  const Page = require('@vuepress/core/lib/node/Page')
  options.permalinkPattern = this.siteConfig.permalink
  const page = new Page(options, this)
  await page.process({
    markdown: this.markdown,
    computed: new this.ClientComputedMixinConstructor(),
    enhancers: this.pluginAPI.getOption('extendPageData').items,
  })
  const index = this.pages.findIndex(({ path }) => path === page.path)
  if (index >= 0) {
    this.pages.splice(index, 1, page)
  } else {
    this.pages.push(page)
  }
}

module.exports = ({
  base = '/couple/',
}, context) => ({
  name: '@uzkk/couple',

  plugins: [
    ['@vuepress/register-components', {
      components: [
        { name: 'Couple', path: resolve(__dirname, 'comp') },
        { name: 'CoupleToolip', path: resolve(__dirname, 'comp/Tooltip') },
      ],
    }],
  ],

  additionalPages: [{
    title: '时局图',
    path: base,
    permalink: base,
    frontmatter: {
      description: '不言而喻，一目了然',
      layout: 'Couple',
    },
  }],

  enhanceAppFiles: {
    name: 'uzkk-couple-base.js',
    content: `export default ({ Vue }) => {
  Vue.prototype.UZKK_COUPLE_BASE = ${JSON.stringify(base)}
}`,
  },

  globalUIComponents: 'CoupleToolip',

  chainWebpack (config) {
    config.module
      .rule('ts')
        .test(/\.ts$/)
        .include
          .add(path => path.startsWith(__dirname))
          .end()
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          configFile: resolve(__dirname, '../tsconfig.json'),
        })
        .end()
  },
})
