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
  eventName = 'Midsummer Eve';
  endDate: string | null = "2024-06-22T00:00:00"; 
  countdownText = '';
  private intervalId: any;

  constructor() {
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
}
