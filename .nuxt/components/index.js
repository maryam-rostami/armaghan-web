export { default as NewsList } from '../..\\components\\news\\NewsList.vue'
export { default as NewsSearch } from '../..\\components\\news\\Search.vue'
export { default as NavigationArmaghanNavbar } from '../..\\components\\navigation\\ArmaghanNavbar.vue'
export { default as NavigationArmaghanSidebar } from '../..\\components\\navigation\\ArmaghanSidebar.vue'
export { default as NewsArticleBrief } from '../..\\components\\news\\news-article-brief\\NewsArticleBrief.vue'
export { default as NewsArticleBriefBody } from '../..\\components\\news\\news-article-brief\\NewsArticleBriefBody.vue'
export { default as NewsArticleBriefFooter } from '../..\\components\\news\\news-article-brief\\NewsArticleBriefFooter.vue'
export { default as NewsArticleBriefHeader } from '../..\\components\\news\\news-article-brief\\NewsArticleBriefHeader.vue'
export { default as NewsArticaleDetailsHeader } from '../..\\components\\news\\news-article-details\\NewsArticaleDetailsHeader.vue'
export { default as NewsArticleDetails } from '../..\\components\\news\\news-article-details\\NewsArticleDetails.vue'
export { default as NewsArticleDetailsActionBar } from '../..\\components\\news\\news-article-details\\NewsArticleDetailsActionBar.vue'
export { default as NewsArticleDetailsBody } from '../..\\components\\news\\news-article-details\\NewsArticleDetailsBody.vue'
export { default as NewsArticleDetailsTag } from '../..\\components\\news\\news-article-details\\NewsArticleDetailsTag.vue'
export { default as NewsArticleDetailsUsing } from '../..\\components\\news\\news-article-details\\NewsArticleDetailsUsing.vue'
export { default as UsersFavoritesFavorite } from '../..\\components\\users\\Favorites\\Favorite.vue'
export { default as UsersFavorites } from '../..\\components\\users\\Favorites\\Favorites.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
