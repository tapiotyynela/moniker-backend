import Game from "../models/game";
import Team from "../models/team";
import UserTeam from "../models/userTeams";
import { NewTeam } from "../types/team";

export const assignPlayersToTeam = async (teamId: number, players: number[]) => {
    await Promise.all(players.map(async player => {
        await UserTeam.create({userId: player, teamId: teamId})
    }))
}

export const createTeam = async (newTeam: NewTeam, game: Game): Promise<Team> => {
    const team = await Team.create({
        name: newTeam.name,
        game: game.gameId,
        activeTurn: false
    })
    await assignPlayersToTeam(team.teamId, newTeam.players)
    return team
}

export const createTeamsForNewGame = async (game: Game, teams: NewTeam[]) => {
    const gameTeams = await Promise.all(teams.map(async team => {
        return createTeam(team, game)
    }))
    return gameTeams
}