console.log("tamagotchi");

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
        /*  
            Sänker tiredness med 40,
            sänker happiness med 10, 
            ökar hunger och loneliness med 10.
        */

    }
    play() {
        /*
            Ökar happiness med 30, 
            ökar hunger och tiredness med 20. 
            Sänker loneliness med 10.
        */

    }
    eat() {
        /*
            Sänker hunger med 60, 
            ökar tiredness med 10.
        */

    }
}



function renderTam(pet){
    // Hämta div
    let container = document.querySelector("#gameContainer")
    console.log(container);
    console.log(pet);

    container.innerHTML = `
        <div class="pet-container">
            <h3>${pet.name}</h3>
            <p>${pet.animalType}</p>
        </div>
    `


}


let tForm = document.querySelector('#createTamagotchi');

tForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Skapa en ny instans av Tamagotchi-prototypen utifrån användarens input
    let tamName = document.querySelector('#tName').value;
    console.log(tamName);

    let tamType = document.querySelector("#tType").value;
    console.log(tamType);

    let newPet = new Tamagotchi(tamName, tamType)
    console.log(newPet);
    
    // Visa ut användarens skapade Tamagotchi i DOM:en
    renderTam(newPet)
    
})

