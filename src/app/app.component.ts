import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  eventName: string;
  endDate: string | null;
  countdownText = '';
  private intervalId: any;

  constructor() {
    this.eventName = localStorage.getItem('eventName') || 'Midsummer Eve';
    this.endDate = localStorage.getItem('endDate') || "2024-06-22T00:00:00";
  }
  
  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (!this.endDate) {
      this.countdownText = 'Please set a valid end date.';
      return;
    }

    const endDate = new Date(this.endDate).getTime();
    this.updateCountdown(endDate);
    this.intervalId = setInterval(() => this.updateCountdown(endDate), 1000);
  }

  updateCountdown(endDate: number) {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      clearInterval(this.intervalId);
      this.countdownText = `${this.eventName} has ended.`;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countdownText = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }

  onEventNameChange(newName: string) {
    this.eventName = newName;
    localStorage.setItem('eventName', newName);
  }

  onEndDateChange(event: Event) {
    const newDate = (event.target as HTMLInputElement).value;
    this.endDate = newDate;
    localStorage.setItem('endDate', newDate);
    this.startCountdown();
  }
}
