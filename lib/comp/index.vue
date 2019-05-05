<template>
  <div>
    <svg
      ref="svg"
      id="couple"
      :width="size"
      :height="size"
      :viewBox="viewBox"
    >
      <g class="links">
        <line
          v-for="(link, index) in links"
          :key="index"
          :x1="link.source.x"
          :y1="link.source.y"
          :x2="link.target.x"
          :y2="link.target.y"
        />
      </g>
      <g class="nodes">
        <circle
          v-for="(node, index) in nodes"
          :key="index"
          :cx="node.x"
          :cy="node.y"
          @mouseenter.stop.prevent="onMouseEnter(node, $event)"
          @mouseleave.stop.prevent="onMouseLeave(node, $event)"
          @mousedown.stop.prevent="onDragStart(node)"
          @touchstart.stop.prevent="onDragStart(node)"
        />
      </g>
    </svg>
  </div>
</template>

<script>

import D3Mixin from '../utils'

export default {
  mixins: [D3Mixin],
}

</script>

<style lang="stylus">

svg#couple
  display block
  margin 0 auto 2rem

  g.links
    stroke #999
    stroke-opacity 0.6

  g.nodes
    stroke #fff
    stroke-opacity 0.8
    stroke-width 1.5

    circle
      r 7
      fill #9467bd
      stroke-width 2
      transition fill 0.3s ease, r 0.3s ease

      &:hover
        r 10
        fill #17becf

</style>
