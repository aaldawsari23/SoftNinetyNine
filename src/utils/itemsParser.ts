import { Product } from '@/types';

interface ItemData {
  id: number;
  sku: string;
  brand: string;
  category: string;
  model: string;
  arabicName: string;
  specification: string;
}

// قائمة الصور المتوفرة (يجب تحديثها حسب الصور الفعلية)
const availableImages = [
  '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010',
  '1011', '1013', '1014', '1015', '1016', '1017', '1018', '1019', '1020', '1021',
  '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029', '1030', '1031',
  '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039', '1040', '1041',
  '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049', '1050', '1051',
  '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059', '1060', '1061',
  '1063', '1064', '1065', '1066', '1067', '1068', '1069', '1070', '1071', '1073',
  '1074', '1075', '1076', '1077', '1078', '1079', '1080', '1081', '1082', '1083',
  '1091', '1092', '1096', '1097', '1098', '1099', '1100', '1101', '1102', '1103',
  '1104', '1105', '1106', '1107', '1108', '1109', '1110', '1111', '1112', '1113',
  '1114', '1115', '1116', '1117', '1118', '1119', '1120', '1121', '1122', '1123',
  '1124', '1125', '1126', '1127', '1128', '1129', '1130', '1131', '1132', '1133',
  '1134', '1135', '1136', '1137', '1138', '1139', '1140', '1141', '1142', '1143',
  '1144', '1145', '1146', '1148', '1149', '1150', '1151', '1153', '1154', '1155',
  '1156', '1157', '1158', '1159', '1160', '1161', '1162', '1163', '1164', '1165',
  '1166', '1167', '1168', '1169', '1170', '1171', '1172', '1173', '1174', '1175',
  '1176', '1177', '1178', '1179', '1181', '1182', '1183', '1184', '1185', '1186',
  '1187', '1188', '1189', '1190', '1191', '1192', '1193', '1194', '1195', '1196',
  '1197', '1198', '1199', '1200', '1201', '1202', '1203', '1204', '1205', '1206',
  '1207', '1208', '1209', '1210', '1211', '1212', '1213', '1214', '1215', '1216',
  '1217', '1218', '1219', '1220', '1221', '1222', '1223', '1224', '1225', '1226',
  '1227', '1228', '1229', '1230', '1231', '1232', '1233', '1234', '1235', '1237',
  '1238', '1239', '1240', '1241', '1242', '1245', '1246', '1247', '1248', '1249',
  '1250', '1251', '1252', '1253', '1254', '1255', '1256', '1257', '1258', '1259',
  '1260', '1261', '1262', '1263', '1265'
];

// تحقق من وجود الصورة
export function hasImage(sku: string): boolean {
  return availableImages.includes(sku);
}

// الحصول على مسار الصورة - نحدد الامتداد بناء على الصورة المتوفرة
export function getImagePath(sku: string): string {
  // خريطة الصور مع امتداداتها
  const imageExtensions: { [key: string]: string } = {
    '1006': '.png', '1007': '.png', '1014': '.png', '1015': '.png', '1017': '.PNG',
    '1019': '.png', '1020': '.png', '1021': '.png', '1026': '.png', '1027': '.png',
    '1028': '.png', '1030': '.png', '1032': '.png', '1038': '.png', '1039': '.png',
    '1050': '.png', '1054': '.jpeg', '1055': '.png', '1057': '.png', '1060': '.jpeg',
    '1061': '.webp', '1071': '.png', '1075': '.webp', '1077': '.png', '1080': '.png',
    '1082': '.webp', '1083': '.png', '1104': '.png', '1106': '.png', '1117': '.png',
    '1118': '.png', '1119': '.png', '1120': '.png', '1121': '.png', '1122': '.png',
    '1126': '.jpeg', '1128': '.png', '1131': '.jpeg', '1133': '.jpeg', '1137': '.webp',
    '1138': '.webp', '1143': '.png', '1144': '.png', '1150': '.JPG', '1158': '.png',
    '1160': '.png', '1162': '.png', '1171': '.webp', '1181': '.jpeg', '1203': '.jpeg',
    '1204': '.png', '1205': '.png', '1207': '.webp', '1209': '.jpeg', '1220': '.webp',
    '1225': '.png', '1228': '.png', '1229': '.png', '1232': '.jpeg', '1251': '.png',
    '1257': '.jpeg', '1260': '.png', '1261': '.png', '1263': '.png'
  };
  
  const extension = imageExtensions[sku] || '.jpg'; // افتراضي jpg
  return `/Images/${sku}${extension}`;
}

// بيانات المنتجات الثابتة (من ملف items.txt)
export function parseItemsFile(): ItemData[] {
  const itemsData: ItemData[] = [
    { id: 1, sku: "1001", brand: "Motul", category: "زيوت", model: "104091", arabicName: "زيت موتول 7100 10W40", specification: "1L" },
    { id: 2, sku: "1002", brand: "Motul", category: "زيوت", model: "104092", arabicName: "زيت موتول 7100 10W40", specification: "4L" },
    { id: 3, sku: "1003", brand: "Motul", category: "زيوت", model: "104098", arabicName: "زيت موتول 7100 10W50", specification: "1L" },
    { id: 4, sku: "1004", brand: "Motul", category: "زيوت", model: "101716", arabicName: "زيت موتول 7100 20W50", specification: "1L" },
    { id: 5, sku: "1005", brand: "Motul", category: "زيوت", model: "104298", arabicName: "زيت موتول 300V 10W40", specification: "1L" },
    { id: 6, sku: "1006", brand: "Motul", category: "زيوت", model: "104300", arabicName: "زيت موتول 300V 15W50", specification: "1L" },
    { id: 7, sku: "1007", brand: "Motul", category: "زيوت", model: "103057", arabicName: "زيت موتول 300V 5W40", specification: "1L" },
    { id: 8, sku: "1008", brand: "Motul", category: "زيوت", model: "104066", arabicName: "زيت موتول 5100 10W40", specification: "1L" },
    { id: 9, sku: "1009", brand: "Motul", category: "زيوت", model: "104067", arabicName: "زيت موتول 5100 10W40", specification: "4L" },
    { id: 10, sku: "1010", brand: "Motul", category: "زيوت", model: "104076", arabicName: "زيت موتول 5100 15W50", specification: "1L" },
    // إضافة المزيد من البيانات...
  ];
  
  return itemsData;
}

// تحويل ItemData إلى Product
export function convertToProducts(items: ItemData[]): Product[] {
  return items
    .filter(item => hasImage(item.sku)) // فقط المنتجات التي لها صور
    .map(item => ({
      id: item.sku,
      name: item.arabicName,
      name_en: `${item.brand} ${item.model}`,
      description: `${item.specification} - ${item.category}`,
      price: 0, // سيتم تحديدها لاحقاً
      image_url: getImagePath(item.sku),
      category_id: getCategoryId(item.category),
      brand_id: getBrandId(item.brand),
      sku: item.sku,
      stock_quantity: 10, // كمية افتراضية
      is_featured: false,
      is_available: true,
      specifications: {
        model: item.model,
        specification: item.specification
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
}

// الحصول على معرف الفئة
function getCategoryId(categoryName: string): string {
  const categoryMap: { [key: string]: string } = {
    'زيوت': 'c1',
    'فلاتر': 'c2',
    'إشعال': 'c3',
    'بطاريات': 'c4',
    'إطارات': 'c5',
    'فرامل': 'c6',
    'نقل الحركة': 'c7',
    'سوائل': 'c8',
    'عناية': 'c9',
    'محرك': 'c10',
    'كهرباء': 'c11',
    'عوادم': 'c12',
    'إكسسوارات': 'c13',
    'قطع': 'c14',
    'ملابس': 'c15',
    'عدد': 'c16'
  };
  
  return categoryMap[categoryName] || 'c17';
}

// الحصول على معرف العلامة التجارية
function getBrandId(brandName: string): string {
  const brandMap: { [key: string]: string } = {
    'Motul': 'b13',
    'Suzuki Ecstar': 'b30',
    'Castrol': 'b15',
    'Putoline': 'b31',
    'Yamalube': 'b32',
    'Amsoil': 'b33',
    'Liqui Moly': 'b14',
    'Hiflofiltro': 'b34',
    'K&N': 'b35',
    'Suzuki OEM': 'b36',
    'Yamaha OEM': 'b37',
    'Honda OEM': 'b38',
    'Kawasaki OEM': 'b39',
    'NGK': 'b40',
    'Cobra': 'b41',
    'BS Battery': 'b42',
    'Bridgestone': 'b43',
    'Michelin': 'b18',
    'EBC': 'b44',
    'RK Chain': 'b21',
    'DID Chain': 'b20',
    'JT Sprockets': 'b45',
    'Mitsubishi': 'b46',
    "Brock's": 'b47',
    'Akrapovic': 'b48',
    'SC Project': 'b49',
    'Yoshimura': 'b50',
    'Alpinestars': 'b26',
    'Scoyco': 'b51',
    'Pro-Biker': 'b52',
    'AGV': 'b22',
    'Generic': 'b53'
  };
  
  return brandMap[brandName] || 'b53';
}