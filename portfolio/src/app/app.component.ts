import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
  mailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.mailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.mailForm.valid) {
      const payload = this.mailForm.value;

      this.http.post('https://happy-dodie-iries-dev-672a5762.koyeb.app/mail', payload).subscribe({
        next: () => alert('Message sent successfully!'),
        error: (error) => {
          console.error('Failed to send message', error);
          alert('Failed to send message.');
        }
      });
    }
  }

}
