<template>
  <b-row class="news-article-footer">
    <b-col>
      <p class="action"><strong>. . .</strong></p>
    </b-col>
    <b-col>
      <p class="source-site" data-toggle="tooltip" data-placement="bottom" title="وب سايت منبع"><a :href="publisherLink" target="_blank" v-on:click.stop>{{publisher}}</a></p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['publisher', 'publisherLink']
};
</script>

<style scoped>
.news-article-footer{
  font-size: 0.9rem;
}
.source-site {
  text-align: left;
  margin-bottom:0;
}

.action {
  margin-bottom:0;
}
</style>