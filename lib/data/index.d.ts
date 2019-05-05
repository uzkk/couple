import { SimulationNodeDatum, SimulationLinkDatum } from 'd3'

interface Node extends SimulationNodeDatum {
  id: string
  name: string
  isDragged: boolean
}

interface Link extends SimulationLinkDatum<Node> {
  source: string
  target: string
}

export const nodes: Node[]
export const links: Link[]
export const nodeMap: Record<string, Node>
