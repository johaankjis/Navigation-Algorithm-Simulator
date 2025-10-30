import type { GridNode, PathfindingResult } from "../types"
import { getNeighbors, reconstructPath, resetGrid } from "../grid-utils"

export function dfs(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const stack: GridNode[] = [startNode]

  startNode.distance = 0

  while (stack.length > 0) {
    const currentNode = stack.pop()!

    if (currentNode.visited || currentNode.isWall) continue

    currentNode.visited = true
    visitedNodes.push(currentNode)

    if (currentNode === endNode) {
      const path = reconstructPath(endNode)
      path.forEach((node) => (node.inPath = true))

      return {
        path,
        visitedNodes,
        distance: path.length - 1,
        nodesExplored: visitedNodes.length,
        executionTime: performance.now() - startTime,
        success: true,
      }
    }

    const neighbors = getNeighbors(currentNode, grid)
    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.parent = currentNode
        neighbor.distance = currentNode.distance + 1
        stack.push(neighbor)
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
