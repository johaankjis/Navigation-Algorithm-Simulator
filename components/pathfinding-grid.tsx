"use client"

import { useState, useCallback, useRef } from "react"
import { type GridNode, createGrid, runPathfinding, type AlgorithmType } from "@/lib/pathfinding"
import { GridCell } from "./grid-cell"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card } from "./ui/card"

const GRID_ROWS = 20
const GRID_COLS = 40

export function PathfindingGrid() {
  const [grid, setGrid] = useState<GridNode[][]>(() => {
    const initialGrid = createGrid(GRID_ROWS, GRID_COLS)
    initialGrid[10][10].isStart = true
    initialGrid[10][30].isEnd = true
    return initialGrid
  })

  const [algorithm, setAlgorithm] = useState<AlgorithmType>("astar")
  const [isMousePressed, setIsMousePressed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [stats, setStats] = useState<{
    distance: number
    nodesExplored: number
    executionTime: number
    success: boolean
  } | null>(null)

  const startNodeRef = useRef<GridNode>(grid[10][10])
  const endNodeRef = useRef<GridNode>(grid[10][30])

  const handleMouseDown = useCallback(
    (node: GridNode) => {
      if (isAnimating) return
      setIsMousePressed(true)

      if (!node.isStart && !node.isEnd) {
        const newGrid = grid.map((row) => [...row])
        newGrid[node.row][node.col].isWall = !node.isWall
        setGrid(newGrid)
      }
    },
    [grid, isAnimating],
  )

  const handleMouseEnter = useCallback(
    (node: GridNode) => {
      if (!isMousePressed || isAnimating) return

      if (!node.isStart && !node.isEnd) {
        const newGrid = grid.map((row) => [...row])
        newGrid[node.row][node.col].isWall = !node.isWall
        setGrid(newGrid)
      }
    },
    [isMousePressed, grid, isAnimating],
  )

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false)
  }, [])

  const visualizePathfinding = useCallback(async () => {
    setIsAnimating(true)
    setStats(null)

    // Clear previous visualization
    const clearedGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        visited: false,
        inPath: false,
        distance: Number.POSITIVE_INFINITY,
        heuristic: 0,
        totalCost: Number.POSITIVE_INFINITY,
        parent: null,
      })),
    )
    setGrid(clearedGrid)

    // Run algorithm
    const result = runPathfinding(algorithm, clearedGrid, startNodeRef.current, endNodeRef.current)

    // Animate visited nodes
    for (let i = 0; i < result.visitedNodes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      const node = result.visitedNodes[i]
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row])
        newGrid[node.row][node.col].visited = true
        return newGrid
      })
    }

    // Animate path
    if (result.success) {
      for (let i = 0; i < result.path.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        const node = result.path[i]
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => [...row])
          newGrid[node.row][node.col].inPath = true
          return newGrid
        })
      }
    }

    setStats({
      distance: result.distance,
      nodesExplored: result.nodesExplored,
      executionTime: result.executionTime,
      success: result.success,
    })

    setIsAnimating(false)
  }, [grid, algorithm])

  const clearGrid = useCallback(() => {
    const newGrid = createGrid(GRID_ROWS, GRID_COLS)
    newGrid[10][10].isStart = true
    newGrid[10][30].isEnd = true
    startNodeRef.current = newGrid[10][10]
    endNodeRef.current = newGrid[10][30]
    setGrid(newGrid)
    setStats(null)
  }, [])

  const clearWalls = useCallback(() => {
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isWall: false,
        visited: false,
        inPath: false,
      })),
    )
    setGrid(newGrid)
    setStats(null)
  }, [grid])

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as AlgorithmType)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="astar">A* Algorithm</SelectItem>
              <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
              <SelectItem value="bfs">Breadth-First Search</SelectItem>
              <SelectItem value="dfs">Depth-First Search</SelectItem>
              <SelectItem value="greedy">Greedy Best-First</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={visualizePathfinding} disabled={isAnimating} size="lg">
            {isAnimating ? "Running..." : "Visualize"}
          </Button>

          <Button onClick={clearWalls} variant="outline" disabled={isAnimating}>
            Clear Walls
          </Button>

          <Button onClick={clearGrid} variant="outline" disabled={isAnimating}>
            Reset Grid
          </Button>
        </div>

        {stats && (
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span className={stats.success ? "text-green-600" : "text-red-600"}>
                {stats.success ? "Path Found" : "No Path"}
              </span>
            </div>
            {stats.success && (
              <>
                <div>
                  <span className="font-semibold">Distance:</span> {stats.distance.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold">Nodes Explored:</span> {stats.nodesExplored}
                </div>
                <div>
                  <span className="font-semibold">Time:</span> {stats.executionTime.toFixed(2)}ms
                </div>
              </>
            )}
          </div>
        )}
      </Card>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border border-gray-300" />
          <span>Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 border border-gray-300" />
          <span>End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 border border-gray-300" />
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300 border border-gray-300" />
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-gray-300" />
          <span>Path</span>
        </div>
      </div>

      <div className="inline-block border-2 border-gray-400 bg-gray-50" onMouseLeave={handleMouseUp}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((node, nodeIdx) => (
              <GridCell
                key={`${rowIdx}-${nodeIdx}`}
                node={node}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
                isAnimating={isAnimating}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
