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
            <h4>Tiredness:
                <span id="sleep-score">${pet.tiredness}</span>
            </h4>
            <h4>Hunger:
                <span id="hunger-score">${pet.hunger}</span>
            </h4>
            <h4>Loneliness:
                <span id="lonely-score">${pet.loneliness}</span>
            </h4>
            <h4>Happiness:
                <span id="happy-score">${pet.happiness}</span>
            </h4>
        </div>
        <div class="pet-container">
            <h4>${pet.name}</h4>
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

let petArr = [];

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

    petArr.push(newPet)
    console.log(petArr);

    renderPetArr(petArr)
    
})

// -------------------------------------------- Render all the user created pets --------------------------------------------

function renderPetArr(arr) {

    let petDisplay = document.querySelector('#petContainer');
    petDisplay.innerHTML = ""
    let h3 = document.createElement("h3")
    h3.innerText = "All of my friends"
    petDisplay.appendChild(h3)

    arr.forEach(pet => {
        petDisplay.innerHTML += `
            <div class="pet-container">
                <h4>${pet.name}</h4>
                <p>${pet.animalType}</p>
            </div>
        `
    });


}

