import {
  LightningElement,
  track,
  wire,
  api
} from 'lwc';
import Id from '@salesforce/user/Id';
import getTaskList from '@salesforce/apex/TaskController.getTaskList';


export default class OverviewSection extends LightningElement {
  @api index;

  @track loading_tasks = true;
  @track tasks;
  @track tasks_error;
  @track filteredTasks = undefined;
  @track toDoCount = 0;
  @track inProgressCount = 0;
  @track completedCount = 0;

  connectedCallback() {
    this.getUserTasks();
  }

  async getUserTasks() {
    console.log('Id: ', Id);
    try {
      let data = await getTaskList({ userId: Id });
      console.log('data: ', data);
      if (data.length > 0) {
        this.tasks = this.shapeTasks(data);
        if (this.tasks.length > 0) this.countTasks(this.tasks);
      }
      this.tasks_error = undefined;
    } catch (error) {
      console.log('error: ', error);
      this.tasks = undefined;
      this.tasks_error = error;
    } finally {
      this.loading_tasks = false;
    }
  }

  shapeTasks(data) {
    return data.map(task => {
      const dueDate = task.ActivityDate;
      const taskDueDate = new Date(dueDate);
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
      return {
        ...task,
        ActivityDate: dateTimeFormat.format(taskDueDate),
        NotStarted: task.Status === "Not Started",
        InProgress: task.Status === "In Progress",
        Completed: task.Status === "Completed"
      }
    });
  }

  countTasks(tasksList) {
    for (let i = 0; i < tasksList.length; i++) {
      if (tasksList[i].Status === "Not Started") this.toDoCount++;
      else if (tasksList[i].Status === "In Progress") this.inProgressCount++;
      else if (tasksList[i].Status === "Completed") this.completedCount++;
    }
  }

  setProgressRingToDo() {
    const offset = 376.99 - 50 / 100 * 376.99;
    this.template.querySelector('.progress-ring__circle').style.strokeDashoffset = offset;
  }

  resetTodos() {
    this.filteredTasks = undefined;
  }

  showToDoTasks() {
    this.filteredTasks = this.tasks.filter(task => task.Status === "Not Started");
  }

  showInProgressTasks() {
    this.filteredTasks = this.tasks.filter(task => task.Status === "In Progress");
  }

  showCompletedTasks() {
    this.filteredTasks = this.tasks.filter(task => task.Status === "Completed");
  }
}