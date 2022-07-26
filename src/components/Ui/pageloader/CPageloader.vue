<template>
  <div class="page-loader">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
  </div>
</template>

<script>
export default {
  name: "c-page-loader",
  data: () => {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.isLoaded = true;
      }
    };
  },
};
</script>

<style lang="scss" scoped>
$colors: #8cc271, #69beeb, #f5aa39, #e9643b;
.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //width: 100vw;
  //height: 100vh;
  background-color: rgba(51, 51, 51, 0.25);
  z-index: 999;
}
.cube {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      background-color: nth($colors, $i);
    }
  }
  &:first-child {
    animation: left 1s infinite;
  }
  &:last-child {
    animation: right 1s infinite 0.5s;
  }
}

@keyframes left {
  40% {
    transform: translateX(-60px);
  }
  50% {
    transform: translateX(0px);
  }
}
@keyframes right {
  40% {
    transform: translateX(60px);
  }
  50% {
    transform: translateX(0px);
  }
}
</style>
