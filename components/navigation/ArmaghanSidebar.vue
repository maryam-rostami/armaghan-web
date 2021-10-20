<template>
  <div class="sidebar-holder">
    <b-row class="sidebar-content">
      <b-col cols="6" md="8" class="menu-holder">
        <b-nav class="menu" vertical>
          <b-nav-item class="menu-item" @click="selectCategory('all')">
            <img
              :src="require('@/assets/images/categories/category-all.svg')"
              width="24"
            />
            همه اخبار
          </b-nav-item>
          <b-nav-item class="menu-item" @click="selectCategory('my-news')">
            <img
              :src="require('@/assets/images/categories/category-my-news.svg')"
              width="24"
            />
            اخبار من
          </b-nav-item>
        </b-nav>
        <b-nav class="menu" vertical>
          <div
            v-for="category in allCategories"
            :key="category.key"
            @mouseover="onCategoryHover(category.key)"
            @mouseleave="onCategoryLeave(category.key)"
          >
            <b-nav-item-dropdown
              :id="category.key"
              :ref="category.key"
              class="menu-item"
              no-caret
              dropleft
            >
              <template #button-content>
                <img
                  :src="
                    require('@/assets/images/categories/category-' +
                      category.key +
                      '.svg')
                  "
                  width="24"
                />
                {{ category.title }}
              </template>
              <b-dropdown-item
                v-for="subcategory in getSubcategories(category)"
                :key="subcategory.key"
                @click="selectSubcategory(category.key, subcategory.key)"
                >{{ subcategory.title }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-nav>
        <hr />
        <b-nav class="menu" vertical>
          <b-nav-item
            class="menu-item"
            @mouseover="selectedCategory = ''"
            :to="{ name: 'favorites' }"
            @click="$emit('onSidebarAction')"
          >
            <img :src="require('@/assets/images/profile.svg')" width="24" />
            تعريف اخبار من
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allCategories"])
  },
  methods: {
    onCategoryHover(categoryKey) {
      if (this.$screen.breakpoint != "xs" && this.$screen.breakpoint != "sm") {
        this.$refs[categoryKey][0].visible = true;
      }
    },
    onCategoryLeave(categoryKey) {
      if (this.$screen.breakpoint != "xs" && this.$screen.breakpoint != "sm")
        this.$refs[categoryKey][0].visible = false;
    },
    getSubcategories(category) {
      if (category.key == "all" || category.key == "my-news") return [];

      let subcategoriesList = [
        { key: "all", title: "همه" },
        ...category.subcategories
      ];
      return subcategoriesList;
    },
    selectCategory(categoryKey) {
      if (categoryKey == "all" || categoryKey == "my-news") {
        this.$router
          .push({
            name: "news",
            params: { showExtraColumn: false },
            query: { filter: categoryKey }
          })
          .catch(() => {});
        this.$emit("onSidebarAction");
      }
    },
    selectSubcategory(categoryKey, subcategoryKey) {
      this.$router
        .push({
          name: "news",
          params: { showExtraColumn: false },
          query: {
            filter: "category",
            category: categoryKey,
            subcategory: subcategoryKey
          }
        })
        .catch(() => {});

      this.$emit("onSidebarAction");
    }
  }
};
</script>

<style scoped>
.sidebar-holder {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  height: 100%;
}
.sidebar-content {
  border: lightgrey 1px solid;
  border-radius: 4px;
  height: 100%;
  margin: 0;
  background-color: ghostwhite;
}
.menu-holder {
  padding-right: 0;
  padding-left: 0;
}
img {
  margin-left: 10px;
}
.menu-item:hover {
  background-color: #eeeeee;
}
.menu {
  padding-right: 5px;
  font-weight: bold;
}
.nav >>> li {
  display: block;
  text-align: right;
  background-color: ghostwhite;
  font-size: 1.1rem;
}
.nav >>> a {
  color: black;
}
@media (max-width: 480px) {
  .sidebar-holder {
    padding-left: 0;
  }
  .nav >>> a {
    padding-right: 1rem;
    padding-left: 0;
  }
}
</style>
