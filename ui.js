var _mode;

function setMode(mode, value) {
   if (mode == _mode)
      return;

   beep();
   
   switch(mode) {
      case 'normal':
         hide('movePlay');
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

function beep() {
   var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
   //alert(snd.volume);
   snd.play();
}

function soundUp() {
   //var vid = document.getElementById("myVideo");
   //alert(vid.volume);
   //vid.volume = 0.2;
   beep();
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

// function setClockTime(minutes, seconds) {
//    setText('timeMinutesHundred', minutes > 99 ? (minutes - minutes % 100) / 100 : '');
//    setText('timeMinutesLower', toTwoDigitString(minutes % 100));
//    setText('timeSeconds', toTwoDigitString(seconds));
// }

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

function positionText() {
   var aspect = window.innerWidth / window.innerHeight;
   if (aspect > 1.7)
      aspect = 1.7;
   document.getElementById('leftText').setAttribute('transform', 'translate(' + (aspect * -320) + ' 0)');
   document.getElementById('rightText').setAttribute('transform', 'translate(' + (aspect * 320) + ' 0)');
}

function setAveragingTheme(value)
{
   if (value)
      document.getElementById('patt1').setAttribute('fill', 'url(#jigsawOrange)');
   else
      document.getElementById('patt1').setAttribute('fill', 'url(#jigsaw)');
}

 // #endregion private and helper functions