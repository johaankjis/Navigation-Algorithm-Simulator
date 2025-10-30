// All pathfinding types, utilities, and algorithms in one file to avoid import issues

export interface GridNode {
  row: number
  col: number
  isWall: boolean
  isStart: boolean
  isEnd: boolean
  distance: number
  heuristic: number
  totalCost: number
  parent: GridNode | null
  visited: boolean
  inPath: boolean
}

export interface PathfindingResult {
  path: GridNode[]
  visitedNodes: GridNode[]
  distance: number
  nodesExplored: number
  executionTime: number
  success: boolean
}

export type AlgorithmType = "dijkstra" | "astar" | "bfs" | "dfs" | "greedy"

// Grid Utilities
export function createGrid(rows: number, cols: number): GridNode[][] {
  const grid: GridNode[][] = []

  for (let row = 0; row < rows; row++) {
    const currentRow: GridNode[] = []
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isWall: false,
        isStart: false,
        isEnd: false,
        distance: Number.POSITIVE_INFINITY,
        heuristic: 0,
        totalCost: Number.POSITIVE_INFINITY,
        parent: null,
        visited: false,
        inPath: false,
      })
    }
    grid.push(currentRow)
  }

  return grid
}

export function getNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const neighbors: GridNode[] = []
  const { row, col } = node
  const rows = grid.length
  const cols = grid[0].length

  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < rows - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < cols - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((neighbor) => !neighbor.isWall)
}

export function manhattanDistance(nodeA: GridNode, nodeB: GridNode): number {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}

export function reconstructPath(endNode: GridNode): GridNode[] {
  const path: GridNode[] = []
  let currentNode: GridNode | null = endNode

  while (currentNode !== null) {
    path.unshift(currentNode)
    currentNode = currentNode.parent
  }

  return path
}

export function resetGrid(grid: GridNode[][]): void {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Number.POSITIVE_INFINITY
      node.heuristic = 0
      node.totalCost = Number.POSITIVE_INFINITY
      node.parent = null
      node.visited = false
      node.inPath = false
    }
  }
}

// Dijkstra's Algorithm
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

// A* Algorithm
export function aStar(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const openSet: GridNode[] = [startNode]

  startNode.distance = 0
  startNode.heuristic = manhattanDistance(startNode, endNode)
  startNode.totalCost = startNode.heuristic

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.totalCost - b.totalCost)
    const currentNode = openSet.shift()!

    if (currentNode.visited) continue
    if (currentNode.isWall) continue

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
        const tentativeDistance = currentNode.distance + 1

        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance
          neighbor.heuristic = manhattanDistance(neighbor, endNode)
          neighbor.totalCost = neighbor.distance + neighbor.heuristic
          neighbor.parent = currentNode

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor)
          }
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

// Breadth-First Search
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
      if (!neighbor.visited && !neighbor.isWall) {
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

// Depth-First Search
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

// Greedy Best-First Search
export function greedyBestFirst(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const openSet: GridNode[] = [startNode]

  startNode.distance = 0
  startNode.heuristic = manhattanDistance(startNode, endNode)

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.heuristic - b.heuristic)
    const currentNode = openSet.shift()!

    if (currentNode.visited) continue
    if (currentNode.isWall) continue

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
        const tentativeDistance = currentNode.distance + 1

        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance
          neighbor.heuristic = manhattanDistance(neighbor, endNode)
          neighbor.parent = currentNode

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor)
          }
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

// Main pathfinding runner
export function runPathfinding(
  algorithm: AlgorithmType,
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
): PathfindingResult {
  switch (algorithm) {
    case "dijkstra":
      return dijkstra(grid, startNode, endNode)
    case "astar":
      return aStar(grid, startNode, endNode)
    case "bfs":
      return bfs(grid, startNode, endNode)
    case "dfs":
      return dfs(grid, startNode, endNode)
    case "greedy":
      return greedyBestFirst(grid, startNode, endNode)
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`)
  }
}
