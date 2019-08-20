import { LightningElement, api, track } from 'lwc';
import getEventRelations from '@salesforce/apex/MeetingController.getEventRelations';

export default class MeetingCard extends LightningElement {
  @api meeting;
  @api selectedId;
  @api selectMeeting;

  @track isFlipped = false;
  @track meetingStartDate = '';
  @track eventRelations;
  @track eventRelations_error;
  @track invites = 0;
  @track attending = 0;
  @track pending = 0;
  @track declined = 0;


  connectedCallback() {
    // fetch event relations
    this.getEventRelations();
    // format date
    this.formatStartEndDate();
    // determine if selected or not
    this.hideOrShowCard()
  }

  renderedCallback() {
    console.log('-----------------------------------------------------');
    console.log('renderedCallback()');
    console.log('meeting.Id: ', this.meeting.Id);
    console.log('selectedId: ', this.selectedId);
    console.log('selectMeeting: ', this.selectMeeting);
    console.log('-----------------------------------------------------');
    this.hideOrShowCard();
  }

  async getEventRelations() {
    // console.log('this.meeting.Id: ', this.meeting.Id);
    try {
      const result = await getEventRelations({ eventId: this.meeting.Id });
      this.eventRelations_error = undefined;
      this.eventRelations = result;
      for (let i = 0; i < this.eventRelations.length; i++) {
        let status = this.eventRelations[i].Status;
        if (status === 'New') {
          this.invites++; this.pending++;
        } else if (status === 'Declined') {
          this.invites++; this.declined++;
        } else if (status === 'Accepted') {
          this.invites++; this.attending++;
        }
      }
    } catch (error) {
      this.eventRelations_error = error;
      this.eventRelations = undefined;
      // console.log('Error: ', error);
    }
  }

  formatStartEndDate() {
    const startDateTime = this.meeting.StartDateTime;
    const endDateTime = this.meeting.EndDateTime;
    const meetingStartDateTime = new Date(startDateTime);
    const meetingEndDateTime = new Date(endDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
    this.meetingStartDate = dateTimeFormat.format(meetingStartDateTime);
    this.meetingEndDate = dateTimeFormat.format(meetingEndDateTime);
  }

  hideOrShowCard() {
    // if the card is the selected card
    console.log('-----------------------------------------------------');
    console.log('hideOrShowCard()');
    console.log('this.meeting.Id: ', this.meeting.Id);
    console.log('this.selectedId: ', this.selectedId);
    console.log('-----------------------------------------------------');
    if (this.meeting.Id === this.selectedId) {
      let meetingCard = this.template.querySelector('.meeting-card');
      meetingCard.style.opacity = "0.5";
    }
  }

  handleCardClick(e) {
    e.preventDefault();
    let meetingCard = this.template.querySelector('.meeting-card');
    if (this.isFlipped) {
      meetingCard.style.transform = "";
      this.isFlipped = false;
      this.selectMeeting('');
      this.setAttribute('selectedId', '');
    } else {
      meetingCard.style.transform = "rotateY(180deg)";
      this.isFlipped = true;
      this.selectMeeting(this.meeting.Id);
      this.setAttribute('selectedId', this.meeting.Id);
    }
  }

  handleViewDetailsClick(e) {
    e.preventDefault();
    // console.log('handleViewDetailsClick!!!');
  }
}