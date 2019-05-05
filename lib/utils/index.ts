import * as d3 from 'd3-force'
import { nodes, links, Node, Link } from '../data'

function ensureRange (value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default {
  data: () => ({
    nodes,
    links,
    size: 320,
    draggedNode: null,
  }),

  computed: {
    viewBox () {
      return `-${this.size / 2}, -${this.size / 2}, ${this.size}, ${this.size}`
    },
  },

  created () {
    this.forceLink = d3
      .forceLink<Node, Link>(this.links)
      .id(node => node.id)
      .distance(40)
    this.forceManyBody = d3
      .forceManyBody()
      .strength(-50)
    this.forceX = d3
      .forceX()
      .strength(0.08)
    this.forceY = d3
      .forceY()
      .strength(0.08)
    this.simulation = d3
      .forceSimulation(this.nodes)
      .force('link', this.forceLink)
      .force('charge', this.forceManyBody)
      .force('x', this.forceX)
      .force('y', this.forceY)
      .stop()
  },

  mounted () {
    this.simulation.restart()

    addEventListener('mousemove', this.onMouseMove)
    addEventListener('touchmove', this.onTouchMove)
    addEventListener('mouseup', this.onDragEnd)
    addEventListener('touchend', this.onDragEnd)
  },

  destroyed () {
    removeEventListener('mousemove', this.onMouseMove)
    removeEventListener('touchmove', this.onTouchMove)
    removeEventListener('mouseup', this.onDragEnd)
    removeEventListener('touchend', this.onDragEnd)
  },

  methods: {
    onDragStart (node: Node) {
      this.draggedNode = node
      this.simulation.alphaTarget(0.3).restart()
      node.fx = node.x
      node.fy = node.y
    },

    onMouseMove (event: MouseEvent) {
      if (!this.draggedNode) return
      this.updatePosition(event)
    },

    onTouchMove (event: TouchEvent) {
      const touch = event.targetTouches[0]
      if (!this.draggedNode || !touch) return
      this.updatePosition(touch)
    },

    updatePosition (e: MouseEvent | Touch) {
      const { x, y } = this.$refs.svg.getBoundingClientRect()
      this.draggedNode.fx = ensureRange(e.clientX - x, 0, this.size) - this.size / 2
      this.draggedNode.fy = ensureRange(e.clientY - y, 0, this.size) - this.size / 2
    },

    onDragEnd () {
      if (!this.draggedNode) return
      this.simulation.alphaTarget(0)
      this.draggedNode.fx = null
      this.draggedNode.fy = null
      this.draggedNode = null
    },

    onMouseEnterNode (node: Node, event: MouseEvent) {
      node.active = true
      this.setTooltip(node.name, event)
    },

    onMouseEnterLink (link: Link, event: MouseEvent) {
      link.source.active = true
      link.target.active = true
      this.setTooltip(link.name, event)
    },

    setTooltip (title: string, event: MouseEvent) {
      const tooltip = this.$uzkk.coupleTooltip
      if (!tooltip || !title) return
      tooltip.title = title
      tooltip.activate(event)
    },

    onMouseLeaveNode (node: Node) {
      node.active = false
      this.$uzkk.coupleTooltip.inactivate(300)
    },

    onMouseLeaveLink (link: Link) {
      link.source.active = false
      link.target.active = false
      this.$uzkk.coupleTooltip.inactivate(300)
    },
  },
}
