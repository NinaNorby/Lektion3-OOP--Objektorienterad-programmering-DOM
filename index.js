function generatePetStatusHTML(pet) {
    return `
        <div class="pet">
            <h2>${pet.name}, ${pet.animalType}</h2>
            <p>Tiredness: <progress value="${pet.tiredness}" max="100"></progress></p>
            <p>Hunger: <progress value="${pet.hunger}" max="100"></progress></p>
            <p>Loneliness: <progress value="${pet.loneliness}" max="100"></progress></p>
            <p>Happiness: <progress value="${pet.happiness}" max="100"></progress></p>
        </div>
    `;
}

document.getElementById('createPet').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('inputName').value;
    const animalType = document.getElementById('dog-names').value;

    //Förhindrar att man kan gå  vidare utan att fylla i alla fält 
    if (!name || !animalType) {
        let errorMessage = 'Enter a name and select an animal type ';
        alert(errorMessage);
        return;
    }

    const pet = new Pet(name, animalType);
    const petContainer = document.getElementById('pets');

    let statusDiv = document.createElement("div");
    statusDiv.innerHTML = generatePetStatusHTML(pet);
    petContainer.append(statusDiv);

    let napBtn = document.createElement("button");
    napBtn.innerHTML = "Nap";
    napBtn.addEventListener("click", () => {
        pet.nap();

        statusDiv.innerHTML = generatePetStatusHTML(pet);
    });

    let playBtn = document.createElement("button");
    playBtn.innerHTML = "Play";
    playBtn.addEventListener("click", () => {
        pet.play();
        statusDiv.innerHTML = generatePetStatusHTML(pet);
    });

    let eatBtn = document.createElement("button");
    eatBtn.innerHTML = "Feed";
    eatBtn.addEventListener("click", () => {
        pet.eat();

        statusDiv.innerHTML = generatePetStatusHTML(pet);
    });

    let petMessageDiv = document.createElement("div");
    petMessageDiv.innerHTML = pet.name + " created!";
    petMessageDiv.id = 'message' + pet.name;
    petContainer.append(petMessageDiv);

    petContainer.append(napBtn, playBtn, eatBtn);
});


// objectet /klassen Pet
class Pet {
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

    getMessageDiv() {
        let petMessageDiv = document.getElementById('message' + this.name);
        return petMessageDiv;
    }

    // decreaseHappiness(decreaseBy){
    //     this.happiness = Math.max(0, this.happiness - decreaseBy);
    // }
}


// let Chase = new Pet("Chase", "German shepherd");
// Chase.nap();
// console.log(Chase);
// let Sky = new Pet("Sky", "cocker spaniel/poodle");
// let Marshall = new Pet("Marshall", "Dalmatian");
// let Rubble = new Pet("Rubble ", "English bulldog");
