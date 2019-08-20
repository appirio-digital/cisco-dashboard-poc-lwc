import { LightningElement, track, wire } from 'lwc';
import todaysMeetings from '@salesforce/apex/MeetingController.todaysMeetings';
import getEventRelations from '@salesforce/apex/MeetingController.getEventRelations';

export default class MeetingSection extends LightningElement {
  @track selectedId = '';

  @track meetings;
  @track meetings_error;

  @track eventRelations;
  @track eventRelations_error;

  @wire(todaysMeetings)
  wiredMeetings({ error, data }) {
    if (data) {
      if (data.length === 0) {
        this.meetings = undefined;
      } else {
        this.meetings = data;
        this.meetings_error = undefined;
      }
    } else if (error) {
      this.meetings = undefined;
      this.meetings_error = error;
    }
  }

  connectedCallback() {
    getEventRelations()
      .then(result => {
        this.eventRelations = result;
        this.eventRelations_error = undefined;
      })
      .catch(error => {
        this.eventRelations = undefined;
        this.eventRelations_error = error;
      });
  }

  selectMeeting(meetingId) {
    console.log('selectMeeting()');
    console.log('meetingId: ', meetingId);
    this.selectedId = meetingId;
    console.log('this.selectedId: ', this.selectedId);
  }
}