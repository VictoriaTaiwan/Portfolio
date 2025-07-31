import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  title = 'portfolio';
  mailForm!: FormGroup;
  mailStatus: string = '';
  tab!: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.mailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    this.tab = 'mobile'
  }

  setTab(tab:string): void {
    this.tab = tab;
    console.log(tab);
  }

  submitForm(): void {
    if (this.mailForm.invalid) return;
    this.mailStatus = 'Sending your message...';
    emailjs.send(
      'service_ta3oyte',
      'template_qf0s1yc',
      {...this.mailForm.value},
      'iS6a41VHZGf9_Y7r8'
    ).then(() => {
        this.mailStatus = 'Message sent successfully!';
        this.mailForm.reset();
      },
      (error) => {
        this.mailStatus = 'Failed to send message. Try again later.';
        console.error('EmailJS Error:', error);
      }
    );
  }
}
