<template>
  <div class="news-list" ref="newsList">
    <div
      class="text-center"
      :style="'display:' + (isLoadingNews ? 'block' : 'none')"
    >
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>

    <!-- <div class="row">
      <div class="col">
        showExtraColumn = {{showExtraColumn}}
      </div>
      <div class="col">
        screenOrientation = {{screenOrientation}}
      </div>
      <div class="col">
        columnsNo = {{columnsNo}}
      </div>
    </div> -->
    <b-row>
      <div
        :class="columnsNo"
        class="news-holder"
        v-for="article in news"
        :key="article._id"
      >
        <news-article :newsArticle="article"></news-article>
      </div>
    </b-row>
  </div>
</template>

<script>
import NewsArticle from "./news-article-brief/NewsArticleBrief";
import { mapGetters } from "vuex";

export default {
  props: ["showExtraColumn", "screenOrientation"],
  data() {
    return {
      isRefreshing: false,
      isScrolling: false
    };
  },
  async asyncData({ route, params }) {
    console.log("component::::::::", route);
  },
  computed: {
    ...mapGetters([
      "news",
      "isLoadingNews",
      "user",
      "newsScrollTop",
      "newsFilter"
    ]),
    columnsNo() {
      this.screenOrientation;
      let columnsNo = [];
      if (this.showExtraColumn != undefined && this.showExtraColumn) {
        if (this.screenOrientation == "landscape")
          columnsNo = ["col-6", "col-md-4", "col-xl-3"];
        else columnsNo = ["col-12", "col-md-6", "col-xl-3"];
      } else {
        if (this.screenOrientation == "landscape")
          columnsNo = ["col-6", "col-md-6", "col-xl-3"];
        else columnsNo = ["col-12", "col-md-6", "col-xl-3"];
      }

      return columnsNo;
    },
    queryParams() {
      return this.$route.query;
    }
  },
  watch: {
    queryParams: function(newQuery) {
      this.refresh(
        newQuery.filter,
        newQuery.category,
        newQuery.subcategory,
        newQuery.searchString,
        "last"
      );
      this.$refs.newsList.scrollTop = 0;
    },
    user: function() {
      this.loadData();
    }
  },
  methods: {
    refresh(filterType, category, subcategory, searchString, page) {
      if (this.isRefreshing) return;

      this.isRefreshing = true;
      let filter = this.getFilter(
        filterType,
        category,
        subcategory,
        searchString
      );

      this.$store
        .dispatch("getNews", { filterType, filter, page })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    },
    getFilter(filterType, category, subcategory, searchString) {
      let categories = [];
      if (filterType == "category") categories.push({ category, subcategory });
      else if (filterType == "my-news") categories = this.user.favorites;
      if (searchString == undefined) return { categories };
      return { categories, searchString };
    },
    async scroll() {
      if (this.isScrolling || this.news.length == 0) return;

      this.isScrolling = true;

      const newsList = this.$refs.newsList;

      if (
        newsList.scrollTop + 3 * newsList.clientHeight >=
        newsList.scrollHeight - 10
      )
        this.loadPreviousPage();
      else if (newsList.scrollTop == 0) this.loadNextPage();

      await this.$store.dispatch("newsScroll", {
        scrollTop: newsList.scrollTop
      });

      this.isScrolling = false;
    },
    loadPreviousPage() {
      this.refresh(
        this.queryParams.filter,
        this.queryParams.category,
        this.queryParams.subcategory,
        this.queryParams.searchString,
        "previous"
      );
    },
    loadNextPage() {
      this.refresh(
        this.queryParams.filter,
        this.queryParams.category,
        this.queryParams.subcategory,
        this.queryParams.searchString,
        "next"
      );
    },
    keyDown(e) {
      if (e.key == "ArrowUp") {
        this.$refs.newsList.scrollTop -= 40;
        this.scroll();
      } else if (e.key == "ArrowDown") {
        this.$refs.newsList.scrollTop += 40;
        this.scroll();
      }
    },
    loadData() {
      if (this.user == undefined) return;

      this.$refs.newsList.addEventListener("scroll", this.scroll);
      window.addEventListener("keydown", this.keyDown);

      let filter = this.getFilter(
        this.queryParams.filter,
        this.queryParams.category,
        this.queryParams.subcategory,
        this.queryParams.searchString
      );

      if (
        this.news.length == 0 ||
        JSON.stringify(filter) != JSON.stringify(this.newsFilter)
      ) {
        this.refresh(
          this.queryParams.filter,
          this.queryParams.category,
          this.queryParams.subcategory,
          this.queryParams.searchString,
          "last"
        );
      } else {
        this.$nextTick(() => {
          this.$refs.newsList.scrollTop = this.newsScrollTop;
        });
      }
    }
  },
  components: {
    NewsArticle
  },
  mounted() {
    this.loadData();
  },
  beforeDestroy() {
    this.$refs.newsList.removeEventListener("scroll", this.scroll);
    window.removeEventListener("keydown", this.keyDown);
  }
};
</script>

<style scoped>
.news-list {
  margin-top: -1px;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.news-list::-webkit-scrollbar {
  display: none;
}

.news-holder {
  padding-right: 5px;
  padding-left: 5px;
}

.row {
  margin-right: -5px;
  margin-left: -5px;
}
</style>
