export class Dog {
    constructor(breedName, asset) {
        this.breedName = breedName;
        this.asset = asset;
    }
}
export class DogArray {
    constructor() {
        this.dogArray = new Array();

    }

    addDog(y) {
        this.dogArray.push(y);
    }

    getDogBreeds() {
        let breedNameArray = [];
        this.dogArray.forEach(x => {
            breedNameArray.push(x.breedName);
        });
        return breedNameArray;
    }

    getBreedImg(z) {
        let breedImg = new Image();

        this.dogArray.forEach(x => {
            if (x.breedName == z) {
                breedImg = x.asset;
            }
        });

        return breedImg;

    }
}

// objectet /klassen Pet
export class Pet {
    constructor(name, animalType) {
        this.name = name;
        this.animalType = animalType;
        this.tiredness = 10;
        this.hunger = 50;
        this.loneliness = 50;
        this.happiness = 50;
    }
    nap() {
        this.tiredness = Math.max(0, this.tiredness - 40);
        this.happiness = Math.max(0, this.happiness - 10);
        // this.decreaseHappiness(10);
        this.hunger = Math.min(100, this.hunger + 10);
        this.loneliness = Math.min(100, this.loneliness + 10);

        this.getMessageDiv().innerHTML = this.name + " took a nap";
    }

    play() {
        if (this.tiredness >= 70) {
            console.log("Too tired to play.");
            return;
        }

        this.happiness = Math.min(100, this.happiness + 30);
        this.hunger = Math.min(100, this.hunger + 20);
        this.tiredness = Math.min(100, this.tiredness + 20);
        this.loneliness = Math.max(0, this.loneliness - 10);

        this.getMessageDiv().innerHTML = this.name + " played";
    }

    eat() {
        this.hunger = Math.max(0, this.hunger - 60);
        this.tiredness = Math.min(100, this.tiredness + 10);

        this.getMessageDiv().innerHTML = this.name + " ate";

    }
    timePassed() {
        setInterval(() => { //Ändrade från setTime till detta 
            this.happiness = Math.max(0, this.happiness - 10);
            this.hunger = Math.min(100, this.hunger + 20);
            this.tiredness = Math.min(100, this.tiredness + 20);
            this.loneliness = Math.max(0, this.loneliness - 10);
    
            //Hämtar html elementen 
            let tirednessElement = document.getElementById(`tiredness_${this.name}`);
            let hungerElement = document.getElementById(`hunger_${this.name}`);
            let lonelinessElement = document.getElementById(`loneliness_${this.name}`);
            let happinessElement = document.getElementById(`happiness_${this.name}`);
    
            //Uppdaterar värderna i HTML 
            if (tirednessElement) tirednessElement.value = this.tiredness;
            if (hungerElement) hungerElement.value = this.hunger;
            if (lonelinessElement) lonelinessElement.value = this.loneliness;
            if (happinessElement) happinessElement.value = this.happiness;
        }, 30000);  //Var 30 sek kommer värderna att ändras. 
    }
    getMessageDiv() {
        let petMessageDiv = document.getElementById('message' + this.name);
        return petMessageDiv;

    }

    // decreaseHappiness(decreaseBy){
    //     this.happiness = Math.max(0, this.happiness - decreaseBy);
    // }
}
