/*
   Note: document.onload() waits until the entire page, includng any
   images has been loaded before it reports the event.

   document.ready() allows us to start examining and modifying the
   DOM much sooner than document.onload()
*/

$(document).ready(readyFunc);

function readyFunc() {
  initVariables();

  // execute the following code whenever a button is clicked
  $('#crystal-group input:radio').click(function() {
    // showCurrentStatus($(this).val());  // DEBUG
    switch ( $(this).val() ) {
      case '1' :
        totalScore += crystal_nums[0];
        break;
      
      case '2' :
        totalScore += crystal_nums[1];
        break;
      
      case '3' :
        totalScore += crystal_nums[2];
        break;
      
      case '4' :
        totalScore += crystal_nums[3];
        break;

      default :
        alert("No value seen"); // should never get hereß
        return;
    }
      
    if (totalScore > targetNum) {
      ++lossTotal;
      win_loss_msg = "You lost!!";
    } else if (totalScore == targetNum) {
      ++winTotal;
      win_loss_msg = "You won!!";
    }
      
    if( totalScore >= targetNum ) {
      initNewGame();
    } else {
      updateScreen();
    }
  });
}
    
// global constants and variables
const MIN_CRYSTAL_NUM = 1;
const MAX_CRYSTAL_NUM = 12;
const MIN_TARGET_NUM = 19;
const MAX_TARGET_NUM = 120;

var targetNum;
var crystal_nums = new Array();

var winTotal = 0;
var lossTotal = 0;
var totalScore;
var win_loss_msg = "";

function initVariables() {

  targetNum = genRandomInt( MIN_TARGET_NUM, MAX_TARGET_NUM );
  crystal_nums = [];
  for (var i = 0; i < 4; i++) {
    crystal_nums.push( genRandomInt( MIN_CRYSTAL_NUM, MAX_CRYSTAL_NUM ) );
  }
    
  totalScore = 0;
  $('#random-number').html(targetNum.toString());
}

// generate a random integer between min and max, inclusive
function genRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initNewGame() {
  initVariables();
  updateScreen();
}

function updateScreen() {
    $('#random-number').html(targetNum.toString());
    $('#win-loss-msg').html(win_loss_msg);
    $('#win-total').html(winTotal.toString());
    $('#loss-total').html(lossTotal.toString());
    $('#score-text').html(totalScore.toString());
  }

/* DEBUG start
function showCurrentStatus(theVal) {
  var msg = "targetNum: " + targetNum.toString() + "\n";
  msg += ("button: " + theVal + "\n");
  msg += ("crystal_nums: " + crystal_nums + "\n");
  msg += ("totalScore: " + totalScore.toString() + "\n");
  msg += ("winTotal: " + winTotal.toString() + "\n");
  msg += ("lossTotal: " + lossTotal.toString() + "\n");
  alert(msg);
}
   DEBUG end */
