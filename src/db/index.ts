import Category from './models/category.model';
import ReceivedTrans from './models/receivedtrans.model';
import User from './models/user.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    Category.sync({ alter: developing });
    User.sync({ alter: developing });
    ReceivedTrans.sync({ alter: developing });
};

export default dbInit;
