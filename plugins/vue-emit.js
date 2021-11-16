import Vue from "vue";
Vue.config.globalProperties.$emit = window.$nuxt.$emit();
