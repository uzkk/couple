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
          :stroke-width="1"
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
          :r="5"
          :fill="node.isDragged ? 'red' : 'blue'"
          :cx="node.x"
          :cy="node.y"
          :title="node.name"
          @mousedown.stop.prevent="onMouseDown(node)"
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
  margin 0 auto

  g.links
    stroke #999
    stroke-opacity 0.6

  g.nodes
    stroke #fff
    stroke-opacity 0.8
    stroke-width 1.5

</style>
