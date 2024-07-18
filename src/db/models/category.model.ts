import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type CategoryAttrs = {
    id: number;
    model: string;
    withSerial: boolean;
};

export type CategoryCreation = Optional<CategoryAttrs, 'id'>;
export type CategoryResult = Required<CategoryAttrs>;

class Category extends Model<CategoryAttrs, CategoryCreation> implements CategoryAttrs {
    declare id: number;
    declare model: string;
    declare withSerial: boolean;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
