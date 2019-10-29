var _mode;
var volume = 7;
var mute = false;

function setMode(mode, value) {
   if (mode == _mode)
      return;

   switch(mode) {
      case 'normal':
         hide('movePlay');
         hide('overtimePlay');
         setAveragingTheme(false);
         show('normalPlay');
         break;
      case 'average':
         setAveragingTheme(true);
         document.getElementById('patt1').setAttribute('fill', 'url(#jigsaw)');
         document.getElementById('patt1').setAttribute('fill', 'url(#jigsawOrange)');
         break;
      case 'overtime':
         hide('normalPlay');
         show('overtimePlay');
         break;
      case 'move':
         hide('overtimePlay');
         show('movePlay');
         break;
      case 'break':
         hide('normalPlay');
         show('breakPlay');
         break;
      case 'ended':
         hide('active');
         setText('farewell', value);
         show('sessionEnded');
         break;
   }

   _mode = mode;
}

function mouseMove() {
   show('navigation');
}

// #endregion experimental

// #region public functions
function setDisplayName(value) { setText('displayName', value); }
function setRound(value) { setText('round', value); }
function setBoard(value) { setText('boardIndex', value); }
function setTotalBoards(value) { setText('totalBoards', value); }
function setProjectedTime(value) { setText('projectedTime', value); }
function setProgress(percent) { document.getElementById('progress').setAttribute('width', 8 + 400 * (percent > 1.0 ? 1.0 : percent < 0.0 ? 0.0 : percent)); }

function setClockTime(seconds) {
   if (seconds < 0.0)
      return;

   var mins = Math.floor(seconds / 60);
   var secs = Math.floor(seconds % 60);
   if (mins > 99) {
      setText('timeMinutesHundred', (mins - mins % 100) / 100);
      setText('timeMinutesLower', toTwoDigitString(mins % 100));
   
   }
   else {
      setText('timeMinutesHundred', '');
      setText('timeMinutesLower', mins % 100);

   }
   setText('moveMinutes', mins);
   setText('overtimeMinutes', mins);
   setText('timeSeconds', toTwoDigitString(secs));
   setText('moveSeconds', toTwoDigitString(secs));
   setText('overtimeSeconds', toTwoDigitString(secs));
}

function setAverage(value, rotation) {
   setText('average', value);
   rotate('averageTab1', rotation);
   show('averageTab1');
   rotate('averageMark1', rotation);
   show('averageMark1');
}

function createBoards(numBoards, rotation) {
   var activeBoards = document.getElementById('activeBoards');

   var transformScale = '';
   if (rotation < 25)
      transformScale = ' scale(0.7 0.7) translate(0 -90)';
   else if (rotation < 35)
      transformScale = ' scale(0.9 0.9) translate(0 -30)';

   var playedBoards = document.getElementById('playedBoards');
   var boardMarkers = document.getElementById('boardMarkers');

   for (i = 0; i < numBoards; i++) {
      // active
      var active = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      active.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#board');
      active.setAttribute('x', 0);
      active.setAttribute('y', -155);
      active.setAttribute('transform', 'rotate(' + ((i + 0.5) * rotation) + ' 0 0)' + transformScale);
      activeBoards.appendChild(active);

      // played
      var played = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      played.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#reverseBoard');
      played.setAttribute('x', 0);
      played.setAttribute('y', -155);
      played.setAttribute('transform', 'rotate(' + ((i + 0.5) * rotation) + ' 0 0)' + transformScale);
      playedBoards.appendChild(played);

      // marker
      var played = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      played.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#boardMarker');
      played.setAttribute('x', 0);
      played.setAttribute('y', -220);
      played.setAttribute('fill', "white");
      played.setAttribute('transform', 'rotate(' + ((i + 1) * rotation) + ' 0 0)');
      boardMarkers.appendChild(played);
   }
}

function setOvertime(rotation) {
   rotate('overtimeText', (rotation + 90) % 360);
   show('overtimeText');
}

function setClockHand(rotation) {
   rotate('clockHand1', rotation);
   setBackroundClipPath(rotation);
}

function soundAverage(tones, commands) {
   if (tones && commands) {
       playAudio('alert');
       setTimeout("playAudio('average');", 1500);
   }
   else if (tones)
       playAudio('alert');
   else if (commands) 
       playAudio('average');
}

function soundMove(tones, commands) {
   if (tones && commands) {
       playAudio('triangle');
       setTimeout("playAudio('move');", 3500);
   }
   else if (tones)
       playAudio('triangle');
   else if (commands) 
       playAudio('move');
}

function soundNextBoard(tones, repeat) {
   if (tones) {
       playAudio('dong');
       if (repeat)
           setTimeout("playAudio('dong');", 700);
   }
}

// #endregion public functions

// #region private and helper functions
function fullscreen() { document.documentElement.requestFullscreen(); }
function exitFullscreen() { document.exitFullscreen(); }
function setText(id, value) { document.getElementById(id).textContent = value; }
function show(id) { document.getElementById(id).setAttribute('visibility', 'inherit'); }
function hide(id) { document.getElementById(id).setAttribute('visibility', 'hidden'); }
function rotate(id, value) { document.getElementById(id).setAttribute('transform', 'rotate(' + value + ' 0 0)'); }
function toTwoDigitString(value) { return (value < 10 ? '0' : '') + value.toString(); }

function setBackroundClipPath(rotation) {
   var x = 220 * Math.sin(rotation / 360 * 2 * Math.PI);
   var y = -220 * Math.cos(rotation / 360 * 2 * Math.PI);
   var path = 'M 0 -220 ';
   if (rotation <= 180)
      path += 'A 220 220  0 1 0  0 220 ';
   path += 'A 220 220  0 1 0 ' + x + ' ' + y + ' L 0 0 Z';
   document.getElementById('clip1').setAttribute('d', path);
}

function resize() {
   // 1.44 1.7
   var aspect = window.innerWidth / window.innerHeight;
   if (aspect > 1.7)
      aspect = 1.7;
   document.getElementById('leftText').setAttribute('transform', 'translate(' + (aspect * -320) + ' 0)');
   document.getElementById('rightText').setAttribute('transform', 'translate(' + (aspect * 320) + ' 0)');

   if (aspect < 1.44) {
      var labels = document.getElementsByClassName('label');
      while (labels.length > 0) {
         labels[0].setAttribute('class', 'smallLabel'); 
      }
      var values = document.getElementsByClassName('value');
      while (values.length > 0) {
         values[0].setAttribute('class', 'smallValue'); 
      }
   }
   else {
      var labels = document.getElementsByClassName('smallLabel');
      while (labels.length > 0) {
         labels[0].setAttribute('class', 'label'); 
      }
      var values = document.getElementsByClassName('smallValue');
      while (values.length > 0) {
         values[0].setAttribute('class', 'value'); 
      }
   }
}

function setAveragingTheme(value)
{
   if (value)
      document.getElementById('patt1').setAttribute('fill', 'url(#jigsawOrange)');
   else
      document.getElementById('patt1').setAttribute('fill', 'url(#jigsaw)');
}

function getAudioFile(sound) {
   switch(sound) {
      case 'alert':
         // http://soundbible.com/1540-Computer-Error-Alert.html
         return './sounds/alert.mp3';
      case 'triangle':
         // http://soundbible.com/1525-Triangle-Dinner-Bell.html
         return './sounds/triangle.mp3';
      case 'move':
         // https://cloud.google.com/text-to-speech/
         return getMoveVoiceCommand();
      case 'average':
         // https://cloud.google.com/text-to-speech/
         return getAverageVoiceCommand();
      case 'dong':
      case 'beep':
      default:
         // http://soundbible.com/1598-Electronic-Chime.html
         return './sounds/dong.mp3';
   }
}

function playAudio(sound) {
   var snd = new Audio(getAudioFile(sound));
   snd.volume = volume /10;
   snd.play();
}

function toggleMute() {
   if (!mute)
      mute = true;
   else {
      mute = false;
      if (volume == 0)
         volume = 1;
      playAudio('beep');
   }
}

function soundUp() {
   setVolume(volume + 1);
}

function soundDown() {
   setVolume(volume - 1);
}

function setVolume(value) {
   volume = value;
   if (volume > 10)
      volume = 10;
   else if (volume < 0.0)
      volume = 0;

   if (mute)
      mute = false;

   setText('volume1', volume);
   
   playAudio('beep');
}
 // #endregion private and helper functions