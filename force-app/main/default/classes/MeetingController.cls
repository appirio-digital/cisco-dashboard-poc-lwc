public with sharing class MeetingController {
    @AuraEnabled(cacheable=true)
    public static List<Event> todaysMeetings() {
        return [SELECT Id, ActivityDate, Description, DurationInMinutes, EndDateTime, Location, WhoId, IsPrivate, WhatId, StartDateTime, Subject, ActivityDateTime, Event_Logo_Path__c FROM Event WHERE StartDateTime = TODAY ORDER BY StartDateTime];
    }

    @AuraEnabled(cacheable=true)
    public static List<EventRelation> getEventRelations(String eventId) {
        return [SELECT Id, EventId, Response, Status FROM EventRelation WHERE EventId = :eventId];
    }
}