import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-emplogbook',
  templateUrl: './emplogbook.component.html',
  styleUrls: ['./emplogbook.component.css']
})
export class EmplogbookComponent implements OnInit {

  constructor(private gs:GlobalService) { }
  logdata:any;
  empid:any;
  ngOnInit(): void {
    this.empid=this.gs.sendempparams()
     console.log(this.empid)
   this.gs.getEMPLog(this.empid).subscribe((data)=>{
     
   this.logdata=data['message']
     
   })



    }

}
