import { MapObject } from 'read-excel-file/types';

const TransactionMapObject: MapObject = {
    'Phiếu tiếp nhận': 'ticket',
    IMEI: 'serial',
    'Mã thiết bị': 'model',
    'Mô tả lỗi của NV tiếp nhận': 'description',
    'Trạng thái tiếp nhận': 'status',
};

export const patterns = ['Chờ CM lên cấp trên', 'Đã CM cấp trên chưa tiếp nhận', 'Đang sửa'];

export default TransactionMapObject;
