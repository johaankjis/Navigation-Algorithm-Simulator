import type { GridNode, PathfindingResult } from "../types"
import { getNeighbors, reconstructPath, resetGrid } from "../grid-utils"

export function bfs(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const queue: GridNode[] = [startNode]

  startNode.visited = true
  startNode.distance = 0

  while (queue.length > 0) {
    const currentNode = queue.shift()!
    visitedNodes.push(currentNode)

    if (currentNode === endNode) {
      const path = reconstructPath(endNode)
      path.forEach((node) => (node.inPath = true))

      return {
        path,
        visitedNodes,
        distance: endNode.distance,
        nodesExplored: visitedNodes.length,
        executionTime: performance.now() - startTime,
        success: true,
      }
    }

    const neighbors = getNeighbors(currentNode, grid)
    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.visited = true
        neighbor.distance = currentNode.distance + 1
        neighbor.parent = currentNode
        queue.push(neighbor)
      }
    }
  }

  return {
    path: [],
    visitedNodes,
    distance: Number.POSITIVE_INFINITY,
    nodesExplored: visitedNodes.length,
    executionTime: performance.now() - startTime,
    success: false,
  }
}
