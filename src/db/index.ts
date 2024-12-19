import CategoryModel from './models/category.model';
import ProductModel from './models/porduct.model';
import SuggestionModel from './models/suggestion.model';
import TransModel from './models/trans.model';
import UserModel from './models/user.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    UserModel.sync({ alter: developing });
    CategoryModel.sync({ alter: developing });
    ProductModel.sync({ alter: developing });
    TransModel.sync({ alter: developing });
    SuggestionModel.sync({ alter: developing });
};

export default dbInit;
