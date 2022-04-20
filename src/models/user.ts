import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute, } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize from '../db/db'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare firstName: string
    declare lastName: string
    declare nickName: string
    declare email: string
    declare password: string
    validPassword(password: string, hashedPassword: string): NonAttribute<boolean> {
        return bcrypt.compareSync(password, hashedPassword)
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}
,{
    tableName: 'Users',
    sequelize,
    hooks: {
        beforeCreate: async (user: User) => {
            const salt = await bcrypt.genSaltSync(10, 'a')
            user.password = bcrypt.hashSync(user.password, salt)
        }
    },
})

export default User