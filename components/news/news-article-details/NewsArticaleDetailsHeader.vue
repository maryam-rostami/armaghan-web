<template>
  <b-row :style="{fontSize: fontSize +'rem'}">
    <b-col cols="8" style="text-align: right">
      <span
        data-toggle="tooltip"
        data-placement="bottom"
        title="سايت خبری منتشر کننده خبر"
        ><a :href="publisherLink" target="_blank" v-on:click.stop>{{publisher}}</a></span
      >
      -
      <span
        data-toggle="tooltip"
        data-placement="bottom"
        title="دسته بندی خبر"
        >{{ category }}</span
      >
      -
      <span
        data-toggle="tooltip"
        data-placement="bottom"
        title="زیر دسته بندی خبر"
        >{{ subcategory }}</span
      >
    </b-col>
    <b-col cols="4" class="publish-time">
      <p
        style="margin-bottom: 0"
        data-toggle="tooltip"
        data-placement="bottom"
        title="زمان انتشار خبر"
      >
        {{ publishTime }}
      </p>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["publisher", "publisherLink", "category", "subcategory", "publishTime"],
  computed: {
    ...mapGetters(["fontSize"]),
  },
};
</script>

<style scoped>
.publish-time {
  text-align: left;
}
</style>