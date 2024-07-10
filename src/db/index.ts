import Category from './models/category.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    // console.log(process.env.NODE_ENV);
    Category.sync({ alter: developing });
};

export default dbInit;
