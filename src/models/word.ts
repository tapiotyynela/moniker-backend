import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, } from 'sequelize'
import sequelize from '../db/db'
import User from './user'

class Word extends Model<InferAttributes<Word>, InferCreationAttributes<Word>> {
    declare wordId: CreationOptional<number>
    declare word: string
    declare timesExplained: number
}

Word.init({
    wordId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timesExplained: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}
,{
    sequelize,
})

export default Word