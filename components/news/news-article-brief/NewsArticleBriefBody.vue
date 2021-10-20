<template>
  <div>
    <div
      ref="articleImage"
      class="image-holder"
      :style="{ backgroundImage: finalImage, height: imageHeight + 'px' }"
    ></div>
    <div class="texts">
      <p class="headline">{{ newsArticle.headline }}</p>
      <p class="summary">{{ newsArticle.summary }}</p>
    </div>
  </div>
</template>

<script>
import { checkIfImageExists } from "../../../utils/ui-utils";
export default {
  props: ["newsArticle"],
  data() {
    return {
      imageHeight: 300,
      finalImage: this.newsArticleImage
    };
  },
  computed: {
    newsArticleImage() {
      return "url(" + this.newsArticle.imageLink + ")";
    },
    categoryImage() {
      return (
        "url(" +
        require("@/assets/images/categories/category-" +
          this.newsArticle.category +
          ".svg") +
        ")"
      );
    }
  },
  mounted() {
    this.imageHeight = this.$refs.articleImage.clientWidth * 0.55;

    checkIfImageExists(this.newsArticle.imageLink, result => {
      this.finalImage = result ? this.newsArticleImage : this.categoryImage;
    });
  }
};
</script>

<style scoped>
.texts {
  text-align: justify;
  border-radius: 4px;
  padding-left: 2px;
  padding-right: 2px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  height: 6em;
  display: -webkit-box;
  -webkit-line-clamp: 4;
}

.headline {
  margin-bottom: 0;
  font-weight: bold;
  font-size: 1rem;
  /* color: rgba(107,1,165,255) */
}

.summary {
  margin-bottom: 5px;
  font-size: 1rem;
}

.image-holder {
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  margin-bottom: 3px;
  border: 1px solid lightgray;
}

/* @media (orientation: portrait) {
  .image-holder {
    height: 10vh;
  }
}
@media (orientation: landscape) {
  .image-holder {
    height: 20vh;
  }
} */
</style>
