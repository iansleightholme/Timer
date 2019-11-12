// JSON.parse JSON.stringify

function getActiveSettings() {
    var active = localStorage.getItem('active');
    return active != null ? JSON.parse(active) : getFactoryDefaultSets().sets[0];
}

function setActiveSettings(value) {
    localStorage.setItem('active', JSON.stringify(value));
}

function getSets() {
    var sets = localStorage.getItem('sets');
    return sets != null ? JSON.parse(sets).sets : getFactoryDefaultSets().sets;
}

function setSets(value) { 
    localStorage.setItem('sets', JSON.stringify(value));
} 

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