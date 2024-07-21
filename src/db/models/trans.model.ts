import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import UserModel from './user.model';

export type TransAttrs = {
    id: string;
    model: string;
    serial: string;
    description: string;
    expired: boolean;
    userId: ForeignKey<UserModel['id']>;
    status?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type TransCreation = Optional<TransAttrs, 'id'>;
export type TransResult = Required<TransAttrs>;

class TransModel extends Model<TransAttrs, TransCreation> implements TransAttrs {
    declare id: string;
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

TransModel.init(
    {
        id: {
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
        expired: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'transactions',
    },
);

TransModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(TransModel, { foreignKey: 'userId' });

export default TransModel;
