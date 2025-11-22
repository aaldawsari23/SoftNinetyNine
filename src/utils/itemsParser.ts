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

// قراءة بيانات المنتجات من items.txt
export function parseItemsFile(): ItemData[] {
  const itemsRaw = `1001,Motul,زيوت,104091,زيت موتول 7100 10W40,1L
1002,Motul,زيوت,104092,زيت موتول 7100 10W40,4L
1003,Motul,زيوت,104098,زيت موتول 7100 10W50,1L
1004,Motul,زيوت,101716,زيت موتول 7100 20W50,1L
1005,Motul,زيوت,104298,زيت موتول 300V 10W40,1L
1006,Motul,زيوت,104300,زيت موتول 300V 15W50,1L
1007,Motul,زيوت,103057,زيت موتول 300V 5W40,1L
1008,Motul,زيوت,104066,زيت موتول 5100 10W40,1L
1009,Motul,زيوت,104067,زيت موتول 5100 10W40,4L
1010,Motul,زيوت,104076,زيت موتول 5100 15W50,1L
1011,Motul,زيوت,104054,زيت موتول 5000 10W40,1L
1012,Motul,زيوت,102782,زيت موتول 3000 20W50,1L
1013,Motul,زيوت,107671,زيت موتول سكوتر 5W40,1L
1014,Suzuki Ecstar,زيوت,99000-R9000-1L,زيت سوزوكي R9000,1L
1015,Suzuki Ecstar,زيوت,99000-R9000-4L,زيت سوزوكي R9000,4L
1016,Suzuki Ecstar,زيوت,99000-R5000-1L,زيت سوزوكي R5000,1L
1017,Castrol,زيوت,Actevo-20W50-1L,زيت كاسترول اكتيف,1L
1018,Castrol,زيوت,Power1-10W40-1L,زيت كاسترول باور1,1L
1019,Putoline,زيوت,N-TECH-10W40,زيت بوتولين N-Tech,1L
1020,Putoline,زيوت,N-TECH-10W50,زيت بوتولين N-Tech,1L
1021,Putoline,زيوت,S4-10W40,زيت بوتولين S4,1L
1022,Yamalube,زيوت,YAMA-10W40,زيت ياماها,1L
1023,Amsoil,زيوت,MCF-1Q,زيت امزويل متري,1Q
1024,Amsoil,زيوت,MCV-1Q,زيت امزويل في توين,1Q
1025,Liqui Moly,زيوت,LM-10W40-Street,زيت ليكوي مولي ستريت,1L
1026,Liqui Moly,زيوت,LM-10W50-Race,زيت ليكوي مولي ريس,1L
1027,Hiflofiltro,فلاتر,HF204,فلتر زيت هيفلو,Black
1028,Hiflofiltro,فلاتر,HF204RC,فلتر زيت هيفلو ريسينج,Nut
1029,Hiflofiltro,فلاتر,HF303,فلتر زيت هيفلو,Black
1030,Hiflofiltro,فلاتر,HF303RC,فلتر زيت هيفلو ريسينج,Nut
1031,Hiflofiltro,فلاتر,HF138,فلتر زيت هيفلو,Black
1032,Hiflofiltro,فلاتر,HF138RC,فلتر زيت هيفلو ريسينج,Nut
1033,Hiflofiltro,فلاتر,HF112,فلتر زيت هيفلو,Paper
1034,Hiflofiltro,فلاتر,HF113,فلتر زيت هيفلو,Paper
1035,Hiflofiltro,فلاتر,HF116,فلتر زيت هيفلو,Paper
1036,Hiflofiltro,فلاتر,HF401,فلتر زيت هيفلو,Metal
1037,Hiflofiltro,فلاتر,HF141,فلتر زيت هيفلو,Paper
1038,Hiflofiltro,فلاتر,HF971,فلتر زيت هيفلو,Scooter
1039,Hiflofiltro,فلاتر,HF152,فلتر زيت هيفلو,Bombardier
1040,K&N,فلاتر,KN-204,فلتر زيت KN,Black
1041,K&N,فلاتر,KN-204C,فلتر زيت KN,Chrome
1042,K&N,فلاتر,KN-303,فلتر زيت KN,Black
1043,K&N,فلاتر,KN-138,فلتر زيت KN,Black
1044,Suzuki OEM,فلاتر,16510-07J00,فلتر وكالة سوزوكي,OEM
1045,Yamaha OEM,فلاتر,5GH-13440-61,فلتر وكالة ياماها,OEM
1046,Honda OEM,فلاتر,15410-MFJ-D01,فلتر وكالة هوندا,OEM
1047,Kawasaki OEM,فلاتر,16097-0008,فلتر وكالة كاواساكي,OEM
1048,K&N,فلاتر,SU-1308,فلتر هواء KN,Hayabusa
1049,K&N,فلاتر,SU-1017,فلتر هواء KN,GSXR
1050,K&N,فلاتر,SU-7511,فلتر هواء KN,GSXR
1051,K&N,فلاتر,HA-1008,فلتر هواء KN,CBR
1052,K&N,فلاتر,YA-1009,فلتر هواء KN,R1
1053,Suzuki OEM,فلاتر,13780-47H00,فلتر هواء وكالة,GSXR
1054,Suzuki OEM,فلاتر,13780-15H00,فلتر هواء وكالة,Hayabusa
1055,Hiflofiltro,فلاتر,HFA3614,فلتر هواء هيفلو,GSXR
1056,Hiflofiltro,فلاتر,HFA3910,فلتر هواء هيفلو,GSXR
1057,NGK,إشعال,CR9E,بوجي NGK,Std
1058,NGK,إشعال,CR8E,بوجي NGK,Std
1059,NGK,إشعال,CR7E,بوجي NGK,Std
1060,NGK,إشعال,CR9EIX,بوجي ايريديوم,Iridium
1061,NGK,إشعال,CR8EIX,بوجي ايريديوم,Iridium
1062,NGK,إشعال,CPR8EA-9,بوجي NGK,Std
1063,NGK,إشعال,D8EA,بوجي NGK,Std
1064,NGK,إشعال,C7HSA,بوجي NGK,Std
1065,NGK,إشعال,LMAR8A-9,بوجي NGK ليزر,Laser
1066,NGK,إشعال,IMR9C-9H,بوجي NGK ليزر,Laser
1067,NGK,إشعال,LMAR9E-J,بوجي NGK,R1
1068,NGK,إشعال,DR8EA,بوجي NGK,Std
1069,NGK,إشعال,DPR8EA-9,بوجي NGK,Std
1070,NGK,إشعال,CR10EIX,بوجي ايريديوم,Iridium
1071,NGK,إشعال,XD05F,كوع بوجي,Black
1072,Cobra,بطاريات,YTX4L-BS,بطارية كوبرا,4L
1073,Cobra,بطاريات,YTX5L-BS,بطارية كوبرا,5L
1074,Cobra,بطاريات,YTX7L-BS,بطارية كوبرا,7L
1075,Cobra,بطاريات,YTX7A-BS,بطارية كوبرا,7A
1076,Cobra,بطاريات,YTX9-BS,بطارية كوبرا,9BS
1077,Cobra,بطاريات,YTZ10S,بطارية كوبرا,10S
1078,Cobra,بطاريات,YTX12-BS,بطارية كوبرا,12BS
1079,Cobra,بطاريات,YTX14-BS,بطارية كوبرا,14BS
1080,Cobra,بطاريات,YTZ14S,بطارية كوبرا,14S
1081,Cobra,بطاريات,YTX20L-BS,بطارية كوبرا,20L
1082,BS Battery,بطاريات,BTX9-BS,بطارية BS,9BS
1083,BS Battery,بطاريات,BTZ10S,بطارية BS,10S
1084,Bridgestone,إطارات,S22-120/70-17,كفر S22 امامي,Front
1085,Bridgestone,إطارات,S22-180/55-17,كفر S22 خلفي,Rear
1086,Bridgestone,إطارات,S22-190/50-17,كفر S22 خلفي,Rear
1087,Bridgestone,إطارات,S22-190/55-17,كفر S22 خلفي,Rear
1088,Bridgestone,إطارات,S22-200/55-17,كفر S22 خلفي,Rear
1089,Michelin,إطارات,Pilot-120/70-17,كفر ميشلان امامي,Front
1090,Michelin,إطارات,Pilot-180/55-17,كفر ميشلان خلفي,Rear
1091,Generic,إطارات,Knobby-3.00-21,كفر جبلي امامي,Offroad
1092,Generic,إطارات,Knobby-4.60-18,كفر جبلي خلفي,Offroad
1093,Generic,إطارات,Street-130/70-17,كفر دباب عادي,Street
1094,Generic,إطارات,Street-100/80-17,كفر دباب عادي,Street
1095,Bridgestone,إطارات,T32-120/70-17,كفر T32 تورينق,Front
1096,EBC,فرامل,FA174HH,فحمات EBC,Rear
1097,EBC,فرامل,FA379HH,فحمات EBC,Front
1098,EBC,فرامل,FA447HH,فحمات EBC,Front
1099,EBC,فرامل,FA296HH,فحمات EBC,Front
1100,EBC,فرامل,FA158HH,فحمات EBC,Front
1101,EBC,فرامل,FA252HH,فحمات EBC,Front
1102,EBC,فرامل,FA142HH,فحمات EBC,Rear
1103,EBC,فرامل,FA630HH,فحمات EBC,Front
1104,Suzuki OEM,فرامل,59100-GSXR,فحمات سوزوكي اصلي,Front
1105,Suzuki OEM,فرامل,59101-GSXR,فحمات سوزوكي اصلي,Front
1106,Suzuki OEM,فرامل,69100-GSXR,فحمات سوزوكي اصلي,Rear
1107,Honda OEM,فرامل,06455-CBR,فحمات هوندا اصلي,Front
1108,Generic,فرامل,Drum-CG125,قماش فرامل خلفي,Drum
1109,Generic,فرامل,Drum-Ace125,قماش فرامل خلفي,Drum
1110,RK Chain,نقل الحركة,RK-520-Gold,جنزير RK ذهبي,520
1111,RK Chain,نقل الحركة,RK-525-Gold,جنزير RK ذهبي,525
1112,RK Chain,نقل الحركة,RK-530-Gold,جنزير RK ذهبي,530
1113,DID Chain,نقل الحركة,DID-520-VX3,جنزير DID ذهبي,520
1114,DID Chain,نقل الحركة,DID-525-VX3,جنزير DID ذهبي,525
1115,Generic,نقل الحركة,Chain-520-Std,جنزير عادي,520
1116,Generic,نقل الحركة,Chain-428-Std,جنزير دباب صغير,428
1117,JT Sprockets,نقل الحركة,JTF-15T-520,ترس امامي JT,15T
1118,JT Sprockets,نقل الحركة,JTF-16T-520,ترس امامي JT,16T
1119,JT Sprockets,نقل الحركة,JTF-17T-530,ترس امامي JT,17T
1120,JT Sprockets,نقل الحركة,JTR-42T-520,ترس خلفي JT,42T
1121,JT Sprockets,نقل الحركة,JTR-45T-520,ترس خلفي JT,45T
1122,JT Sprockets,نقل الحركة,JTR-43T-530,ترس خلفي JT,43T
1123,Generic,نقل الحركة,Sprocket-Set-CG,طقم تروس CG125,Kit
1124,Generic,نقل الحركة,Cush-Drive-Rubber,جلدة ترس,Rubber
1125,Honda OEM,سوائل,Coolant-Blue,ماء رديتر هوندا,Blue
1126,Mitsubishi,سوائل,Coolant-Mitsu,ماء رديتر ميتسوبيشي,Green
1127,Amsoil,سوائل,Coolant-Powersport,ماء رديتر امزويل,Yellow
1128,Motul,سوائل,Motocool-Factory,ماء رديتر موتول,Red
1129,Motul,سوائل,Motocool-Expert,ماء رديتر موتول,Yellow
1130,Motul,سوائل,DOT-3-4,زيت فرامل موتول,DOT4
1131,Motul,سوائل,RBF-600,زيت فرامل ريسينج,RBF600
1132,Motul,سوائل,RBF-660,زيت فرامل ريسينج,RBF660
1133,Liqui Moly,سوائل,Shooter-4T,منظف بخاخات,80ml
1134,Liqui Moly,سوائل,Speed-Add,محسن اداء,Can
1135,Motul,سوائل,Engine-Clean,غسيل مكينة,Can
1136,Motul,عناية,C1-Chain-Clean,منظف جنزير,C1
1137,Motul,عناية,C4-Chain-Lube,مشحم جنزير,C4
1138,Motul,عناية,C2-Chain-Lube,مشحم جنزير,C2
1139,Motul,عناية,M1-Helmet-Clean,منظف خوذة,M1
1140,Motul,عناية,M2-Helmet-Interior,منظف خوذة داخلي,M2
1141,Motul,عناية,E2-Moto-Wash,غسيل دباب,Wash
1142,Motul,عناية,E5-Shine-Go,ملمع فيبر,Shine
1143,Motul,زيوت,Fork-Oil-10W,زيت مساعدات,10W
1144,Motul,زيوت,Fork-Oil-15W,زيت مساعدات,15W
1145,Suzuki OEM,محرك,Clutch-Plate-Set,صحون كلتش,OEM
1146,Generic,محرك,Clutch-Plate-CG,صحون كلتش,CG
1147,Suzuki OEM,محرك,Gasket-Clutch-Cover,وجه كلتش,OEM
1148,Suzuki OEM,محرك,Gasket-Magneto,وجه كهرباء,OEM
1149,Generic,محرك,Gasket-Set-Full,طقم وجيه,Full
1150,Honda OEM,محرك,Piston-Std-125,بستم ستاندر,CG125
1151,Honda OEM,محرك,Ring-Set-Std,شنابر ستاندر,CG125
1152,Generic,محرك,Valve-Set-In/Ex,بلوف,Set
1153,Generic,محرك,Cam-Chain-125,جنزير تيمن,CG125
1154,Generic,محرك,Carburetor-PZ26,كربريتر 125,PZ26
1155,Generic,محرك,Carburetor-PZ30,كربريتر 200,PZ30
1156,Generic,كهرباء,Stator-Coil-125,ملف كهرباء,CG125
1157,Generic,كهرباء,Rectifier-Regulator,منظم كهرباء,Univ
1158,Generic,كهرباء,CDI-Unit,سي دي اي,Univ
1159,Generic,كهرباء,Ignition-Coil,كويل كهرباء,Univ
1160,Generic,كهرباء,Starter-Relay,دقمة سلف,Univ
1161,Generic,كهرباء,Horn-Disc-12V,بوري,12V
1162,Generic,كهرباء,Flasher-Relay,فليشر اشارات,Univ
1163,Generic,كهرباء,Fuse-Mini-10A,فيوزات 10,Red
1164,Generic,كهرباء,Fuse-Mini-15A,فيوزات 15,Blue
1165,Generic,كهرباء,Fuse-Mini-20A,فيوزات 20,Yellow
1166,Generic,كهرباء,Bulb-H4,لمبة امامية,H4
1167,Generic,كهرباء,Bulb-Signal-10W,لمبة اشارة,10W
1168,Brock's,عوادم,Alien-Head-SlipOn,دبة بروكس الين,SlipOn
1169,Brock's,عوادم,Short-Megaphone,دبة بروكس ميقا,Short
1170,Akrapovic,عوادم,Replica-Carbon,دبة اكرا كاربون,Replica
1171,SC Project,عوادم,Replica-CRT,دبة اس سي,Replica
1172,Yoshimura,عوادم,Replica-R77,دبة يوشيمورا,Replica
1173,Generic,عوادم,Link-Pipe-R6,وصلة شكمان R6,Pipe
1174,Generic,عوادم,Link-Pipe-S1000,وصلة شكمان BMW,Pipe
1175,Generic,عوادم,Link-Pipe-GSXR,وصلة شكمان GSXR,Pipe
1176,Generic,عوادم,Exhaust-Spring,سبرنج شكمان,Spring
1177,Generic,عوادم,DB-Killer,كاتم صوت,DB
1178,Generic,إكسسوارات,Phone-Holder-USB,حامل جوال شاحن,USB
1179,Generic,إكسسوارات,Phone-Holder-X,حامل جوال اكس,X
1180,Generic,إكسسوارات,Grip-Rubber-Black,مقابض يد اسود,Grips
1181,Generic,إكسسوارات,Grip-Aluminum-Red,مقابض يد احمر,CNC
1182,Generic,إكسسوارات,Grip-Aluminum-Gold,مقابض يد ذهبي,CNC
1183,Generic,إكسسوارات,Grip-Aluminum-Blue,مقابض يد ازرق,CNC
1184,Generic,إكسسوارات,Levers-Adjustable-Blk,مقبض فرامل تعديل,Black
1185,Generic,إكسسوارات,Levers-Foldable,مقبض فرامل طي,Foldable
1186,Generic,إكسسوارات,Bar-End-Mirror-Rnd,مرايا طرفية,Round
1187,Generic,إكسسوارات,Wing-Mirrors,مرايا انسيابية,Wing
1188,Generic,إكسسوارات,Mirror-Block-Off,اغطية مرايا,CNC
1189,Generic,إكسسوارات,Tank-Pad-Carbon,استيكر خزان,Carbon
1190,Generic,إكسسوارات,Knee-Grip-Pads,استيكر جوانب,Grips
1191,Generic,إكسسوارات,Rim-Tape-Red,شريط جنوط احمر,Red
1192,Generic,إكسسوارات,Rim-Tape-Blue,شريط جنوط ازرق,Blue
1193,Generic,إكسسوارات,Paddock-Spools-6mm,بكرات رفع ياماها,6mm
1194,Generic,إكسسوارات,Paddock-Spools-8mm,بكرات رفع سوزوكي,8mm
1195,Generic,إكسسوارات,Paddock-Spools-10mm,بكرات رفع كاواساكي,10mm
1196,Generic,إكسسوارات,Oil-Cap-CNC,غطاء زيت ملون,CNC
1197,Generic,إكسسوارات,Valve-Caps-CNC,غطاء بلف هواء,CNC
1198,Generic,إكسسوارات,Headlight-7inch,شمعة دائرية,LED
1199,Generic,إكسسوارات,Indicator-Flowing,اشارات تتابعية,LED
1200,Generic,إكسسوارات,License-Plate-Holder,حامل لوحة,TailTidy
1201,Generic,إكسسوارات,Crash-Bungs-Univ,سلايدرات حماية,Sliders
1202,Generic,إكسسوارات,Chain-Adjuster-CNC,شداد جنزير,CNC
1203,Generic,قطع,Cable-Clutch-CG,سلك كلتش,CG
1204,Generic,قطع,Cable-Throttle-CG,سلك بنزين,CG
1205,Generic,قطع,Cable-Brake-Front,سلك فرامل,Drum
1206,Generic,قطع,Speedo-Cable,سلك عداد,Cable
1207,Generic,قطع,Clutch-Lever-Assy,قاعدة كلتش,Assy
1208,Generic,قطع,Brake-Master-Cyl,علبة فرامل,Pump
1209,Generic,قطع,Switch-LH-Generic,ازرار يسار,Switch
1210,Generic,قطع,Switch-RH-Generic,ازرار يمين,Switch
1211,Generic,قطع,Foot-Peg-Front,دعاسات سائق,Pegs
1212,Generic,قطع,Foot-Peg-Rear,دعاسات رديف,Pegs
1213,Generic,قطع,Gear-Pedal,دواسة قير,Pedal
1214,Generic,قطع,Kick-Starter,هندل,Kick
1215,Generic,قطع,Side-Stand,جك جانبي,Stand
1216,Generic,قطع,Main-Stand,جك وسط,Stand
1217,Generic,قطع,Fuel-Tap,محبس بنزين,Tap
1218,Generic,قطع,Fuel-Filter-Inline,فلتر بنزين,Filter
1219,Generic,قطع,Wheel-Bearing-6301,رمان بلي 6301,Bearing
1220,Generic,قطع,Wheel-Bearing-6202,رمان بلي 6202,Bearing
1221,Generic,قطع,Oil-Seal-Fork,صوف مساعدات,Seal
1222,Generic,قطع,Dust-Seal-Fork,غبار مساعدات,Seal
1223,Alpinestars,ملابس,Gloves-SP8,قفازات الباين,SP8
1224,Alpinestars,ملابس,Gloves-SMX,قفازات الباين,SMX
1225,Scoyco,ملابس,Gloves-MC29,قفازات سكويكو,MC29
1226,Generic,ملابس,Gloves-Mesh-Blk,قفازات شبك,Mesh
1227,Pro-Biker,ملابس,Gloves-Pro,قفازات برو بايكر,Pro
1228,AGV,ملابس,Helmet-K3-SV,خوذة AGV K3,Helmet
1229,AGV,ملابس,Helmet-K1-Black,خوذة AGV K1,Helmet
1230,Generic,ملابس,Helmet-LS2-Copy,خوذة LS2,Helmet
1231,Generic,ملابس,Visor-Tinted,زجاج خوذة,Visor
1232,Generic,ملابس,Mask-Balaclava,قناع وجه,Mask
1233,Generic,ملابس,Knee-Pads-Set,حماية ركب,Pads
1234,Generic,ملابس,Jacket-Mesh,جاكيت حماية,Jacket
1235,Generic,ملابس,Rain-Suit,بدلة مطر,Suit
1236,Generic,ملابس,Key-Cover-Suzuki,غطاء مفتاح,Suzuki
1237,Generic,ملابس,Key-Chain-Fabric,ميدالية قماش,Tag
1238,Generic,عدد,Chain-Breaker,زرقينة جنزير,Tool
1239,Generic,عدد,T-Handle-Set,مفاتيح تي,Tools
1240,Generic,عدد,Paddock-Stand-Rear,ستاند رفع,Stand
1241,Generic,عدد,Tire-Pressure-Gauge,عيار هواء,Gauge
1242,Generic,عدد,Brush-Set-Cleaning,فرش تنظيف,Brush
1243,Generic,ملابس,Shoe-Protector,حماية حذاء,Rubber
1244,Generic,إكسسوارات,Net-Bungee,شبكة عفش,Net
1245,Generic,إكسسوارات,Bolt-Set-Fairing,مسامير فيبر,Bolts
1246,Generic,محرك,Oil-Cooler-Kit,مبرد زيت,Cooler
1247,Generic,محرك,Air-Filter-Pod,فلتر رياضي,Pod
1248,Generic,محرك,Fuel-Hose-1M,لي بنزين,Hose
1249,Generic,كهرباء,USB-Charger-Socket,شاحن يو اس بي,USB
1250,Generic,كهرباء,Fog-Lights-LED,كشافات ضباب,LED
1251,Honda OEM,قطع,O-Ring-Chain-Case,جلدة غطاء,Rubber
1252,Suzuki OEM,قطع,Drain-Bolt-Magnet,صرة زيت,Bolt
1253,Yamaha OEM,قطع,Drain-Washer-Alum,وردة زيت,Washer
1254,Honda OEM,قطع,Drain-Washer-Alum,وردة زيت,Washer
1255,Motul,زيوت,Gear-Oil-80W90,زيت تروس,80W90
1256,Motul,زيوت,Transoil-10W40,زيت جيربوكس,2T
1257,Liqui Moly,زيوت,Air-Filter-Oil,زيت فلتر هواء,Spray
1258,Generic,عناية,Silicon-Spray,بخاخ سيليكون,Spray
1259,Generic,عناية,Contact-Cleaner,منظف الكترونيات,Spray
1260,Generic,عناية,Brake-Cleaner,منظف فرامل,Spray
1261,Generic,عناية,Rust-Remover,مزيل صدا,Spray
1262,Generic,إطارات,Tube-2.75-18,لستك,Tube
1263,Generic,إطارات,Tube-3.00-18,لستك,Tube
1264,Generic,إطارات,Tube-90/90-18,لستك,Tube
1265,Generic,إطارات,Valve-Stem-Tubeless,بلف تيوبلس,Valve
1266,Generic,إطارات,Valve-Stem-L-Shape,بلف زاوية,Valve
1267,Bridgestone,إطارات,RS11-120/70,كفر RS11 امامي,Front
1268,Bridgestone,إطارات,RS11-190/55,كفر RS11 خلفي,Rear
1269,Pirelli,إطارات,Diablo-Rosso-III-120,كفر روسو امامي,Front
1270,Pirelli,إطارات,Diablo-Rosso-III-180,كفر روسو خلفي,Rear
1271,Dunlop,إطارات,Sportmax-120/70,كفر دنلوب امامي,Front
1272,Dunlop,إطارات,Sportmax-180/55,كفر دنلوب خلفي,Rear
1273,Generic,إطارات,Scooter-120/70-12,كفر سكوتر,Scooter
1274,Generic,إطارات,Scooter-130/70-12,كفر سكوتر,Scooter
1275,NGK,إشعال,Wire-Set-Racing,اسلاك بوجي,Wires
1276,Generic,قطع,Battery-Strap,حزام بطارية,Strap
1277,Generic,قطع,Number-Plate-Light,لمبة لوحة,LED
1278,Generic,إكسسوارات,Seat-Cover-Mesh,غطاء مقعد,Mesh
1279,Generic,إكسسوارات,Seat-Cushion-Gel,وسادة جل,Gel
1280,Generic,ملابس,Arm-Sleeves,اكمام,Sleeves
1281,Generic,ملابس,Leg-Bag,شنطة فخذ,Bag
1282,Generic,ملابس,Tank-Bag-Magnetic,شنطة تانك,Bag
1283,Generic,ملابس,Backpack-Hardshell,شنطة ظهر,Bag
1284,Generic,قطع,Exhaust-Wrap,شطرطون حراري,Wrap
1285,Generic,قطع,Radiator-Guard-Mesh,شبك رديتر,Mesh
1286,Generic,قطع,Clips-Fairing-Set,كلبسات فيبر,Clips
1287,Generic,قطع,Zip-Ties-Pack,اربطة بلاستيك,Ties
1288,Generic,قطع,Tape-Electrical,شطرطون كهرباء,Tape
1289,Generic,قطع,Fuse-Holder-Inline,بيت فيوز,Holder
1290,Generic,قطع,Relay-4Pin-12V,كتاوت,Relay
1291,Generic,قطع,Switch-Kill,زر اطفاء,Switch
1292,Generic,قطع,Switch-Push-Button,زر تشغيل,Button
1293,Generic,قطع,Speedometer-Digital,عداد ديجيتال,Speedo
1294,Generic,قطع,RPM-Gauge,عداد ضغط,RPM
1295,Generic,قطع,Temp-Gauge-Water,ساعة حرارة,Temp
1296,Generic,إكسسوارات,Clock-Handlebar,ساعة,Clock
1297,Generic,إكسسوارات,USB-Voltmeter,قارئ فولت,Volt
1298,Generic,إكسسوارات,Cup-Holder,حامل اكواب,Holder
1299,Generic,إكسسوارات,Flag-Pole,سارية علم,Pole
1300,Generic,إكسسوارات,Helmet-Lock,قفل خوذة,Lock`;

  const lines = itemsRaw.split('\n').filter(line => line.trim());

  return lines.map((line, index) => {
    const [sku, brand, category, model, arabicName, specification] = line.split(',');
    return {
      id: index + 1,
      sku: sku.trim(),
      brand: brand.trim(),
      category: category.trim(),
      model: model.trim(),
      arabicName: arabicName.trim(),
      specification: specification.trim()
    };
  });
}

// تحديد امتداد الصورة
function getImageExtension(sku: string): string {
  const imageExtensions: { [key: string]: string } = {
    '1006': 'png', '1007': 'png', '1014': 'png', '1015': 'png', '1017': 'PNG',
    '1019': 'png', '1020': 'png', '1021': 'png', '1026': 'png', '1027': 'png',
    '1028': 'png', '1030': 'png', '1032': 'png', '1038': 'png', '1039': 'png',
    '1050': 'png', '1054': 'jpeg', '1055': 'png', '1057': 'png', '1060': 'jpeg',
    '1061': 'webp', '1071': 'png', '1075': 'webp', '1077': 'png', '1080': 'png',
    '1082': 'webp', '1083': 'png', '1104': 'png', '1106': 'png', '1117': 'png',
    '1118': 'png', '1119': 'png', '1120': 'png', '1121': 'png', '1122': 'png',
    '1126': 'jpeg', '1128': 'png', '1131': 'jpeg', '1133': 'jpeg', '1137': 'webp',
    '1138': 'webp', '1143': 'png', '1144': 'png', '1150': 'JPG', '1158': 'png',
    '1160': 'png', '1162': 'png', '1171': 'webp', '1181': 'jpeg', '1203': 'jpeg',
    '1204': 'png', '1205': 'png', '1207': 'webp', '1209': 'jpeg', '1220': 'webp',
    '1225': 'png', '1228': 'png', '1229': 'png', '1232': 'jpeg', '1251': 'png',
    '1257': 'jpeg', '1260': 'png', '1261': 'png', '1263': 'png'
  };

  return imageExtensions[sku] || 'jpg';
}

// الحصول على مسار الصورة
export function getImagePath(sku: string): string {
  const extension = getImageExtension(sku);
  return `/Images/${sku}.${extension}`;
}

// التحقق من وجود صورة
export function hasImage(sku: string): boolean {
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
  return availableImages.includes(sku);
}

// تحويل ItemData إلى Product
export function convertToProducts(items: ItemData[]): Product[] {
  return items
    .filter(item => hasImage(item.sku))
    .map(item => ({
      id: item.sku,
      name: item.arabicName,
      name_en: `${item.brand} ${item.model}`,
      description: `${item.specification} - ${item.category}`,
      price: 0,
      currency: 'ريال',
      type: 'part' as const,
      image_url: getImagePath(item.sku),
      category_id: getCategoryId(item.category),
      brand_id: getBrandId(item.brand),
      sku: item.sku,
      stock_quantity: 10,
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
