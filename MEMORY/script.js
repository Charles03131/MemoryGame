const gameContainer = document.getElementById("game");
let flipCounter=document.querySelector("#flips");
let cardsFlipped = 0;
let noClicking = false;
let matchCounter=document.querySelector("#match");
let matches=0;


let card1=null;
let card2=null;



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {  
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];   
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
  //while the colors array is greater then zero, you get a random index up to 10 with math.floor/math.random
  //the counter decreases by one and then you swap the  last element with the index that you got.  the array is then returned

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

 


function handleCardClick(e) {
  if (noClicking) return;   //if no clicking=false; is true then continue
  if (e.target.classList.contains("flipped")) return;  // if the targets classlist has flipped continue

  let currentCard=e.target; //the current card is the card that you click on;

 console.log(currentCard);
currentCard.style.backgroundColor=currentCard.classList[0];  ///this shows the cards color

    
   

    if (!card1 || !card2) {   // your 2 cards are not matching 
      currentCard.classList.add("flipped"); //add flipped classList
      cardsFlipped++; //adds to the counter;
      flipCounter.innerText=("Number of flips:"+(cardsFlipped)); //changes the h1 that displays the number of flips 
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard; 
    }

    if (card1 && card2) {  //you have 2 matching
      noClicking = true;  //   so you cant click on them. 
      // debugger
      let gif1 = card1.className; // save to variable so we can compare them
      let gif2 = card2.className;
  
      if (gif1 === gif2) {  ///if matching pair
        matches +=2; // add to cards flipped (these are the matches)
        matchCounter.innerText=("Matching cards:"+(matches));
        card1.removeEventListener("click", handleCardClick); //removing the eventlistener  on the click so that
        card2.removeEventListener("click", handleCardClick);//you cant do anything with the matching cards.
        card1 = null; // card 1 and card 2 get reset to null so that we can evaluate 2 cards again. 
        card2 = null;
        noClicking = false; /// you can click other cards again.
      } else {
        setTimeout(function() {
          card1.style.backgroundColor="";
          card2.style.backgroundColor="";
          card1.classList.remove("flipped"); //removes the classList flipped. when you click again it will add flipped
          card2.classList.remove("flipped"); // this way you can keep track of how many flips have been done. 
          card1 = null;  //card1 and 2 are null so that we can evaluate 2 cards again. 
          card2 = null;
          noClicking = false; //you can click cards again. 
        }, 1000);
      }
    }
    if (matches === COLORS.length) alert("game over! it toook you"+" "+(cardsFlipped)+" "+"flips");
}

createDivsForColors(shuffledColors);  //shuffledColors is = to a function that shuffles the colors array. so by putting 
  // it into the createDivsForColors Function a new set of divs with their shuffled colors is created and then appended 
  // to the gamecontainer.

