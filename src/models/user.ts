import {
    Association, DataTypes, HasManyGetAssociationsMixin, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute,
  } from 'sequelize';import bcrypt from 'bcrypt'
import sequelize from '../db/db'
import Word from './word'
import Game from './game';
class User extends Model<InferAttributes<User, { omit: 'Games'}>, InferCreationAttributes<User, {omit: 'Games'}>> {
    declare userId: CreationOptional<number>
    declare firstName: string
    declare lastName: string
    declare nickName: string
    declare gamesPlayed?: number
    declare wordsExplained?: number
    declare wordsSkipped?: number
    declare averagePerTurn?: number
    declare email: string
    declare password: string
    declare Games?: NonAttribute<Game[]>; // Note this is optional since it's only populated when explicitly requested in code
    declare getGames: HasManyGetAssociationsMixin<Game>; // Note the null assertions!
    validPassword(password: string, hashedPassword: string): NonAttribute<boolean> {
        return bcrypt.compareSync(password, hashedPassword)
    }

    declare static associations: {
        Games: Association<User, Game>;
      };
}

User.init({
    userId: {
        type: DataTypes.INTEGER,
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
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gamesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    wordsExplained: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    wordsSkipped: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    averagePerTurn: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

User.hasMany(Word)
Word.belongsTo(User)

export default User