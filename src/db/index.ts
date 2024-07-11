import Category from './models/category.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    Category.sync({ alter: developing });
};

export default dbInit;
