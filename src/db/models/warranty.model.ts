import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

enum SerialType {
    SOLID = 'solid',
    HEAD = 'head',
    NONE = 'none',
}

export type WarrantyCategoryAttrs = {
    id: number;
    model: string;
    serialType: SerialType;
};

export type WarrantyCreationAttrs = Optional<WarrantyCategoryAttrs, 'id'>;

class WarrantyCategory extends Model<WarrantyCategoryAttrs, WarrantyCreationAttrs> implements WarrantyCategoryAttrs {
    declare id: number;
    declare model: string;
    declare serialType: SerialType;
}

WarrantyCategory.init(
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
        serialType: {
            type: DataTypes.ENUM,
            values: Object.values(SerialType),
            defaultValue: SerialType.NONE,
        },
    },
    {
        sequelize: sequelizeConnection,
    },
);

export { WarrantyCategory };
