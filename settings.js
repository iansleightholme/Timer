function load() {
    setHelp();
}

function setHelp() {
    document.getElementById('basicHelp').setAttribute('title', getHelp('basic'));
    document.getElementById('startHelp').setAttribute('title', getHelp('start'));
    document.getElementById('timesHelp').setAttribute('title', getHelp('times'));
    document.getElementById('soundsHelp').setAttribute('title', getHelp('sounds'));
    document.getElementById('pauseHelp').setAttribute('title', getHelp('pause'));
    document.getElementById('averagingHelp').setAttribute('title', getHelp('averaging'));
}

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

  function setValue(name, value) { document.getElementById(name).value = value; }
  function setCheck(name, value) { document.getElementById(name).checked = value; }
  function setSelect(name, value) { document.getElementById(name).setSelect(); }

  function getSettingsByName(name) {
    var settings = getSettings();
    for (i=0; i < settings.sets.length; i++) {
      if (settings.sets[i].name == name && settings.sets[i].enabled)
        return settings.sets[i];
    }
  }

function getSettings() {
    return {
        "sets": [
        {
            "version": "1.0",
            "enabled": true,
            "name": "8 rounds of 3 boards",
            "displayName": "My Local Bridge Club",
            "boardsPerRound": "3",
            "rounds": "9",
            "tones": true,
            "voiceCommands": true,
            "pause": true,
            "pauseAfterRound": "3",
            "boardTime": "375",
            "overtime": "160",
            "autoCalcOvertime": false,
            "moveTime": "100",
            "average": true,
            "averageOption": "percent",
            "averagePercent": "100",
            "averageSeconds": "300" 
        },
        {
            "version": "1.0",
            "enabled": true,
            "name": "Friday evening",
            "displayName": "My Local Bridge Club",
            "boardsPerRound": "4",
            "rounds": "6",
            "tones": false,
            "voiceCommands": false,
            "pause": true,
            "pauseAfterRound": "4",
            "boardTime": "400",
            "overtime": "75",
            "autoCalcOvertime": true,
            "moveTime": "120",
            "average": true,
            "averageOption": "percent",
            "averagePercent": "80",
            "averageSeconds": "320" 
        }
    ]};  
}

function getSettings() {
    return {
        "version": "1.0",
        "enabled": true,
        "name": "Friday evening",
        "displayName": "Hollies Club",
        "boardsPerRound": 3,
        "rounds": 4,
        "tones": true,
        "voiceCommands": true,
        "pause": false,
        "pauseAfterRound": 4,
        "boardTime": 375,
        "overtime": 160,
        "autoCalcOvertime": true,
        "moveTime": 90,
        "average": true,
        "averageOption": "percent",
        "averagePercent": 80,
        "averageSeconds": 90 
        };
}