import OrderModel from './order.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit2 = () => {
    OrderModel.sync({ alter: developing });
};

export default dbInit2;
