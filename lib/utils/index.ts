import * as d3 from 'd3-force'
import { nodes, links, Node, Link } from '../data'

function getEventPoint (event: MouseEvent | TouchEvent) {
  return event.type.startsWith('touch')
    ? (event as TouchEvent).targetTouches[0]
    : event as MouseEvent
}

export default {
  data: () => ({
    nodes,
    links,
    size: 320,
    dragStartEvent: null,
    draggedNode: null,
  }),

  computed: {
    viewBox () {
      return `-${this.size / 2}, -${this.size / 2}, ${this.size}, ${this.size}`
    },
  },

  created () {
    this.DRAGGABLE_RADIUS = this.size / 2 - 10

    this.forceLink = d3
      .forceLink<Node, Link>(this.links)
      .id(node => node.id)
      .distance(35)

    this.forceManyBody = d3
      .forceManyBody()
      .strength(-40)

    this.forceX = d3
      .forceX()
      .strength(0.07)

    this.forceY = d3
      .forceY()
      .strength(0.07)

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

    addEventListener('mousemove', this.onDragMove)
    addEventListener('touchmove', this.onDragMove)
    addEventListener('mouseup', this.onDragEnd)
    addEventListener('touchend', this.onDragEnd)
  },

  destroyed () {
    removeEventListener('mousemove', this.onDragMove)
    removeEventListener('touchmove', this.onDragMove)
    removeEventListener('mouseup', this.onDragEnd)
    removeEventListener('touchend', this.onDragEnd)
  },

  methods: {
    onDragStart (node: Node, event: MouseEvent | TouchEvent) {
      this.draggedNode = node
      this.dragStartEvent = event
      this.simulation.alphaTarget(0.3).restart()
      const point = getEventPoint(event)
      node.fx = node.x
      node.fy = node.y
      node.lastX = node.x - point.clientX
      node.lastY = node.y - point.clientY
    },

    onDragMove (event: MouseEvent | TouchEvent) {
      const node = this.draggedNode
      if (!node) return
      const point = getEventPoint(event)
      node.fx = point.clientX + node.lastX
      node.fy = point.clientY + node.lastY
      const dist2 = node.fx ** 2 + node.fy ** 2
      if (dist2 > this.DRAGGABLE_RADIUS ** 2) {
        const scale = this.DRAGGABLE_RADIUS / Math.sqrt(dist2)
        node.fx *= scale
        node.fy *= scale
      }
    },

    onDragEnd (event: MouseEvent | TouchEvent) {
      if (!this.draggedNode) return
      this.simulation.alphaTarget(0)
      this.draggedNode.fx = null
      this.draggedNode.fy = null
      this.draggedNode = null
    },

    setFocusedNodes (...nodes: Node[]) {
      this.nodes.forEach((node) => {
        node.focused = !!nodes.find(({ id }) => id === node.id)
      })
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
