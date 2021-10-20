<template>
  <div style="width: 100%">
    <b-row class="armaghan-navbar">
      <b-col cols="4" lg="5" class="sidebar-button-col">
        <b-nav class="nav">
          <b-button class="sidebar-button" @click="$emit('onToggleSidebar')">
            <b-icon icon="list"></b-icon>
          </b-button>

          <b-nav-item @click="$emit('onSearch')">
            <b-icon class="search-icon" icon="search"></b-icon>
          </b-nav-item>
        </b-nav>

        <p class="filter-string d-none d-lg-inline">
          {{ filterString }}
        </p>
      </b-col>

      <b-col cols="4" lg="2" class="site-name-col">
        <b-row>
          <b-col class="logo-holder">
            <img class="logo" src="@/assets/images/logo.svg" />
          </b-col>

          <b-col class="site-name-holder">
            <img
              class="site-name"
              src="@/assets/images/site-name.png"
              alt="فرابين"
            />
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="4" lg="5" class="current-time-col">
        <img
          class="d-none d-md-inline"
          src="@/assets/images/calendar.svg"
          :style="{
            width: '30px'
          }"
        />
        {{ currentJalaliDate }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  gregorianToJalaliStr,
  gregorianToJalaliShortStr
} from "../../utils/datetime-utils";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["newsFilterType", "newsFilter"]),
    currentJalaliDate() {
      if (this.$screen.breakpoint == "xs" || this.$screen.breakpoint == "sm")
        return gregorianToJalaliShortStr(new Date());

      return gregorianToJalaliStr(new Date());
    },
    filterString() {
      let filterString = "";
      if (this.newsFilterType == "my-news") filterString = "اخبار من";

      if (
        this.newsFilterType == "category" &&
        this.newsFilter.categories != undefined &&
        this.newsFilter.categories.length > 0
      ) {
        if (filterString != "") filterString += "-";

        let categoryTitle = this.$store.getters.getCategoryTitleByKey(
          this.newsFilter.categories[0].category
        );
        filterString += categoryTitle;

        if (this.newsFilter.categories[0].subcategory != "all") {
          let subcategoryTitle = this.$store.getters.getSubcategoryTitleByKey(
            this.newsFilter.categories[0].category,
            this.newsFilter.categories[0].subcategory
          );
          filterString += "-" + subcategoryTitle;
        }
      }

      if (this.newsFilter.searchString != undefined) {
        if (filterString != "") filterString += "-";

        filterString += this.newsFilter.searchString;
      }
      return filterString;
    }
  }
};
</script>
<style scoped>
.armaghan-navbar {
  margin-top: 5px;
  background-color: ghostwhite;
  margin-right: 0;
  margin-left: 0;
  border: lightgrey 1px solid;
  border-radius: 4px;
  height: 3.5rem;
}

.nav {
  padding-right: 0;
  display: inline-block;
}

.nav-item {
  display: inline-block;
}

.nav-item > a {
  padding-left: 0;
}
.sidebar-button-col {
  padding-left: 0;
  overflow: hidden;
  white-space: nowrap;
}

.site-name-col {
  text-align: center;
  padding: 0;
}

.sidebar-button {
  margin-top: 0.45rem;
}

.current-time-col {
  padding-right: 0;
  padding-top: 0.65rem;
  text-align: left;
}

.site-name-holder {
  text-align: right;
  padding-right: 0;
  padding-left: 0;
}

.site-name {
  height: 3rem;
}

.logo-holder {
  text-align: left;
  padding-right: 0;
  padding-left: 0;
}

.logo {
  margin-top: 5px;
  height: 40px;
}

.filter-string {
  margin-right: 10px;
  font-size: 1.1rem;
  position: relative;
  top: 0.1rem;
}

@media (max-width: 767.98px) {
  .armaghan-navbar {
    height: 3rem;
  }
  .sidebar-button-col {
    padding-right: 5px;
  }
  .sidebar-button {
    margin-top: 0.2rem;
  }
  .search-icon {
    margin-bottom: 0.2rem;
  }
  .current-time-col {
    padding-left: 5px;
    padding-top: 0.65rem;
  }
  .site-name {
    height: 2.5rem;
  }
  .logo {
    height: 30px;
  }
  .calendar-icon {
    display: none;
  }
}
</style>
