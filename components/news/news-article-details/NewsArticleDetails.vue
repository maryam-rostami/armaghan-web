<template>
  <div class="news-article" v-if="newsArticle != null">
    <action-bar
      @next="next"
      @previous="previous"
      :nextIsDisabled="nextIsDisabled"
      :previousIsDisabled="previousIsDisabled"
    ></action-bar>
    <hr style="margin-bottom: 0" />

    <news-article-header
      :publisher="publisherName"
      :publisherLink="newsArticle.publisherLink"
      :category="categoryTitle"
      :subcategory="subcategoryTitle"
      :publishTime="publishTime"
    ></news-article-header>

    <hr style="margin-top: 0" />
    <news-article-body :newsArticle="newsArticle"></news-article-body>
    <hr />
    <news-article-using :newsArticle="newsArticle"></news-article-using>
    <hr />
    <b-row style="margin: 1px">
      <b-col class="tags">
        <span :style="{ fontSize: fontSize + 'rem', paddingTop: '8px' }"
          >برچسب ها:</span
        >
        <news-article-details-tag v-for="tag in newsArticle.tags" :key="tag">{{
          tag
        }}</news-article-details-tag>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ActionBar from "./NewsArticleDetailsActionBar";
import NewsArticleHeader from "./NewsArticaleDetailsHeader";
import NewsArticleBody from "./NewsArticleDetailsBody";
import NewsArticleUsing from "./NewsArticleDetailsUsing";
import NewsArticleDetailsTag from "./NewsArticleDetailsTag";
import { fuzzyPassedTime } from "../../../utils/datetime-utils";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      newsArticle: null,
      nextIsDisabled: true,
      previousIsDisabled: true,
    };
  },
  computed: {
    ...mapGetters([
      "allPublishers",
      "fontSize",
      "newsFilterType",
      "newsFilter",
    ]),
    newsArticleId(){
      return this.$route.params.id;
    },
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
  components: {
    ActionBar,
    NewsArticleHeader,
    NewsArticleBody,
    NewsArticleUsing,
    NewsArticleDetailsTag,
  },
  watch: {
    newsArticleId: function (val){
      this.load(val);
    },
  },
  methods: {
    load(newsArticleId){
      this.$store
      .dispatch("getNewsArticle", { newsArticleId })
      .then((response) => {
        this.newsArticle = response.data;
        this.disablePreviousButton(this.newsArticle);
        this.disableNextButton(this.newsArticle);
      })
      .catch((error) => console.log(error));
    },
    disableNextButton(newsArticle){
      if (newsArticle == undefined) {
        this.nextIsDisabled = true;
        return;
      }

      let nextArticleId = this.$store.getters.nextNewsArticleId(
        newsArticle._id
      );

      this.nextIsDisabled =
        nextArticleId == "notFound" || nextArticleId == "isLast";
    },
    disablePreviousButton(newsArticle) {
      if (newsArticle == undefined) {
        this.previousIsDisabled = true;
        return;
      }

      let previousArticleId = this.$store.getters.previousNewsArticleId(
        newsArticle._id
      );

      this.previousIsDisabled =
        previousArticleId == "notFound" || previousArticleId == "isFirst";

      if (
        previousArticleId == "isFirst" &&
        !this.$store.getters.reachedFirstPage
      ) {
        this.$store
          .dispatch("getNews", {
            filterType: this.newsFilterType,
            filter: this.newsFilter,
            page: "previous",
          })
          .then(() => {
            this.previousIsDisabled = this.$store.getters.reachedFirstPage;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    next() {
      let nextArticleId = this.$store.getters.nextNewsArticleId(
        this.newsArticle._id
      );

      this.$router.push({
        name: "newsArticle",
        params: { id: nextArticleId},
      });
    },
    previous() {
      let previousArticleId = this.$store.getters.previousNewsArticleId(
        this.newsArticle._id
      );

      if (previousArticleId == "notFound" || previousArticleId == "isFirst")
        return;

      this.$router.push({
        name: "newsArticle",
        params: { id: previousArticleId},
      });
    },
  },
  mounted() {
    let id = this.$route.params.id;
    this.load(id);
  },
};
</script>

<style scoped>
.news-article {
  border: 1px solid gainsboro;
  background-color: #fbfbfb;
  border-radius: 4px;
  padding: 10px;
  box-shadow: lavender 2px 2px 2px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.news-article::-webkit-scrollbar {
  display: none;
}
.tags {
  padding-right: 0;
  padding-left: 0;
}
</style>