import { LightningElement, track, wire } from 'lwc';
import getTaskList from '@salesforce/apex/TaskController.getTaskList';


export default class OverviewSection extends LightningElement {
  @track toDoCount = 0;
  @track inProgressCount = 0;
  @track completedCount = 0;

  @track
  tasks;

  @track
  tasks_error;

  @wire(getTaskList)
  wiredTasks({ error, data }) {
    if (data) {
      this.tasks = data;
      this.countTasks(this.tasks);
      this.tasks_error = undefined;
    }
    else if (error) {
      this.tasks = [];
      this.tasks_error = error
    }
  }

  countTasks(tasksList) {
    for (let i = 0; i < tasksList.length; i++) {
      if (tasksList[i].Status === "Not Started") {
        this.toDoCount += 1;
      } else if (tasksList[i].Status === "In Progress") {
        this.inProgressCount += 1;
      } else if (tasksList[i].Status === "Completed") {
        this.completedCount += 1;
      }
    }
  }
}