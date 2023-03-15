
// 🌟 APP: Fighting Game

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1,p2,gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner (game.isOver, p1, p2)
    return gameState
  }
}

// ** Create the Player class which can create a player with all it's attributes and methods **
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  strike (player, enemy, attackDmg) {
  let damageAmount = Math.ceil(Math.random () * attackDmg)
    enemy.health -= damageAmount
    updateGame(p1, p2, game.isOver)
    return `${player.name} attacks ${enemy.name} for ${damageAmount} damage`
  }
 
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    let hpAmount = Math.ceil(Math.random () * 5)
    player.health += hpAmount
    updateGame(p1, p2, game.isOver)
    return `${player.name} heals for ${hpAmount} HP!`
  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
  class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver,p1, p2) {
    let message = "TIE";
    if (isOver == true && p1.health <= 0){
     message = `${p2.name} WINS!`
    }
    else if(isOver == true && p2.health <= 0){
      message = `${p1.name} WINS!`
    }
    document.getElementById ("victory").play()
    return message
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1,p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ""
    updateGame(p1,p2, this.Over)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset (p1, p2)
    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      p1.strike(p1,p2, p1.attackDmg)
      p2.heal (p2)
      p2.strike (p2, p1, p2.attackDmg)
      p1.heal (p1)
      //Make sure both players get strike() and heal() once each loop
    }
    // Once isOver is TRUE run the declareWinner() method 
    return this.declareWinner(this.isOver, p1, p2)
  }

}

// ** Create 2 players using the player class **
let p1 = new Player ("Madrid", 100, 10)
let p2 = new Player ("Barcelona", 100, 10)

// ** Create the game object from the Game class **
let game = new Game ()
updateGame (p1, p2, game.isOver)
let gameState;

playButton.onclick = () => {
  result.innerText = game.play (p1, p2)
}
// Add functionality where players can press a button to attack OR heal

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  if (e.key == "q" && p2.health > 0 && game.isOver == false){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById ("p1attack").play()
  }  
});

document.addEventListener('keydown', function(e) {
  if (e.key == "a" && p2.health > 0){
    p1.heal (p1)
    document.getElementById ("p1heal").play()
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) { 
  if (e.key == "p" && p1.health > 0 && game.isOver == false){
    p2.strike (p2, p1, p2.attackDmg)
    document.getElementById ("p2attack").play()
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "l" && p1.health > 0){
    p2.heal (p2)
     document.getElementById ("p2heal").play()
  }
});

