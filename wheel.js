let audio = new Audio('background-sound.mp3');
// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    // 'numSegments': 6,     // Specify number of segments.
    'outerRadius': 212,   // Set outer radius so wheel fits inside the background.
    'textFontSize': 35,    // Set font size as desired.
    // 'segments':        // Define segments including colour and text.
    //     [
    //         {'fillStyle': '#eae56f', 'text': '10 coins'},
    //         {'fillStyle': '#89f26e', 'text': '20 coins'},
    //         {'fillStyle': '#7de6ef', 'text': '30 coins'},
    //         {'fillStyle': '#e7706f', 'text': '40 coins'},
    //         {'fillStyle': '#eae56f', 'text': '50 coins'},
    //         {'fillStyle': '#89f26e', 'text': '0 coin'}
    //     ],
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

function init() {
    theWheel.numSegments = 0;
    theWheel.segments = [];
    theWheel.draw();
}
init();
// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false && theWheel.numSegments >= 2) {
        theWheel.animation.spins = 3;
        document.getElementById('spin_button').src = "spin_off.png";
        document.getElementById('spin_button').className = "";
        wheelSpinning = true;
        audio.play();
        // calculatePrize();
        theWheel.startAnimation();
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

function resetStudents() {
    init();
    resetWheel();
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    alert("You have won " + indicatedSegment.text);
}

//
// function calculatePrize() {
//     let randomValue = getRandomInt(1, 100);
//     console.log("ket qua" + randomValue);
//     let stopAt;
//     for (var i = prizeRate.length - 1; i >= 0; i--) {
//         if (randomValue >= prizeRate[i].from && randomValue <= prizeRate[i].to) {
//             stopAt = getRandomInt(prizeRate[i].fromAngle, prizeRate[i].toAngle);
//             break;
//         }
//     }
//     theWheel.animation.stopAngle = stopAt;
//     theWheel.startAnimation();
// }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addSegment() {
    let nameStudent = document.getElementById("nameStudent").value;
    if (nameStudent != "" && nameStudent != undefined) {
        let date = new Date();
        let randomColor = `#` + (Math.random() * 0xFFFFFF << 0).toString(16);
        theWheel.addSegment({
            'text': nameStudent,
            'fillStyle': randomColor
        }, 1);


        theWheel.draw();
        document.getElementById("nameStudent").value = "";
    }

}
