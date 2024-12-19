import OrderModel from './order.model';

const dbInit2 = () => {
    OrderModel.sync();
};

export default dbInit2;
