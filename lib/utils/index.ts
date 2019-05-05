import * as d3 from 'd3-force'
import { nodes, links, Node, Link } from '../data'

function ensureRange (value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default {
  data: () => ({
    nodes,
    links,
    size: 300,
    draggedNode: null,
  }),

  computed: {
    viewBox () {
      return `-${this.size / 2}, -${this.size / 2}, ${this.size}, ${this.size}`
    },
  },

  created () {
    this.simulation = d3
      .forceSimulation(this.nodes)
      .force('link', d3.forceLink<Node, Link>(this.links).id(node => node.id))
      .force('charge', d3.forceManyBody())
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .stop()
  },

  mounted () {
    this.simulation.restart()

    addEventListener('mousemove', this.onMouseMove)
    addEventListener('mouseup', this.onMouseUp)
  },

  destroyed () {
    removeEventListener('mousemove', this.onMouseMove)
    removeEventListener('mouseup', this.onMouseUp)
  },

  methods: {
    onMouseDown (node: Node) {
      this.draggedNode = node
      this.simulation.alphaTarget(0.3).restart()
      node.fx = node.x
      node.fy = node.y
    },

    onMouseMove (event: MouseEvent) {
      if (!this.draggedNode) return
      const { x, y } = this.$refs.svg.getBoundingClientRect()
      this.draggedNode.fx = ensureRange(event.x - x, 0, this.size) - this.size / 2
      this.draggedNode.fy = ensureRange(event.y - y, 0, this.size) - this.size / 2
    },

    onMouseUp () {
      if (!this.draggedNode) return
      this.simulation.alphaTarget(0)
      this.draggedNode.fx = null
      this.draggedNode.fy = null
      this.draggedNode = null
    },
  },
}
