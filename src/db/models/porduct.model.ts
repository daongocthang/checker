import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type ProductAttrs = {
    id: number;
    model: string;
    serial: string;
};

export type ProductCreation = Optional<ProductAttrs, 'id'>;
export type ProductResult = Required<ProductAttrs>;

class ProductModel extends Model<ProductAttrs, ProductCreation> implements ProductAttrs {
    declare id: number;
    declare model: string;
    declare serial: string;
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        timestamps: false,
        tableName: 'products',
    },
);

export default ProductModel;
