<template lang="pug">
  el-carousel.AppSlider(indicator-position="outside" height="450px")
    el-carousel-item.AppSlider_Item(v-for="item in 4" :key="item")
      h3 {{ item }}
</template>

<script>
export default {
  name: 'AppSlider'
}
</script>

<style scoped lang="scss">
.AppSlider {
  &_Item {
    h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 450px;
      margin: 0;
      text-align: center;
    }
    &:nth-child(2n) {
      background-color: #99a9bf;
    }
    &:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>
