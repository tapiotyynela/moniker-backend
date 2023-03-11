import { NewTeam } from "./team"

export type NewGame = {
    teams: NewTeam[]
    gameIdentifier: string
    pointsToWin: number
    roundLength: number
}