import path from 'path';
import { MapObject } from 'read-excel-file/types';

export const UPLOADS_DIR = path.join(__dirname, 'uploads');

export const PATTERNS = ['Chờ CM lên cấp trên', 'Đã CM cấp trên chưa tiếp nhận', 'Đang sửa'];

export const TransMapObject: MapObject = {
    'Phiếu tiếp nhận': 'id',
    IMEI: 'serial',
    'Mã thiết bị': 'model',
    'Mô tả lỗi của NV tiếp nhận': 'description',
    'Trạng thái phiếu tiếp nhận': 'status',
};

export const ProductMapObject: MapObject = {
    'Mã thiết bị': 'model',
    SN: 'serial',
};

export const CategoryMapObject: MapObject = {
    'Mã thiết bị': 'id',
    'BH theo serial': 'withSerial',
    'Độ dài serial': 'size',
};

export const SuggestionMapObject: MapObject = {
    'Mã thiết bị': 'id',
    'Đề xuất': 'action',
};
