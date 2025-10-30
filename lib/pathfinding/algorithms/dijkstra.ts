import type { GridNode, PathfindingResult } from "../types"
import { getNeighbors, reconstructPath, resetGrid } from "../grid-utils"

export function dijkstra(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const unvisitedNodes: GridNode[] = []

  startNode.distance = 0

  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node)
    }
  }

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance)
    const currentNode = unvisitedNodes.shift()!

    if (currentNode.isWall) continue
    if (currentNode.distance === Number.POSITIVE_INFINITY) break

    currentNode.visited = true
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
        const newDistance = currentNode.distance + 1
        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance
          neighbor.parent = currentNode
        }
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
