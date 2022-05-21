import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, } from 'sequelize'
import sequelize from '../db/db'
class UserTeam extends Model<InferAttributes<UserTeam>, InferCreationAttributes<UserTeam>> {
    declare userId: number
    declare teamId: number
}

UserTeam.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    teamId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}
,{
    tableName: 'UserTeams',
    sequelize,
})

export default UserTeam