import * as dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config();

const { DB2_NAME, DB2_USER, DB2_PASSWORD, DB2_HOST, DB_DRIVER } = process.env;

const dbName = DB2_NAME as string;
const dbUser = DB2_USER as string;
const dbHost = DB2_HOST;
const dbDriver = DB_DRIVER as Dialect;
const dbPassword = DB2_PASSWORD;

const sequelize2 = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    },
});

export default sequelize2;
