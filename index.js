// -------------------------------------------------------- Set up -----------------------------------------------------------

let action;
let petArr = [];
let container = document.querySelector("#gameContainer")
let tForm = document.querySelector('#createTamagotchi');

// -------------------------------------------- Tamagotchi prototype --------------------------------------------
class Tamagotchi {
    constructor(name, animalType ) {
        this.name = name;
        this.animalType = animalType;
        this.tiredness = 50;
        this.hunger = 50;
        this.loneliness = 50;
        this.happiness = 50;
    }
    nap() {
        this.tiredness += 30;
        this.hunger -= 15;
        this.loneliness -= 20;
        this.happiness -= 25;
        action = `You took a nap with ${this.name}`;
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
        this.renderPet();
    }
    eat() {
        this.tiredness -= 15;
        this.hunger += 30;
        action= `You ate with ${this.name}`;
        this.renderPet();
    }
    checkScore(need) {
        console.log(need);
        if(need <= 0) {
            need = 0;
            document.body.classList.add("dead"); 
            action = `You killed ${this.name}`;
            //todo! renderModal()
        } else if( need > 100) {
            need = 100;
        } 
        return need
    }
    // time(need) {
    //     console.log("hej1");
    //     console.log(need);


    //     setInterval(() => {
    //         console.log("hej2");
    //         console.log(need);
    //         need -= 5;
    //         console.log(need);

    //         return need

    //     }, 2000);
    //     console.log(need);
    //     return need
    // }
    // -------------------------------------------- Render user pet --------------------------------------------
    renderPet(){

        document.body.classList.remove("dead")
    //  console.log(this.time(this.checkScore(this.tiredness)));
    //  <progress id="sleepProgress" value="${this.time(this.checkScore(this.tiredness))}" max="100"></progress>

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
                        <progress id="sleepProgress" value="${this.checkScore(this.tiredness)}" max="100"></progress>
                    </div>
                    <div class="column">
                        <label for="hungerProgress"><p>Hungry</p><p>Full</p></label>
                        <progress id="hungerProgress" value="${this.checkScore(this.hunger)}" max="100"></progress>
                    </div>
                    <div class="column">
                        <label for="lonelyProgress"><p>Lonely</p><p>Loved</p>
                        </label>
                        <progress id="lonelyProgress" value="${this.checkScore(this.loneliness)}" max="100"></progress>
                    </div>
                    <div class="column">
                        <label for="happyProgress"><p>Unhappy</p><p>Happy</p>
                        </label>
                        <progress id="happyProgress" value="${this.checkScore(this.happiness)}" max="100"></progress>
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
    // console.log(petArr);

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
            <li class="pet-container">
                <h4 >${pet.name}</h4>
                <p>${pet.animalType}</p>
            </li>
        `
    });
}

//! Test för styling
// let bert = new Tamagotchi("Bert", "(˵ •̀ ᴗ - ˵ ) ✧)");
// bert.renderPet()

// petArr.push(bert);
// renderPetArr(petArr)
   