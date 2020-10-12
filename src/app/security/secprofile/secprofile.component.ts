import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Subscriber } from 'rxjs';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-secprofile',
  templateUrl: './secprofile.component.html',
  styleUrls: ['./secprofile.component.css']
})
export class SecprofileComponent implements OnInit {

  constructor(private gs:GlobalService) { }
  empid:any;
  profiledata:any;
  imageurl: String | ArrayBuffer="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWGwNnpEPUrNn5xOuZ0z13rgIFsNncxPI4yuu0A1Uo65C0_TQTw&s"
  display:boolean=true
  ngOnInit(): void {
 
 

  //getting params of security(empid)
    this.empid=this.gs.sendsecparams()
    

 //getting profile data
this.gs.secprofile(this.empid).subscribe((data)=>{
  
  this.profiledata=data['message']
  this.display=false
   this.imageurl=this.profiledata['imageurl']

  


})
  
 
}

file:File;
changeimage(f:File)
{
  console.log(f)
   this.file=f
    var  reader=new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload =()=>{
        this.imageurl=reader.result
      }
}



submitimage(form)
{
   form=this.profiledata
      var fd=new FormData()
      fd.append("photo",this.file)
      fd.append("userObj",JSON.stringify(form))
      this.gs.secpropic(fd).subscribe((data)=>{
        if(data['message']=="uploaded succesfully")
        {
          alert("uploaded succesfully")
        }
        else
        {
          alert("uploaded failed")
        }

      })
}
}
