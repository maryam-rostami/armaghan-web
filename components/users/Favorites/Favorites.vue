<template>
  <div class="favorites">
    <b-row>
      <b-col class="help">
        برای تعريف اخبار مورد علاقه خود، دسته بندی و زير دسته بندی اخبار را
        انتخاب نموده و به فهرست علاقه مندی ها اضافه نماييد.
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="3" class="d-none d-md-block"></b-col>
      <b-col class="body">
        <b-row>
          <b-col cols="12" md="4">انتخاب دسته بندی:</b-col>
          <b-col>
            <b-form-select
              v-model="categoryKey"
              :options="categoriesList"
              required
              style="width: 100%; border-color: green; color: green;"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-if="categoryKey != undefined"
              v-model="subcategoryKey"
              :options="subcategoriesList"
              style="width: 100%; border-color: green; color: green"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row>
          <b-col style="text-align: right">
            <b-button
              variant="outline-primary"
              @click="addFavorite"
              style="width: 100%;"
              :disabled="subcategoryKey == undefined"
            >
              اضافه کردن به فهرست علاقه مندی ها
            </b-button>
          </b-col>
        </b-row>

        <hr />
        <b-row>
          <b-col>فهرست علاقه مندیهای من:</b-col>
        </b-row>
        <favorite
          v-for="f in favorites"
          :key="f.category + '-' + f.subcategory"
          :favorite="f"
          @deleteFavorite="deleteFavorite(f)"
        ></favorite>
      </b-col>
      <b-col cols="3" class="d-none d-md-block"></b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Favorite from "./Favorite";

export default {
  components: { Favorite },
  data() {
    return {
      categoryKey: undefined,
      subcategoryKey: undefined,
      categories: [],
      subcategoriesList: [],
    };
  },
  computed: {
    ...mapGetters(["user", "allCategories"]),
    favorites(){
      if(this.user == undefined)
        return [];

      return this.user.favorites;
    },
    categoriesList() {
      let categoriesList = [];
      this.categories.forEach((category) => {
        categoriesList.push({ value: category.key, text: category.title });
      });
      return categoriesList;
    },
  },
  methods: {
    addFavorite() {
      const favorite = {
        category: this.categoryKey,
        subcategory: this.subcategoryKey,
      };
      this.$store.dispatch("createFavorite", {favorite});

      this.subcategoryKey = undefined;
      this.categoryKey = undefined;
    },
    deleteFavorite(favorite) {
      this.$store.dispatch("deleteFavorite", {favoriteId: favorite._id});

      this.subcategoryKey = undefined;
      this.categoryKey = undefined;
    },
    updateCategories(favorites) {
      // Clone categories
      let categories = this.allCategories.map((category) => {
        let clonedCategory = { ...category };
        clonedCategory.subcategories = category.subcategories.map(
          (subcategory) => {
            return { ...subcategory };
          }
        );
        return clonedCategory;
      });

      favorites.forEach((favorite) => {
        if (favorite.subcategory == "all") {
          const categoryIndex = categories.findIndex((c) => {
            return c.key == favorite.category;
          });
          categories.splice(categoryIndex, 1);
        } else {
          const category = categories.find((c) => {
            return c.key == favorite.category;
          });
          const subcategoryIndex = category.subcategories.findIndex((s) => {
            return s.key == favorite.subcategory;
          });
          category.subcategories.splice(subcategoryIndex, 1);
        }
      });

      let nonEmptyCategories = [];

      categories.forEach((category) => {
        if (category.subcategories.length > 0)
          nonEmptyCategories.push(category);
      });

      this.categories = nonEmptyCategories;
    },
  },
  watch: {
    favorites: function (val) {
      this.updateCategories(val);
    },
    categoryKey: function (val) {
      this.subcategoriesList = [];
      let category = this.categories.find(c => {return c.key == val})

      if (category != undefined) {
        this.subcategoriesList.push({ value: "all", text: "همه" });
        category.subcategories.forEach((subcategory) => {
          this.subcategoriesList.push({
            value: subcategory.key,
            text: subcategory.title,
          });
        });

        this.subcategoryKey = "all";
      }
    },
  },
  mounted() {
    this.updateCategories(this.favorites);
  },
};
</script>

<style scoped>
.favorites {
  width: 100%;
  border: 1px solid lightgray;
  padding: 5px;
}
.help {
  color: blue;
  text-align: center;
}

.body > div {
  margin-bottom: 10px;
}

.row {
  margin-right: 0px;
  margin-left: 0px;
}
</style>