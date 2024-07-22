import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type SuggestionAttrs = {
    id: string;
    action: string;

    createdAt?: Date;
};

export type SuggestionCreation = Optional<SuggestionAttrs, 'id'>;
export type SuggestionResult = Required<SuggestionAttrs>;

class SuggestionModel extends Model<SuggestionAttrs, SuggestionCreation> implements SuggestionAttrs {
    declare id: string;
    declare action: string;

    declare createdAt: Date;
}

SuggestionModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'suggestions',
        timestamps: true,
        updatedAt: false,
    },
);

export default SuggestionModel;
