import { Routes } from '@angular/router';
import { CV } from './src/pages/cv/cv';
import { Home } from './src/pages/home/home';
import { CS } from './src/pages/cs/cs';
import { NLP } from './src/pages/nlp/nlp';

export const routes: Routes = [
  { path: '', component: Home, title: 'Ian Rodriguez: Home' },
  { path: 'pages/cv', component: CV, title: 'Ian Rodriguez: CV' },
  { path: 'pages/cs', component: CS, title: 'Ian Rodriguez: CS Projects' },
  { path: 'pages/nlp', component: NLP, title: 'Ian Rodriguez: NLP Projects' },
  { path: '**', redirectTo: '' },
];
