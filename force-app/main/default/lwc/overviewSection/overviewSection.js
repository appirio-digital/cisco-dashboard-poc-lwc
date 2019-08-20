import {
  LightningElement,
  track,
  wire,
  api
} from 'lwc';
import getTaskList from '@salesforce/apex/TaskController.getTaskList';


export default class OverviewSection extends LightningElement {
  @track toDoCount = 0;
  @track inProgressCount = 0;
  @track completedCount = 0;

  @api index;

  @track tasks;

  @track tasks_error;

  @wire(getTaskList)
  wiredTasks({
    error,
    data
  }) {
    if (data) {
      if (data.length > 0) {
        this.tasks = this.shapeTasks(data);
        if (this.tasks.length > 0) {
          this.countTasks(this.tasks);
        }
      }
      this.tasks_error = undefined;
    } else if (error) {
      this.tasks = [];
      this.tasks_error = error
    }
  }

  shapeTasks(data) {
    return data.map(task => {
      return {
        ...task,
        NotStarted: task.Status === "Not Started",
        InProgress: task.Status === "In Progress",
        Completed: task.Status === "Completed"
      }
    })
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