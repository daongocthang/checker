import CategoryModel from './models/category.model';
import ProductModel from './models/porduct.model';
import UserModel from './models/user.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    UserModel.sync({ alter: developing });
    CategoryModel.sync({ alter: developing });
    ProductModel.sync({ alter: developing });
    // ReceivedTrans.sync({ alter: developing });
};

export default dbInit;
