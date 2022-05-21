import Game from "../models/game";
import Team from "../models/team";
import { NewGame } from "../types/game";
import { createTeamsForNewGame } from "./team";

export const createGame = async (pointsToWin: number, roundLength: number) => {
    return Game.create({
        pointsToWin,
        roundLength,
    })
}

export const createNewGame = async (newGame: NewGame) => {
    const game = await createGame(newGame.pointsToWin, newGame.roundLength)
    const teams = await createTeamsForNewGame(game, newGame.teams)
    return game
}