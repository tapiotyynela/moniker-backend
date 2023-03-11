import Game from "../models/game";
import Team from "../models/team";
import User from "../models/user";
import { NewGame } from "../types/game";

export const getGameWithTeams = async (gameId: number) => {
    return Game.findOne({
        where: {
            gameId,
        },
        include: [{model: Team, include: [User]}]
    })
}

export const createNewGame = async (newGame: NewGame): Promise<Game> => {
    const game = Game.create({
        pointsToWin: newGame.pointsToWin,
        gameIdentifier: newGame.gameIdentifier,
        roundLength: newGame.roundLength,
        active: true
    })
    return game
}

// This can be used to get game history
export const getUsersGames = async (userId: number) => {
    const teams = await Team.findAll({
        include: [{ model: User, where: { userId }}]
    })
    const games = await Promise.all(teams.map(async team => {
        return Game.findOne({ include: [Team], where: { gameId: team.game, active: true }})
    }))
    const filteredGames = games.filter(game => game)
    return filteredGames
}

export const getGameByIdentifier = async (gameIdentifier: string): Promise<Game | null> => {
    const game = await Game.findOne({ where: { gameIdentifier: gameIdentifier}})
    return game
}