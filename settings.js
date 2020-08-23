var sets;       // all sets of settings in memory
var settings;   // current setting

function load() {
    sets = getSets();
    loadSelectOptions(getSettingsNames());
    setSelection(getDefaultSettingsName());
    setHelp();
}

// buttons and events
function selectChange(value) {
    if (isChanged() 
        && !confirm('There are unsaved changes.  Cancel & save changes or Ok to proceed'))
        return;
    setSelection(value);
}

function addNew() {
    // requests distinct name
    var names = getSettingsNames();
    var name = prompt('Please enter a name for your settings', '');
    while (names.includes(name))
        name = prompt('\'' + name + '\' already exists.  Please choose another name', '');
    if (name == null)
        return;

    // copies the default set
    settings = getFormSettings();
    settings.name = name;
    saveSettings(settings);

    // adds an option to saved setting sets
    addOption(settings.name, false);

    // set the current selection to the new settings
    setSelection(name);
}

function  undo() {
    loadValuesIntoForm(settings);
    valueChanged();
}

function save() {
    if (!isChanged())
        return;
    settings = getFormSettings();
    saveSettings(settings);

    if (settings.isDefault)
        for (i = 0; i < sets.length; i++)
            if (sets[i].name != settings.name)
                sets[i].isDefault = false;
}

function del() {
    removeOption(settings.name);
    deleteSettings(settings.name);
    if (sets.length == 0)
        clearSettings(); 
    setSelection(getDefaultSettingsName());
}

function setDefault() {
    setBoolValue('isDefaultId', true);
    enable('setDefaultId', false);
    valueChanged();
}

function resetStandard() {
    if (isChanged() 
        && !confirm('There are unsaved changes.  Cancel & save changes or Ok to proceed'))
    var standard = getFactoryDefaultSets().sets[0];
    standard.name = 'Standard';
    saveSettings(standard);
    selectChange('Standard');
}

function clearSettings() {
    // No confirm.  All settings are being cleared.
    sets = getFactoryDefaultSets().sets;
    loadSelectOptions(getSettingsNames());
    setSelection('Standard');
}

function next() {
    setActiveSettings(getFormSettings());
    setSets(sets);
    location.href = 'timer.html';
}

function valueChanged() {
    var changed = isChanged();

    if (getCheck('autoCalcOvertime')) {
        enable('overtime', false);
        setValue('overtime', calcOvertime(getValue('boardsPerRound'), getValue('boardTime')));
    }
    else
        enable('overtime', true);
   
    setSpanValue('numBoardTimeConvMinSec', secondsToMinSecs( getValue('boardTime')));
    enable('undoChangesId', changed);
    enable('saveChangesId', changed);

    if (isChanged)
        updateSummary();
}

// #region private and helper functions
function isChanged() {
    return getValue('boardsPerRound') != settings.boardsPerRound
        || getValue('numRounds') != settings.rounds
        || getValue('displayName') != settings.displayName
        || getCheck('hasTones') != settings.tones
        || getCheck('hasVoice') != settings.voiceCommands
        || getCheck('hasPause') != settings.pause
        || getValue('numPause') != settings.pauseAfterRound
        || getCheck('hasPauseRepeat') != settings.pauseRepeat
        || getValue('breakTime') != settings.pauseTime
        || getValue('boardTime') != settings.boardTime
        || getValue('overtime') != settings.overtime
        || getCheck('autoCalcOvertime') != settings.autoCalcOvertime
        || getValue('moveTime') != settings.moveTime
        || getCheck('hasAverage') != settings.average
        || getCheck('averageOptionPercent') != (settings.averageOption == 'percent')
        || getValue('averagePercent') != settings.averagePercent
        || getValue('averageSeconds') != settings.averageSeconds
        || getBoolValue('isDefaultId') != settings.isDefault;
}

function getFormSettings() {
    return {
        "version": "1.0",
        "enabled": true,
        "isDefault": getBoolValue('isDefaultId'),
        "name": getValue('saved'),
        "displayName": getValue('displayName'),
        "boardsPerRound": Number(getValue('boardsPerRound')),
        "rounds": Number(getValue('numRounds')),
        "tones": getCheck('hasTones'),
        "voiceCommands": getCheck('hasVoice'),
        "pause": getCheck('hasPause'),
        "pauseAfterRound": Number(getValue('numPause')),
        "pauseRepeat": getCheck('hasPauseRepeat'),
        "pauseTime": Number(getValue('breakTime')),
        "boardTime": Number(getValue('boardTime')),
        "overtime": Number(getValue('overtime')),
        "autoCalcOvertime": getCheck("autoCalcOvertime"),
        "moveTime": Number(getValue('moveTime')),
        "average": getCheck('hasAverage'),
        "averageOption": (getCheck('averageOptionPercent') ? "percent" : "fixed"),
        "averagePercent": Number(getValue('averagePercent')),
        "averageSeconds": Number(getValue('averageSeconds'))
    }
}

function loadValuesIntoForm(settings) {
    setValue('boardsPerRound', settings.boardsPerRound);
    setValue('numRounds', settings.rounds);
    setValue('displayName', settings.displayName);
    setCheck('hasTones', settings.tones);
    setCheck('hasVoice', settings.voiceCommands);
    setCheck('hasPause', settings.pause);
    setValue('numPause', settings.pauseAfterRound);
    setCheck('hasPauseRepeat', settings.pauseRepeat);
    setValue('breakTime', settings.pauseTime);
    setValue('boardTime', settings.boardTime);
    setValue('overtime', settings.overtime);
    enable('overtime', !settings.autoCalcOvertime);
    setCheck('autoCalcOvertime', settings.autoCalcOvertime);
    setValue('moveTime', settings.moveTime);
    setCheck('hasAverage', settings.average);
    if (settings.averageOption == 'percent')
        setCheck('averageOptionPercent', true);
    else
        setCheck('averageOptionFixed', true);
    setValue('averagePercent', settings.averagePercent);
    setValue('averageSeconds', settings.averageSeconds);
    setBoolValue('isDefaultId', settings.isDefault);
    enable('setDefaultId', !settings.isDefault);
    updateSummary();
}

function updateSummary() {
    var formSettings = getFormSettings();
    var numSessionBoards = formSettings.boardsPerRound * formSettings.rounds;
    setSpanValue('numBoards', numSessionBoards);
    setSpanValue('numBoardTimeConvMinSec', secondsToMinSecs( getValue('boardTime')));
    setSpanValue('breakTimeConvMinSec', secondsToMinSecs( getValue('breakTime')));
    var nonBreakTime = getSessionTimeExclBreaks(formSettings);
    var breakTime = getBreakTime(formSettings);
    var duration = nonBreakTime + breakTime;
    setSpanValue('numSessionHoursMins', secondsToHoursMins(duration));
    setSpanValue('breakTimeConvMinSec', secondsToMinSecs( getValue('breakTime')));
    var rate = numSessionBoards / nonBreakTime * 3600;
    rate = Math.round(rate * 10)/ 10;
    setSpanValue('numBoardsPerHour', rate);
}

function getSessionTimeExclBreaks(settings) {
    var numSessionBoards = settings.boardsPerRound * settings.rounds;
    var playingTime = numSessionBoards * settings.boardTime;
    var breakTime = (settings.rounds - 1) * settings.moveTime;
    return playingTime + breakTime;
}

function getBreakTime(settings) {
    if (!settings.pause)
        return 0;
    var numBreaks = settings.pauseRepeat
        ? Math.floor((settings.rounds - 1)/ settings.pauseAfterRound)
        : settings.rounds > settings.pauseAfterRound
        ? 1 : 0;
    return numBreaks * settings.pauseTime; 
}

function calcOvertime(numBoards, boardTime) {
    return Math.floor(boardTime * 0.2 * Math.sqrt(numBoards));
}

function secondsToHoursMins(value) {
    var mins = Math.floor((value % 3600) / 60); 
    return Math.floor(value/3600) + ':' 
        + (mins < 10 ? '0' : '') + mins;
}

function secondsToMinSecs(value) {
    var secs = Math.floor(value % 60); 
    return Math.floor(value/60) + ':' 
        + (secs < 10 ? '0' : '') + secs;
}

function setSelection(value) {
    if (getValue('saved') != value)
        setValue('saved', value);
    settings = getSettingsByName(value);
    loadValuesIntoForm(settings);
}

function loadSelectOptions() {
    var select = document.getElementById('saved');
    select.innerHTML = '';
    sets.forEach(setting => {
        if (setting.enabled)
            addOption(setting.name, setting.isDefault);
    });
}

function saveSettings(settings) {
    for(i = 0; i < sets.length; i++)
        if (sets[i].name == settings.name) {
            sets[i] = settings;
            return;
        }

    sets.push(settings);
}

function deleteSettings(name) {
    for(i = 0; i < sets.length; i++)
        if (sets[i].name == name) {
            sets.splice(i, 1);
            return;
        }
}

function addOption(name, isDefault) {
    var select = document.getElementById('saved');
    var option = document.createElement('option');
    option.setAttribute('value', name);
    option.innerText = name;
    if (isDefault)
        option.selected = true;
    select.appendChild(option);
}

function removeOption(name) {
    var select = document.getElementById('saved');
    for (i = 0; i < select.childNodes.length; i++)
        if (select.childNodes[i].getAttribute('value') == name)
        {
            select.removeChild(select.childNodes[i]);
            return;
        }
}

function setHelp() {
    setHelpToolTip('basicHelp', getHelp('basic'));
    setHelpToolTip('startHelp', getHelp('start'));
    setHelpToolTip('timesHelp', getHelp('times'));
    setHelpToolTip('soundsHelp', getHelp('sounds'));
    setHelpToolTip('pauseHelp', getHelp('pause'));
    setHelpToolTip('averagingHelp', getHelp('averaging'));
}

function getSettingsByName(name) {
    for (i=0; i < sets.length; i++)
        if (sets[i].name == name && sets[i].enabled)
            return sets[i];
}

function getSettingsNames() {
    var names = [];
    for(i = 0; i < sets.length; i++)
        if (sets[i].enabled)
            names.push(sets[i].name);
    return names;
}

function getDefaultSettingsName() {
    for(i = 0; i < sets.length; i++)
        if (sets[i].enabled && sets[i].isDefault)
            return sets[i].name;
    for(i = 0; i < sets.length; i++)
        if (sets[i].enabled)
                return sets[i].name;
    return sets[0].name;
}

function setValue(name, value) { document.getElementById(name).value = value; }
function getValue(name) { return document.getElementById(name).value; }
function setBoolValue(name, value) { setValue(name, value ? "true" : "false"); }
function getBoolValue(name) { return getValue(name) == "true"; }
function setSpanValue(name, value) { document.getElementById(name).innerText = value; }
function setCheck(name, value) { document.getElementById(name).checked = value; }
function getCheck(name) { return document.getElementById(name).checked; }
function setSelect(name, value) { document.getElementById(name).setSelect(); }
function setHelpToolTip(id, html) { document.getElementById(id).innerHTML = html; }
function enable(name, enable) { document.getElementById(name).disabled = !enable; }

// #endregion private and helper functions