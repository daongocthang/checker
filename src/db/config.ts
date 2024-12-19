import { Dialect, Op, Sequelize } from 'sequelize';

const operatorsAliases = {
    $like: Op.like,
    $or: Op.or,
    $not: Op.not,
    $eq: Op.eq,
    $gte: Op.gte,
};

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    pool: {
        min: 0,
        max: 5,
        acquire: 600000,
        idle: 10000,
    },
    operatorsAliases,
    timezone: '+07:00',
});

export default sequelizeConnection;
