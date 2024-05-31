var turnPlayer1 = false;
var turnPlayer2 = false;
var rotating1 = false; //status rotate of dicee 1
var rotating2 = false; //status rotate of dicee 2

var diceePlayer1 = 0; //result player1
var diceePlayer2 = 0; //result player2

function draw(numPlayer) {
  if (numPlayer === 1) {
    console.log("Player1 play your turn");
    var image1 = document.querySelectorAll("img")[0];
    var bg_image1 = document.querySelectorAll(".bg-img")[0];

    bg_image1.classList.add("animation"); //start animation rotate
    image1.classList.add("hide");

    setTimeout(function () {
      var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6
      var randomDiceImage = "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png
      var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

      image1.setAttribute("src", randomImageSource);

      turnPlayer1 = true; //Player1 done
      rotating1 = false; //Set default value
      diceePlayer1 = randomNumber1; //Set result

      image1.classList.remove("hide");
      bg_image1.classList.remove("animation");

      checkResult();
    }, 2000);
  } else {
    console.log("Player2 play your turn");
    var image2 = document.querySelectorAll("img")[1];
    var bg_image2 = document.querySelectorAll(".bg-img")[1];

    bg_image2.classList.add("animation");
    image2.classList.add("hide");

    setTimeout(function () {
      var randomNumber2 = Math.floor(Math.random() * 6) + 1; //1-6
      var randomDiceImage = "dice" + randomNumber2 + ".png"; //dice1.png - dice6.png
      var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

      image2.setAttribute("src", randomImageSource);

      turnPlayer2 = true;
      rotating2 = false;
      diceePlayer2 = randomNumber2;

      image2.classList.remove("hide");
      bg_image2.classList.remove("animation");

      checkResult();
    }, 2000);
  }
}

function checkResult() {
  console.log("checkResult");
  if (turnPlayer1 === true && turnPlayer2 === true) {
    console.log("checking");
    if (diceePlayer1 > diceePlayer2) {
      document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
    } else if (diceePlayer2 > diceePlayer1) {
      document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
    } else {
      document.querySelector("h1").innerHTML = "Match Draw! 🚩";
    }
  }
}

//Player1
document.querySelector(".img1").onclick = function (e) {
  if (turnPlayer1 === true || rotating2 === true) {
    e.stopPropagation();
  } else {
    if (turnPlayer2 === false) {
      rotating1 = true; //Set status rotate: rotating
      draw(1);
    } else {
      draw(1);
    }
  }
};

//Player2
document.querySelector(".img2").onclick = function (e) {
  if (turnPlayer2 === true || rotating1 === true) {
    e.stopPropagation();
  } else {
    if (turnPlayer1 === false) {
      rotating2 = true;
      draw(2);
    } else {
      draw(2);
    }
  }
};

//Reset Game
if (turnPlayer1 === false && turnPlayer2 === false) {
  document.querySelector("h1").innerHTML = "New Game - Draw!";
}
