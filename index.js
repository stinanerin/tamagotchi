// -------------------------------------------------------- Set up -----------------------------------------------------------

let action;
let petArr = [];
let container = document.querySelector("#gameContainer")
let tForm = document.querySelector('#createTamagotchi');

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
        this.happiness -= 25;
        action = `You took a nap with ${this.name}`;
        this.checkMinMax()
        this.renderPet();
    }
    play() {
        if (this.tiredness > 30) {
            this.tiredness -= 20;
            this.hunger -= 20;
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
        this.renderPet();

    }
    deadCheck(need) {
        if(need <= 0) {
            need = 0;
            document.body.classList.add("dead"); 
            action = `You killed ${this.name}`;
            //todo! renderModal()
        } 
        this.checkMinMax()
        return need
    }
    checkMinMax() {
        if (this.tiredness > 100) this.tiredness = 100;
        if (this.hunger > 100) this.hunger = 100;
        if (this.happiness > 100) this.happiness = 100;
        if (this.loneliness > 100) this.loneliness = 100;
        if (this.tiredness < 0) this.tiredness = 0;
        if (this.hunger < 0) this.hunger = 0;
        if (this.happiness < 0) this.happiness = 0;
        if (this.loneliness < 0) this.loneliness = 0;
    }
   
    
    // -------------------------------------------- Render user pet --------------------------------------------
    renderPet(){

        document.body.classList.remove("dead")
   

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
            <div class="game-buttons">
                <div>
                    <button id="eat" ><i class="fa-solid fa-cookie-bite"></i></button>
                    <button id="play" ><i class="fa-solid fa-otter"></i></button>
                    <button id="sleep" ><i class="fa-solid fa-moon"></i></button>
                </div>
                <div>
                    <p>${action ? action : ""}</p>
                </div>
            </div>
        `
        
        // All game-play event-listeners
        document.querySelector("#sleep").addEventListener("click", () => this.nap())
        document.querySelector("#eat").addEventListener("click", () => this.eat())
        document.querySelector("#play").addEventListener("click", () =>  this.play())
    }
}

// -------------------------------------------- FORM: User input for creating Pet --------------------------------------------

tForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Create a new instance of the Tamagotchi prototype from user input
    let tamName = document.querySelector('#tName').value;
    let tamType = document.querySelector("#tType").value;
    let newPet = new Tamagotchi(tamName, tamType)
    newPet.renderPet()
    petArr.push(newPet)
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

//! Test för styling
let bert = new Tamagotchi("Bert", "(˵ •̀ ᴗ - ˵ ) ✧)");
bert.renderPet()

petArr.push(bert);
renderPetArr(petArr)
