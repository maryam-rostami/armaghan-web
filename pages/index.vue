<template>
  <div class="">
    Home {{ res }}

    <b-row>
      <b-col lg="4" class="pb-2"
        ><b-button size="sm">Small Button</b-button></b-col
      >
      <b-col lg="4" class="pb-2"><b-button>Default Button</b-button></b-col>
      <b-col lg="4" class="pb-2"
        ><b-button size="lg">Large Button</b-button></b-col
      >
    </b-row>

    <social-sharing
      url="www.google.com"
      description="socialDescriptionTelegram"
      inline-template
    >
      <network network="telegram">
        <a
          class="btn btn-social-icon btn-telegram"
          data-toggle="tooltip"
          data-placement="top"
          title="ارسال لینک خبر از طریق تلگرام (Telegram)"
        >
          <i>img</i>
        </a>
      </network>
    </social-sharing>

    <!-- screen vue  -->

    <div>
      <p>Page width is {{ $screen.width }} px</p>
      <p>Page height is {{ $screen.height }} px</p>
      <p>Current breakpoint is {{ $screen.breakpoint }} px</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    // Set Meta Tags for this Page
  },
  data() {
    return {
      screen: this.$screen.breakpoint != "xs" && this.$screen.breakpoint != "sm"
    };
  },
  async asyncData({ $axios }) {
    const res = await $axios.$get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    return {
      res
    };
  }
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
