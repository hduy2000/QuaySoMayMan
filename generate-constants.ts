import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON data
const nhanvienData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'public', 'list', 'nhanvien.json'), 'utf-8')
);

// Filter out empty entries and convert to TypeScript format
const participants = nhanvienData
  .filter((item: any) => item['Mã NV'] && item['Mã NV'].trim() !== '')
  .map((item: any) => {
    const entry: any = {
      id: item['Mã NV'],
      code: item['Mã NV'],
      name: item['Họ và tên'],
      department: item['Khoa Phòng'],
      yearsWorked: item['Thâm niên làm tròn'],
    };
    
    // Only include onDuty if true
    if (item['Đang Trực'] === true) {
      entry.onDuty = true;
    }
    
    return entry;
  });

// Generate TypeScript code
const tsCode = `import { Participant, Prize } from "./types";

// Real data from hospital list - Updated from nhanvien.json (February 2026)
export const DEFAULT_PARTICIPANTS: Participant[] = ${JSON.stringify(participants, null, 2).replace(/"([^"]+)":/g, '$1:')};

export const DEFAULT_PRIZES: Prize[] = [
  {
    id: "p_mayman",
    name: "GIẢI GẮN KẾT YÊU THƯƠNG",
    products: [
      "Máy vắt cam Elmich 700ml",
      "Nồi cơm điện Panasonic 1 lít",
      "Máy sấy tóc tạo ion Panasonic",
      "Bàn là hơi nước cầm tay Panasonic",
      "Nồi áp suất điện đa năng Sunhouse 6 lít",
      "Bếp từ đơn Sunhouse",
      "Nồi lẩu điện đa năng Magic",
      "Ấm siêu tốc Smartcook 1.5 lít",
      "Nồi chiên không dầu Sunhouse 6.5 lít",
      "Bộ nồi 5 đáy Inox 304 Elmich Berlin",
      "Máy xay sinh tố Sunhouse",
      "Quạt sưởi gốm Fujihome",
      "Lò nướng Kangaroo 32 lít",
      "Bàn là hơi nước Panasonic",
      "Chảo chống dính siêu bền Elmich",
      "Đồng hồ treo tường",
    ],
    quantity: 16,
    minYears: 0,
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "p_nhi",
    name: "GIẢI ĐỒNG HÀNH BỀN VỮNG",
    product: "Máy lọc không khí Elmich",
    value: "3.000.000đ",
    quantity: 1,
    minYears: 1,
    color: "from-green-600 to-green-800",
    imageUrl: "images/2.png",
  },
  {
    id: "p_nhat",
    name: "GIẢI CỐNG HIẾN TỎA SÁNG",
    product: "Máy hút bụi Panasonic",
    value: "5.000.000đ",
    quantity: 1,
    minYears: 3,
    color: "from-yellow-400 to-yellow-600",
    imageUrl: "images/1.png",
  },
  {
    id: "p_dacbiet",
    name: "GIẢI SỨ MỆNH VÀNG",
    product: "Smart Tivi Samsung 4K 50 inch",
    value: "11.000.000đ",
    quantity: 1,
    minYears: 4,
    color: "from-red-600 to-red-800",
    imageUrl: "images/0.png",
  },
];

export const STORAGE_KEY = "bacha_yep_lucky_draw_2025";

export const DEFAULT_EVENT_TITLE =
  "BỆNH VIỆN ĐA KHOA QUỐC TẾ BẮC HÀ - YEP 2025";
`;

// Write to constants.ts
fs.writeFileSync(path.join(__dirname, 'constants.ts'), tsCode, 'utf-8');

console.log(`✅ Generated constants.ts with ${participants.length} participants`);
