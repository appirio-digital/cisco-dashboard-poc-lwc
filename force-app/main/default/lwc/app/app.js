import { LightningElement } from 'lwc';
import HideLightningHeader from '@salesforce/resourceUrl/HideLightningHeader';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class App extends LightningElement {
  connectedCallback() {
    loadStyle(this, HideLightningHeader);
  }
}