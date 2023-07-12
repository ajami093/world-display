var buttonColours = ['red','blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var level = 0;

function playSound(color) {
    new Audio('sounds/'+color+'.mp3').play();
}

function animatePress(currentColour){
    // Add CSS effect to colour 
    $('#' + currentColour).addClass('pressed')
    
    // Remove the CSS effect after 100ms
    setTimeout(() => {
        $('#' + currentColour).removeClass('pressed'); 
    }, 100);
}

function nextSeqence(){
    // Pick a random # from 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    // Pick a color with this random color
    var randomChosenColour = buttonColours[randomNumber];

    // Flash the button selected
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    // Play sound of the button selected
    playSound(randomChosenColour);
    level++;
    $('#level-title').text('Level ' + level);
    // Add the color seq. into array
    gamePattern.push(randomChosenColour);
}

function checkAnswer(currentLevel){
    var win = true;
    for (var i = 0; i < currentLevel; i++){
        if (userClickedPattern[i] !== gamePattern[i]){
            playSound('wrong');
            $('body').addClass('game-over');
            setTimeout(() => {
                $('body').removeClass('game-over');
            }, 200);
            $('#level-title').text('Game Over, Press Any Key to Restart');
            startOver();
            win = false;
        }
    }
    if (userClickedPattern.length == gamePattern.length && win){
        setTimeout(() => {
            userClickedPattern.length = 0;
            nextSeqence();
        }, 1000);
    }
}

// Add event listener to all buttons for clicks
$('.btn').on('click', function(){
    // check if game started
    if (gamePattern.length){
        // From the selector click, we can find the color name in the ID
        // attribute section
        var userChosenColour = this.id;
        animatePress(userChosenColour);
        // Add the colour chosen to array
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length);
        playSound(userChosenColour);
    }
});

$('body').on('keydown', function () {
    if (!gamePattern.length){
        $('#level-title').text('Level 0')
        nextSeqence();
    }
});

function startOver() {
    gamePattern.length = 0;
    level = 0;
    userClickedPattern.length = 0;
}

