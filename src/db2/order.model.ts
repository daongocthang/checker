import { DataTypes, Model, Optional } from 'sequelize';
import sequelize2 from './config';

export type OrderAttrs = {
    receiptNo: string;
    model: string;
    serial: string;
    description: string;

    newSerial?: string;
    remark?: string;
    warning?: string;
    method?: string;
    status?: string;

    createdAt?: Date;
};

export type OrderCreation = Optional<OrderAttrs, 'receiptNo'>;
export type OrderResult = Required<OrderAttrs>;

class OrderModel extends Model<OrderAttrs, OrderCreation> implements OrderAttrs {
    declare receiptNo: string;
    declare model: string;
    declare serial: string;
    declare description: string;
    declare newSerial: string;
    declare remark: string;
    declare warning: string;
    declare method: string;
    declare status: string;

    declare readonly createdAt: Date;
}

OrderModel.init(
    {
        receiptNo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serial: DataTypes.STRING,
        description: DataTypes.TEXT,
        newSerial: DataTypes.STRING,
        remark: DataTypes.TEXT,
        warning: DataTypes.STRING,
        method: DataTypes.STRING,
        status: { type: DataTypes.STRING, defaultValue: 'đang sửa' },
    },
    {
        sequelize: sequelize2,
        tableName: 'orders',
        timestamps: true,
        updatedAt: false,
    },
);

export default OrderModel;
