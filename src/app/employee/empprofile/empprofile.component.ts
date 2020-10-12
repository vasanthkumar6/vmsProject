import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-empprofile',
  templateUrl: './empprofile.component.html',
  styleUrls: ['./empprofile.component.css']
})
export class EmpprofileComponent implements OnInit {

  constructor(private hc:HttpClient, private gs:GlobalService) { }
empid:any;
 profiledata:object;
 dispaly:boolean=false
  ngOnInit(): void {



  this.empid=this.gs.sendempparams()
  // console.log(this.empid)
 
  
           //getting profile data
           this.gs.profile(this.empid).subscribe((data)=>{
             this.profiledata=data['message']
             console.log(this.profiledata)
             this.imageurl=this.profiledata['imageurl']
             this.dispaly=true

           })
     

  }
   
 
  //file
  file:File
  imageurl:string| ArrayBuffer="https://www.w3schools.com/howto/img_avatar.png"

  changeimage(f:File)
  {
     console.log(f)
     this.file=f
     var reader =new FileReader()

     reader.readAsDataURL(this.file)

     reader.onload =()=>{
          this.imageurl=reader.result
     }
  }



  submitform(formObj)
  {
    formObj=this.profiledata
    console.log("submitform",formObj)
    var fd= new FormData()
    fd.append("photo",this.file)
    fd.append("userObj",JSON.stringify(formObj))
    this.gs.emppropic(fd).subscribe((data)=>{
      if(data["message"]=="uploaded succesfully")
      {
        alert("uploaded succesfully")
      }
      else{
        alert("failed to upload")
      }
    })
  }
}
