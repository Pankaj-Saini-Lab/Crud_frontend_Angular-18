import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api_tabe_crud';

  CustForm = new FormGroup({
    id : new FormControl(0),
    name : new FormControl('' ,),
    email : new FormControl(''),
    password : new FormControl('')
  })

  list : any[] = [];

  http = inject(HttpClient);

  getapi(){
    this.http.get("http://localhost:8080/users").subscribe((res : any)=>{
      this.list = res;
    })
    
  }


  postApi(){
    const userobj = {
      custId: this.CustForm.get('id')?.value,
      name: this.CustForm.get('name')?.value,
      email: this.CustForm.get('email')?.value,
      password: this.CustForm.get('password')?.value,
    };
    this.http.post("http://localhost:8080/users", userobj).subscribe((res: any) => {
      this.getapi();
      this.CustForm.reset()
    })
  }


  userobj : any = {
    "id": "",
    "name": "",
    "email": "",
    "password": ""
  }

  onEdit(item: any) {
    this.userobj = { ...item }; 
    this.CustForm.patchValue({
      id: item.id,
      name: item.name,
      email: item.email,
      password: item.password
    });
  }

  putApi(uid : any){
    this.http.put('http://localhost:8080/users/'+uid , this.userobj).subscribe((res : any) => {
      this.getapi();
      this.CustForm.reset();
    })
  }
  
  deleteApi(userId: any) {
      this.http.delete('http://localhost:8080/users/'+userId).subscribe((res:any) => {
          this.getapi();
      })
    }

    gets(){
      this.http.get('http://localhost:8090/users/get').subscribe((result : any) => {
        this.list = result;
      })
    }
}