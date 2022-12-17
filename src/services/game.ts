import Game from "../models/game";
import Team from "../models/team";
import User from "../models/user";
import { NewGame } from "../types/game";
import { createTeamsForNewGame } from "./team";

export const createGame = async (pointsToWin: number, roundLength: number) => {
    return Game.create({
        pointsToWin,
        roundLength,
        active: false
    })
}

export const getGameWithTeams = async (gameId: number) => {
    return Game.findOne({
        where: {
            gameId,
        },
        include: [{model: Team, include: [User]}]
    })
}

export const createNewGame = async (newGame: NewGame) => {
    const game = await createGame(newGame.pointsToWin, newGame.roundLength)
    await createTeamsForNewGame(game, newGame.teams)
    return getGameWithTeams(game.gameId)
}