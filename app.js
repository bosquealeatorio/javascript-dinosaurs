/**
* @description factory function for the Dinosaur objects
* @constructor
* @param {object} characteristics - species of the dinosaur
* @return {object} Dino object
*/
function Dino(object) {
    return Object.assign({}, object)
}


/**
 * @description example dinosaurs to show on the project
 */
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

let dinoObjects = dinos.map(function(item){
    return Dino(item)
})


/**
* @description constructor for the Human objects
* @constructor
* @return {object} Human object with the calculated fields
*/
function Human(formValues){

    heightFeet = formValues[1],
    heightInches = formValues[2],
    height = parseInt(heightFeet)*12 + parseInt(heightInches)
    weight = parseInt(formValues[3])

    return {
        name: formValues[0],
        height: height,
        weight: weight,
        diet: formValues[4],
        species: 'Human'
    }
};


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
            let human = Human(formValues);
            generateInfographic(dinoObjects, human);
        }
    }
})());

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
/**
* @description compares the user height with the dinosaur and returns a message
* @param {object} dinoObject - Dino object to compare to
* @param {object} humanObject - Human object to compare
* @return {string} the generated fact based on the comparison
*/
function compareAndGenerateFact1(dinoObject, humanObject){
    if (humanObject.height >= dinoObject.height){
        return `If this was the ${dinoObject.when}, you would be safe, you are are taller than the ${dinoObject.species}!`
    }
    else {
        return `This dinosaur is more than ${Math.floor(dinoObject.height/humanObject.height)} ${humanObject.name}s tall`
    }
}


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
/** 
* @description compares the user weight with the dinosaur and returns a message
* @param {object} dinoObject - Dino object to compare to
* @param {object} humanObject - Human object to compare
* @return {string} the generated fact based on the comparison
*/
function compareAndGenerateFact2(dinoObject, humanObject){
    if (humanObject.weight >= dinoObject.weight){
        return `It sounds impossible, but you weight more than this dinosaur.`
    }
    else {
        return `Could you lift a ${dinoObject.species}? I'm not very optimistic about that.`
    }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
/** 
* @description compares the user diet with the dinosaur and returns a message
* @param {object} dinoObject - Dino object to compare to
* @param {object} humanObject - Human object to compare
* @return {string} the generated fact based on the comparison
*/
function compareAndGenerateFact3(dinoObject, humanObject){
    if (humanObject.diet == dinoObject.diet){
        return `You and ${dinoObject.species} would get along. You're both ${dinoObject.diet}`
    }
    else {
        return `In the ${dinoObject.when}, ${dinoObject.species} would not share its food with you.`
    }
}


//We create a separate function for each element of the grid 
/**
* @description creates a grid item 
* @returns {object} returns the grid item with the associated class
*/
function createGridItem(){
    let gridItem = document.createElement('div')
    gridItem.className = 'grid-item'
    return gridItem
}


/**
* @description creates the header of the grid item
* @param {string} headerText - the text string to use as title 
* @returns {object} returns the header element
*/
function createHeaderBlock(headerText){
    let header = document.createElement('h3');
    header.innerText = headerText
    return header
}


/**
* @description creates the image element of the grid item
* @param {string} headerText - the text string to use as title 
* @returns {object} returns the image element
*/
function createImageBlock(speciesName){
    let image = document.createElement('img')
    image.src = getFilename(speciesName)
    return image
}

/**
* @description creates the paragraph element of the grid item
* @param {string} factText - the fact to show in the element
* @returns {object} return the fact element
*/
function createFactBlock(factText){
    let fact = document.createElement('p')
    fact.innerText = factText
    return fact
}

function generateFact(animalObject, humanObject){
    //if its a pigeon print the regular fact
    if (animalObject.species == 'Pigeon'){
        return animalObject.fact
    }
    //if its a dinosaur generate a random fact
    else{
        number = Math.floor(Math.random()*11)
        if (number <= 4){
            factText = animalObject.fact
        }
        else if(number <= 6){
            factText = compareAndGenerateFact1(animalObject, humanObject);
        }
        else if (number <= 8){
            factText = compareAndGenerateFact2(animalObject, humanObject);
        }
        else {
            factText = compareAndGenerateFact3(animalObject, humanObject);
        }
    }

    return factText
}

/**
* @description creates the tile for the Dinosaurs and the Bird
* @param {object} dinoObject - the dinosaur object created with the constructor
* @returns {object} return the grid element to append to the DOM
*/
function createDinoGridItem(dinoObject, humanObject){
    
    let gridItem = createGridItem()
    let header = createHeaderBlock(dinoObject['species'])
    let image = createImageBlock(dinoObject['species'])
    let fact = createFactBlock(generateFact(dinoObject, humanObject))

    gridItem.appendChild(header)
    gridItem.appendChild(image)
    gridItem.appendChild(fact)
       
    return gridItem
}


/**
* @description creates the tile for the Human (without a fact)
* @param {object} humanObject - the human object created with the constructor
* @returns {object} return the grid element to append to the DOM
*/
function createHumanGridItem(humanObject){
    
    let gridItem = createGridItem()
    let header = createHeaderBlock(humanObject['name'])
    let image = createImageBlock(humanObject['species'])

    gridItem.appendChild(header)
    gridItem.appendChild(image)
       
    return gridItem
}


/**
* @description creates the tile for the Human (without a fact)
* @param {object} humanObject - the human object created with the constructor
* @returns {object} return the grid element to append to the DOM
*/
function createGridItems(dinoObjects, humanObject){

    //shuffle dinos 
    dinoObjects = shuffleElements(dinoObjects)

    //create dino tiles
    let gridItems = []
    dinoObjects.forEach(function(dinoObject){
        gridItems.push(createDinoGridItem(dinoObject, humanObject))
    })

    //add human tile at the center
    let humanItem = createHumanGridItem(humanObject)
    gridItems.splice(4,0, humanItem)

    return gridItems
}


/**
* @description add the grid elements to the DOM
* @param {array} gridItems - an array with the ordered grid items to add
*/
function drawGrid(gridItems){

    //add style to grid elements
    for (let index = 0; index < gridItems.length; index++) {
        gridItems[index].className = gridItems[index].className + ` grid-item:nth-child(${index + 1})`  
    }

    //add grid items to DOM
    gridItems.forEach(function(item){
        document.getElementById('grid').appendChild(item)
    })    
};


/**
* @description remove the form from the DOM
* @returns none
*/
function removeForm(){
    let form = document.getElementById('dino-compare')
    form.remove()
};


/**
* @description generate the infographic on the form submission
*/
function generateInfographic(dinoObjects, humanObject){
    removeForm();
    let gridItems = createGridItems(dinoObjects, humanObject);
    drawGrid(gridItems);
}


//Helper functions
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
* @description helper function to get the path of an image
* @param {string} speciesName - the name of the species to generate the path
* @returns {string} relative path to the .png image of the species
*/
function getFilename(speciesName){
    let filename = `images/${speciesName.toLowerCase()}.png`
    return filename
}


/**
* @description helper function with a simple algorithm to shuffle elements in an array
* @param {object} array - input array to shuffle
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