import {
  LightningElement,
  api,
  track
} from 'lwc';

import ProfileFour from '@salesforce/resourceUrl/ProfileFour';

export default class OverviewSectionTable extends LightningElement {
  @api tasks;
  @track profile = ProfileFour;
}