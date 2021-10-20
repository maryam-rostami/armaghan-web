<template>
  <news-list />
</template>

<script>
import NewsList from "../../components/news/NewsList.vue";
export default {
  components: { NewsList },
  async asyncData({ route, params }) {
    console.log("looooooog", route);
  }
};
</script>

<style></style>
