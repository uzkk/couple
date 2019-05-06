<template>
  <div
    class="couple-tooltip"
    :class="{ active }"
    :style="tooltipStyle"
  >
    {{ title }}
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  data: () => ({
    active: false,
    inactive: true,
    left: null,
    top: null,
    title: '',
    description: '',
  }),

  computed: {
    tooltipStyle () {
      if (!this.left || !this.top) return {}
      return {
        left: this.left + 'px',
        top: this.top + 'px',
      }
    },
  },

  created () {
    Vue.prototype.$uzkk.coupleTooltip = this
  },

  methods: {
    activate (event) {
      this.active = true
      this.inactive = false
      const { x, y } = this.$parent.$el.getBoundingClientRect()
      this.left = event.clientX - x
      this.top = event.clientY - y
    },

    inactivate (delay = 0, clear = false) {
      this.inactive = true
      setTimeout(() => {
        if (!this.inactive) return
        this.active = false
        if (!clear) return
        this.left = null
        this.top = null
      }, delay)
    },
  },
}

</script>

<style lang="stylus" scoped>

.couple-tooltip
  pointer-events none
  position absolute
  background-color #000000
  color #ffffff
  opacity 0
  transition 0.3s ease
  padding 0.4em 0.6em
  border-radius 0.4em

  &.active
    opacity 0.6

</style>
