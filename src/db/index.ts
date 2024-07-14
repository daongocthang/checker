import Category from './models/category.model';
import Product from './models/porduct.model';
import ReceivedTrans from './models/receivedtrans.model';
import User from './models/user.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    User.sync({ alter: developing });
    Category.sync({ alter: developing });
    ReceivedTrans.sync({ alter: developing });
    Product.sync({ alter: developing });
};

export default dbInit;
