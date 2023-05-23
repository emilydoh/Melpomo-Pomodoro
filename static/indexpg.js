var isRunning=false;
var isPaused=false;

//this represents desired session length based on which button has been selected (pomodoro (by default, 25 min), short break (5), long break(15))
// in milliseconds 1500000 ms == 25 minutes  
var selectedSessionLength = 1500000;


//how many milliseconds remain when timer last paused
var timeLeftWhenPaused;
//current timer interval
var currentInterval;

function start() { 
    
    //we only will execute following code if the timer is not already running
    if (isRunning==false) {

        //by default assume timer has not been paused & set time remaining (in ms) to selected length of session; if its paused, adjust it to the time left when paused
        var timeRemaining=selectedSessionLength;
        if(isPaused) {
            timeRemaining=timeLeftWhenPaused;
            isPaused=false;
        }

        var startTime = Date.now();

        currentInterval = setInterval(function() {

            isRunning=true;

            var elapsedTime = Date.now() - startTime;
            var timeLeftMilliseconds = timeRemaining - elapsedTime;
            var timeLeftSeconds = (timeLeftMilliseconds / 1000).toFixed(0);
                var timeLeftOnlySeconds = timeLeftSeconds%60;
            var timeLeftOnlyMinutes = (Math.floor(timeLeftSeconds/60)).toFixed(0);
            
            // if we run out of time, stop (clearInterval()) and display 00:00
            if (timeLeftOnlyMinutes<=0 && timeLeftOnlySeconds<=0) {
                clearInterval(currentInterval);
                document.getElementById("time").innerHTML = "00:00";
                isRunning=false;
            }

            //for formatting when under 10 seconds
            else if (timeLeftOnlySeconds<10) {
                timeLeftWhenPaused = timeLeftMilliseconds;
                document.getElementById("time").innerHTML = timeLeftOnlyMinutes+':0'+timeLeftOnlySeconds;
                
            }
            else {
                timeLeftWhenPaused = timeLeftMilliseconds;
                document.getElementById("time").innerHTML = timeLeftOnlyMinutes + ":" + timeLeftOnlySeconds;
            }
        }, 100);
    }
}

function pause() {
    if(isPaused!=true) {
        isRunning=false;
        isPaused=true;
        clearInterval(currentInterval);
    } 
}

function changeSessionLengthRestartTimer(String) {
    //restart timer so need to clear the paused and running flags
    isRunning=false;
    isPaused=false;
    clearInterval(currentInterval);

    if (String=='long break') {
        selectedSessionLength=900000;
        document.getElementById("time").innerHTML = "15:00";
    }
    else if (String=='short break') {
        selectedSessionLength=300000;
        document.getElementById("time").innerHTML = "5:00";
    }
    else {
        selectedSessionLength=1500000; 
        document.getElementById("time").innerHTML = "25:00"; 
    }
}