<template>
  <label>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span></span>
  </label>
</template>
<script>
export default {
  name: "c-checkbox",
  props: {
    modelValue: [Boolean],
  },
};
</script>
<style lang="scss" scoped>
:root {
  label {
    position: relative;
  }
  span {
    width: 20px;
    height: 20px;
    border: 1px solid #797b86;
    box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    display: inline-block;
    transition: all linear 0.3s;
    &:after {
      content: "";
      position: absolute;
      top: -5px;
      left: 7px;
      border-bottom: 2px solid #0069b4;
      border-right: 2px solid #0069b4;
      height: 11px;
      width: 6px;
      transform: rotate(45deg);
      visibility: hidden;
    }
  }
  input {
    display: none;
    &:checked ~ span {
      background: rgb(255, 255, 255);
      &:after {
        visibility: visible;
      }
    }
  }
}
</style>
