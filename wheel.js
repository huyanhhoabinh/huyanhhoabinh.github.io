let audio = new Audio('background-sound.mp3');
// Create new wheel object specifying the parameters at creation time.
// let handWheel = new Winwheel({
//     'canvasId'    : 'handWheel',
//     'fillStyle'   : '#7de6ef',
//     'outerRadius' : 150,
//     'centerY'     : 230,
//     'numSegments' : 10,
//     'segments'    :
//         [
//             {'fillStyle' : '#e7706f'}
//         ]
// });
let colors = ['#9ED110', '#50B517', '#179067', '#476EAF', '#9f49ac', '#CC42A2', '#FF3BA7', '#FF5800', '#FF8100', '#FEAC00', '#FFCC00', '#EDE604'];
let choosedColors = [];
let theWheel = new Winwheel({
    // 'numSegments': 6,     // Specify number of segments.
    'outerRadius': 216,   // Set outer radius so wheel fits inside the background.
    'textFontSize': 25,    // Set font size as desired.
    'textLineWidth'     : 0,
    'textFontFamily' : 'number-fonts',
    // 'fillStyle' : 'white',
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
            'duration': 18,     // Duration in seconds.
            'spins': 10,     // Number of complete spins.
            'callbackFinished' : 'alertPrize()'
        }
});
// // Create image in memory.
// let handImage = new Image();
// handImage.src = 'pointing_hand.png';
// // Set onload of the image to anonymous function to draw on the canvas once the image has loaded.
// handImage.onload = function()
// {
//     let handCanvas = document.getElementById('canvas');
//     let ctx = handCanvas.getContext('2d');
//
//     if (ctx) {
//         ctx.save();
//         ctx.translate(200, 150);
//         ctx.rotate(theWheel.degToRad(-40));  // Here I just rotate the image a bit.
//         ctx.translate(-200, -150);
//         ctx.drawImage(handImage, 255, 110);   // Draw the image at the specified x and y.
//         ctx.restore();
//     }
// };

// Set source of the image. Once loaded the onload callback above will be triggered.


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
    document.getElementById("circle").style.visibility = 'hidden';
}
init();
// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false && theWheel.numSegments >= 2) {
        // theWheel.animation.spins = 50;
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
    choosedColors = [];
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    var winningSegment = theWheel.getIndicatedSegment();
    alert("Người thắng cuộc là " + winningSegment.text);
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
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomInt() {
    let timestamp = new Date().getUTCMilliseconds();
    return (Math.floor((Math.random() * timestamp)%100) + 1);
}

function addSegment() {
    if(theWheel.numSegments < colors.length) {
        document.getElementById("circle").style.visibility = 'visible';
        let nameStudent = document.getElementById("nameStudent").value;

        if (nameStudent != "" && nameStudent != undefined) {
            let date = new Date();
            // fix duplicate
            let randomColor = colors[randomIntFromInterval(0, colors.length - 1)];
            while (choosedColors.includes(randomColor)) {
                randomColor = colors[randomIntFromInterval(0, colors.length - 1)];
            }
            choosedColors.push(randomColor);
            theWheel.addSegment({
                'text': nameStudent,
                'fillStyle': randomColor,
                'strokeStyle' : randomColor,
                'lineWidth' : 0
            }, 1);


            theWheel.draw();
            document.getElementById("nameStudent").value = "";
        }
    }


}
