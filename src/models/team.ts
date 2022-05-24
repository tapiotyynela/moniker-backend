import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, } from 'sequelize'
import sequelize from '../db/db'
import User from './user'

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare teamId: CreationOptional<number>
    declare name: string
    declare score?: number
    declare activeTurn: boolean
    declare game: number
}

Team.init({
    teamId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    activeTurn: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    game: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
,{
    sequelize,
})

Team.belongsToMany(User, {
    through: 'UserTeams',
    foreignKey: "teamId",
    otherKey: "userId",
})
User.belongsToMany(Team, {
    through: 'UserTeams',
    foreignKey: "userId",
    otherKey: "teamId",
})

export default Team