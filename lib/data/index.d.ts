import { SimulationNodeDatum, SimulationLinkDatum } from 'd3'

interface Node extends SimulationNodeDatum {
  id: string
  name: string
  active: boolean
}

interface Link extends SimulationLinkDatum<Node> {
  name: string
  source: Node
  target: Node
}

export const nodes: Node[]
export const links: Link[]
export const nodeMap: Record<string, Node>
