import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';


@Component({
  selector: 'app-adminsec',
  templateUrl: './adminsec.component.html',
  styleUrls: ['./adminsec.component.css']
})
export class AdminsecComponent implements OnInit {

  constructor(private gs:GlobalService) { }

getdata:any=[]
searchterm:any;
 
  ngOnInit() {
    this.gs.getdata1().subscribe((data)=>{
      this.getdata=data['message']
      

    })

  }


//post
  submitsecForm(input)
   {
     console.log(input)
   this.gs.senddata1(input).subscribe((data)=>{
    //  alert(data['message'])
     this.ngOnInit()

   })
   }

 obj:any=[]
   //edit
   edit(v)
   {
       this.obj=v
   }
   //update
   submitsecupdate(input)
   {
       this.gs.updatedata1(input).subscribe((data)=>{
         alert(data['message'])
         this.ngOnInit()

       })
   }
d:any;
   //delete
   delete(input)
   {
    console.log(input)
   
      this.d=confirm("Do you really want to delete")
      if(this.d==true)
      {
        this.gs.deletedata1(input).subscribe((data)=>{
        alert(data['message'])
        this.ngOnInit();
      })

      }
      else
      {
        this.ngOnInit();
      }

      
      
   

   }







 }