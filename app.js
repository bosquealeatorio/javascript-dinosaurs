// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    return {
        weight: weight,
        species: species,
        height: height,
        diet: diet,
        where: where,
        when: when,
        fact: fact
    }
}

// Create Dino Objects
const dinos = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": "372",
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]



// Create Human Object
function Human(formValues){
    return {
        species: formValues[0],
        heightFeet: formValues[1],
        heightInches: formValues[2],
        weight: formValues[3],
        diet: formValues[4]
    }
}

let human = {}

// Use IIFE to get human data from form


/**
* @description listens to the click event on the form and triggers the infographic generation
* @param {string} event - event to listen to
* @param {function} callback - the function to execute when the event happens
*/
const button = document.getElementById('btn')
button.addEventListener('click', (function() {
    
    return function readFormData(){
        let form = document.querySelector('form')
        let formData = new FormData(form);
        let formValues = [];
        
        formData.forEach(function(item){
             formValues.push(item)
        })

        if (validateFullInputs(formValues)){
            alert('Please fill all the inputs')
        }
        else{
            human = Human(formValues);
            createInfographic();

        }
    }
})());


/**
* @description validates if the form inputs are not empty.
* @param {array} formValues - the values of the form to validate
* @returns {boolean} - true if the form is not empty, false otherwise
*/
function validateFullInputs(formValues){

    let isEmpty = function(value){
        return value.trim() == ''
    }

    return formValues.filter(isEmpty).length != 0
}


/**
* @description simple algorithm to shuffle elements in an array
* @param {object} input array 
* @returns {object} output array with elements shuffled
*/
function shuffleElements(array){
    
    let new_array = []
    let length = array.length
    
    for (let index = 0; index < length; index++) {

        //on each iteration select a random element and add it to the new_array
        removeIndex = Math.floor(Math.random() * array.length)
        new_array.push(array[removeIndex])
        array.splice(removeIndex, 1)
    }
    
    return new_array
}




// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array


/**
* @description gets the image path of the given species
* @param {object} dino
* @returns {string} relative path to the image of the species
*/
function getDinoFilename(speciesName){
    let filename = `images/${speciesName.toLowerCase()}.png`
    return filename
}


function createGridItem(){
    let gridItem = document.createElement('div')
    gridItem.className = 'grid-item'
    return gridItem
}

function createHeaderBlock(headerText){
    let header = document.createElement('h3');
    header.innerText = headerText
    return header
}

function createImageBlock(speciesName){
    let image = document.createElement('img')
    image.src = getDinoFilename(speciesName)
    return image
}

function createFactBlock(factText){
    let fact = document.createElement('p')
    fact.innerText = factText
    return fact
}

function createDinoTile(dinoObject){
    
    let gridItem = createGridItem()
    let header = createHeaderBlock(dinoObject['species'])
    let image = createImageBlock(dinoObject['species'])
    let fact = createFactBlock(dinoObject['fact'])

    gridItem.appendChild(header)
    gridItem.appendChild(image)
    gridItem.appendChild(fact)
       
    return gridItem
}


function createHumanTile(humanObject){
    
    let gridItem = createGridItem()
    let header = createHeaderBlock(humanObject['name'])
    let image = createImageBlock(humanObject['species'])

    gridItem.appendChild(header)
    gridItem.appendChild(image)
       
    return gridItem
}


function createTiles(){

    //shuffle dinos
    let shuffled_dinos = shuffleElements(dinos)

    //create dino tiles
    let gridItems = []
    shuffled_dinos.forEach(function(item){
        gridItems.push(createDinoTile(item))
    })

    //add human tile at the center
    let humanItem = createHumanTile(Object.assign(human, {'species': 'human'}))
    gridItems.splice(4,0, humanItem)

    //add styletiles grid
    for (let index = 0; index < gridItems.length; index++) {
        gridItems[index].className = gridItems[index].className + ` grid-item:nth-child(${index + 1})`  
    }

    //add tiles to DOM
    gridItems.forEach(function(item){
        document.getElementById('grid').appendChild(item)
    })
}

    

/**
* @description remove the form from the DOM
* @param no params
* @returns no returns
*/
function removeForm(){
    let form = document.getElementById('dino-compare')
    form.remove()
}


// On button click, prepare and display infographic
function createInfographic(){
    removeForm();
    createTiles();
}