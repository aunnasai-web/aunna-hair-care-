// ANNA HAIR CARE - Google Apps Script
// 1) เปิด Google Sheets > Extensions > Apps Script แล้ววางโค้ดนี้
// 2) Run setupSheets() หนึ่งครั้ง และอนุญาตสิทธิ์
// 3) Deploy > New deployment > Web app
//    Execute as: Me | Who has access: Anyone (ใช้เพื่อสาธิตเท่านั้น)

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let orders = ss.getSheetByName('Orders');
  if (!orders) orders = ss.insertSheet('Orders');
  if (orders.getLastRow() === 0) {
    orders.appendRow(['Order ID','Created At','Customer','Phone','Address','SKU','Product','Quantity','Total','Payment','Status']);
  }
  let products = ss.getSheetByName('Products');
  if (!products) products = ss.insertSheet('Products');
  if (products.getLastRow() === 0) {
    products.appendRow(['SKU','Product','Price']);
    products.appendRow(['SH001','แชมพูสมุนไพร',159]);
    products.appendRow(['SH002','แชมพูอาร์แกนออยล์',199]);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:true,message:'ANNA HAIR CARE API is running'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action !== 'newOrder' || !data.order) throw new Error('Invalid request');
    const o = data.order;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders') || ss.insertSheet('Orders');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Order ID','Created At','Customer','Phone','Address','SKU','Product','Quantity','Total','Payment','Status']);
    }
    sheet.appendRow([o.id,o.createdAt,o.customer,o.phone,o.address,o.sku,o.product,o.qty,o.total,o.payment,o.status]);
    return ContentService.createTextOutput(JSON.stringify({ok:true,orderId:o.id}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}