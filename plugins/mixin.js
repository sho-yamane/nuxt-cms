import Vue from 'vue'

Vue.mixin({
  methods: {
    $_dateFormat(date) {
      const dateSplit = date.split('-')
      const y = dateSplit[0]
      const m = parseInt(dateSplit[1], 10)
      const ds = dateSplit[2].split('T')
      const d = ds[0]
      return y + '.' + m + '.' + d
    }
  }
})
