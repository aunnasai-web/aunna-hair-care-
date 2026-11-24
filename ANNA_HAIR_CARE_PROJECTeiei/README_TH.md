# ANNA HAIR CARE — คู่มือเริ่มต้น

## ไฟล์ในโครงการ
- `index.html` เว็บไซต์หน้าร้าน มีสินค้า 2 SKU, แบบฟอร์มสั่งซื้อ และหน้าจัดการออเดอร์
- `google-apps-script/Code.gs` โค้ดสำหรับบันทึกออเดอร์ลง Google Sheets
- `sheets-template.csv` ข้อมูลสินค้าเริ่มต้น
- `images/README.txt` โฟลเดอร์สำหรับใส่รูปสินค้าภายหลัง
- `vercel.json` ตั้งค่าให้ Vercel เปิดหน้าเว็บไซต์จาก index.html

## วิธีอัปโหลดขึ้น GitHub (ง่ายที่สุด)
1. เปิด Repository `aunna-hair-care`
2. กด **Add file > Upload files**
3. เปิดโฟลเดอร์ `ANNA_HAIR_CARE_PROJECT` ในคอม แล้วเลือกไฟล์และโฟลเดอร์ทั้งหมดด้านใน (index.html, README_TH.md, sheets-template.csv, google-apps-script, images, vercel.json)
4. ลากมาวางในหน้า Upload files หรือกด choose your files แล้วเลือกไฟล์
5. กด **Commit changes** ด้านล่าง
หมายเหตุ: ถ้า GitHub มี `index.html` อยู่แล้ว ให้ยืนยันการอัปเดตไฟล์เดิมได้

## สร้าง Google Sheets
1. เข้า https://sheets.google.com แล้วสร้าง Blank spreadsheet ชื่อ `ANNA HAIR CARE ORDERS`
2. ในชีต เลือก **Extensions > Apps Script**
3. ลบโค้ดตัวอย่าง แล้วเปิดไฟล์ `google-apps-script/Code.gs` จากโฟลเดอร์นี้ด้วย Notepad
4. คัดลอกโค้ดทั้งหมดไปวางใน Apps Script แล้วกด Save
5. เลือกฟังก์ชัน `setupSheets` จากแถบด้านบน แล้วกด Run และอนุญาตสิทธิ์
6. กลับ Google Sheets จะมีแท็บ `Orders` และ `Products`

## Deploy Apps Script เป็น Web App
1. ใน Apps Script กด **Deploy > New deployment**
2. เลือกชนิด **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** (เพื่อการสาธิตในงานเรียนเท่านั้น)
5. กด Deploy แล้วคัดลอก Web app URL
6. เปิด `index.html` ด้วย Notepad แล้วค้นหา `const API_URL=""`
7. วาง URL ไว้ในเครื่องหมายคำพูด เช่น `const API_URL="https://script.google.com/macros/s/XXXXX/exec";`
8. บันทึก แล้วอัปโหลด `index.html` ที่แก้แล้วขึ้น GitHub อีกครั้ง

ข้อจำกัด: เว็บไซต์เก็บรายการออเดอร์ในเบราว์เซอร์ด้วย และส่งสำเนาออเดอร์ไป Google Sheets ผ่าน Apps Script เมื่อใส่ URL แล้ว การส่งแบบ no-cors ไม่สามารถแสดงผลยืนยันจาก Google Sheets กลับมาที่หน้าเว็บได้ทันที ให้ตรวจรายการในชีตเพื่อยืนยัน

## Deploy เว็บไซต์บน Vercel
1. เข้า https://vercel.com แล้วเลือก Continue with GitHub
2. กด Add New > Project แล้ว Import repository `aunna-hair-care`
3. Framework Preset เลือก **Other**
4. กด Deploy

## ข้อควรทราบ
- ภาพขวดในเว็บเป็นภาพวาดด้วย CSS เพื่อใช้เป็นตัวอย่าง ยังไม่ใช่รูปสินค้าจริง
- ระบบชำระเงินและขนส่งเป็นข้อมูลสาธิต ยังไม่มีการตัดเงินจริงหรือเชื่อมบริษัทขนส่ง
- ใช้ข้อมูลสมมติในการทดลอง อย่าใส่ข้อมูลลูกค้าจริง เพราะ Web App ตัวอย่างนี้เปิดให้เข้าถึงได้แบบ Anyone และยังไม่มีระบบยืนยันตัวตน
