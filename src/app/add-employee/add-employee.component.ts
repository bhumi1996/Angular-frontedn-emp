import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent  implements OnInit {

   
  newEmployee=new Employee();
 
  constructor(private _employeeDataService : EmployeeDataService) { }

  

  addEmployee(){
    
  this._employeeDataService.addEmployee(this.newEmployee).subscribe(data=>{console.log(data)});
         }
  ngOnInit(): void {
  }

}
