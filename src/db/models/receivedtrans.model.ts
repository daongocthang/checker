import { DataTypes, ForeignKey, Model, NonAttribute, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import User from './user.model';

export type ReceivedTransAttrs = {
    ticket: string;
    model: string;
    serial: string;
    description: string;
    expired: boolean;
    userId: ForeignKey<User['id']>;

    user?: NonAttribute<User>;
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
    declare userId: ForeignKey<User['id']>;

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
        tableName: 'received_trans',
    },
);

ReceivedTrans.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default ReceivedTrans;
