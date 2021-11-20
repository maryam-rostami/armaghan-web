<template>
  <news-article-details />
</template>

<script>
import NewsArticleDetails from "../../../components/news/news-article-details/NewsArticleDetails.vue";
export default {
  components: { NewsArticleDetails },
  async asyncData(context) {},
  created() {
    console.log("details");
  }
};
</script>

<style></style>
