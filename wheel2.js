let backgroundAudio = new Audio('millionaire.mp3');
backgroundAudio.loop = true;
let tickSound = new Audio('tick.mp3');  // Create audio object and load desired file.
tickSound.volume = 0.5;
function playTickSound()
{
    // Stop and rewind the sound (stops it if already playing).
    tickSound.pause();
    tickSound.currentTime = 0;

    // Play the sound.
    tickSound.play();
}
let coinsAudio = new Audio('CoinsJackpotSoundEffects.mp3')
coinsAudio.loop = true;
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
let predictWinning = false;
let colors = ['#9ED110', '#50B517', '#179067', '#476EAF', '#9f49ac', '#CC42A2', '#FF3BA7', '#FF5800', '#FF8100', '#FEAC00', '#FFCC00', '#EDE604'];
let theWheel = new Winwheel({
    'numSegments': 9,     // Specify number of segments.
    'outerRadius': 216,   // Set outer radius so wheel fits inside the background.
    'textFontSize': 25,    // Set font size as desired.
    'textLineWidth'     : 0,
    'textFontFamily' : 'number-fonts',
    // 'fillStyle' : 'white',
    'segments':        // Define segments including colour and text.
        [
            {'fillStyle': '#9ED110', 'text': 'x1 coins'},
            {'fillStyle': '#50B517', 'text': 'x1/2 coins'},
            {'fillStyle': '#179067', 'text': 'x2 coins'},
            {'fillStyle': '#476EAF', 'text': 'x1/3 coins'},
            {'fillStyle': '#CC42A2', 'text': 'x3 coins'},
            {'fillStyle': '#FF3BA7', 'text': 'x1/4 coins'},
            {'fillStyle': '#FF5800', 'text': 'x5 coins'},
            {'fillStyle': '#FF8100', 'text': 'Empty coins'},
            {'fillStyle': '#FEAC00', 'text': 'x10'}
        ],
    'animation':           // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 18,     // Duratio  n in seconds.
            'spins': 10,     // Number of complete spins.
            'callbackFinished' : 'alertPrize()',
            'callbackSound' : 'playTickSound()'
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
    {'prize': 'x1', 'from': 1, 'to': 23, 'fromAngle': 1, 'toAngle': 39},
    {'prize': 'x1/2', 'from': 24, 'to': 55, 'fromAngle': 41, 'toAngle': 79},
    {'prize': 'x2', 'from': 56, 'to':69, 'fromAngle': 81, 'toAngle': 119},
    {'prize': 'x1/3', 'from':70, 'to': 78, 'fromAngle': 121, 'toAngle': 159},
    {'prize': 'x3', 'from': 79, 'to': 86, 'fromAngle': 161, 'toAngle': 199},
    {'prize': 'x1/4', 'from': 87, 'to': 92, 'fromAngle': 201, 'toAngle': 239},
    {'prize': 'x5', 'from': 93, 'to': 96, 'fromAngle': 241, 'toAngle': 279},
    {'prize': 'empty', 'from': 97, 'to': 99, 'fromAngle': 281, 'toAngle': 319},
    {'prize': 'x10', 'from': 100, 'to': 100, 'fromAngle': 321, 'toAngle': 359}
];
let arrayIndexsWin = [0,2,4,6,8];
// Vars used by the code in this page to do power controls.
let wheelPower = 0;
let wheelSpinning = false;
// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    resetWheel1();
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false && theWheel.numSegments >= 2) {
        // theWheel.animation.spins = 50;
        // document.getElementById('spin_button').src = "spin_off.png";
        // document.getElementById('spin_button').className = "";
        // wheelSpinning = true;
        backgroundAudio.play();
        calculatePrize();

        theWheel.startAnimation();
        //theWheel.startAnimation();
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
// function resetWheel() {
//     theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
//     theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
//     theWheel.draw();                // Call draw to render changes to the wheel.
//     wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
//     resetCoinsSplashing();
//     predictWinning = false;
// }
function resetCoinsSplashing() {
    coinsAudio.pause();
    backgroundAudio.play();
    var exists = document.getElementById('gimmick')
    if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
    }

}
// function resetStudents() {
//     init();
//     resetWheel();
// }

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    var winningSegment = theWheel.getIndicatedSegment();
    document.getElementById("phanthuong").innerText = winningSegment.text;
    togglePopup();
    // alert("Phần thưởng là " + winningSegment.text);
    if(predictWinning) {
        backgroundAudio.pause();
        coinsAudio.play();
        gimmick('body');
    }
}

function gimmick(el) {
    var exists = document.getElementById('gimmick')
    if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
    }

    var element = document.querySelector(el);
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        focused = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.id = 'gimmick'

    var coin = new Image();
    coin.src = 'coins-splashing.png'
    // 440 wide, 40 high, 10 states
    coin.onload = function () {
        element.appendChild(canvas)
        focused = true;
        drawloop();
    }
    var coins = []

    function drawloop() {
        if (focused) {
            requestAnimationFrame(drawloop);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (Math.random() < .3) {
            coins.push({
                x: Math.random() * canvas.width | 0,
                y: -50,
                dy: 3,
                s: 0.5 + Math.random(),
                state: Math.random() * 10 | 0
            })
        }
        var i = coins.length
        while (i--) {
            var x = coins[i].x
            var y = coins[i].y
            var s = coins[i].s
            var state = coins[i].state
            coins[i].state = (state > 9) ? 0 : state + 0.1
            coins[i].dy += 0.3
            coins[i].y += coins[i].dy

            ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s)

            if (y > canvas.height) {
                coins.splice(i, 1);
            }
        }
    }

}

function calculatePrize() {
    let randomValue = getRandomInt();
    let stopAt;
    for (var i =0;i <= prizeRate.length; i++) {
        if (randomValue >= prizeRate[i].from && randomValue <= prizeRate[i].to) {
            console.log("phan thuong " + prizeRate[i].prize);
            stopAt = randomIntFromInterval(prizeRate[i].fromAngle, prizeRate[i].toAngle);
            if(arrayIndexsWin.includes(i)) {
                predictWinning = true;
            }
            break;
        }
    }
    theWheel.animation.stopAngle = stopAt;
    theWheel.startAnimation();
}
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomInt() {
    let timestamp = new Date().getUTCMilliseconds();
    return (Math.floor((Math.random() * timestamp)%100) + 1);
}
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

function resetWheel1()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;
    predictWinning = false;
    resetCoinsSplashing();
}
