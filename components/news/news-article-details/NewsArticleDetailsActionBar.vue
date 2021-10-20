<template>
  <b-row class="action-bar sticky-top">
    <b-col cols="6" class="next-prev-holder">
      <button
        class="btn btn-outline-primary btn-sm"
        data-toggle="tooltip"
        data-placement="bottom"
        title="خبر بعدی"
        @click="$emit('next')"
        :disabled="nextIsDisabled"
      >
        <img
          src="@/assets/images/arrow-right.svg"
          :style="{
            width: '20px',
            filter:
              'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
          }"
        />
      </button>
      <button
        class="btn btn-outline-primary btn-sm"
        data-toggle="tooltip"
        data-placement="bottom"
        title="خبر قبلی"
        @click="$emit('previous')"
        :disabled="previousIsDisabled"
      >
        <img
          src="@/assets/images/arrow-left.svg"
          :style="{
            width: '20px',
            filter:
              'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
          }"
        />
      </button>
    </b-col>
    <b-col cols="6" class="font-size-holder">
      <button
        class="btn btn-outline-primary btn-sm"
        @click="increaseFontSize"
        :disabled="fontSizeCantIncrease"
      >
        <img
          src="@/assets/images/plus.svg"
          :style="{
            width: '20px',
            filter:
              'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
          }"
        />
      </button>
      <button
        class="btn btn-outline-primary btn-sm"
        @click="decreaseFontSize"
        :disabled="fontSizeCantDecrease"
      >
        <img
          src="@/assets/images/minus.svg"
          :style="{
            width: '20px',
            filter:
              'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
          }"
        />
      </button>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  FONT_SIZE_STEP
} from "../../../constants";

export default {
  props: ["nextIsDisabled", "previousIsDisabled"],
  methods: {
    ...mapActions(["increaseFontSize", "decreaseFontSize"])
  },
  computed: {
    ...mapGetters(["fontSize"]),
    fontSizeCantIncrease() {
      return this.fontSize + FONT_SIZE_STEP > MAX_FONT_SIZE;
    },
    fontSizeCantDecrease() {
      return this.fontSize - FONT_SIZE_STEP < MIN_FONT_SIZE;
    }
  }
};
</script>

<style scoped>
.action-bar {
  background-color: transparent;
  margin: 0;
}

.action-icon {
  vertical-align: middle;
}

.font-size-holder {
  text-align: left;
}

.next-prev-holder {
  text-align: right;
}

.btn {
  width: 35px;
}
</style>
