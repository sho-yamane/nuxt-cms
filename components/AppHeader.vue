<template lang="pug">
  .AppHeader
    .AppHeader_Inner
      el-row(:gutter="24")
        el-col(:span="4")
          h1.AppHeader_logo
            nuxt-link(to="/") Logo
        el-col(:span="20")
          el-menu(
            :default-active="activeIndex"
            class="AppHeader_Menu"
            mode="horizontal"
            background-color="#324157"
            text-color="#fff"
            active-text-color="#ffd04b"
          )
            el-menu-item(index="1")
              nuxt-link(to="/about") このサイトについて
            el-menu-item(index="2")
              nuxt-link(to="/posts") ブログ
            el-menu-item(index="3")
              nuxt-link(to="/privacy-policy") プライバシーポリシー
            el-menu-item(index="4")
              nuxt-link(to="/contact") お問い合わせ
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      activeIndex: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
.AppHeader {
  height: 60px;
  background-color: #324157;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 60px;
  z-index: 100;
  position: relative;
  &_Inner {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto;
  }
  &_logo {
    margin: 0;
    float: left;
    font-size: 24px;
    font-weight: 400;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
  &_Menu {
    float: right;
    height: 100%;
    line-height: 60px;
    padding: 0;
    margin: 0;
    li {
      a {
        color: #bfcbd9;
        text-decoration: none;
        line-height: 60px;
        height: 60px;
        display: block;
      }
    }
  }
}
</style>
