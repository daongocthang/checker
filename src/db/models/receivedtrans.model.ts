import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type ReceivedTransAttrs = {
    ticket: string;
    model: string;
    serial: string;
    description: string;
    expired: boolean;
    receiverId?: For;
    status?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type ReceivedTransCreationAttrs = Optional<ReceivedTransAttrs, 'ticket'>;

class ReceivedTrans extends Model<ReceivedTransAttrs, ReceivedTransCreationAttrs> implements ReceivedTransAttrs {
    status?: string | undefined;
    declare ticket: string;
    declare model: string;
    declare serial: string;
    declare description: string;
    declare expired: boolean;
    declare receiverId: number;

    // timestamp
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

ReceivedTrans.init(
    {
        ticket: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serial: DataTypes.STRING,
        description: DataTypes.TEXT,
        expired: DataTypes.BOOLEAN,
        receiverId: DataTypes.INTEGER,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'received_trans',
    },
);

export default ReceivedTrans;
