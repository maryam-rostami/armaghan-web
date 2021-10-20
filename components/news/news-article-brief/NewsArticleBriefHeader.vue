<template>
  <b-row class="article-brief-header">
    <!--<div class="col  source-website">
      <p><span class="d-none d-xl-inline">منبع خبر:</span>
          همشهری آنلاین</p>
    </div>-->

    <b-col cols="8">
      <p class="category" data-toggle="tooltip" data-placement="bottom" title="دسته بندی خبر">
        {{ category }}-{{ subcategory }}
      </p>
    </b-col>

    <b-col cols="4">
      <p class="publish-time" data-toggle="tooltip" data-placement="bottom" title="زمان انتشار خبر">
        {{ publishTime }}
      </p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["category", "subcategory", "publishTime"],
};
</script>

<style scoped>
.article-brief-header{
  font-size: 0.9rem;
}
.publish-time {
  text-align: left;
  margin-bottom:1px;
}

.category {
  margin-bottom:1px;
}
</style>