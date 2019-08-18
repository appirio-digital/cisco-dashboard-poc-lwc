import { LightningElement } from 'lwc';

export default class OverviewSection extends LightningElement {
  toDoCount = 7;
  inProgressCount = 4;
  completedCount = 4;



  tasks = [
    {id:'12hj433', title: 'Set up meeting', status:'To Do'},
    {id:'124rffe', title: 'Set up meeting', status:'In Progress'},
    {id:'vfsw423', title: 'Set up meeting', status:'Completed'},
    {id:'vfs23r4', title: 'Set up meeting', status:'Completed'},
    {id:'dawrgr2', title: 'Set up meeting', status:'In Progress'},
    {id:'bfe4552', title: 'Set up meeting', status:'To Do'},
    {id:'6twet89', title: 'Set up meeting', status:'In Progress'},
    {id:'h492742', title: 'Set up meeting', status:'To Do'},
    {id:'099jehh', title: 'Set up meeting', status:'To Do'},
    {id:'78923hf', title: 'Set up meeting', status:'Completed'},
    {id:'lkj972k', title: 'Set up meeting', status:'Completed'},
    {id:'890dssh', title: 'Set up meeting', status:'To Do'},
    {id:'sd89033', title: 'Set up meeting', status:'To Do'},
    {id:'2389dd9', title: 'Set up meeting', status:'In Progress'},
    {id:'kji3339', title: 'Set up meeting', status:'To Do'}
  ];

}