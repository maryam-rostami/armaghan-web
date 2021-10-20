<template>
  <div class="news-article-body">
    <p :style="{ fontSize: fontSize * 1.3 + 'rem' }">
      {{ newsArticle.headline }}
    </p>
    <p :style="{ fontSize: fontSize * 1.2 + 'rem' }">
      {{ summary }}
    </p>
    <img
      v-if="imageLinkIsValid && !newsArticle.imageIsInBody"
      :src="newsArticle.imageLink"
      class="news-article-image"
    />
    <hr/>
    <p ref="body" v-html="newsArticle.bodyHTML" :style="{ fontSize: fontSize + 'rem' }"></p>
  </div>
</template>

<script>
import { checkIfImageExists } from "../../../utils/ui-utils";
import { highlightKeywords } from "../../../utils/string-utils";
import { mapGetters } from "vuex";

export default {
  props: ["newsArticle"],
  data() {
    return {
      imageLinkIsValid: false,
    };
  },
  computed: {
    ...mapGetters(["fontSize"]),
    summary() {
      return this.newsArticle.summary;
    },
  },
  methods: {
    checkImageLink(imageLink) {
      this.imageLinkIsValid = imageLink != "";
      checkIfImageExists(imageLink, (result) => {
        this.imageLinkIsValid = result;
      });
    },
    highlightKeywordsInHTML(element){
      if(element.nodeValue != null)
        element.nodeValue = highlightKeywords(element.nodeValue);
      element.childNodes.forEach(child => {
        this.highlightKeywordsInHTML(child)
      });
    }
  },
  mounted() {
    this.checkImageLink(this.newsArticle.imageLink);

    this.highlightKeywordsInHTML(this.$refs.body);
  },
  watch: {
    fontSizeIncrease: function (val) {
      this.fontSize = 1 + val;
    },
    newsArticle: function (val) {
      this.checkImageLink(val.imageLink);
    },
  },
};
</script>

<style scoped>
.news-article-body {
  text-align: justify;
}
.news-article-image {
  width: 100%;
  height: auto;
  margin-bottom: 5px;
}
.news-article-body>>>img{
  display: block;
  margin: auto;
  max-width: 576px;
  border-radius: 4px;
}
</style>