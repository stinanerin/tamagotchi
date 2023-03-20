// -------------------------------------------------------- Set up -----------------------------------------------------------

let container = document.querySelector("#gameContainer")
let tForm = document.querySelector('#createTamagotchi');
let petArr = [];
let action;
let intervalId;
let dead = false;

// -------------------------------------------- Tamagotchi prototype --------------------------------------------
class Tamagotchi {
    constructor(name, animalType, tiredness = 50, hunger = 50, loneliness = 50, happiness = 50 ) {
        this.name = name;
        this.animalType = animalType;
        this.tiredness = tiredness;
        this.hunger = hunger;
        this.loneliness = loneliness;
        this.happiness = happiness;
    }
    nap() {
        this.tiredness += 30;
        this.hunger -= 15;
        this.loneliness -= 20;
        this.happiness -= 15;
        action = `You took a nap with ${this.name}`;
        this.checkMinMax()
        this.renderPet();
    }
    play() {
        if (this.tiredness > 30) {
            this.tiredness -= 15;
            this.hunger -= 15;
            this.loneliness += 20;
            this.happiness += 30;
            action = `You played with ${this.name}`;
        } else {
            action = `No bueno, ${this.name} is too tired to play`;
        }
        this.checkMinMax()
        this.renderPet();
    }
    eat() {
        this.tiredness -= 15;
        this.hunger += 30;
        action= `You ate with ${this.name}`;
        this.checkMinMax()
        this.renderPet()
    }
    interval() {
        intervalId = setInterval(() => {
            this.tiredness -= 5;
            this.hunger -= 5;
            this.happiness -= 5;
            this.loneliness -= 5;
            this.checkMinMax()
            this.renderPet();
        }, 2000);
    }
    deadCheck(need) {
        // Prevents deadCheck() from running four times for each proressBar if user never clicks btn and pet dies from interval only
        if(need <= 0 && !dead) {
            need = 0;
            document.body.classList.add("dead"); 
            action = `You killed ${this.name}`;
            dead = true
            renderRestart();
        } 
        return need;
    }
    checkMinMax() {
        console.log("hej");
        if (this.tiredness > 100) this.tiredness = 100;
        if (this.hunger > 100) this.hunger = 100;
        if (this.happiness > 100) this.happiness = 100;
        if (this.loneliness > 100) this.loneliness = 100;
        if (this.tiredness < 0) this.tiredness = 0;
        if (this.hunger < 0) this.hunger = 0;
        if (this.happiness < 0) this.happiness = 0;
        if (this.loneliness < 0) this.loneliness = 0;
    }
    renderPet(){
        document.body.classList.remove("dead");

        container.innerHTML = `
            <div class="game-wrapper">
                <div class="game-pet">
                    <div class="pet-container">
                        <h4 class="text-center">${this.name}</h4>
                        <p class="text-center">${this.animalType}</p>
                    </div>
                </div>
                <div class="score-container">
                    <div class="column">
                        <label for="sleepProgress"><p>Tired</p><p>Well rested</p></label>
                        <progress id="sleepProgress" value="${this.deadCheck(this.tiredness)}" max="100"></progress>
                    </div>
                    <div class="column">
                        <label for="hungerProgress"><p>Hungry</p><p>Full</p></label>
                        <progress id="hungerProgress" value="${this.deadCheck(this.hunger)}" max="100"></progress>
                    </div>
                    <div class="column">
                        <label for="lonelyProgress"><p>Lonely</p><p>Loved</p>
                        </label>
                        <progress id="lonelyProgress" value="${this.deadCheck(this.loneliness)}" max="100"></progress>
                    </div>
                    <div class="column">
                        <label for="happyProgress"><p>Unhappy</p><p>Happy</p>
                        </label>
                        <progress id="happyProgress" value="${this.deadCheck(this.happiness)}" max="100"></progress>
                    </div>
                </div>
            </div>
            <div class="action-container">
                <div class="game-buttons">
                    <button id="eat" class="action"><i class="fa-solid fa-cookie-bite"></i></button>
                    <button id="play" class="action"><i class="fa-solid fa-otter"></i></button>
                    <button id="sleep" class="action"><i class="fa-solid fa-moon"></i></button>
                </div>
                <div>
                    <p>${action ? action : ""}</p>
                </div>
            </div>
        `
        // If character is dead - do not apply event listeners
        // disable doesn't work since I currently redraw  the DOM: for each change:-/
        if(!dead) {
            // All game-play event-listeners
            document.querySelector("#sleep").addEventListener("click", () => this.nap())
            document.querySelector("#eat").addEventListener("click", () => this.eat())
            document.querySelector("#play").addEventListener("click", () =>  this.play())      
        }
    }
}


// -------------------------------------------- FORM: User input for creating Pet --------------------------------------------

tForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Create a new instance of the Tamagotchi prototype from user input
    let tamName = document.querySelector('#tName').value;
    let tamType = document.querySelector("#tType").value;
    let newPet = new Tamagotchi(tamName, tamType)

    // Renders selected pet
    newPet.renderPet()
    newPet.interval()
    petArr.push(newPet)
    // Renders all created pets to choose from in "gallery"
    renderPetArr(petArr)
})

// -------------------------------------------- Render all the user created pets --------------------------------------------

function renderPetArr(arr) {

    let petDisplay = document.querySelector('#petContainer');
    petDisplay.innerHTML = `
        <h3 class="text-center">All of my friends</h3>
        <ul class="pet-row"></ul>
    `
    let petRow = document.querySelector('.pet-row');

    arr.forEach(pet => {
        petRow.innerHTML += `
            <li class="pet-wrapper" data-name="${pet.name}" data-icon="${pet.animalType}">
                <h4>${pet.name}</h4>
                <p>${pet.animalType}</p>
            </li>
        `
    });
    
    document.querySelectorAll(".pet-wrapper").forEach((item) => {
        item.addEventListener("click", () => {
            const findPet = pet => pet.name === item.dataset.name;
            arr.find(findPet).renderPet()
        })
    })
}
function renderRestart() {

    //todo! Rensa domen när man byter karaktär?
    clearInterval(intervalId)
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";
    document.body.append(restartBtn);
    restartBtn.addEventListener("click", ()=>{
      location.reload();
    })
}

//! Test för styling
// let bert = new Tamagotchi("Bert", "(˵ •̀ ᴗ - ˵ ) ✧)");
// bert.renderPet()

// petArr.push(bert);
// renderPetArr(petArr)
