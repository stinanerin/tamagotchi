console.log("tamagotchi");

let action;

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
        renderPet(this);
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
        renderPet(this);
    }
    eat( ) {
        this.tiredness -= 15;
        this.hunger += 30;
        action= `You ate with ${this.name}`;
        renderPet(this);
    }
}

// -------------------------------------------- Render user pet --------------------------------------------
function renderPet(pet){
    // Hämta div
    let container = document.querySelector("#gameContainer")
    console.log(container);
    console.log(pet);

    //todo! if check för alla  poäng 
    //! kasta på dead klassen på hela bodyn när den dör

    if(pet.tiredness <= 0) {
        console.log(document);
        document.body.classList.add("dead")
    }

    container.innerHTML = `
        <div class="score">
            <label for="sleepProgress">Tiredness:
                <span id="sleep-score">${pet.tiredness > 100 ? pet.tiredness = 100 : pet.tiredness < 0 ? pet.tiredness = 0: pet.tiredness}</span>
                <progress id="sleepProgress" value="${pet.tiredness}" max="100"></progress>
            </label>
            <label for="hungerProgress">Hunger:
                <span id="hunger-score">${pet.hunger > 100 ? pet.hunger = 100 : pet.hunger < 0 ? pet.hunger = 0 : pet.hunger}</span>
                <progress id="hungerProgress" value="${pet.hunger}" max="100"></progress>
            </label>
            <label for="lonelyProgress">Loneliness:
                <span id="lonely-score">${pet.loneliness > 100 ? pet.loneliness = 100 : pet.loneliness < 0 ? pet.loneliness = 0 : pet.loneliness}</span>
                <progress id="lonelyProgress" value="${pet.loneliness}" max="100"></progress>
            </label>
            <label for="happyProgress">Happiness:
                <span id="happy-score">${pet.happiness > 100 ? pet.happiness = 100 : pet.happiness < 0 ? pet.happiness = 0 : pet.happiness}</span>
                <progress id="happyProgress" value="${pet.happiness}" max="100"></progress>
            </label>
        </div>
        <div class="pet-container">
            <h4>${pet.name}</h4>
            <p>${pet.animalType}</p>
        </div>
        <div class="game-buttons">
            <button id="eat"><i class="fa-solid fa-cookie-bite"></i></button>
            <button id="play"><i class="fa-solid fa-otter"></i></button>
            <button id="sleep"><i class="fa-solid fa-moon"></i></button>
            <p>${action ? action : ""}</p>
        </div>
    `
    
    // All methods
    let napBtn = document.querySelector("#sleep")
    let eatBtn = document.querySelector("#eat")
    let playBtn = document.querySelector("#play")

    napBtn.addEventListener("click", () => {
        console.log("this in event listener: ", this);
        pet.nap()
    })

    eatBtn.addEventListener("click", () => {
        pet.eat()
    })

    playBtn.addEventListener("click", () => {
        pet.play()
    })

}

// -------------------------------------------- FORM: User input for creating Pet --------------------------------------------

let tForm = document.querySelector('#createTamagotchi');

let petArr = [];

tForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Create a new instance of the Tamagotchi prototype from user input
    let tamName = document.querySelector('#tName').value;
    let tamType = document.querySelector("#tType").value;
    let newPet = new Tamagotchi(tamName, tamType)
    
    renderPet(newPet)

    petArr.push(newPet)
    console.log(petArr);

    renderPetArr(petArr)
})

// -------------------------------------------- Render all the user created pets --------------------------------------------

function renderPetArr(arr) {

    let petDisplay = document.querySelector('#petContainer');
    petDisplay.innerHTML = `
        <h3>All of my friends</h3>
        <div class="pet-row"></div>
    `
    let petRow = document.querySelector('.pet-row');


    arr.forEach(pet => {
        petRow.innerHTML += `
            <div class="pet-container">
                <h4>${pet.name}</h4>
                <p>${pet.animalType}</p>
            </div>
        `
    });
}

