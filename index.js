import { Dog, DogArray, Pet } from '/dogs.js';
//Instanser  av dog och dogArray samt 
let bullDogImg = new Image();
bullDogImg.src = 'assets/bulldog.png';
let bullDog = new Dog("Bull-dog", bullDogImg);

let dalmatianImg = new Image();
dalmatianImg.src = 'assets/dalmatian.png';
let dalmatian = new Dog("Dalmatian", dalmatianImg);

let germanShepherdImg = new Image();
germanShepherdImg.src = "assets/german-shepherd.png";
let germanShepherd = new Dog("German-Shepherd", germanShepherdImg);

let cockapooImg = new Image();
cockapooImg.src = 'assets/Cockapoo.png';
let cockapoo = new Dog("Cockapoo", cockapooImg);

//Instans av dogArrat som heter alldogs 
let allDogs = new DogArray();
allDogs.addDog(bullDog);
allDogs.addDog(dalmatian);
allDogs.addDog(germanShepherd);
allDogs.addDog(cockapoo);

function generatePetStatusHTML(pet) {

    let dogImg = allDogs.getBreedImg(pet.animalType);
    return `
        <div class="pet">
            <h2>${pet.name}, ${pet.animalType}</h2>
            ${dogImg.outerHTML}
            <p>Tiredness: <progress value="${pet.tiredness}" max="100"></progress></p>
            <p>Hunger: <progress value="${pet.hunger}" max="100"></progress></p>
            <p>Loneliness: <progress value="${pet.loneliness}" max="100"></progress></p>
            <p>Happiness: <progress value="${pet.happiness}" max="100"></progress></p>
        </div>
    `;
}





document.getElementById('createPet').addEventListener('submit', function (event) {
    event.preventDefault();
    
    setTimeout(() => {
        
        // console.log("hej");
    }, 2000);

    const name = document.getElementById('inputName').value;
    const animalType = document.getElementById('dog-breeds').value;

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
    napBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    napBtn.addEventListener("click", () => {
        pet.nap();

        statusDiv.innerHTML = generatePetStatusHTML(pet);
    });

    let playBtn = document.createElement("button");
    playBtn.innerHTML = `<i class="fa-solid fa-football"></i>`;
    playBtn.addEventListener("click", () => {
        pet.play();
        statusDiv.innerHTML = generatePetStatusHTML(pet);
    });

    let eatBtn = document.createElement("button");
    eatBtn.innerHTML = `<i class="fa-solid fa-bone"></i>`;
    eatBtn.addEventListener("click", () => {
        pet.eat();

        statusDiv.innerHTML = generatePetStatusHTML(pet);
    });

    let petMessageDiv = document.createElement("div");
    petMessageDiv.innerHTML = pet.name + " is created!";
    petMessageDiv.id = 'message' + pet.name;
    petContainer.append(petMessageDiv);

    petContainer.append(napBtn, playBtn, eatBtn);
});





// dropdown för breeds  (Hittade lösningen på stackoverflow )
let containerDropDown = document.getElementById('containerDropDown');


let dogArray = allDogs.getDogBreeds();
let selectList = document.createElement("select");
selectList.id = "dog-breeds";

// Create a disabled and selected option
let defaultOption = document.createElement("option");
defaultOption.textContent = " --select an option -- ";
defaultOption.value = "";
defaultOption.selected = true;
defaultOption.disabled = true;
selectList.appendChild(defaultOption);

for (let i = 0; i < dogArray.length; i++) {
    let option = document.createElement("option");
    option.value = dogArray[i];
    option.text = dogArray[i];
    selectList.appendChild(option);
}

containerDropDown.appendChild(selectList);

// let Chase = new Pet("Chase", "German shepherd");
// Chase.nap();
// console.log(Chase);
// let Sky = new Pet("Sky", "cocker spaniel/poodle");
// let Marshall = new Pet("Marshall", "Dalmatian");
// let Rubble = new Pet("Rubble ", "English bulldog");



