import { LightningElement, api, track } from 'lwc';

export default class MeetingCard extends LightningElement {
  @api meeting;
  @track isFlipped = false;

  handleCardClick(e) {
    e.preventDefault();
    let meetingCard = this.template.querySelector('.meeting-card');
    if (this.isFlipped === true) {
      meetingCard.style.transform = "";
      this.isFlipped = false;
    } else {
      meetingCard.style.transform = "rotateY(180deg)";
      this.isFlipped = true;
    }
  }
}