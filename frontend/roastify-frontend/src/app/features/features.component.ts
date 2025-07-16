import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  features = [
    {
      emoji: '🤖',
      title: 'AI-Powered Roasts',
      description: 'Our advanced AI analyzes your photo and crafts personalized, hilarious roasts just for you.'
    },
    {
      emoji: '🌍',
      title: 'Multiple Languages',
      description: 'Get roasted in your native language! We support English, Telugu, Hindi, and more.'
    },
    {
      emoji: '😂',
      title: 'Savage but Safe',
      description: 'Our roasts are designed to be funny and entertaining, never cruel or offensive.'
    },
    {
      emoji: '⚡',
      title: 'Lightning Fast',
      description: 'Upload your photo and get your roast in seconds. No waiting around!'
    }
  ];
}
