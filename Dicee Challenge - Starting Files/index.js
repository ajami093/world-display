var randomNumber1 = Math.floor((Math.random() * 6) + 1);
var newImage1 = "images/dice" + randomNumber1 + ".png";
document.querySelector(".img1").setAttribute('src',newImage1);

var randomNumber2 = Math.floor((Math.random() * 6) + 1);
var newImage2 = "images/dice" + randomNumber2 + ".png";
document.querySelector(".img2").setAttribute('src',newImage2);

var result;
if (randomNumber1 > randomNumber2){
    result = "Player 1 Wins!";
}
else if (randomNumber2 > randomNumber1){
    result = "Player 2 Wins!";
}
else {
    result = " Draw!"
}

document.querySelector("h1").textContent = result;
