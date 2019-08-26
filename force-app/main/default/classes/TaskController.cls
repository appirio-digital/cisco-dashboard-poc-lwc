public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTaskList(Id userId){
        return [SELECT Id, OwnerId, Subject, Status, Description, ActivityDate, Priority FROM Task WHERE OwnerId = :userId];
    }
}
