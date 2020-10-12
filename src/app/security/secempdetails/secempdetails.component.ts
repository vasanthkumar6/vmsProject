import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-secempdetails',
  templateUrl: './secempdetails.component.html',
  styleUrls: ['./secempdetails.component.css']
})
export class SecempdetailsComponent implements OnInit {

  constructor(private gs:GlobalService) { }
  totalrecords:string
  page:number=1
  searchterm:any;
  
  submitempform(input)
  {
    
  }

  //read data
 
  getdata:any=[]
//get data
ngOnInit()
{
  this.gs.securityEmpData().subscribe((data)=>{ 
    if(data['message']=="no data existed")
    {
      alert(data['message'])
    }
    this.getdata=data['message']
    this.totalrecords=data['message'].length
    console.log(this.getdata)
  })
}
}
