import path from 'path';
import { MapObject } from 'read-excel-file/types';

export const UPLOADS_DIR = path.resolve('./src/public/uploads');

export const PATTERNS = ['Chờ CM lên cấp trên', 'Đã CM cấp trên chưa tiếp nhận', 'Đang sửa'];

export const TransactionMapObject: MapObject = {
    'Phiếu tiếp nhận': 'ticket',
    IMEI: 'serial',
    'Mã thiết bị': 'model',
    'Mô tả lỗi của NV tiếp nhận': 'description',
    'Trạng thái tiếp nhận': 'status',
};

export const CategoryMapObject: MapObject = {
    model: 'model',
    type: 'serialType',
};

export const SerialMapObject: MapObject = {
    model: 'model',
    serial: 'serial',
    type: 'serialType',
};
