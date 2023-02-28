console.log("tamagotchi");

class Tamagotchi {
    constructor(name, animalType ) {
        this.name = name;
        this.animaType = animalType;
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

let tForm = document.querySelector('#createTamagotchi');
console.log(tForm);

tForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    let tamName = document.querySelector('#tName').value;
    console.log(tamName);

    let tamType = document.querySelector("#tType").value;
    console.log(tamType);
    
    
})

