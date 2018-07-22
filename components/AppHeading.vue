<template lang="pug">
  component.AppHeading(
    :is="tag"
  )
    slot
</template>

<script>
export default {
  name: 'AppHeading',
  props: {
    level: {
      type: Number,
      default: 2
    }
  },
  computed: {
    tag() {
      return 'h' + Math.max(1, Math.min(6, this.level))
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin: 0 0 30px;
  color: #35495e;
  &:after {
    width: 30px;
    height: 1px;
    background: #35495e;
    display: block;
    margin: 15px auto 0;
    content: '';
  }
}

h3 {
  font-size: 21px;
}
</style>
