import axios from "axios";
import { MAX_FONT_SIZE, MIN_FONT_SIZE, FONT_SIZE_STEP } from "../constants";

//  your root state
export const state = () => ({
  user: undefined,
  categories: [],
  publishers: [],
  news: [],
  newsScrollTop: 0,
  newsFilterType: "all",
  newsFilter: {},
  newsLastPage: undefined,
  newsFirstPage: undefined,
  reachedFirstPage: false,
  newsPageSize: 20,
  loading: { categories: false, news: false },
  fontSize: 1
});

// contains your actions
export const actions = {
  getCategories: ({ commit }) => {
    commit("startLoading", "categories");
    axios
      .get(process.env.ROOT_API + "/categories/getCategories")
      .then(response => {
        commit("setCategories", response.data);
      })
      .catch(e => {})
      .finally(() => commit("finishLoading", "categories"));
  },
  getPublishers: ({ commit }) => {
    commit("startLoading", "publishers");
    axios
      .get(process.env.ROOT_API + "/publishers/getPublishers")
      .then(response => {
        commit("setPublishers", response.data.publishers);
      })
      .catch(e => {})
      .finally(() => commit("finishLoading", "publishers"));
  },
  getNews: ({ commit, getters }, { filterType, filter, page }) => {
    if (page == "previous" && getters.reachedFirstPage) return;

    commit("setNewsFilterType", filterType);
    commit("startLoading", "news");
    let previousPage = undefined;
    if (page == "next") previousPage = getters.newsLastPage;
    else if (page == "previous") previousPage = getters.newsFirstPage;

    let requestedPage = page;
    if (getters.news.length == 0) requestedPage = "last";
    let pagination = {
      page: requestedPage,
      pageSize: getters.newsPageSize,
      previousPage
    };

    return new Promise((resolve, reject) => {
      axios
        .get(process.env.ROOT_API + "/news/getNews", {
          params: {
            filter: JSON.stringify(filter),
            pagination: JSON.stringify(pagination)
          }
        })
        .then(
          response => {
            commit("setNews", {
              news: response.data.news,
              page: response.data.page,
              requestedPage,
              filter
            });

            commit("finishLoading", "news");
            resolve(response);
          },
          error => {
            commit("finishLoading", "news");
            reject(error);
          }
        );
    });
  },
  newsScroll: ({ commit }, { scrollTop }) => {
    commit("setNewsScrollTop", scrollTop);
  },
  getNewsArticle: ({ commit }, { newsArticleId }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.ROOT_API + "/news/" + newsArticleId + "/getNewsArticle"
        )
        .then(
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  },
  getUser: ({ commit }, { userId }) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.ROOT_API + "/users/" + userId + "/getUser").then(
        response => {
          commit("setUser", response.data.user);
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  increaseFontSize: ({ commit, getters }) => {
    let fontSize = getters.fontSize;
    if (fontSize + FONT_SIZE_STEP <= MAX_FONT_SIZE)
      commit("setFontSize", fontSize + FONT_SIZE_STEP);
  },
  decreaseFontSize: ({ commit, getters }) => {
    let fontSize = getters.fontSize;
    if (fontSize - FONT_SIZE_STEP >= MIN_FONT_SIZE)
      commit("setFontSize", fontSize - FONT_SIZE_STEP);
  },
  createFavorite: ({ commit, getters }, { favorite }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.ROOT_API +
            "/users/" +
            getters.user._id +
            "/favorites/createFavorite",
          { favorite }
        )
        .then(
          response => {
            favorite._id = response.data._id;
            commit("addFavorite", favorite);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  },
  deleteFavorite: ({ commit, getters }, { favoriteId }) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          process.env.ROOT_API +
            "/users/" +
            getters.user._id +
            "/favorites/" +
            favoriteId +
            "/deleteFavorite"
        )
        .then(
          response => {
            commit("deleteFavorite", favoriteId);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }
};
// contains your mutations
export const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  },
  setPublishers: (state, publishers) => {
    state.publishers = publishers;
  },
  setNews: (state, { news, page, requestedPage, filter }) => {
    state.newsFilter = filter;
    if (requestedPage == "last") {
      state.news = news;
      if (news.length > 0) {
        state.reachedFirstPage = false;
        state.newsFirstPage = page;
        state.newsLastPage = page;
      }
    } else if (requestedPage == "next" && news.length > 0) {
      state.news = news.concat(state.news);
      state.newsLastPage = page;
    } else {
      if (news.length == 0) state.reachedFirstPage = true;
      else {
        state.news = state.news.concat(news);
        state.newsFirstPage = page;
      }
    }
  },
  setNewsScrollTop: (state, scrollTop) => {
    state.newsScrollTop = scrollTop;
  },
  setUser: (state, user) => {
    state.user = user;
  },
  setFontSize: (state, fontSize) => {
    localStorage.fontSize = fontSize;
    state.fontSize = fontSize;
  },
  setNewsFilterType: (state, newsFilterType) => {
    state.newsFilterType = newsFilterType;
  },
  startLoading: (state, data) => {
    state.loading[data] = true;
  },
  finishLoading: (state, data) => {
    state.loading[data] = false;
  },
  addFavorite: (state, favorite) => {
    if (favorite.subcategory == "all") {
      let favoriteIndex;
      do {
        favoriteIndex = state.user.favorites.findIndex(f => {
          return f.category == favorite.category;
        });
        if (favoriteIndex != -1) state.user.favorites.splice(favoriteIndex, 1);
      } while (favoriteIndex != -1);
    }

    state.user.favorites.push(favorite);
  },
  deleteFavorite: (state, id) => {
    let index = state.user.favorites.findIndex(favorite => {
      return favorite._id == id;
    });
    if (index != -1) state.user.favorites.splice(index, 1);
  }
};
// contains your getters
export const getters = {
  allCategories: state => state.categories,
  allPublishers: state => state.publishers,
  news: state => state.news,
  newsScrollTop: state => state.newsScrollTop,
  newsFilterType: state => state.newsFilterType,
  newsFilter: state => state.newsFilter,
  newsFirstPage: state => state.newsFirstPage,
  newsLastPage: state => state.newsLastPage,
  reachedFirstPage: state => state.reachedFirstPage,
  newsPageSize: state => state.newsPageSize,
  previousNewsArticleId: state => {
    return newsArticleId => {
      let currentNewsArticleIndex = state.news.findIndex(newsArticle => {
        return newsArticle._id == newsArticleId;
      });
      if (currentNewsArticleIndex == -1) return "notFound";

      let previousNewsArticleIndex = currentNewsArticleIndex + 1;
      if (previousNewsArticleIndex >= state.news.length) return "isFirst";
      let previousNewsArticle = state.news[previousNewsArticleIndex];
      return previousNewsArticle._id;
    };
  },
  nextNewsArticleId: state => {
    return newsArticleId => {
      let currentNewsArticleIndex = state.news.findIndex(newsArticle => {
        return newsArticle._id == newsArticleId;
      });
      if (currentNewsArticleIndex == -1) return "notFound";

      let nextNewsArticleIndex = currentNewsArticleIndex - 1;
      if (nextNewsArticleIndex < 0) return "isLast";
      let nextNewsArticle = state.news[nextNewsArticleIndex];
      return nextNewsArticle._id;
    };
  },
  user: state => state.user,
  isLoadingCategories: state => state.loading.categories,
  isLoadingNews: state => state.loading.news,
  fontSize: state => state.fontSize,
  getCategoryByKey(state) {
    return categoryKey => {
      let category = state.categories.find(category => {
        return category.key == categoryKey;
      });

      return category;
    };
  },
  getSubcategoryByKey(state) {
    return (categoryKey, subcategoryKey) => {
      let category = state.categories.find(category => {
        return category.key == categoryKey;
      });
      if (category == undefined) return undefined;

      let subcategory = category.subcategories.find(subcategory => {
        return subcategory.key == subcategoryKey;
      });

      return subcategory;
    };
  },
  getCategoryTitleByKey(state, getters) {
    return categoryKey => {
      let category = getters.getCategoryByKey(categoryKey);
      if (category == undefined) return "تعريف نشده";
      return category.title;
    };
  },
  getSubcategoryTitleByKey(state, getters) {
    return (categoryKey, subcategoryKey) => {
      let subcategory = getters.getSubcategoryByKey(
        categoryKey,
        subcategoryKey
      );
      if (subcategory == undefined) return "تعريف نشده";
      return subcategory.title;
    };
  }
};
