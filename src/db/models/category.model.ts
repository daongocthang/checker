import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

enum SerialType {
    SOLID = 'solid',
    HEAD = 'head',
    ALL = 'all',
}

export type CategoryAttrs = {
    id: number;
    model: string;
    serialType: SerialType;
};

export type CategoryCreationAttrs = Optional<CategoryAttrs, 'id'>;

class Category extends Model<CategoryAttrs, CategoryCreationAttrs> implements CategoryAttrs {
    declare id: number;
    declare model: string;
    declare serialType: SerialType;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        serialType: {
            type: DataTypes.ENUM,
            values: Object.values(SerialType),
            defaultValue: SerialType.ALL,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'warr_categories',
        timestamps: false,
    },
);

export default Category;
