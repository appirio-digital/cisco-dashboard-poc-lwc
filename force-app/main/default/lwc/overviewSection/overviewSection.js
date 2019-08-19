import {
  LightningElement
} from 'lwc';

export default class OverviewSection extends LightningElement {
  toDoCount = 42;
  inProgressCount = 892;
  completedCount = 350;



  tasks = [{
      id: '12hj433',
      title: 'Set up meeting',
      status: 'To Do'
    },
    {
      id: '124rffe',
      title: 'Customer Survey',
      status: 'In Progress'
    },
    {
      id: 'vfsw423',
      title: 'Phone Calls',
      status: 'Completed'
    },
    {
      id: 'vfs23r4',
      title: 'Check Email',
      status: 'Completed'
    },
    {
      id: 'dawrgr2',
      title: 'Format data',
      status: 'In Progress'
    },
    {
      id: 'bfe4552',
      title: 'Set up meeting',
      status: 'To Do'
    },
    {
      id: '6twet89',
      title: 'Team Meeting',
      status: 'In Progress'
    },
    {
      id: 'h492742',
      title: 'Get Coffee',
      status: 'To Do'
    },
    {
      id: '099jehh',
      title: 'Employee Review',
      status: 'To Do'
    },
    {
      id: '78923hf',
      title: 'Make Phone Calls',
      status: 'Completed'
    },
    {
      id: 'lkj972k',
      title: 'Customer Facing Meeting',
      status: 'Completed'
    },
    {
      id: '890dssh',
      title: 'Bill Customer',
      status: 'To Do'
    },
    {
      id: 'sd89033',
      title: 'Set up meeting',
      status: 'To Do'
    },
    {
      id: '2389dd9',
      title: 'Deliver Project',
      status: 'In Progress'
    },
    {
      id: 'kji3339',
      title: 'Hire Interns',
      status: 'To Do'
    }
  ];

}