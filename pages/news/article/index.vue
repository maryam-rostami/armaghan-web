<template>
  <!-- <news-article-details /> -->
  <p>article</p>
</template>

<script>
import NewsArticleDetails from "../../../components/news/news-article-details/NewsArticleDetails.vue";
export default {
  components: { NewsArticleDetails },
  async asyncData(context) {},
  created() {
    console.log("route of page", this.$routet.options);
  }
};
</script>

<style></style>
