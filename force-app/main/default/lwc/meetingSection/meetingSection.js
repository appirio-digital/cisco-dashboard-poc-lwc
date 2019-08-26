import { LightningElement, track } from 'lwc';
import todaysMeetings from '@salesforce/apex/MeetingController.todaysMeetings';

export default class MeetingSection extends LightningElement {
  @track meetings;
  @track meetings_error;
  @track selectedMeeting = '';
  @track loadingMeetings = true;

  async connectedCallback() {
    try {
      let data = await todaysMeetings();
      if (data.length === 0) {
        this.meetings = undefined;
      } else {
        this.meetings = data;
      }
      this.meetings_error = undefined;
    } catch (error) {
      this.meetings = undefined;
      this.meetings_error = error;
    } finally {
      this.loadingMeetings = false;
    }
  }

  // @wire(todaysMeetings)
  // wiredMeetings({ error, data }) {
  //   if (data) {
  //     if (data.length === 0) {
  //       this.meetings = undefined;
  //     } else {

  //     }
  //   } else if (error) {

  //   }
  //   this.loadingMeetings = false;
  // }

  selectMeeting(event) {
    const meetingId = event.detail.id;
    this.selectedMeeting = meetingId;
  }
}