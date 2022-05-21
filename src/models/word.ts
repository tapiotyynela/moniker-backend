import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, } from 'sequelize'
import sequelize from '../db/db'
class Word extends Model<InferAttributes<Word>, InferCreationAttributes<Word>> {
    declare wordId: CreationOptional<number>
    declare word: string
    declare category?: string
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
    category: {
        type: DataTypes.STRING,
        allowNull: true,
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