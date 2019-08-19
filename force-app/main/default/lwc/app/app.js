import { LightningElement } from 'lwc';
import CSSUtils from '@salesforce/resourceUrl/CSSUtils';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class App extends LightningElement {
  connectedCallback() {
    loadStyle(this, CSSUtils);
  }
}