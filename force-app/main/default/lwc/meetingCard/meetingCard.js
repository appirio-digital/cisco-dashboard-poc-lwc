import { LightningElement, api, track } from 'lwc';

export default class MeetingCard extends LightningElement {
  @api meeting;
  @track isFlipped = false;
  @track meetingStartDate = '';

  connectedCallback() {

    const meetingStartDateTime = new Date(this.meeting.StartDateTime);
    console.log('meetingStartDateTime: ', meetingStartDateTime);
    const meetingEndDateTime = new Date(this.meeting.EndDateTime);
    console.log('meetingEndDateTime: ', meetingEndDateTime);

    const dateTimeFormat = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });

    this.meetingStartDate = dateTimeFormat.format(meetingStartDateTime);
    this.meetingEndDate = dateTimeFormat.format(meetingEndDateTime);
  }

  handleCardClick(e) {
    e.preventDefault();
    let meetingCard = this.template.querySelector('.meeting-card');
    if (this.isFlipped) {
      meetingCard.style.transform = "";
      this.isFlipped = false;
    } else {
      meetingCard.style.transform = "rotateY(180deg)";
      this.isFlipped = true;
    }
  }

  handleViewDetailsClick(e) {
    e.preventDefault();
    console.log('handleViewDetailsClick!!!');
  }
}