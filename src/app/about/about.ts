import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  // tacking img
  trackMousePosition(event: MouseEvent, tacking: HTMLElement) {
    const rect = tacking.getBoundingClientRect();
    const x = event.clientX - rect.left; // X position inside element
    const y = event.clientY - rect.top; // Y position inside element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation relative to the center
    const rotateX = (centerY - y) / 90; // invert Y for natural tilt
    const rotateY = (x - centerX) / 90;

    tacking.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    tacking.style.transition = 'transform 0.1s ease';

    // Optional subtle highlight effect
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    tacking.style.boxShadow = `${rotateY * 2}px ${
      rotateX * 2
    }px 20px rgba(0,0,0,0.2)`;
    tacking.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.15), transparent 60%)`;
  }

  stopTacking(tracking: HTMLElement){
    tracking.style.transform='rotateX(0deg) rotateY(0deg)';
  }
}
