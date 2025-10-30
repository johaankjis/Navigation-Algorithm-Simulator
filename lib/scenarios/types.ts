export interface Scenario {
  id: string
  name: string
  description: string
  gridSize: { rows: number; cols: number }
  start: { row: number; col: number }
  end: { row: number; col: number }
  walls: { row: number; col: number }[]
  difficulty: "easy" | "medium" | "hard"
  category: "maze" | "open" | "obstacles" | "narrow"
}

export interface ScenarioResult {
  scenarioId: string
  algorithm: string
  success: boolean
  pathLength: number
  nodesExplored: number
  executionTime: number
  efficiency: number
}
