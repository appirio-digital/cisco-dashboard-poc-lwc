import {
  LightningElement,
  api
} from 'lwc';

export default class TaskRow extends LightningElement {
  @api task;
}