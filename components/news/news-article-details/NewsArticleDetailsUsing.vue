<template>
  <div>
    <b-row style="text-align: center">
      <b-col
        cols="3"
        class="d-none d-md-block"
        :style="{ fontSize: fontSize + 'rem', textAlign: 'right' }"
      >
        بازنشر خبر:
      </b-col>
      <b-col cols="12" md="9" style="text-align: left">
        <social-sharing
          :url="websiteLink"
          :description="socialDescriptionWhatsapp"
          inline-template
        >
          <network network="whatsapp">
            <a
              class="btn btn-social-icon btn-whatsapp"
              data-toggle="tooltip"
              data-placement="top"
              title="ارسال لینک خبر از طریق واتساپ (Whatsapp)"
            >
              <img
                src="@/assets/images/socials/whatsapp.svg"
                :style="{
                  width: '24px',
                  filter:
                    'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
                }"
              />
            </a>
          </network>
        </social-sharing>

        <social-sharing
          :url="newsArticleLink"
          :description="socialDescriptionTelegram"
          inline-template
        >
          <network network="telegram">
            <a
              class="btn btn-social-icon btn-telegram"
              data-toggle="tooltip"
              data-placement="top"
              title="ارسال لینک خبر از طریق تلگرام (Telegram)"
            >
              <img
                src="@/assets/images/socials/telegram.svg"
                :style="{
                  width: '24px',
                  filter:
                    'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
                }"
              />
            </a>
          </network>
        </social-sharing>

        <!-- twitter-user="vuejs" is removed-->
        <social-sharing
          :url="newsArticleLink + '\n'"
          :title="socialTitleTwitter"
          :hashtags="socialHashtags"
          inline-template
        >
          <network network="twitter">
            <a
              class="btn btn-social-icon btn-twitter"
              data-toggle="tooltip"
              data-placement="top"
              title="ارسال لینک خبر از طریق تویتر (Twitter)"
            >
              <img
                src="@/assets/images/socials/twitter.svg"
                :style="{
                  width: '24px',
                  filter:
                    'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
                }"
              />
            </a>
          </network>
        </social-sharing>

        <social-sharing
          :title="newsArticle.headline"
          :description="emailBody"
          inline-template
        >
          <network network="email">
            <a
              class="btn btn-social-icon btn-envelope"
              data-toggle="tooltip"
              data-placement="top"
              title="ارسال لینک خبر از طریق ايميل (Email)"
            >
              <img
                src="@/assets/images/socials/email.svg"
                :style="{
                  width: '24px',
                  filter:
                    'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
                }"
              />
            </a>
          </network>
        </social-sharing>

        <social-sharing
          :url="newsArticleLink"
          :description="'\n\r' + newsArticle.headline"
          inline-template
        >
          <network network="sms">
            <a
              class="btn btn-social-icon btn-sms"
              data-toggle="tooltip"
              data-placement="top"
              title="ارسال لینک خبر از طریق پیامک (sms)"
            >
              <img
                src="@/assets/images/socials/sms.svg"
                :style="{
                  width: '24px',
                  filter:
                    'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
                }"
              />
            </a>
          </network>
        </social-sharing>

        <b-tooltip
          target="copyLinkBtn"
          :show.sync="showCopiedTooltip"
          @shown="hideCopiedTooltip"
          triggers
          title="لينک خبر کپی شد."
          variant="success"
        >
        </b-tooltip>
        <a
          id="copyLinkBtn"
          class="btn btn-social-icon btn-link"
          data-toggle="tooltip"
          data-placement="top"
          title="کپی کردن لينک خبر"
          @click="copyLink"
        >
          <img
            src="@/assets/images/socials/link.svg"
            :style="{
              width: '24px',
              filter:
                'invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)'
            }"
          />
        </a>
        <!-- <a
          :href="'mailto:?subject=' + socialTitle + '&body=' + socialDescription"
          class="btn btn-social-icon btn-envelope"
          data-toggle="tooltip"
          data-placement="top"
          title="ارسال لینک خبر از طریق ایميل (Email)"
        >
          <span class="fa fa-envelope fa-lg" style="color: blue"></span>
        </a> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { removePunctuation } from "../../../utils/string-utils";
import { copyStringToClipboard } from "../../../utils/ui-utils";
import { mapGetters } from "vuex";

export default {
  props: ["newsArticle"],
  created() {
    this.svgFilter =
      "invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)";
  },
  data() {
    return {
      // If this falg is true, the tooltip for copying link will be shown
      showCopiedTooltip: false,
      svgStyle: {
        width: "30px",
        filter:
          "invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)"
      },
      svgHoverStyle: {
        filter:
          "invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg) brightness(100%) contrast(147%)"
      },
      w2: "24px"
    };
  },
  methods: {
    copyLink() {
      copyStringToClipboard(this.newsArticleLink);
      //copyElement(this.$refs.newsUrl)
      this.showCopiedTooltip = true;
    },
    hideCopiedTooltip() {
      setTimeout(() => {
        this.showCopiedTooltip = false;
      }, 2000);
    }
  },
  computed: {
    ...mapGetters(["fontSize"]),
    websiteLink() {
      return "https://farabin.news";
    },
    newsArticleLink() {
      return window.location.href;
    },
    socialTitleTwitter() {
      const maximumTwitterLength = 100;
      var title = this.newsArticle.headline.substring(0, maximumTwitterLength);
      if (title.length < this.newsArticle.headline.length) title += "...";
      title += "\n";
      return title;
    },
    socialHashtags() {
      let hashtags = "";
      const maximumHashTagsCharsNo = 100;
      this.newsArticle.tags.forEach(tag => {
        if (hashtags.length + tag.length <= maximumHashTagsCharsNo) {
          if (hashtags != "") hashtags += ",";
          hashtags += removePunctuation(tag);
        }
      });

      return hashtags.replace(/ /g, "_");
    },
    socialDescriptionWhatsapp() {
      let description =
        this.newsArticle.headline +
        "\n\r" +
        this.socialDescriptionGotoArticleLink +
        "\n\r\n\r" +
        this.socialDescriptionGotoArmaghanLink;
      return description;
    },
    socialDescriptionTelegram() {
      let description =
        this.newsArticle.headline +
        "\n\r\n\r" +
        this.socialDescriptionGotoArmaghanLink +
        "\n\r" +
        this.websiteLink;
      return description;
    },
    socialDescriptionGotoArticleLink() {
      let description =
        "برای مطالعه این خبر به لینک ذيل مراجعه نماييد:" +
        "\n\r" +
        window.location.href;
      return description;
    },
    socialDescriptionGotoArmaghanLink() {
      let description =
        "------------------------------------------------------------" +
        "\n\r" +
        "اخبار را با سبکی متفاوت در سايت فرابين دنبال نماييد:";
      return description;
    },
    emailBody() {
      var description =
        "برای مطالعه ادامه این خبر به لینک فوق مراجعه نماييد." +
        "\n\r" +
        "------------------------------------------------------------" +
        this.socialDescriptionGotoArmaghanLink +
        "\n\r" +
        this.websiteLink +
        "\n\r\n\r";
      return description;
    }
  }
};
</script>

<style scoped>
.svg {
  width: 24px;
  height: 24px;
  background-image: url("@/assets/images/socials/telegram.svg");
}
/* img {
  width: 200px;
  filter: invert(8%) sepia(100%) saturate(6753%) hue-rotate(246deg)
    brightness(100%) contrast(147%);
}
img:hover {
  filter: invert(40%) sepia(22%) saturate(3242%) hue-rotate(215deg)
    brightness(101%) contrast(104%);
} */
</style>
