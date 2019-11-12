// JSON.parse JSON.stringify

function getActiveSettings() {
    var active = localStorage.getItem('active');
    return active != null ? JSON.parse(active) : getFactoryDefaultSets().sets[0];
}

function setActiveSettings(value) { } 

function getSets() {
    return getSavedSets().sets;
}

function setSets(value) { }

function getFactoryDefaultSets() {
    return {
        "sets": [
        {
            "version": "1.0",
            "enabled": true,
            "isDefault": true,
            "name": "Standard",
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
        }
    ]};
}

function getSavedSets() {
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
            "tones": true,
            "voiceCommands": true,
            "pause": true,
            "pauseAfterRound": 4,
            "pauseRepeat": true,
            "pauseTime": 800,
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
            "name": "Standard",
            "displayName": "Bridge Timer",
            "boardsPerRound": 10,
            "rounds": 10,
            "tones": false,
            "voiceCommands": false,
            "pause": false,
            "pauseAfterRound": 5,
            "pauseRepeat": false,
            "pauseTime": 600,
            "boardTime": 400,
            "overtime": 170,
            "autoCalcOvertime": false,
            "moveTime": 900,
            "average": false,
            "averageOption": "fixed",
            "averagePercent": 10,
            "averageSeconds": 900 
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
            "pauseTime": 700,
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
