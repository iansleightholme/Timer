var sets;       // all sets of settings in memory
var settings;   // current setting

function load() {
    sets = getSets();
    updateSelectionOptions(getSettingsNames());
    setSelection(getDefaultSettingsName());
    setHelp();
}

function getSettingsByName(name) {
    for (i=0; i < sets.length; i++)
        if (sets[i].name == name && sets[i].enabled)
            return sets[i];
}

function createNew() {
    // requests distinct name
    var names = getSettingsNames();
    var name = prompt('Please enter a name for your settings', '');
    while (names.includes(name))
        name = prompt('\'' + name + '\' already exists.  Please choose another name', '');
    if (name == null)
        return;

    // copies the default set
    settings = getFactoryDefaultSets().sets[0];
    settings.name = name;
    saveSettings(settings, name);

    // adds an option to saved setting sets
    addOption(settings.name, false);

    // set the current selection to the new settings
    setSelection(name);
}

function next() {
    getValue('saved');
//    location.href = 'html5test.html';
    // if (document.getElementById('makeDefault').checked) {
    //     // 
    // }

    // // TODO set active settings
    // // localStorage.setItem('activeSettings', JSON.stringify(sets));
    // localStorage.setItem('allSettings', JSON.stringify(sets));
}

function resetStandard() {
    settings = getFactoryDefaultSets().sets[0];
    saveSettings(settings, 'Standard');
    if (getValue('saved') == 'Standard')
        changeSelection('Standard');
}

function clearSettings() {
    sets = getFactoryDefaultSets().sets;
    updateSelectionOptions(getSettingsNames());
    setSelection('Standard');
}



function saveSettings(settings, name) {
    for(i = 0; i < sets.length; i++)
        if (sets[i].name == name) {
            sets[i] = settings;
            return;
        }

    sets.push(settings);
}





function updateSelectionOptions() {
    var select = document.getElementById('saved');
    select.innerHTML = '';
    sets.forEach(setting => {
        if (setting.enabled)
            addOption(setting.name, setting.isDefault);
    });
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

function valueChanged() {
    document.getElementById('undoChangesId').disabled = !isChanged();
}

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
        || getCheck("autoCalcOvertime") != settings.autoCalcOvertime
        || getValue('moveTime') != settings.moveTime
        || getCheck('hasAverage') != settings.average
        || getCheck('averageOptionPercent') != (settings.averageOption == "percent")
        || getValue('averagePercent') != settings.averagePercent
        || getValue('averageSeconds') != settings.averageSeconds;
}

// #region private and helper functions
function setSelection(value) {
    setValue('saved', value);
    changeSelection(value);
}

function changeSelection(name) {
    settings = getSettingsByName(name);
    loadValuesIntoForm(settings);
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
    setCheck("autoCalcOvertime", settings.autoCalcOvertime);
    setValue('moveTime', settings.moveTime);
    setCheck('hasAverage', settings.average);
    if (settings.averageOption == 'percent')
        setCheck('averageOptionPercent', true);
    else
        setCheck('averageOptionFixed', true);
    setValue('averagePercent', settings.averagePercent);
    setValue('averageSeconds', settings.averageSeconds);
}

function setHelp() {
    setHelpToolTip('basicHelp', getHelp('basic'));
    setHelpToolTip('startHelp', getHelp('start'));
    setHelpToolTip('timesHelp', getHelp('times'));
    setHelpToolTip('soundsHelp', getHelp('sounds'));
    setHelpToolTip('pauseHelp', getHelp('pause'));
    setHelpToolTip('averagingHelp', getHelp('averaging'));
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

function resetToFactoryDefaults() {
    sets = getFactoryDefaultSets().sets[0];
}

function setValue(name, value) { document.getElementById(name).value = value; }
function getValue(name) { return document.getElementById(name).value; }
function setCheck(name, value) { document.getElementById(name).checked = value; }
function getCheck(name) { return document.getElementById(name).checked; }
function setSelect(name, value) { document.getElementById(name).setSelect(); }
function setHelpToolTip(id, html) { document.getElementById(id).innerHTML = html; }

// #endregion private and helper functions