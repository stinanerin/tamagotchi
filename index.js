console.log("tamagotchi");

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
    nap(tired, hungry, lonely, happy) {
        this.tiredness = tired - 40;
        this.hunger = hungry - 10;
        this.loneliness = lonely + 10;
        this.happiness = happy + 10;
        renderPet(this);
    }
    play(tired, hungry, lonely, happy) {
        this.tiredness = tired + 20;
        this.hunger = hungry + 20;
        this.loneliness = lonely - 10;
        this.happiness = happy + 30;
        renderPet(this);
    }
    eat(tired, hungry) {
        this.tiredness = tired + 10;
        this.hunger = hungry - 60;
        renderPet(this);
    }
}

// -------------------------------------------- Render user pet --------------------------------------------
function renderPet(pet){
    // Hämta div
    let container = document.querySelector("#gameContainer")
    console.log(container);
    console.log(pet);

    container.innerHTML = `
        <div class="score">
            <p>Tiredness:
                <span id="sleep-score">${pet.tiredness}</span>
            </p>
            <p>Hunger:
                <span id="hunger-score">${pet.hunger}</span>
            </p>
            <p>Loneliness:
                <span id="lonely-score">${pet.loneliness}</span>
            </p>
            <p>Happiness:
                <span id="happy-score">${pet.happiness}</span>
            </p>
        </div>
        <div class="pet-container">
            <h3>${pet.name}</h3>
            <p>${pet.animalType}</p>
        </div>
        <div class="game-buttons">
            <button id="eat"><i class="fa-solid fa-cookie-bite"></i></button>
            <button id="play"><i class="fa-solid fa-otter"></i></button>
            <button id="sleep"><i class="fa-solid fa-moon"></i></button>
        </div>
    `

    // All methods
    let napBtn = document.querySelector("#sleep")
    let eatBtn = document.querySelector("#eat")
    let playBtn = document.querySelector("#play")

    napBtn.addEventListener("click", () => {
        console.log("in nap-event");
        console.log("this in event listener: ", this);
        pet.nap(pet.tiredness, pet.hunger, pet.loneliness ,pet.happiness)
    })

    eatBtn.addEventListener("click", () => {
        console.log("in eat-event");
        pet.eat(pet.tiredness, pet.hunger)
    })

    playBtn.addEventListener("click", () => {
        console.log("in play-event");
        pet.play(pet.tiredness, pet.hunger, pet.loneliness ,pet.happiness)
    })

}

// -------------------------------------------- FORM: User input for creating Pet --------------------------------------------

let tForm = document.querySelector('#createTamagotchi');

tForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Create a new instance of the Tamagotchi prototype from user input
    let tamName = document.querySelector('#tName').value;
    console.log(tamName);

    let tamType = document.querySelector("#tType").value;
    console.log(tamType);

    let newPet = new Tamagotchi(tamName, tamType)
    console.log(newPet);
    
    renderPet(newPet)
    
})

