public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTaskList(){
        return [SELECT Id, OwnerId, Subject, Status, Description FROM Task];
    }
}
