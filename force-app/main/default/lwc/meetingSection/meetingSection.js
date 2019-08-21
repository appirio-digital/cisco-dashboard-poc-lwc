import { LightningElement, track, wire } from 'lwc';
import todaysMeetings from '@salesforce/apex/MeetingController.todaysMeetings';

export default class MeetingSection extends LightningElement {
  @track meetings;
  @track meetings_error;
  @track selectedMeeting = '';

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

  selectMeeting(event) {
    const meetingId = event.detail.id;
    this.selectedMeeting = meetingId;
  }
}