import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type CategoryAttrs = {
    model: string;
    withSerial: boolean;
};

export type CategoryCreation = Optional<CategoryAttrs, 'model'>;
export type CategoryResult = Required<CategoryAttrs>;

class Category extends Model<CategoryAttrs, CategoryCreation> implements CategoryAttrs {
    declare model: string;
    declare withSerial: boolean;
}

Category.init(
    {
        model: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        withSerial: DataTypes.BOOLEAN,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'categories',
        timestamps: false,
    },
);

export default Category;
