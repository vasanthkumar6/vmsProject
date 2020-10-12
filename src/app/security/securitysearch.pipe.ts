import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'securitysearch'
})
export class securitySearchPipe implements PipeTransform {

  transform(emp: any[], searchterm: any): any {



    if(searchterm==undefined)
    {
      return emp
    }
    // return null;
  
    return emp.filter((x)=>
      x['vehiclenumber'].toLowerCase().indexOf(searchterm.toLowerCase())!=-1
    )
  }

}
