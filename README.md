# pca-voting

PCA is a unique "unconference" event where speakers make quick 30 second session proposals and attendees get to vote on what sessions they would like to attend. The top 25 sessions are then scheduled into 5 timeslots, 5 concurrent sessions running at a time.

This project was created to assist in scheduling sessions. With more than 200 votes (of up to 5 sessions) it is not possible for someone to look at the votes in a short period of time and minimize conflicts.

There are a few tools here assist with scheduling:

##calcConflict.js
This takes a set of user surveys, and a proposed schedule, and calculates how many conflicts occur.

C:\PCA>node calcConflict.js sampledata.csv sampleschedule.csv
Total Conflicts: 182
Users with 0 conflicts: 73
Users with 1 conflicts: 98
Users with 2 conflicts: 36
Users with 3 conflicts: 4

##mostConflicts.js
This takes a set of user surveys (and a list of the top 25 surveys for simplicity) and calculates the top combinations of sessions that attendees want to attend.

** WORK IN PROGRESS**

