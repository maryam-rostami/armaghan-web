<template>
  <b-modal :id="modalId" hide-header hide-footer>
    <b-form class="search" @submit="onSubmit">
      <b-row>
        <b-form-input
          id="name"
          v-model="searchString"
          placeholder="کلمه مورد نظر را وارد کنيد"
          maxlength="30"
          autofocus
        ></b-form-input>
      </b-row>

      <b-form-group v-if="newsFilterType != 'all'">
        <b-row>
          <b-form-radio
            class="scope-radio"
            id="scope-category"
            v-model="scope"
            value="limited"
            name="scope-radio"
          ></b-form-radio>
          <label for="scope-category"
            >جستجو در اخبار {{ selectedCategory }}</label
          >
        </b-row>

        <b-row>
          <b-form-radio
            class="scope-radio"
            id="scope-all"
            v-model="scope"
            value="all"
            name="scope-radio"
          ></b-form-radio>
          <label for="scope-all">جستجو در همه اخبار</label>
        </b-row>
      </b-form-group>

      <b-row>
        <b-col class="btn-holder">
          <b-button
            variant="outline-primary"
            type="submit"
            style="width: 100%"
          >
            جستجو
          </b-button>
        </b-col>

        <b-col class="btn-holder">
          <b-button
            variant="outline-secondary"
            style="width: 100%"
            @click.prevent="$bvModal.hide(modalId)"
          >
            انصراف
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchString: "",
      scope: "all",
      recomputeSelectedCategory: 1,
    };
  },
  props: ["modalId"],
  computed: {
    ...mapGetters(["newsFilterType", "newsFilter"]),
    selectedCategory() {
      this.recomputeSelectedCategory;
      if (this.newsFilterType == "my-news") return "من";

      if (this.newsFilterType == "category" && this.newsFilter.categories != undefined && this.newsFilter.categories.length > 0) {
        const categoryTitle = this.$store.getters.getCategoryTitleByKey(
          this.newsFilter.categories[0].category
        );

        if (this.newsFilter.categories[0].subcategory == "all") return categoryTitle;

        const subcategoryTitle = this.$store.getters.getSubcategoryTitleByKey(
          this.newsFilter.categories[0].category,
          this.newsFilter.categories[0].subcategory
        );

        return categoryTitle + "-" + subcategoryTitle;
      }

      return "";
    },
  },
  watch: {
    newsFilterType: function (val) {
      this.setScope(val);
    },
    newsFilter: function (val) {
      this.recomputeSelectedCategory++;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let query = {};
      try{
      if (this.scope == "all")
        query = { filter: "all"};
      else {
        if (this.newsFilterType == "my-news")
          query = { filter: "my-news"};
        else
          query = {
            filter: this.newsFilterType,
            category: this.newsFilter.categories[0].category,
            subcategory: this.newsFilter.categories[0].subcategory
          };
      }
      if(this.searchString != '')
        query = {...query, searchString: this.searchString}
      }
      catch(err)
      {
        alert(err);
      }

      this.$router
        .push({
          name: "news",
          params: { showExtraColumn: false },
          query,
        })
        .catch(err => {
        });

      this.$bvModal.hide(this.modalId);
    },
    setScope(filterType) {
      if (filterType == "all" || filterType == undefined) this.scope = "all";
      else this.scope = "limited";
    },
  },
  mounted() {
    this.setScope(this.filterType);
  },
};
</script>

<style scoped>
.search {
  border: 1px solid lightgray;
  padding: 5px;
}
.row {
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 10px;
  margin-bottom: 10;
}

.scope-radio {
  margin-left: 10px;
}

.btn-holder{
  text-align: center
}
</style>