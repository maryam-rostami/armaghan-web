<template>
  <b-container fluid class="armaghan-container" style="position: fixed">
    <b-row ref="devInfoHeader" v-if="!isInProduction">
      <b-col>
        <p style="margin-bottom: 0" class="user-id">
          <!-- <span>User Id=</span>{{ userId }} -->
        </p>
      </b-col>
      <b-col>
        <p style="margin-bottom: 0; text-align: left" class="env">
          <span>env=</span>{{ env }}
        </p>
      </b-col>
    </b-row>

    <div ref="navbarHolder" style="margin: 0">
      <armaghan-navbar
        @onToggleSidebar="showSidebar = !showSidebar"
        @onSearch="$root.$emit('bv::show::modal', 'modal-search', '#btnShow')"
      ></armaghan-navbar>
    </div>
    <b-row
      class="justify-content-center"
      :style="{
        height: contentHeight + 'px',
        border: '1px white solid',
        margin: 0
      }"
    >
      <b-col cols="1" class="d-none d-xl-block" v-if="!showSidebar"></b-col>
      <b-col
        :cols="sidebarColumnsNo"
        v-if="showSidebar"
        style="padding-right: 0; padding-left:0; height: 99%; border: 1px solid white"
      >
        <armaghan-sidebar @onSidebarAction="onSidebarAction"></armaghan-sidebar>
      </b-col>
      <b-col style="height: 99%; border: 1px solid white;">
        <b-row class="content">
          <!-- <router-view v-bind="componentProps"></router-view> -->
          <nuxt></nuxt>
        </b-row>
      </b-col>
      <b-col cols="1" class="d-none d-xl-block" v-if="!showSidebar"></b-col>
    </b-row>
    <!-- <search-news modalId="modal-search"> </search-news> -->
  </b-container>
</template>

<script>
// import NewsList from "./components/news/NewsList";
import ArmaghanNavbar from "../components/navigation/ArmaghanNavbar.vue";
import ArmaghanSidebar from "../components/navigation/ArmaghanSidebar";
// import SearchNews from "./components/news/Search";
import { mapGetters, mapActions } from "vuex";
import { getOrientation } from "../utils/ui-utils";
import { checkStringIsValidFloadNumber } from "../utils/string-utils";
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from "../constants";

export default {
  components: {
    ArmaghanNavbar,
    ArmaghanSidebar
    // NewsList,
    // SearchNews,
  },
  data() {
    return {
      userId: "",
      showSidebarDefault:
        this.$screen.breakpoint != "xs" && this.$screen.breakpoint != "sm",
      showSidebar: true,
      showSearch: false,
      contentHeight: 0,
      windowHeight: 0,
      screenOrientation: ""
    };
  },
  computed: {
    ...mapGetters(["user"]),
    // componentProps() {
    //   if (this.$route.name === "news") {
    //     return {
    //       showExtraColumn: !this.showSidebar,
    //       screenOrientation: this.screenOrientation,
    //     };
    //   }
    //   return {};
    // },
    env() {
      return process.env.NODE_ENV;
    },
    isInProduction() {
      return process.env.NODE_ENV == "production";
    },
    /*navbarHeight() {
      switch (this.$screen.breakpoint) {
        case "xs":
        case "sm":
          if (getOrientation() == "landscape") return 15;
          return 12;
        default:
          if (getOrientation() == "landscape") return 10;
          return 8;
      }
    },*/
    sidebarColumnsNo() {
      this.screenOrientation;
      switch (this.$screen.breakpoint) {
        case "xs":
        case "sm":
          return 12;
        case "md":
        case "lg":
          if (this.screenOrientation == "landscape") return 3;
          return 3;
        default:
          return 2;
      }
    }
  },
  watch: {
    windowHeight: function(newHeight) {
      this.contentHeight = newHeight - this.$refs.navbarHolder.clientHeight - 2;
      if (!this.isInProduction)
        this.contentHeight -= this.$refs.devInfoHeader.clientHeight + 30; //  30 is hegight of last commit header
    }
  },
  methods: {
    ...mapActions(["getUser"]),
    onResize(event) {
      this.windowHeight = event.target.innerHeight;
      this.screenOrientation = getOrientation();
    },
    onSidebarAction() {
      if (!this.showSidebarDefault) this.showSidebar = false;
    },
    loadData() {
      if (localStorage.userId) {
        this.userId = localStorage.userId;
        this.$store
          .dispatch("getUser", { userId: this.userId })
          .then(response => {
            this.$store.dispatch("getCategories");
            this.$store.dispatch("getPublishers");
          });
      } else {
        $axios
          .$post(process.env.ROOT_API + "/users/createUser")
          .then(response => {
            localStorage.userId = response.data.userId;
            this.userId = response.data.userId;
            this.$store
              .dispatch("getUser", { userId: this.userId })
              .then(response => {
                this.$store.dispatch("getCategories");
                this.$store.dispatch("getPublishers");
              });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    onChangeScreenOrientation() {
      this.screenOrientation = screen.orientation.type.match(/\w+/)[0];
    },
    setDefaultFontSize() {
      let fontSize = 1;
      if (checkStringIsValidFloadNumber(localStorage.fontSize)) {
        fontSize = parseFloat(localStorage.fontSize);
        if (fontSize > MAX_FONT_SIZE || fontSize < MIN_FONT_SIZE) fontSize = 1;
      }

      this.$store.commit("setFontSize", fontSize);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  beforeMount() {
    this.loadData();
  },
  mounted() {
    window.addEventListener("resize", this.onResize);

    this.screenOrientation = getOrientation();
    screen.orientation.onchange = this.onChangeScreenOrientation;

    this.showSidebar = this.showSidebarDefault;
    this.windowHeight = window.innerHeight;

    this.setDefaultFontSize();
  }
};
</script>

<style>
@font-face {
  font-family: "Diplomat";
  src: local("Diplomat"),
    url("@/assets/fonts/diplomat/Diplomat.woff") format("woff"),
    url("@/assets/fonts/diplomat/Diplomat.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
body {
  direction: rtl;
}
.armaghan-container {
  font-family: Diplomat;
  text-align: right;
}

.modal-dialog {
  font-family: Diplomat;
}

.user-id {
  font-family: arial;
  font-size: 10;
}

.env {
  text-align: center;
}

.content {
  height: 100%;
  border: 1px solid white;
  padding-top: 5px;
}

@media (max-width: 480px) {
  .user-id > span {
    display: none;
  }
  .env > span {
    display: none;
  }
}
</style>
