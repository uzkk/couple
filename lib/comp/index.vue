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
          @mouseenter.stop.prevent="onMouseEnterLink(link, $event)"
          @mouseleave.stop.prevent="onMouseLeaveLink(link)"
        />
      </g>
      <g class="nodes">
        <circle
          v-for="(node, index) in nodes"
          :key="index"
          :cx="node.x"
          :cy="node.y"
          :class="{ active: node.active }"
          @mouseenter.stop.prevent="onMouseEnterNode(node, $event)"
          @mouseleave.stop.prevent="onMouseLeaveNode(node)"
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
    stroke-width 2

    line
      transition stroke-width 0.3s ease
      &:hover
        stroke-width 3

  g.nodes
    stroke #fff
    stroke-opacity 0.8
    stroke-width 1.5

    circle
      r 8
      fill #9467bd
      transition fill 0.3s ease, r 0.3s ease
      &.active
        r 10
        fill #17becf

</style>
