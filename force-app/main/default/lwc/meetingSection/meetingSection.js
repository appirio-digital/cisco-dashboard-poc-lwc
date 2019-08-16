import { LightningElement } from 'lwc';

export default class MeetingSection extends LightningElement {
  meetings = [
    {id: '98sadrg9', title: 'Meeting with Google', time: '1:00 - 2:00 PM', location: 'Fancy Conference Room', numOfAttendees: 3},
    {id: 's9dfg8y', title: 'Meeting with Amazon', time: '9:00 - 10:00 AM', location: 'Fancy Conference Room', numOfAttendees: 52},
    {id: 'adfga98frg', title: 'Meeting with Facebook', time: '10:30 AM - 12:00 PM', location: 'Fancy Conference Room', numOfAttendees: 12},
    {id: 'a0s9fdga0s', title: 'Meeting with Microsoft', time: '3:00 - 5:00 PM', location: 'Fancy Conference Room', numOfAttendees: 23},
    {id: 'a09sfga09f', title: 'Meeting with Tesla', time: '10:00 - 11:30 AM', location: 'Fancy Conference Room', numOfAttendees: 17},
    {id: 'afs89ga8fg', title: 'Meeting with SpaceX', time: '8:00 - 10:00 AM', location: 'Fancy Conference Room', numOfAttendees: 15},
    {id: 'afga9fg', title: 'Meeting with Twitter', time: '1:00 - 2:00 PM', location: 'Fancy Conference Room', numOfAttendees: 18},
    {id: 'asd09fa9sd', title: 'Meeting with Instagram', time: '3:00 - 4:00 PM', location: 'Fancy Conference Room', numOfAttendees: 10}
  ];
}