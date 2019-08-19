import { LightningElement, track, wire } from 'lwc';
import todaysMeetings from '@salesforce/apex/MeetingController.todaysMeetings';

export default class MeetingSection extends LightningElement {
  @track
  meetings;

  @track
  meetings_error;

  @wire(todaysMeetings)
  wiredMeetings({ error, data }) {
    if (data) {
      this.meetings = data;
      this.meetings_error = undefined;
    } else if (error) {
      this.meetings = [];
      this.meetings_error = error;
    }
  }
}