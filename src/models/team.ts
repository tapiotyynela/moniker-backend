import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, } from 'sequelize'
import sequelize from '../db/db'
import User from './user'

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare teamId: CreationOptional<number>
    declare name: string
    declare score?: number
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
    game: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
,{
    sequelize,
})

Team.belongsToMany(User, {
    through: 'UserTeams'
})
User.belongsToMany(Team, {
    through: 'UserTeams'
})

export default Team