<template>
  <div class="viewed">
    <div class="viewed__header">
      <div class="row">
        <div class="viewed__title">Просмотренные товары</div>
        <div class="pagination">
          <div class="row">
            <button
              class="pagination__btn"
              @click="page = page - 1"
              v-if="page > 1"
            >
              <img
                src="@/assets/image/svg/arrow-left.svg"
                height="50"
                width="50"
                alt=""
              />
            </button>
            <div class="pagination__text">
              <span class="pagination__curPage">{{ page }} </span>
              <span class="pagination__totalPage">/ {{ totalPages }}</span>
            </div>
            <button
              class="pagination__btn"
              @click="page = page + 1"
              v-if="hasNextPage"
            >
              <img
                src="@/assets/image/svg/arrow-right.svg"
                height="50"
                width="50"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="viewed__list">
      <div class="viewed__item" v-for="item in paginatedProduct" :key="item.id">
        <div class="card">
          <div>
            <div class="card__img">
              <img :src="item.img" height="245" width="245" alt="" />
            </div>
            <div class="card__text">
              <div class="card__title">{{ item.title }}</div>
              <div class="card__description">{{ item.descr }}</div>
            </div>
          </div>
          <div>
            <div class="card__price">
              <div class="row row_col">
                <div class="card__rub">{{ item.price_rub }}</div>
                <div class="card__euro">{{ item.price_euro }}</div>
              </div>
            </div>
            <button class="card__btn">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "viewed-products",
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState({
      viewedItems: (state) => state.viewed.viewedItems,
    }),
    endIndex() {
      return this.page * 4;
    },
    hasNextPage() {
      return this.viewedItems.length > this.endIndex;
    },
    totalPages() {
      return this.viewedItems.length / 4;
    },
    paginatedProduct() {
      let start = (this.page - 1) * 4;
      return this.viewedItems.slice(start, this.endIndex);
    },
  },
  watch: {
    paginatedProduct() {
      if (this.viewedItems.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.viewed {
  width: 100%;

  &__header {
    @include text-lato(600, 30px, 120%, $text-title-color);
  }
  &__title {
  }

  &__list {
    margin-top: 45px;
    margin-bottom: 116px;
    display: flex;
    flex-direction: row;
  }
  &__item {
    display: flex;
    flex-direction: column;
  }
}
.pagination {
  margin-top: 5px;
  &__text {
    margin-left: 20px;
    margin-right: 15px;
  }
  &__curPage {
    @include text-lato(500, 24px, 150%, $text-black-color);
  }
  &__totalPage {
    @include text-lato(400, 18px, 150%, $text-thin-color);
  }
  &__btn {
    border: none;
    border-radius: 50%;
    background: $text-white-color;
    cursor: pointer;
  }
}
%mt-mb {
  margin-top: 5px;
  margin-bottom: 5px;
}
.card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 25px;
  background: $bg-card-color;
  margin-right: 20px;
  height: 563px;
  width: 305px;
  box-sizing: border-box;
  &__img {
  }
  &__text {
  }
  &__title {
    @include text-lato(700, 22px, 120%, $text-title-color);
  }
  &__description {
    @include text-lato(400, 14px, 145%, $text-title-color);
    margin-top: 10px;
  }
  &__price {
    margin-bottom: 20px;
  }
  &__rub {
    @include text-roboto(500, 22px, 130%, $text-title-color);
  }
  &__euro {
    @include text-lato(400, 16px, 145%, $text-thin-color);
    margin-top: 3px;
  }
  &__btn {
    @include text-lato(600, 16px, 145%, $text-white-color);
    height: 52px;
    width: 255px;
    background: $text-blue-color;
    color: $text-white-color;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    &:active {
      background: $text-thin-color;
    }
  }
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_col {
    flex-direction: column;
    align-items: start;
  }
}
</style>
