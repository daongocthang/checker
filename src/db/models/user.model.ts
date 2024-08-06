import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export type UserAttrs = {
    id: number;
    name: string;
    isAdmin: boolean;
};

export type UserCreation = Optional<UserAttrs, 'id'>;
export type UserResult = Required<UserAttrs>;

class UserModel extends Model<UserAttrs, UserCreation> implements UserAttrs {
    declare id: number;
    declare name: string;
    declare isAdmin: boolean;
}

UserModel.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'users',
        timestamps: false,
    },
);

export default UserModel;
