// Tessa Nishida
// Adapted from https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

function CountDownTimer(duration, granularity, message) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
    this.message = message;
}
  
  CountDownTimer.prototype.start = function() {
    if (this.running) {
      return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff, obj;
  
    (function timer() {
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
  
      if (diff > 0) {
        setTimeout(timer, that.granularity);
      } else {
        diff = 0;
        that.running = false;
      }
  
      obj = CountDownTimer.parse(diff);
      that.tickFtns.forEach(function(ftn) {
        ftn.call(this, obj.minutes, obj.seconds);
      }, that);
    }());
  };
  
  CountDownTimer.prototype.onTick = function(ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    return this;
  };
  
  CountDownTimer.prototype.expired = function() {
    return !this.running;
  };
  
  CountDownTimer.prototype.getMessage = function() {
    return this.message;
  };

  CountDownTimer.parse = function(seconds) {
    return {
      'minutes': (seconds / 60) | 0,
      'seconds': (seconds % 60) | 0
    };
  };


  var display = document.getElementById("time");
  var timer = new CountDownTimer(20, null, "Time to take a break!");
  var timeObj = CountDownTimer.parse(20);
  var work = true;
  var minutesWorked = 0;

  format(timeObj.minutes, timeObj.seconds);
  timer.onTick(format).onTick(finish);

  document.getElementById("start-btn").addEventListener('click', function () {
      timer.start();
  });
  
  function format(minutes, seconds) {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ':' + seconds;
  };

  function finish() {
      var message = this.getMessage();
      if (this.expired()) {
          setTimeout (function () { window.alert(message); reset(); }, 1000);
      }
  };

  function reset() {
      if(work) {
          minutesWorked += timer.duration; // last work timer durration
          timer = new CountDownTimer(5, null, "Let's get back to work!"),
          timeObj = CountDownTimer.parse(5);
          work = false;
          format(timeObj.minutes, timeObj.seconds);
          timer.onTick(format).onTick(finish);
      } else {
          timer = new CountDownTimer(20, null, "Time to take a break!"),
          timeObj = CountDownTimer.parse(20);
          work = true;
          format(timeObj.minutes, timeObj.seconds);
          timer.onTick(format).onTick(finish);
      }
  };

var contactNum;
var contactName;

// handle form submission
function submitForm() {
  contactName = document.getElementById("contact-name").value;
  contactNum = "+1" + document.getElementById("contact-number").value;
  console.log(contactName + ":" + contactNum);
  sendConfirmationMessage();
  sendSummary();
};

window.onbeforeunload = function() {
  sendSummary();
}

async function sendConfirmationMessage() {
  await fetch("/api/ExitSummary", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phoneNumber: contactNum, messageContent: "Thanks for using my web app :)"})
  });
  console.log("confirmation sent!");
};

async function sendSummary() {
  // call to Azure function
  await fetch("/api/ExitSummary", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phoneNumber: contactNum, messageContent: contactName+" completed "+minutesWorked+" minutes of work!"})
  });
  console.log("summary sent!");
};

