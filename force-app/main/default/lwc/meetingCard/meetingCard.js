import { LightningElement, api, track } from 'lwc';
import getEventRelations from '@salesforce/apex/MeetingController.getEventRelations';

import AtlantaBravesLogo from '@salesforce/resourceUrl/AtlantaBravesLogo';
import SAPLogo from '@salesforce/resourceUrl/SAPLogo';
import MontanaStateLogo from '@salesforce/resourceUrl/MontanaStateLogo';
import WiproLogo from '@salesforce/resourceUrl/WiproLogo';

import ProfileOne from '@salesforce/resourceUrl/ProfileOne';
import ProfileTwo from '@salesforce/resourceUrl/ProfileTwo';
import ProfileFive from '@salesforce/resourceUrl/ProfileFive';
import ProfileSeven from '@salesforce/resourceUrl/ProfileSeven';

export default class MeetingCard extends LightningElement {
  @api meeting;
  @api selectedMeeting;

  @track isFlipped = false;
  @track meetingStartDate = '';
  @track eventRelations;
  @track eventRelations_error;
  @track invites = 0;
  @track attending = 0;
  @track pending = 0;
  @track declined = 0;
  @track logo;
  profile_one = ProfileOne;
  profile_two = ProfileTwo;
  profile_three = ProfileFive;
  profile_four = ProfileSeven;

  connectedCallback() {
    // determine logo for event
    this.determineLogo();
    // fetch event relations
    this.getEventRelations();
    // format date
    this.formatStartEndDate();
  }

  determineLogo() {
    if (this.meeting.Event_Logo_Path__c === "braves.png") {
      this.logo = AtlantaBravesLogo;
    } else if (this.meeting.Event_Logo_Path__c === "montana_state.png") {
      this.logo = MontanaStateLogo;
    } else if (this.meeting.Event_Logo_Path__c === "sap.png") {
      this.logo = SAPLogo;
    } else if (this.meeting.Event_Logo_Path__c === "wipro.png") {
      this.logo = WiproLogo;
    } else {
      this.logo = 'https://via.placeholder.com/100';
    }
  }

  async getEventRelations() {
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

  generateRandomColor() {
    let randomIndex = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    this.backColor = this.colors[randomIndex];
  }

  handleCardClick(e) {
    e.preventDefault();
    let meetingCard = this.template.querySelector('.meeting-card');
    if (this.isFlipped) {
      meetingCard.style.transform = "";
      this.isFlipped = false;
      this.dispatchEvent(new CustomEvent('select', { detail: { id: '' } }));
    } else {
      meetingCard.style.transform = "rotateY(180deg)";
      this.isFlipped = true;
      const selectedEvent = new CustomEvent('select', { detail: { id: this.meeting.Id } });
      this.dispatchEvent(selectedEvent);
    }
  }

  // showOrHideCard() {
  //   // NOT WORKING AT THE MOMENT
  //   if (this.selectedMeeting === '') return;
  //   if (this.meeting.Id !== this.selectedMeeting) {
  //     let meetingCard = this.template.querySelector('.meeting-card');
  //     meetingCard.style.opacity = "0.5";
  //   }
  // }

  handleViewDetailsClick(e) {
    e.preventDefault();
  }
}