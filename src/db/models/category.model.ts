import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type CategoryAttrs = {
    id: string;
    withSerial: boolean;
    size: number;
};

export type CategoryCreation = Optional<CategoryAttrs, 'id'>;
export type CategoryResult = Required<CategoryAttrs>;

class CategoryModel extends Model<CategoryAttrs, CategoryCreation> implements CategoryAttrs {
    declare id: string;
    declare withSerial: boolean;
    declare size: number;
}

CategoryModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        withSerial: DataTypes.BOOLEAN,
        size: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'categories',
        timestamps: false,
    },
);

export default CategoryModel;
