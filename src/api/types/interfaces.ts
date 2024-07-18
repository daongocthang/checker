export interface Category {
    model: string;
    withSerial: boolean;
}

export interface ReceivedTrans {
    ticket: string;
    model: string;
    serial: string;
    description: string;
    expired: boolean;
    userId: number;

    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: number;
    model: string;
    serial: string;
}
