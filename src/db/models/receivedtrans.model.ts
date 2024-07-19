import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import UserModel from './user.model';

export type ReceivedTransAttrs = {
    ticket: string;
    model: string;
    serial: string;
    description: string;
    expired: boolean;
    userId: ForeignKey<UserModel['id']>;
    status?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type ReceivedTransCreation = Optional<ReceivedTransAttrs, 'ticket'>;
export type ReceivedTransResult = Required<ReceivedTransAttrs>;

class ReceivedTrans extends Model<ReceivedTransAttrs, ReceivedTransCreation> implements ReceivedTransAttrs {
    declare ticket: string;
    declare model: string;
    declare serial: string;
    declare description: string;
    declare expired: boolean;
    declare userId: ForeignKey<UserModel['id']>;
    declare status: string;

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
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'transactions',
    },
);

ReceivedTrans.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(ReceivedTrans, { foreignKey: 'userId' });

export default ReceivedTrans;
