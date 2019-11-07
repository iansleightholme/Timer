var sets;

function loadSettings() {
    sets = getSettingSets();
    setHelp();
}


function getSettings() { return getSettingsByName('active'); }

// #region private and helper functions

function loadValues(name) {
    var settings = getSettingsByName(name);
    if (settings == null)
      return;

    setValue('boardsPerRound', settings.boardsPerRound);
    setValue('numRounds', settings.rounds);
    setValue('displayName', settings.title);
    setCheck('hasTones', settings.tones);
    setCheck('hasVoice', settings.voiceCommands);
    setValue('hasPause', settings.pause);
    setValue('numPause', settings.pauseAfterRound);
    setValue('boardTime', settings.boardTime);
    setValue('overtime', settings.overtime);
    setCheck("autoCalcOvertime", false);
    setValue('movetime', settings.moveTime);
    setCheck('hasAverage', settings.average);
    setOption('averageOption', 'percent');
    setValue('averagePercent', 'averagePercent');
    setValue('averageSeconds', 'averageSeconds');
}

function setHelp() {
    setHelpToolTip('basicHelp', getHelp('basic'));
    setHelpToolTip('startHelp', getHelp('start'));
    setHelpToolTip('timesHelp', getHelp('times'));
    setHelpToolTip('soundsHelp', getHelp('sounds'));
    setHelpToolTip('pauseHelp', getHelp('pause'));
    setHelpToolTip('averagingHelp', getHelp('averaging'));
}

function setValue(name, value) { document.getElementById(name).value = value; }
function setCheck(name, value) { document.getElementById(name).checked = value; }
function setSelect(name, value) { document.getElementById(name).setSelect(); }
function setHelpToolTip(id, html) { document.getElementById(id).innerHTML = html; }

function getSettingsByName(name) {
    if (sets == null)
        sets = getSettingSets();

    for (i=0; i < sets.sets.length; i++) {
        if (settings.sets[i].name == name && settings.sets[i].enabled)
            return settings.sets[i];
    }
}

function getSettingSets() {
    return {
        "sets": [
        {
            "version": "1.0",
            "enabled": true,
            "isDefault": true,
            "name": "active",
            "displayName": "Hollies Club",
            "boardsPerRound": 3,
            "rounds": 8,
            "tones": false,
            "voiceCommands": true,
            "pause": true,
            "pauseAfterRound": 4,
            "pauseRepeat": false,
            "pauseTime": 600,
            "boardTime": 375,
            "overtime": 160,
            "autoCalcOvertime": true,
            "moveTime": 90,
            "average": true,
            "averageOption": "percent",
            "averagePercent": 60,
            "averageSeconds": 90 
        },
        {
            "version": "1.0",
            "enabled": true,
            "isDefault": false,
            "name": "factory",
            "displayName": "Bridge Timer",
            "boardsPerRound": 3,
            "rounds": 8,
            "tones": true,
            "voiceCommands": true,
            "pause": false,
            "pauseAfterRound": 4,
            "pauseRepeat": false,
            "pauseTime": 600,
            "boardTime": 375,
            "overtime": 160,
            "autoCalcOvertime": true,
            "moveTime": 90,
            "average": true,
            "averageOption": "percent",
            "averagePercent": 60,
            "averageSeconds": 90 
        },
        {
            "version": "1.0",
            "enabled": true,
            "isDefault": false,
            "name": "8 rounds of 3 boards",
            "displayName": "My Local Bridge Club",
            "boardsPerRound": 3,
            "rounds": 9,
            "tones": true,
            "voiceCommands": true,
            "pause": true,
            "pauseAfterRound": 3,
            "pauseTime": 600,
            "pauseRepeat": true,
            "boardTime": 375,
            "overtime": 160,
            "autoCalcOvertime": false,
            "moveTime": 100,
            "average": true,
            "averageOption": "percent",
            "averagePercent": 100,
            "averageSeconds": 300
        }
    ]};  
}

// #endregion private and helper functions