import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import ReceivedTrans from './receivedtrans.model';

export type UserAttrs = {
    id: number;
    name: string;
};

export type UserCreationAttrs = Optional<UserAttrs, 'id'>;

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
    declare id: number;
    declare name: string;
}

User.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'users',
        timestamps: false,
    },
);

User.hasMany(ReceivedTrans, {
    sourceKey: 'id',
});

export default User;
