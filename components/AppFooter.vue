<template lang="pug">
  .AppFooter
    p.AppFooter_Copyright
      | © 2018 xxx.
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang="scss">
.AppFooter {
  border-top: 1px solid #eaeaea;
  &_Copyright {
    text-align: center;
    line-height: 60px;
  }
}
</style>
