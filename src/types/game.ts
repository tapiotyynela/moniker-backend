import { NewTeam } from "./team"

export type NewGame = {
    teams: NewTeam[]
    pointsToWin: number
    roundLength: number
}