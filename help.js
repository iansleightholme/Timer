function getHelp(topic) {
    switch(topic) {
        case 'start':
            return getHelpStart();
        case 'times':
            return getHelpTimes();
        case 'sounds':
            return getHelpSounds();
        case 'pause':
            return getHelpPause();
        case 'averaging':
            return getHelpAveraging();
        case 'basic':
            return getHelpBasic();
    }
}

function getHelpStart() {
    return "This screen shows all the configurable settings for the timer. \n\n\
\"Boards per round\", \"Number of rounds\" and \"Title/club name\" should be amended to the correct values for the session.  \n\n\
All settings other than those mentioned above contain default values that are broadly standard and may be accepted unchanged.  \n\n\
The green box on the right shows a brief summary/overview of the session with the currently configured options.  Primarily, this is given as a reasonableness check on the configured options.   \n\n\
Further help is available by clicking on the blue i's.  \n\n\
This timer is designed to be viewed by a session director initially seated at a normal distance from the monitor and by bridge players seated some way from the screen.  Inactive buttons (used only by the director) fade out to invisible but will reappear as the mouse is moved anywhere on the screen.";
}

function getHelpSounds() {
    return "Some events trigger short sound notifications/tones.  In most situations, these sounds will be unobtrusive, but if silence is required then they can be disabled. \n\n\
Voice commands tell players \"no new boards\" and \"move for the next round\".  \n\n\
A volume control and mute button are available during play.  \n\n\
Speakers are required.";
}

function getHelpPause() {
    return "It is possible to pause play at any point during the session using the \"Pause\" button. \n\n\
It is also possible to pause play automatically at the end of each round just before the move to the next round.  Play is restarted using the \"Play\" button.  However, if the director cannot click buttons without getting up from their table, restarting play after every round may prove tiresome.  A remote mouse/\"presenter\" is suggested as a solution. \n\n\
A director might also choose to automatically pause play for an intermission after a number of rounds.";
}

function getHelpTimes() {
    return "It is anticipated that after some time, you will modify these timings based on experience and preference.  However, initially, you might like to accept the defaults or use a method below to set these figures. \n\n\
Method 1 (Gentle): \n\
Consider a slow playing pair (who will play in the session to follow).  \n\n\
Set the average board time as the average time taken by this pair to complete one board. (eg. 360 seconds ~ 6 minutes) \
Now consider an upper limit time for a single board, within which the pair complete most (80-95%) of the boards they play. (eg. 450 seconds ~ 7½ minutes) \n\n\
Take the upper limit board time minus the average board time and multiply the result by the square root of the boards per round.  Round/approximate this answer and enter it as round overtime. \n\n\
For example: \n\
Boards per round:    4 \n\
Average board time:    6 minutes (360 seconds) \n\
80-90% of boards are completed within:    7½ minutes (450 seconds) \n\
Round overtime = approx (450 sec - 360 sec) *  √4 boards \n\
  = 180 seconds  \n\n\
Method 1A (Aggressive):  \n\
As method 1, but consider an average or faster playing pair.";
}

function getHelpAveraging() {
    return "Within each round, a director might signal to all players that any remaining, unplayed boards (in this round) should not be started and instead scored as \"average\". \n\n\
Enter a time measured from the end of the round (standard playing time & overtime), either as a percentage of an average board time or as seconds.\n\n\
Either way, it should be close the time to play an average board.  Any less and any board started with less than the average board time will most likely cause the round to overrun (for all players); any more and boards which could have been played will be averaged.\n\n\
During play, the point at which \"no new boards\" will be signalled is indicated by a small orange diamond positioned on the perimeter of the timer \"clock\" face.";
}

function getHelpBasic() {
    return "The only essential items to enter before clicking \"Next\" are the number of boards per round and the number of rounds.\n\n\
The total number of boards, total session time (hours and minutes) and number of boards to be played per hour are displayed.  Please note the \"session time\"  and \"boards per hour\" make no allowance for any refreshment interval or other paused time.\n\n\
It is assumed that the director and at least some of the players are able to follow the progress of the timer on a display during play.\n\n\
Once play starts there are \"pause\", \"jump on to next hand\" and \"go back to last hand\" buttons in addition to a slider on the time line to enable the director to reposition the timer during play.  Use of these buttons will change the \"projected session end time\" displayed.\n\n\
It is not possible to alter any to the basic settings during play.\n\n\
The standard timings can be adjusted to fine tune the session time as appropriate. A round is divided into three sections, \"normal play\", \"overtime\" and \"move for the next round\" time.  The basic speeds and balance between these is for the director to decide.\n\n\
Averaging Boards - A prompt to \"average remaining boards\" will be given by default.\n\n\
Pause between Rounds Option - The director may choose to halt this timer, either at every round or for a refreshment interval.\n\n\
Sounds - Sounds are used by default for prompts.";
}