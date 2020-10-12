import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import 'jspdf-autotable';
const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-adminlog',
  templateUrl: './adminlog.component.html',
  styleUrls: ['./adminlog.component.css']
})
export class AdminlogComponent implements OnInit {

  constructor(private gs:GlobalService) { }
  searchterm:any;
  logdata:any=[];
  ngOnInit() {
    //get log data
    this.gs.adminGetLogData().subscribe((data)=>{
      // console.log("A")
      if(data['message']=="no data existed")
      {
        alert(data['message'])
      }
      else
      {
         this.logdata=data['message'];
         console.log(this.logdata)
      }
        })

  }




   

/////////////////////////////////////////////pdf//////////////////////////////////////////////////

getData:any;

downloadPDF(){
 const doc = new jsPDF()
 var col=["empid","vehiclenumber","date","checkin","checkout"]
 var rows=[];
 this.logdata.forEach(element=>{
 let empid=element.empid;
 let vehiclenumber=element.vehiclenumber;
 let date=element.date;
 let checkin=element.checkin;
 let checkout=element.checkout;
 let temp=[empid,vehiclenumber,date,checkin,checkout];
 rows.push(temp);
 })
 console.log('rows',rows);

 doc.autoTable(col,rows,{
 theme:'grid'
 }) 
 doc.save('first.pdf')
}



public downloadFile(): void {
const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logdata);
const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames:
['data'] };
const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type:
'array' });
this.saveAsExcelFile(excelBuffer, 'excelFileName');
}
private saveAsExcelFile(buffer: any, fileName: string): void {
const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() +
EXCEL_EXTENSION);
}


}
