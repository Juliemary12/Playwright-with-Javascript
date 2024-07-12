
const ExcelJS = require('exceljs');

async function getData(sheetName, rowNum) {    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("./utils/Register_Data.xlsx");
    
    const worksheet = workbook.getWorksheet(sheetName);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber > 1) { 
       // if (rowNumber === rowNum) {     
           
            const username = row.getCell(1).value;
            //console.log(username)
            const password = row.getCell(2).value;
            //console.log(password)

            const confirmpassword = row.getCell(3).value;
            //console.log(confirmpassword)


           data.push({ username, password, confirmpassword });
        }
    });

   return data;
}

module.exports={getData}