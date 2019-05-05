import _nodes from '../data/nodes'
import _links from '../data/links'

export const nodeMap = {}

export const nodes = _nodes.map(([id, name]) => (nodeMap[id] = {
  id,
  name,
  x: 0,
  y: 0,
  active: false,
}))

export const links = _links.map(([source, target, name]) => ({
  name,
  source: nodeMap[source],
  target: nodeMap[target],
}))
