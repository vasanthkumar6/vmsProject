import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';


declare var $:any;

@Component({
  selector: 'app-adminemp',
  templateUrl: './adminemp.component.html',
  styleUrls: ['./adminemp.component.css']
})
export class AdminempComponent implements OnInit {

constructor(private gs:GlobalService) { }

searchterm:any;
getdata:any=[];
value:any=[];
logdata:any=[];

// //post data
  submitEmpForm(input)
  {
    //console.log(input)
    this.gs.senddata(input).subscribe((data)=>{
      if((data['message'])=="data inserted sucesfully")
      {
        // alert(data['message'])
        $("myModal").modal("hide")
        this.ngOnInit();
       
      }
      else
      {
        alert(data['message'])
      }
    })
  }

//get emp and log data
  ngOnInit()
  {

    //get emp data 
    this.gs.getdata().subscribe((data)=>{ 
      if(data['message']=="no data existed")
      {
        alert(data['message'])
      }
      this.getdata=data['message']
      console.log(this.getdata)
    })


  

  }
  


//update data
update(v)
{
    this.value=v
}

submitEmpupdate(update)
{
  console.log(update)
this.gs.updatedata(update).subscribe((data)=>{
   if(data['message']=="data updated sucessfully")
   {
      alert(data['message'])
      $("myModal1").modal("hide")
      this.ngOnInit()
    
       }
   else
   {
     alert(data['message'])
   }
})
}

//delete data
delete(i)
{
  // console.log(i)
  var d=confirm('do yo really want to delete')
  if(d==true){
  this.gs.deletedata(i).subscribe((data)=>{
    if(data['message']=='no employee existed')
    {
        alert(data['message'])
    }
    else(data['message']=='data deleted sucessfully')
    {
      alert(data['message'])
      this.ngOnInit()

    }
  })
}
else{
  this.ngOnInit();
}
}





















}



