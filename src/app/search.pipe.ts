 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(getdata:any[],searchterm:string): any {

    if(searchterm==undefined)
    {
      return getdata
    }
    
    // return getdata.filter((x)=>{
    //    x['name'].toLowerCase().indexf(searchterm.toLowerCase())!==-1
    // })

      
    return getdata.filter((x)=>x['empid'].toLowerCase().indexOf(searchterm.toLowerCase())!==-1)

 
  }
}
