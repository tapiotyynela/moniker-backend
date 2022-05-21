import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, } from 'sequelize'
import sequelize from '../db/db'
import Team from './team'
class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare gameId: CreationOptional<number>
    declare winner?: string
    declare roundLength: number
    declare pointsToWin: number
    declare teams?: Team[]
}

Game.init({
    gameId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    winner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roundLength: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pointsToWin: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}
,{
    sequelize,
})

Game.hasMany(Team, {
    foreignKey: 'game'
})
Team.belongsTo(Game, {
    foreignKey: 'game'
})

export default Game