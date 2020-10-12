import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import 'jspdf-autotable';
const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-seclogbook',
  templateUrl: './seclogbook.component.html',
  styleUrls: ['./seclogbook.component.css']
})
export class SeclogbookComponent implements OnInit {
  dataString;

  constructor(public gs: GlobalService) { }
  getdata: any = []
  logdata: any = []
  obj: any = []
  searchterm: any;



  ngOnInit(): void {


    // getting emp data by security
    this.gs.getdata().subscribe((data) => {
      if (data['message'] == "no data existed") {
        alert(data['message'])
      }
      this.getdata = data['message']
      console.log(this.getdata)
    })

    //  getting log data by security

    this.gs.securityGetLogData().subscribe((data) => {
      console.log("data")
      this.logdata = data['message']
      console.log(this.logdata)
    })



  }



  //update log data

  edit(v) {
    this.obj = v
  }
  updatelogForm(y) {
    console.log(y)
    this.gs.updatelogdata(y).subscribe((data) => {
      alert(data["message"])
      this.ngOnInit();
    })

  }






  //log book(send data)
  submitlogForm(input) {
    console.log(input)
    this.gs.senddatalog(input).subscribe((data) => {

      alert(data['message'])
      this.ngOnInit()

    })
  }


  // getlog()
  // {
  //   this.gs.getlogdata().subscribe((data)=>{
  //      data['message']
  //   })
  // }




  // file:File
  // fileUpload(filedata)
  // {
  //   let workBook = null;
  //   let jsonData = null;
  //   const reader = new FileReader();
  //   const file = filedata.target.files[0];
  //   reader.onload = (event) => {
  //     const data = reader.result;
  //     workBook = XLSX.read(data, { type: 'binary' });
  //     jsonData = workBook.SheetNames.reduce((initial, name) => {
  //       const sheet = workBook.Sheets[name];
  //       initial[name] = XLSX.utils.sheet_to_json(sheet);
  //       return initial;
  //     }, {});
  //     this.dataString = JSON.stringify(jsonData);


  //   }
  //   reader.readAsBinaryString(file);
  // }


 

  // fileUpload(filedata) 
  // {
  //   this.file = filedata.target.file[0]
  // }


  // uploadExcel(data) {

  //   // this.gs.setlog(this.dataString['Sheet1']).subscribe((res)=>
  //   // this.gs.setlog(data).subscribe((res)=>

  //   let formdata = new FormData();
  //   formdata.append("EMPID", data.EMPID);
  //   formdata.append("NAME", data.NAME);
  //   formdata.append("CHECKIN", data.CHECKIN);
  //   formdata.append("CHECKOUT", data.CHECKOUT);
  //   formdata.append("file", this.file, this.file.name);
  //   this.gs.setlog(data).subscribe((res) => {

  //     if (res["message"] == "log sheet uploaded sucessfully") {
  //       alert(res["message"])
  //     }
  //     else if (res["err_desc"] == "Corupted excel file") {
  //       alert(res["err_desc"])
  //     }
  //   })
  //   console.log("json data");

  // }










////////////////////////////////////////////////excel file upload///////////////////////////////////////////////
//upload file

  file:File;
fileUpload(filedata){

this.file=filedata.target.files[0];
}

//upload excel
 uploadExcel(data){
   console.log(data)

 let formdata = new FormData();
//  formdata.append("branch",data.branch);
//  formdata.append("year",data.year);
 formdata.append("uploadfile",this.file,this.file.name);
 this.gs.setlog(formdata).subscribe((res)=>{
 if(res["message"]=="log sheet uploaded sucessfully")
 {
 alert(res["message"]);
 this.ngOnInit();
 }
 else if(res["err_desc"]=="Corupted excel file"){
 alert(res["err_desc"]);
 }
})
 }

//////////////////////////////////////////////pdf//////////////////////////////////////////////////

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