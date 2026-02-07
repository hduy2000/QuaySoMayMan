import { Participant, Prize } from "./types";

// Real data from hospital list - Updated from nhanvien.json (February 2026)
export const DEFAULT_PARTICIPANTS: Participant[] = [
  {
    id: "21042",
    code: "21042",
    name: "Nguyễn Thắng Lợi",
    department: "Ban GĐ",
    yearsWorked: 4
  },
  {
    id: "20556",
    code: "20556",
    name: "Lưu Quốc Khải",
    department: "Ban GĐ",
    yearsWorked: 5
  },
  {
    id: "25068",
    code: "25068",
    name: "Trịnh Văn Báu",
    department: "BP Kỹ thuật & VTYT",
    yearsWorked: 0
  },
  {
    id: "18099",
    code: "18099",
    name: "Nguyễn Tiến Bộ",
    department: "BP Kỹ thuật & VTYT",
    yearsWorked: 7,
    onDuty: true
  },
  {
    id: "18100",
    code: "18100",
    name: "Vương Xuân Hải",
    department: "BP Kỹ thuật & VTYT",
    yearsWorked: 7
  },
  {
    id: "20345",
    code: "20345",
    name: "Võ Trường Sơn",
    department: "BP Kỹ thuật & VTYT",
    yearsWorked: 5
  },
  {
    id: "19249",
    code: "19249",
    name: "Phạm Ngọc Anh",
    department: "BP Kỹ thuật & VTYT",
    yearsWorked: 0
  },
  {
    id: "19227",
    code: "19227",
    name: "Bùi Thị Thanh Quý",
    department: "BP. CSKH",
    yearsWorked: 6
  },
  {
    id: "21140",
    code: "21140",
    name: "Nguyễn Thị Phương",
    department: "BP. CSKH",
    yearsWorked: 4
  },
  {
    id: "25020",
    code: "25020",
    name: "Phạm Thị Thu Hương",
    department: "BP. CSKH",
    yearsWorked: 0
  },
  {
    id: "25028",
    code: "25028",
    name: "Tạ Minh Thuận",
    department: "BP. CSKH",
    yearsWorked: 0
  },
  {
    id: "25107",
    code: "25107",
    name: "Nguyễn Thị Tuyến",
    department: "BP. CSKH",
    yearsWorked: 0
  },
  {
    id: "16024",
    code: "16024",
    name: "Nguyễn Thị Hoài Sâm",
    department: "K. Khám bệnh",
    yearsWorked: 9
  },
  {
    id: "22005",
    code: "22005",
    name: "Nguyễn Thị Phương Thảo",
    department: "K. Khám bệnh",
    yearsWorked: 4
  },
  {
    id: "22324",
    code: "22324",
    name: "Nguyễn Thị Kim Dung",
    department: "K. Khám bệnh",
    yearsWorked: 3
  },
  {
    id: "25005",
    code: "25005",
    name: "Nguyễn Đức Huyên",
    department: "K. Khám bệnh",
    yearsWorked: 1
  },
  {
    id: "17069",
    code: "17069",
    name: "Hoàng Thị Lành",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "17035",
    code: "17035",
    name: "Nguyễn Thị Thu Thủy",
    department: "K. Khám bệnh",
    yearsWorked: 8,
    onDuty: true
  },
  {
    id: "23106",
    code: "23106",
    name: "Lê Thúy An",
    department: "K. Khám bệnh",
    yearsWorked: 2
  },
  {
    id: "17026",
    code: "17026",
    name: "Bùi Thị Hải Yến",
    department: "K. Khám bệnh",
    yearsWorked: 8
  },
  {
    id: "20527",
    code: "20527",
    name: "Nguyễn Văn Thành",
    department: "K. Khám bệnh",
    yearsWorked: 5,
    onDuty: true
  },
  {
    id: "20737",
    code: "20737",
    name: "Phan Thị Thủy",
    department: "K. Khám bệnh",
    yearsWorked: 5
  },
  {
    id: "23127",
    code: "23127",
    name: "Hoàng Thị Vân",
    department: "K. Khám bệnh",
    yearsWorked: 2
  },
  {
    id: "23164",
    code: "23164",
    name: "Triệu Thị Hồng Thắm",
    department: "K. Khám bệnh",
    yearsWorked: 2
  },
  {
    id: "23218",
    code: "23218",
    name: "Vũ Ngọc Hiền",
    department: "K. Khám bệnh",
    yearsWorked: 2
  },
  {
    id: "24044",
    code: "24044",
    name: "Đinh Ngọc Khánh",
    department: "K. Khám bệnh",
    yearsWorked: 1
  },
  {
    id: "25039",
    code: "25039",
    name: "Trần Thu Phương",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "25050",
    code: "25050",
    name: "Bùi Hồng Duyên",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "25082",
    code: "25082",
    name: "Nguyễn Vũ Phương Anh",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "25081",
    code: "25081",
    name: "Lục Thị Hà Vi",
    department: "K. Khám bệnh",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "25092",
    code: "25092",
    name: "Triệu Vi Hoa",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "25161",
    code: "25161",
    name: "Nguyễn Quỳnh Trang",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "19463",
    code: "19463",
    name: "Ngô Hồng Nhung",
    department: "K. Khám bệnh",
    yearsWorked: 6
  },
  {
    id: "25173",
    code: "25173",
    name: "Tạ Ly Ly",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "25171",
    code: "25171",
    name: "Ngô Ngọc Tú",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "25216",
    code: "25216",
    name: "Nguyễn Bích Ngọc",
    department: "K. Khám bệnh",
    yearsWorked: 0
  },
  {
    id: "22031",
    code: "22031",
    name: "Vũ Văn Biên",
    department: "K. Nội",
    yearsWorked: 3
  },
  {
    id: "22177",
    code: "22177",
    name: "Bùi Thị Kim Thanh",
    department: "K. Nội",
    yearsWorked: 3
  },
  {
    id: "16067",
    code: "16067",
    name: "Trần Thị Huyền",
    department: "K. Nội",
    yearsWorked: 9
  },
  {
    id: "20789",
    code: "20789",
    name: "Nguyễn Thị Hằng",
    department: "K. Nội",
    yearsWorked: 5
  },
  {
    id: "17039",
    code: "17039",
    name: "Nguyễn Thị Minh Tuyết",
    department: "K. Nội",
    yearsWorked: 8,
    onDuty: true
  },
  {
    id: "21064",
    code: "21064",
    name: "Nguyễn Thị Nhuận",
    department: "K. Nội",
    yearsWorked: 4
  },
  {
    id: "22287",
    code: "22287",
    name: "Trần Thị Thu Hiền",
    department: "K. Nội",
    yearsWorked: 3
  },
  {
    id: "23152",
    code: "23152",
    name: "Dương Hồng Nhung",
    department: "K. Nội",
    yearsWorked: 2
  },
  {
    id: "22222",
    code: "22222",
    name: "Lê Thị Ánh Tuyết",
    department: "K. Nội",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "24216",
    code: "24216",
    name: "Bùi Minh Ngọc",
    department: "K. Nội",
    yearsWorked: 1
  },
  {
    id: "24211",
    code: "24211",
    name: "Hoàng Thị Thanh Hiền",
    department: "K. Nội",
    yearsWorked: 1
  },
  {
    id: "23208",
    code: "23208",
    name: "Hoàng Ngọc Minh",
    department: "K. Ngoại",
    yearsWorked: 2
  },
  {
    id: "21192",
    code: "21192",
    name: "Nguyễn Đức Âu",
    department: "K. Ngoại",
    yearsWorked: 4
  },
  {
    id: "16073",
    code: "16073",
    name: "Nguyễn Thị Thu Hà",
    department: "K. Ngoại",
    yearsWorked: 9
  },
  {
    id: "20745",
    code: "20745",
    name: "Tống Thị Hiền",
    department: "K. Ngoại",
    yearsWorked: 5
  },
  {
    id: "21216",
    code: "21216",
    name: "Nguyễn Thị Thanh Thủy",
    department: "K. Ngoại",
    yearsWorked: 4
  },
  {
    id: "21183",
    code: "21183",
    name: "Nguyễn Văn Tuyến",
    department: "K. Ngoại",
    yearsWorked: 4
  },
  {
    id: "22299",
    code: "22299",
    name: "Nguyễn Thị Thu",
    department: "K. Ngoại",
    yearsWorked: 3
  },
  {
    id: "23111",
    code: "23111",
    name: "Dương Thùy Nhung",
    department: "K. Ngoại",
    yearsWorked: 2
  },
  {
    id: "23083",
    code: "23083",
    name: "Nguyễn Thị Kiều Anh",
    department: "K. Ngoại",
    yearsWorked: 2,
    onDuty: true
  },
  {
    id: "22208",
    code: "22208",
    name: "Lại Hoàng Anh Thương",
    department: "K. Ngoại",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "24088",
    code: "24088",
    name: "Nguyễn Minh Hiếu",
    department: "K. Ngoại",
    yearsWorked: 1
  },
  {
    id: "24122",
    code: "24122",
    name: "Vũ Thanh Ngọc",
    department: "K. Ngoại",
    yearsWorked: 1
  },
  {
    id: "24131",
    code: "24131",
    name: "Phan Hải Yến",
    department: "K. Ngoại",
    yearsWorked: 1,
    onDuty: true
  },
  {
    id: "24136",
    code: "24136",
    name: "Nguyễn Việt Anh",
    department: "K. Ngoại",
    yearsWorked: 1
  },
  {
    id: "24133",
    code: "24133",
    name: "Trần Diệu Linh",
    department: "K. Ngoại",
    yearsWorked: 1
  },
  {
    id: "24171",
    code: "24171",
    name: "Hoàng Minh Đức",
    department: "K. Ngoại",
    yearsWorked: 1
  },
  {
    id: "24215",
    code: "24215",
    name: "Bùi Hà Diệp",
    department: "K. Ngoại",
    yearsWorked: 1
  },
  {
    id: "25059",
    code: "25059",
    name: "Phạm Thị Vân",
    department: "K. Ngoại",
    yearsWorked: 0
  },
  {
    id: "25064",
    code: "25064",
    name: "Dương Văn Giang",
    department: "K. Ngoại",
    yearsWorked: 0
  },
  {
    id: "25147",
    code: "25147",
    name: "Nguyễn Minh Đức",
    department: "K. Ngoại",
    yearsWorked: 0
  },
  {
    id: "24050",
    code: "24050",
    name: "Nguyễn Mạnh Hồng",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "20609",
    code: "20609",
    name: "Nguyễn Minh Hà",
    department: "BP. GMHS",
    yearsWorked: 5
  },
  {
    id: "16267",
    code: "16267",
    name: "Nguyễn Đức Thế",
    department: "BP. GMHS",
    yearsWorked: 1,
    onDuty: true
  },
  {
    id: "17010",
    code: "17010",
    name: "Lê Túy Hoa",
    department: "BP. GMHS",
    yearsWorked: 8
  },
  {
    id: "19145",
    code: "19145",
    name: "Đỗ Thu Huệ",
    department: "BP. GMHS",
    yearsWorked: 6
  },
  {
    id: "23236",
    code: "23236",
    name: "Trần Thị Khánh Huyền",
    department: "BP. GMHS",
    yearsWorked: 2
  },
  {
    id: "16075",
    code: "16075",
    name: "Phạm Văn Hoàng",
    department: "BP. GMHS",
    yearsWorked: 9
  },
  {
    id: "21148",
    code: "21148",
    name: "Bùi Thị Nga",
    department: "BP. GMHS",
    yearsWorked: 4
  },
  {
    id: "19282",
    code: "19282",
    name: "Phạm Thị Anh",
    department: "BP. GMHS",
    yearsWorked: 6
  },
  {
    id: "20692",
    code: "20692",
    name: "Dương Thị Loan",
    department: "BP. GMHS",
    yearsWorked: 5
  },
  {
    id: "24236",
    code: "24236",
    name: "Vi Thị Phương Đan",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "21067",
    code: "21067",
    name: "Bùi Thị Hằng",
    department: "BP. GMHS",
    yearsWorked: 4,
    onDuty: true
  },
  {
    id: "23116",
    code: "23116",
    name: "Nguyễn Thị Yến Chi",
    department: "BP. GMHS",
    yearsWorked: 2,
    onDuty: true
  },
  {
    id: "21258",
    code: "21258",
    name: "Trần Thị Thúy",
    department: "BP. GMHS",
    yearsWorked: 4
  },
  {
    id: "22162",
    code: "22162",
    name: "Phùng Thu Trang",
    department: "BP. GMHS",
    yearsWorked: 3
  },
  {
    id: "22224",
    code: "22224",
    name: "Phạm Thị Thảo",
    department: "BP. GMHS",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "23159",
    code: "23159",
    name: "Trần Thị Khánh Ly",
    department: "BP. GMHS",
    yearsWorked: 2
  },
  {
    id: "24026",
    code: "24026",
    name: "Nguyễn Lan Chi",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "24014",
    code: "24014",
    name: "Nguyễn Thị Thu Hồng",
    department: "BP. GMHS",
    yearsWorked: 1,
    onDuty: true
  },
  {
    id: "24066",
    code: "24066",
    name: "Hoàng Thu Uyên",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "24069",
    code: "24069",
    name: "Lê Diệu Linh",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "24129",
    code: "24129",
    name: "Công Quốc Hiếu",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "24158",
    code: "24158",
    name: "Nguyễn Văn Hào",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "22315",
    code: "22315",
    name: "Nguyễn Hải Hà",
    department: "BP. GMHS",
    yearsWorked: 0
  },
  {
    id: "17063",
    code: "17063",
    name: "Nguyễn Thị Kiều Giao",
    department: "BP. GMHS",
    yearsWorked: 8,
    onDuty: true
  },
  {
    id: "24176",
    code: "24176",
    name: "Nguyễn Thị Quyên",
    department: "BP. GMHS",
    yearsWorked: 1
  },
  {
    id: "25093",
    code: "25093",
    name: "Hà Thị Ánh Hồng",
    department: "BP. GMHS",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "21029",
    code: "21029",
    name: "Trần Thị Hoa",
    department: "K. Nhi",
    yearsWorked: 4
  },
  {
    id: "21020",
    code: "21020",
    name: "Nguyễn Văn Khởi",
    department: "K. Nhi",
    yearsWorked: 5
  },
  {
    id: "20804",
    code: "20804",
    name: "Trần Thị Liên",
    department: "K. Nhi",
    yearsWorked: 5
  },
  {
    id: "24309",
    code: "24309",
    name: "Chu Thùy Linh",
    department: "K. Nhi",
    yearsWorked: 1
  },
  {
    id: "22271",
    code: "22271",
    name: "Kiều Văn Long",
    department: "K. Nhi",
    yearsWorked: 3
  },
  {
    id: "24210",
    code: "24210",
    name: "Nguyễn Thị Linh",
    department: "K. Nhi",
    yearsWorked: 1
  },
  {
    id: "25008",
    code: "25008",
    name: "Đinh Gia Khuê",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "17034",
    code: "17034",
    name: "Phạm Thị Thương Huyền",
    department: "K. Nhi",
    yearsWorked: 8
  },
  {
    id: "17032",
    code: "17032",
    name: "Nguyễn Thị Phương Anh",
    department: "K. Nhi",
    yearsWorked: 8
  },
  {
    id: "16079",
    code: "16079",
    name: "Nguyễn Thị Nga",
    department: "K. Nhi",
    yearsWorked: 9
  },
  {
    id: "19471",
    code: "19471",
    name: "Nguyễn Bích Hạnh",
    department: "K. Nhi",
    yearsWorked: 6
  },
  {
    id: "20697",
    code: "20697",
    name: "Hoàng Thanh Nhàn",
    department: "K. Nhi",
    yearsWorked: 5
  },
  {
    id: "20707",
    code: "20707",
    name: "Trần Khánh Huyền",
    department: "K. Nhi",
    yearsWorked: 5,
    onDuty: true
  },
  {
    id: "20732",
    code: "20732",
    name: "Trần Thị Nhài",
    department: "K. Nhi",
    yearsWorked: 5
  },
  {
    id: "20735",
    code: "20735",
    name: "Bùi Thị Thảo",
    department: "K. Nhi",
    yearsWorked: 5,
    onDuty: true
  },
  {
    id: "20736",
    code: "20736",
    name: "Lương Thị Nguyên Sao",
    department: "K. Nhi",
    yearsWorked: 5
  },
  {
    id: "21050",
    code: "21050",
    name: "Nguyễn Thị Thu An",
    department: "K. Nhi",
    yearsWorked: 4
  },
  {
    id: "21261",
    code: "21261",
    name: "Nguyễn Kiều Trang",
    department: "K. Nhi",
    yearsWorked: 4
  },
  {
    id: "23117",
    code: "23117",
    name: "Trần Thị Út",
    department: "K. Nhi",
    yearsWorked: 2,
    onDuty: true
  },
  {
    id: "23174",
    code: "23174",
    name: "Nguyễn Trường Anh",
    department: "K. Nhi",
    yearsWorked: 2
  },
  {
    id: "22267",
    code: "22267",
    name: "Trần Thị Thanh Tâm",
    department: "K. Nhi",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "24183",
    code: "24183",
    name: "Nguyễn Trà My",
    department: "K. Nhi",
    yearsWorked: 1
  },
  {
    id: "25040",
    code: "25040",
    name: "Đinh Phương Anh",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "25053",
    code: "25053",
    name: "Nguyễn Nhật Ninh",
    department: "K. Nhi",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "25060",
    code: "25060",
    name: "Nguyễn Thị Ngọc Bích",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "25077",
    code: "25077",
    name: "Vũ Thị Thùy Duyên",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "25080",
    code: "25080",
    name: "Hoàng Thị Phương Hoa",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "25105",
    code: "25105",
    name: "Nguyễn Thị Lan Anh",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "25153",
    code: "25153",
    name: "Lê Phương Nhung",
    department: "K. Nhi",
    yearsWorked: 0
  },
  {
    id: "21275",
    code: "21275",
    name: "Hoàng Tiến Dũng",
    department: "K. Phụ sản",
    yearsWorked: 4,
    onDuty: true
  },
  {
    id: "22314",
    code: "22314",
    name: "Lê Thị Hằng",
    department: "K. Phụ Sản",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "17080",
    code: "17080",
    name: "Bùi Thị Hải Yến",
    department: "K. Phụ Sản",
    yearsWorked: 8
  },
  {
    id: "20739",
    code: "20739",
    name: "Đỗ Thanh Phương",
    department: "K. Phụ Sản",
    yearsWorked: 5
  },
  {
    id: "20762",
    code: "20762",
    name: "Đồng Thị Kim Oanh",
    department: "K. Phụ Sản",
    yearsWorked: 5
  },
  {
    id: "20785",
    code: "20785",
    name: "Phạm Thị Phương Thảo",
    department: "K. Phụ Sản",
    yearsWorked: 5
  },
  {
    id: "21028",
    code: "21028",
    name: "Đặng Thị Hải Thùy",
    department: "K. Phụ Sản",
    yearsWorked: 4
  },
  {
    id: "21211",
    code: "21211",
    name: "Nguyễn Phương Thúy",
    department: "K. Phụ Sản",
    yearsWorked: 4,
    onDuty: true
  },
  {
    id: "22171",
    code: "22171",
    name: "Nguyễn Thị Tú Linh",
    department: "K. Phụ Sản",
    yearsWorked: 3
  },
  {
    id: "23053",
    code: "23053",
    name: "Trịnh Thị Thơ",
    department: "K. Phụ Sản",
    yearsWorked: 2,
    onDuty: true
  },
  {
    id: "23169",
    code: "23169",
    name: "Lê Thanh Thảo",
    department: "K. Phụ Sản",
    yearsWorked: 2
  },
  {
    id: "23166",
    code: "23166",
    name: "Lê Thị Ngọc",
    department: "K. Phụ Sản",
    yearsWorked: 2
  },
  {
    id: "23235",
    code: "23235",
    name: "Nguyễn Hải Linh",
    department: "K. Phụ Sản",
    yearsWorked: 2
  },
  {
    id: "22281",
    code: "22281",
    name: "Lê Diệu Linh",
    department: "K. Phụ Sản",
    yearsWorked: 3
  },
  {
    id: "24177",
    code: "24177",
    name: "Nguyễn Thị Thanh Mai",
    department: "K. Phụ Sản",
    yearsWorked: 1
  },
  {
    id: "24305",
    code: "24305",
    name: "Đinh Hiếu Hân",
    department: "K. Phụ sản",
    yearsWorked: 1
  },
  {
    id: "25032",
    code: "25032",
    name: "Lê Huyền Trang",
    department: "K. Phụ Sản",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "25052",
    code: "25052",
    name: "Nguyễn Thị Phương Nga",
    department: "K. Phụ sản",
    yearsWorked: 0
  },
  {
    id: "25177",
    code: "25177",
    name: "Trần Ngân Giang",
    department: "K. Phụ sản",
    yearsWorked: 0
  },
  {
    id: "16003",
    code: "16003",
    name: "Nguyễn Thị Huê",
    department: "K. Xét nghiệm",
    yearsWorked: 9
  },
  {
    id: "18133",
    code: "18133",
    name: "Đào Kim Thoa",
    department: "K. Xét nghiệm",
    yearsWorked: 7
  },
  {
    id: "16043",
    code: "16043",
    name: "Nguyễn Thị Kim Thảo",
    department: "K. Xét nghiệm",
    yearsWorked: 9
  },
  {
    id: "20802",
    code: "20802",
    name: "Đinh Thị Anh",
    department: "K. Xét nghiệm",
    yearsWorked: 5
  },
  {
    id: "18042",
    code: "18042",
    name: "Phùng Thị Lan Trinh",
    department: "K. Xét nghiệm",
    yearsWorked: 8
  },
  {
    id: "20519",
    code: "20519",
    name: "Nguyễn Việt Anh",
    department: "K. Xét nghiệm",
    yearsWorked: 5,
    onDuty: true
  },
  {
    id: "20741",
    code: "20741",
    name: "Lê Thị Mai",
    department: "K. Xét nghiệm",
    yearsWorked: 5
  },
  {
    id: "21117",
    code: "21117",
    name: "Hoàng Văn Vương",
    department: "K. Xét nghiệm",
    yearsWorked: 4,
    onDuty: true
  },
  {
    id: "21224",
    code: "21224",
    name: "Phạm Thu Hằng",
    department: "K. Xét nghiệm",
    yearsWorked: 4
  },
  {
    id: "22272",
    code: "22272",
    name: "Nguyễn Thị Thanh Thư",
    department: "K. Xét nghiệm",
    yearsWorked: 3
  },
  {
    id: "24174",
    code: "24174",
    name: "Nguyễn Thị Ngọc Mai",
    department: "K. Xét nghiệm",
    yearsWorked: 1
  },
  {
    id: "25051",
    code: "25051",
    name: "Liễu Thu Huyền",
    department: "K. Xét nghiệm",
    yearsWorked: 0
  },
  {
    id: "25065",
    code: "25065",
    name: "Nguyễn Thu Trang",
    department: "K. Xét nghiệm",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "25066",
    code: "25066",
    name: "Lê Thị Thu Hảo",
    department: "K. Xét nghiệm",
    yearsWorked: 0
  },
  {
    id: "25088",
    code: "25088",
    name: "Ninh Thị Hương",
    department: "K. Xét nghiệm",
    yearsWorked: 0
  },
  {
    id: "18045",
    code: "18045",
    name: "Chử Thị Anh Thơ",
    department: "K. CĐHA-TDCN",
    yearsWorked: 7
  },
  {
    id: "21130",
    code: "21130",
    name: "Nguyễn Phúc Hoàn",
    department: "K. CĐHA-TDCN",
    yearsWorked: 4
  },
  {
    id: "17077",
    code: "17077",
    name: "Nguyễn Thị Phương",
    department: "K. CĐHA-TDCN",
    yearsWorked: 9
  },
  {
    id: "17054",
    code: "17054",
    name: "Nguyễn Thị Linh",
    department: "K. CĐHA-TDCN",
    yearsWorked: 8
  },
  {
    id: "21200",
    code: "21200",
    name: "Nguyễn Viết Út",
    department: "K. CĐHA-TDCN",
    yearsWorked: 4
  },
  {
    id: "22019",
    code: "22019",
    name: "Nguyễn Văn Tam",
    department: "K. CĐHA-TDCN",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "21129",
    code: "21129",
    name: "Vũ Văn Tuấn",
    department: "K. CĐHA-TDCN",
    yearsWorked: 4
  },
  {
    id: "24275",
    code: "24275",
    name: "Đỗ Sơn Tùng",
    department: "K. CĐHA-TDCN",
    yearsWorked: 1
  },
  {
    id: "21054",
    code: "21054",
    name: "Ngô Thị Hồng Ngát",
    department: "K. CĐHA-TDCN",
    yearsWorked: 4
  },
  {
    id: "17074",
    code: "17074",
    name: "Phạm Quốc Anh",
    department: "K. CĐHA-TDCN",
    yearsWorked: 8
  },
  {
    id: "22101",
    code: "22101",
    name: "Nguyễn Thị Phương",
    department: "K. Dược",
    yearsWorked: 3
  },
  {
    id: "17082",
    code: "17082",
    name: "Phạm Ngọc Vũ",
    department: "P.VT-TBYT",
    yearsWorked: 8
  },
  {
    id: "22121",
    code: "22121",
    name: "Ngô Ngọc Chinh",
    department: "K. Dược",
    yearsWorked: 3
  },
  {
    id: "17083",
    code: "17083",
    name: "Nguyễn Thị Thùy Dương",
    department: "K. Dược",
    yearsWorked: 8
  },
  {
    id: "20754",
    code: "20754",
    name: "Nguyễn Thu Huyền",
    department: "K. Dược",
    yearsWorked: 5
  },
  {
    id: "24240",
    code: "24240",
    name: "Ngô Khánh Huyền",
    department: "K. Dược",
    yearsWorked: 1
  },
  {
    id: "24241",
    code: "24241",
    name: "Nguyễn Thị Thùy Dương",
    department: "K. Dược",
    yearsWorked: 1
  },
  {
    id: "23163",
    code: "23163",
    name: "Lê Thị Tuyết Anh",
    department: "K. Dược",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "21034",
    code: "21034",
    name: "Phạm Thị Ngọc Dung",
    department: "P. Điều dưỡng - KSNK",
    yearsWorked: 4
  },
  {
    id: "20702",
    code: "20702",
    name: "Đặng Thị Nghĩa",
    department: "P. Điều dưỡng - KSNK",
    yearsWorked: 5
  },
  {
    id: "20784",
    code: "20784",
    name: "Đỗ Thị Thu Thủy",
    department: "BP. KSNK",
    yearsWorked: 5
  },
  {
    id: "23225",
    code: "23225",
    name: "Nguyễn Thị Bình",
    department: "BP. KSNK",
    yearsWorked: 2
  },
  {
    id: "25037",
    code: "25037",
    name: "Nguyễn Thị Ngọc Thúy",
    department: "BP. KSNK",
    yearsWorked: 0
  },
  {
    id: "25030",
    code: "25030",
    name: "Đào Thu Hằng",
    department: "BP. KSNK",
    yearsWorked: 0
  },
  {
    id: "18064",
    code: "18064",
    name: "Nguyễn Thị Luyến",
    department: "BP. KSNK",
    yearsWorked: 7
  },
  {
    id: "18060",
    code: "18060",
    name: "Vũ Thị Thu Huyền",
    department: "BP. KSNK",
    yearsWorked: 8
  },
  {
    id: "22125",
    code: "22125",
    name: "Nguyễn Thị Thủy",
    department: "BP. KSNK",
    yearsWorked: 3
  },
  {
    id: "22179",
    code: "22179",
    name: "Nguyễn Thị Huyền",
    department: "BP. KSNK",
    yearsWorked: 3
  },
  {
    id: "24156",
    code: "24156",
    name: "Nguyễn Thị Lan",
    department: "BP. KSNK",
    yearsWorked: 1
  },
  {
    id: "24213",
    code: "24213",
    name: "Nguyễn Thị Hiền",
    department: "BP. KSNK",
    yearsWorked: 1
  },
  {
    id: "24051",
    code: "24051",
    name: "Lê Thị Hường",
    department: "BP. KSNK",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "23274",
    code: "23274",
    name: "Đoàn Kim Quy",
    department: "BP. KSNK",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "24075",
    code: "24075",
    name: "Nguyễn Thị Hương",
    department: "BP. KSNK",
    yearsWorked: 1,
    onDuty: true
  },
  {
    id: "25036",
    code: "25036",
    name: "Ngô Thị Kim Tuyến",
    department: "BP. KSNK",
    yearsWorked: 0
  },
  {
    id: "25144",
    code: "25144",
    name: "Phan Thị Thoan",
    department: "BP. KSNK",
    yearsWorked: 0
  },
  {
    id: "21141",
    code: "21141",
    name: "Trần Thị Tâm",
    department: "P. KHTH&QLCL",
    yearsWorked: 4
  },
  {
    id: "19023",
    code: "19023",
    name: "Nguyễn Thị Hà",
    department: "P. KHTH&QLCL",
    yearsWorked: 7
  },
  {
    id: "24140",
    code: "24140",
    name: "Ngô Thảo Linh",
    department: "P. KHTH&QLCL",
    yearsWorked: 1
  },
  {
    id: "24095",
    code: "24095",
    name: "Nguyễn Phạm Thùy Linh",
    department: "P. KHTH&QLCL",
    yearsWorked: 1
  },
  {
    id: "16201",
    code: "16201",
    name: "Trần Thị Nhung",
    department: "P. NS-HCQT",
    yearsWorked: 9
  },
  {
    id: "18098",
    code: "18098",
    name: "Phùng Quân Hiếu",
    department: "P. NS-HCQT",
    yearsWorked: 7
  },
  {
    id: "22204",
    code: "22204",
    name: "Trương Thị Thùy Linh",
    department: "P. NS-HCQT",
    yearsWorked: 3
  },
  {
    id: "24303",
    code: "24303",
    name: "Nguyễn Thị Huyền Trang",
    department: "P. NS-HCQT",
    yearsWorked: 1
  },
  {
    id: "20755",
    code: "20755",
    name: "Hồ Ngọc Điền",
    department: "P. NS-HCQT",
    yearsWorked: 5
  },
  {
    id: "25176",
    code: "25176",
    name: "Nguyễn Ngọc Duy",
    department: "P. NS-HCQT",
    yearsWorked: 0
  },
  {
    id: "19489",
    code: "19489",
    name: "Nguyễn Thị Bích Ngọc",
    department: "P. NS-HCQT",
    yearsWorked: 6
  },
  {
    id: "20531",
    code: "20531",
    name: "Phạm Tuấn Nguyên",
    department: "P. NS-HCQT",
    yearsWorked: 5,
    onDuty: true
  },
  {
    id: "16103",
    code: "16103",
    name: "Trần Thị Thu Hường",
    department: "P. NS-HCQT",
    yearsWorked: 9
  },
  {
    id: "21081",
    code: "21081",
    name: "Nguyễn Xuân Hiệu",
    department: "P. NS-HCQT",
    yearsWorked: 4
  },
  {
    id: "22046",
    code: "22046",
    name: "Nguyễn Thị Hồng Dịu",
    department: "P. NS-HCQT",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "20787",
    code: "20787",
    name: "Lại Thị Châm",
    department: "P. NS-HCQT",
    yearsWorked: 5
  },
  {
    id: "22161",
    code: "22161",
    name: "Phùng Sinh Vượng",
    department: "P. NS-HCQT",
    yearsWorked: 3
  },
  {
    id: "25098",
    code: "25098",
    name: "Nguyễn Hải Mạnh",
    department: "P. NS-HCQT",
    yearsWorked: 0
  },
  {
    id: "25141",
    code: "25141",
    name: "Đặng Quốc Nam",
    department: "P. NS-HCQT",
    yearsWorked: 0
  },
  {
    id: "25218",
    code: "25218",
    name: "Ngô Minh Hải",
    department: "P. NS-HCQT",
    yearsWorked: 0,
    onDuty: true
  },
  {
    id: "18085",
    code: "18085",
    name: "Ngô Thị Hòa",
    department: "P. Tài chính kế toán",
    yearsWorked: 8
  },
  {
    id: "19389",
    code: "19389",
    name: "Nguyễn Thị Thu Thủy",
    department: "P. Tài chính kế toán",
    yearsWorked: 6
  },
  {
    id: "14086",
    code: "14086",
    name: "Phạm Thị Vân",
    department: "P. Tài chính kế toán",
    yearsWorked: 11
  },
  {
    id: "19247",
    code: "19247",
    name: "Nguyễn Thị Mai Lan",
    department: "P. Tài chính kế toán",
    yearsWorked: 6
  },
  {
    id: "20815",
    code: "20815",
    name: "Nguyễn Thị Thanh Hà",
    department: "P. Tài chính kế toán",
    yearsWorked: 5
  },
  {
    id: "24094",
    code: "24094",
    name: "Nguyễn Thị Hà",
    department: "P. Tài chính kế toán",
    yearsWorked: 1
  },
  {
    id: "22038",
    code: "22038",
    name: "Đinh Thị Thu Thủy",
    department: "P. Tài chính kế toán",
    yearsWorked: 3
  },
  {
    id: "20766",
    code: "20766",
    name: "Hoàng Thị Thùy Linh",
    department: "P. Tài chính kế toán",
    yearsWorked: 5
  },
  {
    id: "22087",
    code: "22087",
    name: "Nguyễn Thị Thanh Nhàn",
    department: "P. Tài chính kế toán",
    yearsWorked: 3
  },
  {
    id: "22141",
    code: "22141",
    name: "Phan Huyền Trang",
    department: "P. Tài chính kế toán",
    yearsWorked: 3,
    onDuty: true
  },
  {
    id: "20774",
    code: "20774",
    name: "Nguyễn Thị Thùy Linh",
    department: "P. Tài chính kế toán",
    yearsWorked: 5
  },
  {
    id: "20590",
    code: "20590",
    name: "Nguyễn Thị Thảo",
    department: "P. Tài chính kế toán",
    yearsWorked: 5
  },
  {
    id: "24270",
    code: "24270",
    name: "Lê Thị Hồng Nhung",
    department: "P. Tài chính kế toán",
    yearsWorked: 1
  },
  {
    id: "20013",
    code: "20013",
    name: "Phan Trọng Tiến",
    department: "P. CNTT",
    yearsWorked: 5
  },
  {
    id: "18106",
    code: "18106",
    name: "Nguyễn Việt Hưng",
    department: "P. CNTT",
    yearsWorked: 7
  },
  {
    id: "24072",
    code: "24072",
    name: "Lê Thị Duyên",
    department: "P. CNTT",
    yearsWorked: 1
  },
  {
    id: "23005",
    code: "23005",
    name: "Hoàng Thị Hồng Nhung",
    department: "P. CNTT",
    yearsWorked: 0
  },
  {
    id: "23007",
    code: "23007",
    name: "Hoàng Văn Duy",
    department: "P. CNTT",
    yearsWorked: 2
  },
  {
    id: "25165",
    code: "25165",
    name: "Nguyễn Trung Kiên",
    department: "P. CNTT",
    yearsWorked: 0
  },
  {
    id: "25166",
    code: "25166",
    name: "Trương Quốc Phong",
    department: "P. CNTT",
    yearsWorked: 0
  },
  {
    id: "25076",
    code: "25076",
    name: "Phạm Thị Thùy Linh",
    department: "P. Marketing",
    yearsWorked: 0
  },
  {
    id: "21133",
    code: "21133",
    name: "Trần Văn Hợp",
    department: "P. Marketing",
    yearsWorked: 4
  },
  {
    id: "19212",
    code: "19212",
    name: "Vũ Thu Huyền",
    department: "P. Marketing",
    yearsWorked: 6
  },
  {
    id: "19465",
    code: "19465",
    name: "Nguyễn Hà Thu",
    department: "P. Marketing",
    yearsWorked: 6
  },
  {
    id: "20625",
    code: "20625",
    name: "Nguyễn Tuyết Chinh",
    department: "P. Marketing",
    yearsWorked: 5
  },
  {
    id: "20710",
    code: "20710",
    name: "Nguyễn Thanh Mai",
    department: "P. Marketing",
    yearsWorked: 5
  },
  {
    id: "19160",
    code: "19160",
    name: "Nông Thị Thùy Chi",
    department: "P. Marketing",
    yearsWorked: 2
  },
  {
    id: "23036",
    code: "23036",
    name: "Nguyễn Thị Ngọc Huyền",
    department: "P. Marketing",
    yearsWorked: 2
  },
  {
    id: "23147",
    code: "23147",
    name: "Nghiêm Thị Hằng",
    department: "P. Marketing",
    yearsWorked: 2
  },
  {
    id: "22151",
    code: "22151",
    name: "Nguyễn Đức Bình",
    department: "P. Marketing",
    yearsWorked: 3
  },
  {
    id: "22217",
    code: "22217",
    name: "Nguyễn Huy Hoàng",
    department: "P. Marketing",
    yearsWorked: 3
  },
  {
    id: "24276",
    code: "24276",
    name: "Hoàng Lan Anh",
    department: "P. Marketing",
    yearsWorked: 1
  },
  {
    id: "25097",
    code: "25097",
    name: "Lê Quý Long",
    department: "P. Marketing",
    yearsWorked: 0
  },
  {
    id: "25172",
    code: "25172",
    name: "Lê Linh Chi",
    department: "P. Marketing",
    yearsWorked: 0
  },
  {
    id: "18110",
    code: "18110",
    name: "Lê Thị Bích Hương",
    department: "P. Kinh doanh 1",
    yearsWorked: 7
  },
  {
    id: "21119",
    code: "21119",
    name: "Nguyễn Xuân Thiêm",
    department: "P. Kinh doanh 1",
    yearsWorked: 4
  },
  {
    id: "22202",
    code: "22202",
    name: "Đinh Thị Thu Trang",
    department: "P. Kinh doanh 1",
    yearsWorked: 3
  },
  {
    id: "18109",
    code: "18109",
    name: "Dương Thị Hồng Nhung",
    department: "P. Kinh doanh 1",
    yearsWorked: 0
  },
  {
    id: "21076",
    code: "21076",
    name: "Nguyễn Thị Thành",
    department: "P. Kinh doanh 2",
    yearsWorked: 4
  },
  {
    id: "22129",
    code: "22129",
    name: "Lê Thị Minh Ngọc",
    department: "P. Kinh doanh 2",
    yearsWorked: 3
  },
  {
    id: "21101",
    code: "21101",
    name: "Nguyễn Ngọc Hoàn",
    department: "P. Kinh doanh 2",
    yearsWorked: 4
  },
  {
    id: "17108",
    code: "17108",
    name: "Bùi Thị Kim Oanh",
    department: "P. Kinh doanh 3",
    yearsWorked: 8
  },
  {
    id: "21084",
    code: "21084",
    name: "Phạm Thị Hải Anh",
    department: "P. Kinh doanh 3",
    yearsWorked: 0
  },
  {
    id: "22295",
    code: "22295",
    name: "Nguyễn Bích Hường",
    department: "P. Kinh doanh 3",
    yearsWorked: 3
  }
];

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
