import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
   DataBaseName:String="Employees";
   updatedDataBaseName:String="";
   errorStatus:string="";
   isError:boolean=false;
   
   employees:Employee[]= [];

    
    constructor(private _employeeDataService : EmployeeDataService) {
     
      
    }
    getEmployee(){
      this._employeeDataService.getEmployees().subscribe(
        data=>{
          for (let index = 0; index < data.length; index++) {
            data[index].isChecked=true;
            data[index].updateValue="Update";
            
          }
       
          this.employees=data
        },
        (error)=>{
          this.isError=true;
          this.errorStatus="Something Went Wrong..";
          console.log(error);
          
                });
      
    }

    
  
  ngOnInit(){
   
          this.getEmployee();
              
       }

   
    delete(value:any){
    
     this._employeeDataService.deleteEmployee(value).subscribe(
       (data) => {
                 console.log(data);
                 this.getEmployee()
                },
      (error)=>{
        this.errorStatus="Something Went Wrong..";
        console.log(error);
      
              }
          );
      }
     update(employee:any){
       if(employee.updateValue==="Update"){
        employee.isChecked=false;
        employee.updateValue="Save";
       }
       else{
        employee.isChecked=true;
        employee.updateValue="Update";
        this._employeeDataService.updateEmployee(employee)
        .subscribe(
          data => {
            console.log("comingghere");
            
              console.log(data.id);
              
          },
           error => {
              this.errorStatus = error.message;
              console.error('There was an error!', error);
          }
      );;
        console.log("value Updated");

       }

     }

  
}
 

  

