let audio = new Audio('background-sound.mp3');
// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    'numSegments': 6,     // Specify number of segments.
    'outerRadius': 212,   // Set outer radius so wheel fits inside the background.
    'textFontSize': 35,    // Set font size as desired.
    'segments':        // Define segments including colour and text.
        [
            {'fillStyle': '#eae56f', 'text': '10 coins'},
            {'fillStyle': '#89f26e', 'text': '20 coins'},
            {'fillStyle': '#7de6ef', 'text': '30 coins'},
            {'fillStyle': '#e7706f', 'text': '40 coins'},
            {'fillStyle': '#eae56f', 'text': '50 coins'},
            {'fillStyle': '#89f26e', 'text': '0 coin'}
        ],
    'animation':           // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 20,     // Duration in seconds.
            'spins': 12,     // Number of complete spins.
            'callbackFinished': alertPrize
        }
});
let prizeRate = [
    {'prize': '10', 'from': 11, 'to': 40, 'fromAngle': 1, 'toAngle': 59},
    {'prize': '20', 'from': 41, 'to': 60, 'fromAngle': 61, 'toAngle': 119},
    {'prize': '30', 'from': 61, 'to': 80, 'fromAngle': 121, 'toAngle': 179},
    {'prize': '40', 'from': 81, 'to': 95, 'fromAngle': 179, 'toAngle': 239},
    {'prize': '50', 'from': 96, 'to': 100, 'fromAngle': 241, 'toAngle': 299},
    {'prize': '0', 'from': 1, 'to': 10, 'fromAngle': 301, 'toAngle': 359}
];

// Vars used by the code in this page to do power controls.
let wheelPower = 0;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
// function powerSelected(powerLevel)
// {
//     // Ensure that power can't be changed while wheel is spinning.
//     if (wheelSpinning == false) {
//         // Reset all to grey incase this is not the first time the user has selected the power.
//         document.getElementById('pw1').className = "";
//         document.getElementById('pw2').className = "";
//         document.getElementById('pw3').className = "";

//         Now light up all cells below-and-including the one selected by changing the class.
//         if (powerLevel >= 1) {
//             document.getElementById('pw1').className = "pw1";
//         }

//         if (powerLevel >= 2) {
//             document.getElementById('pw2').className = "pw2";
//         }

//         if (powerLevel >= 3) {
//             document.getElementById('pw3').className = "pw3";
//         }

//         // Set wheelPower var used when spin button is clicked.
//         wheelPower = powerLevel;

//         // Light up the spin button by changing it's source image and adding a clickable class to it.
//         document.getElementById('spin_button').src = "spin_on.png";
//         document.getElementById('spin_button').className = "clickable";
//     }
// }

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        theWheel.animation.spins = 3;
        document.getElementById('spin_button').src = "spin_off.png";
        document.getElementById('spin_button').className = "";
        wheelSpinning = true;
        audio.play();
        calculatePrize();
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.
    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    alert("You have won " + indicatedSegment.text);
}


function calculatePrize() {
    let randomValue = getRandomInt(1, 100);
    console.log("ket qua" + randomValue);
    let stopAt;
    for (var i = prizeRate.length - 1; i >= 0; i--) {
        if (randomValue >= prizeRate[i].from && randomValue <= prizeRate[i].to) {
            stopAt = getRandomInt(prizeRate[i].fromAngle, prizeRate[i].toAngle);
            break;
        }
    }
    theWheel.animation.stopAngle = stopAt;
    theWheel.startAnimation();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
