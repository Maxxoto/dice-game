/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, dice,currScore,btnRoll,gloScore0,gloScore1
var active, activePlayer,roundScore
scores = [0, 0];
roundScore = 0;
activePlayer = 0;


//Komponen
currScore = document.querySelector("#current-" + activePlayer)
gloScore0 = document.querySelector("#score-0")
gloScore1 = document.querySelector("#score-1")
btnRoll = document.querySelector(".btn-roll")
btnHold = document.querySelector(".btn-hold")
active = document.querySelector(".player-"+activePlayer+"-panel.active")    

function checkScore(){
    if(scores[0] >= 100){
        window.alert("Player 1 Menang !")
    }else if(scores[1] >= 100){
        window.alert("Player 2 Menang !")
    }
    gloScore0.textContent = 0
    gloScore1.textContent = 0
}


btnRoll.addEventListener("click", rollDice)
btnHold.addEventListener("click", holdScore)


function activeState(activePlayer){
    active = document.querySelector(".player-"+activePlayer+"-panel")    
    return active    
}
function activeRound(activePlayer){
    currScore = document.querySelector("#current-" + activePlayer)
    return currScore
}

function switchPlayer(){    
    
    if(activePlayer==0){        
        active.classList.remove("active")        
        activePlayer=1
        active = activeState(activePlayer)                 
        active.classList.add("active")
        roundScore = 0
    }else{
        active.classList.remove("active")
        activePlayer=0
        active = activeState(activePlayer)        
        active.classList.add("active")
        roundScore = 0
    }
        
}

function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1; //Digunakan untuk membuat angka acak 1-6 dan pembulatan kebawah
  document.querySelector(".dice").setAttribute("src", "dice-" + dice + ".png"); //Mengganti gambar dadu sesuai angka dadu yang diacak dari variabel dice
  console.log("Score pertama kali : " + roundScore)
  roundScore += dice
  
  console.log("State player saat ini : " + activePlayer)
  
  currScore = activeRound(activePlayer)
  currScore.textContent = roundScore
  
  if (dice == 1) {
    window.alert("Mendapatkan angka dadu 1 , score anda akan direset ")
    roundScore = 0
    currScore.textContent = roundScore
    switchPlayer()
  }

}

function holdScore(){
    scores[activePlayer] += roundScore
    currScore.textContent = 0    
    switchPlayer()
    gloScore0.textContent = scores[0] //Menampilkan global score ke ui
    gloScore1.textContent = scores[1] //Menampilkan global score ke ui
    checkScore()
}
