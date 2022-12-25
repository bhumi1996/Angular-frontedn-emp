import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Employee } from './Employee';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private http:HttpClient) { }

  //private _url:string="../assets/data/EmployeeDetails.json";
  private baseUrl:string="http://localhost:3000/";
   
  getEmployees(): Observable<Employee[]>{
    return  this.http.get<Response>(this.baseUrl+'Employees').
    pipe(map((response:Response)=><Employee[]><unknown>response),
    catchError((err) => {
      console.log('error caught in service')
       return throwError(err);  
    })
    );
    
  }
  
  addEmployee(employee:Employee): Observable<Employee> {
    console.log("in service");
    console.log(employee);
    
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(employee);
  
    console.log(body)
    return this.http.post<Employee>(this.baseUrl+'Employees', body,{'headers':headers})
  }
  deleteEmployee (employeeId:string):Observable<Employee>{
    console.log("coming in delete Service"+employeeId);
    
   return this.http.delete<Employee>(this.baseUrl+'Employees/'+employeeId)
        };


   updateEmployee(employee:Employee):Observable<Employee>{
     console.log(employee);
     const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(employee);

     return this.http.put<Employee>(this.baseUrl+'Employees/'+employee.id, body,{'headers':headers});
   }
       
} 
 