import { WarrantyCategory } from './models/warranty.model';

const developing = process.env.NODE_ENV === 'development';

const dbInit = () => {
    WarrantyCategory.sync({ alter: developing });
};

export default dbInit;
