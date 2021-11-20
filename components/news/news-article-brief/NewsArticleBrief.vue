<template>
  <div class="news-article" @click="openNewsArticleDetails">
    <news-article-header
      :category="categoryTitle"
      :subcategory="subcategoryTitle"
      :publishTime="publishTime"
    ></news-article-header>
    <news-article-body :newsArticle="newsArticle"></news-article-body>
    <news-article-footer
      :publisher="publisherName"
      :publisherLink="newsArticle.publisherLink"
    ></news-article-footer>
  </div>
</template>

<script>
import NewsArticleHeader from "./NewsArticleBriefHeader";
import NewsArticleBody from "./NewsArticleBriefBody";
import NewsArticleFooter from "./NewsArticleBriefFooter";
import { fuzzyPassedTime } from "../../../utils/datetime-utils";
import { mapGetters } from "vuex";

export default {
  props: ["newsArticle"],
  components: {
    NewsArticleHeader,
    NewsArticleBody,
    NewsArticleFooter,
  },
  methods: {
    openNewsArticleDetails() {
      this.$router.push({
        name: "news-article-id",
        params: { id: this.newsArticle._id },
      });
      console.log("router::::::::", this.$router)
    },
  },
  computed: {
    ...mapGetters(["allPublishers"]),
    categoryTitle() {
      return this.$store.getters.getCategoryTitleByKey(
        this.newsArticle.category
      );
    },
    subcategoryTitle() {
      return this.$store.getters.getSubcategoryTitleByKey(
        this.newsArticle.category,
        this.newsArticle.subcategory
      );
    },
    publishTime() {
      return fuzzyPassedTime(this.newsArticle.publishDate);
    },
    publisherName() {
      let publisher = this.allPublishers.find((publisher) => {
        return publisher.key == this.newsArticle.publisher;
      });
      if (publisher) return publisher.name;
    },
  },
};
</script>

<style scoped>
.news-article {
  border: 1px solid gainsboro;
  background-color: #fbfbfb;
  border-radius: 4px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  box-shadow: lavender 2px 2px 2px;
  cursor: pointer;
  transition: 0.5s;
}
.news-article:hover {
  border: 1px solid gray;
  box-shadow: 0px 0px 10px 5px lightsteelblue;
  background-color: #ebebeb;
}
</style>