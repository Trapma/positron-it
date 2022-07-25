<template>
  <div class="crumbs">
    <span class="crumbs__start">Главная</span>
    <img class="crumbs__arrow" src="@/assets/image/svg/vector.svg" />
    <span class="crumbs__end">Корзина</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.crumbs {
  display: flex;
  margin-top: 31px;

  &__arrow {
    margin: 0 10px;
  }

  &__start {
    @include text-lato(400, 14px, 21px, $text-crumbs-start-color);
  }
  &__end {
    @include text-lato(400, 14px, 21px, $text-thin-color);
  }
}
</style>
