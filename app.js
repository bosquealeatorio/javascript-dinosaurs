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
* @description creates an image object
* @param {object} dino
* @returns {string} relative path to the image of the species
*/
function validateFullInputs(formValues){

    let isEmpty = function(value){
        return value.trim() == ''
    }

    return formValues.filter(isEmpty).length != 0
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
function getDinoFilename(dino){
    let filename = `images/${dino['species'].toLowerCase()}.png`
    return filename
}


/**
* @description creates an image object
* @param {object} dino
* @returns {string} relative path to the image of the species
*/
function createImage(dino){
    let image = document.createElement('img')
    image.src = getDinoFilename(dino)
    image.width = 480
    image.height = 360
    return image
}


/**
* @description creates a div tile with the information in the object
* @param {object} 
* @returns {string} html code for the tile
*/
function createTile(infoObject){
    
    let tile = document.createElement('div')
    tile.style.background = 'white'
    
    //create name header
    let dinoName = document.createElement('h2')
    dinoName.innerText = infoObject['species']
    dinoName.id = 'tile-title'

    //add image
    let image = createImage(infoObject);
    
    //add random fact
    let randomFact = document.createElement('p')
    randomFact.innerText = infoObject['fact']
    randomFact.id = 'random-fact'

    tile.appendChild(dinoName)
    tile.appendChild(image)
    tile.appendChild(randomFact)
       
    return tile
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



// Add tiles to DOM
function createTiles(){

    let tiles = []
    dinos.forEach(function(dinoObject){
        tiles.push(createTile(dinoObject))
    })

    //shuffle tiles
    tiles = shuffleElements(tiles)

    //add human tile at the center
    let humanTile = createTile(Object.assign(human, {'fact': '', 'species': 'human'}))
    tiles.splice(4,0, humanTile)

    //add tiles to DOM
    tiles.forEach(function(tile){
        document.getElementById('grid').appendChild(tile)
    })
}

    


    


// Remove form from screen
function removeForm(){
    let form = document.getElementById('dino-compare')
    form.remove()
}


// On button click, prepare and display infographic
function createInfographic(){
    removeForm();
    createTiles();

}