import { Ingredient } from './ingredient.js';
import { RaiNodeHelper } from './RaiNodeHelper.js';


// Ingredientes
let ingredientsWrapperElement;
let ingredients = [];
let selectedIngredients = [];
let maxSelectableIngredients = 4;
let maxIngredientsSelectedReached = false;

// Masas
let crustsWrapperElement;
let crusts = [];
let selectedCrust = [];
let maxSelectableCrusts = 1;
let maxCrustSelectedReached = false;

// Footer y botón para generar PDFs
let footer;
let finished = false;
let pdfButton;

init();

function init() {
    cacheElements();
    setupIngredients();
    setupCrusts();
    setupEventHandlers();
}


function setupEventHandlers() {

    // Configura los botones de cada tarjeta de ingredientes
    ingredients.forEach(ingredient => {
        ingredient.button.addEventListener("click", (e) => {
            updateSelectedIngredients(e, ingredients, selectedIngredients, maxSelectableIngredients, "ingredient");
        });
    });

    // Configura los botones de cada tarjeta de masa
    crusts.forEach(crust => {
        crust.button.addEventListener("click", (e) => {
            updateSelectedIngredients(e, crusts, selectedCrust, maxSelectableCrusts, "crust");
        });
    });

    // Configura botón para generar pdf

    pdfButton.addEventListener("click", generatePDF);
}

function cacheElements() {
    ingredientsWrapperElement = document.querySelector("#ingredients");
    crustsWrapperElement = document.querySelector("#crusts");
    footer = document.querySelector(".footer");
    pdfButton = document.querySelector(".pdf-button");
}

function setupCrusts() {
    let thin = new Ingredient('thin',
        'Fina',
        'La masa fina es un tipo de masa de pizza más delgada y crocante, caracterizada por tener un borde más fino y una textura más crujiente. Esta masa es perfecta para aquellos que prefieren una pizza con una textura más ligera y un sabor más concentrado en los ingredientes superiores.',
        crustsWrapperElement,
        'pics/thin-crust.jpg');

    let classic = new Ingredient('classic',
        'Clásica',
        'La masa clásica es un tipo de masa de pizza más gruesa y suave, que se caracteriza por tener un borde más grueso y una textura más suave y alveolada. Esta masa es perfecta para aquellos que prefieren una pizza con una textura más pesada y un sabor más equilibrado en la masa y los ingredientes superiores.',
        crustsWrapperElement,
        'pics/classic-crust.jpg');

    crusts.push(thin, classic);
}

function setupIngredients() {
    let sausage = new Ingredient('tomate',
        'Salsa Tomate',
        'La salsa de tomate es una salsa o pasta elaborada principalmente a partir de pulpa de tomates.',
        ingredientsWrapperElement,
        'pics/sausage.jpg');

    let pepperoni = new Ingredient('pepperoni',
        'Pepperoni',
        'El pepperoni es un tipo de salami italiano con un sabor fuerte y picante, hecho con carne de cerdo y res, y es uno de los ingredientes más populares para las pizzas.',
        ingredientsWrapperElement,
        'pics/pepperoni.jpg');

    let ham = new Ingredient('ham',
        'Jamón',
        'El jamón es un alimento curado que se obtiene a partir de la pierna de cerdo, y se caracteriza por su sabor salado y su aroma intenso. Es un ingrediente común en muchas pizzas.',
        ingredientsWrapperElement,
        'pics/ham.jpg');

    let greenPepper = new Ingredient('green-pepper',
        'Pimiento Verde',
        'El pimiento verde es un tipo de pimiento que tiene un sabor suave y dulce, y es un ingrediente popular en muchas pizzas debido a su textura crujiente y su sabor añejo.',
        ingredientsWrapperElement,
        'pics/greenpepper.jpg');

    let onion = new Ingredient('onion',
        'Cebolla',
        'La cebolla es un ingrediente básico en la cocina, que se caracteriza por su sabor fuerte y su aroma intenso. Es un ingrediente común en muchas pizzas debido a su capacidad para añadir un toque dulce y suave.',
        ingredientsWrapperElement,
        'pics/onion.jpg');

    let mushroom = new Ingredient('mushroom',
        'Setas',
        'Las setas son un tipo de hongo que tienen un sabor suave y tierno, y son un ingrediente popular en muchas pizzas debido a su textura y sabor distintivo.',
        ingredientsWrapperElement,
        'pics/mushroom.jpg');

    let pineapple = new Ingredient('pineapple',
        'Piña',
        'La piña es una fruta tropical con un sabor dulce y afrutado, y es un ingrediente popular en muchas pizzas debido a su capacidad para añadir un toque de dulzor y sabor tropical.',
        ingredientsWrapperElement,
        'pics/pineapple.jpg');

    ingredients.push(sausage, pepperoni, ham, greenPepper, onion, mushroom, pineapple);
}

function updateSelectedIngredients(e, ingredientsArray, selectedArray, maxSelectable, ingredientType) {

    let cardElement = e.target.parentNode.parentNode;
    let ingredientID = cardElement.id

    let searchSelected = ingredientsArray.filter((ingredient) => {
        return ingredient.id == ingredientID;
    })

    let selectedIngredientObj = searchSelected[0];

    // Introduce ingrediente del array de seleccionados
    if (selectedArray.length < maxSelectable && !selectedArray.includes(selectedIngredientObj)) {
        selectedArray.push(selectedIngredientObj);

        // Elimina ingrediente del array de seleccionados
    } else if (selectedArray.includes(selectedIngredientObj)) {
        const index = selectedArray.indexOf(selectedIngredientObj);
        selectedArray.splice(index, 1);
    }

    console.debug(selectedArray);

    if (ingredientType == 'ingredient') {
        updateMaxIngredientReached(selectedArray, maxSelectable);

    } else if (ingredientType == 'crust') {
        updateMaxCrustReached(selectedArray, maxSelectable);
    }

    checkSelectionsComplete();
}

function updateMaxIngredientReached(selectedArray, maxSelectable) {
    if (selectedArray.length === maxSelectable && !maxIngredientsSelectedReached) {
        disableUnselectedBtnIngredients(ingredients, selectedArray);
        maxIngredientsSelectedReached = true;

    } else if (selectedArray.length < maxSelectable && maxIngredientsSelectedReached) {
        enableUnselectedBtnIngredients(ingredients, selectedArray);
        maxIngredientsSelectedReached = false;
    }
}

function updateMaxCrustReached(selectedArray, maxSelectable) {
    if (selectedArray.length === maxSelectable && !maxCrustSelectedReached) {
        disableUnselectedBtnIngredients(crusts, selectedArray);
        maxCrustSelectedReached = true;

    } else if (selectedArray.length < maxSelectable && maxCrustSelectedReached) {
        enableUnselectedBtnIngredients(crusts, selectedArray);
        maxCrustSelectedReached = false;
    }
}

function disableUnselectedBtnIngredients(ingredientsArray, selectedArray) {
    ingredientsArray.forEach((ingredient) => {
        if (!selectedArray.includes(ingredient)) {
            ingredient.disableButton();
        }
    })
}

function enableUnselectedBtnIngredients(ingredientsArray, selectedArray) {
    ingredientsArray.forEach((ingredient) => {
        if (!selectedArray.includes(ingredient)) {
            ingredient.enableButton();
        }
    })
}


function checkSelectionsComplete() {
    if (selectedCrust.length == 1 && selectedIngredients.length == 4 && !finished) {
        footer.classList.remove("hide");
        footer.classList.add("show");
        footer.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        finished = true;

    } else if ((selectedCrust.length != 1 || selectedIngredients.length != 4) && finished) {
        footer.classList.remove("show");
        footer.classList.add("hide");
        finished = false;
    }
}


async function generatePDF() {
    let doc = new jsPDF();

    const centerColumn = 60;
    const leftColumn = 20;

    const starterLine = 20;
    let currentLine = starterLine;

    doc.text("Esta es tu pizza personalizada:", centerColumn, currentLine);
    currentLine += 20;

    doc.text("Tipo de masa:", leftColumn, currentLine);
    currentLine += 10;

    selectedCrust.forEach((crust) => {
        doc.text(`- ${crust.displayName}`, leftColumn, currentLine);
        currentLine += 10;
    })

    currentLine += 10;
    doc.text("Ingredientes:", leftColumn, currentLine);
    currentLine += 10;

    selectedIngredients.forEach((ingredient) => {
        doc.text(`- ${ingredient.displayName}`, leftColumn, currentLine);
        currentLine += 10;
    })

    doc.save('pizza-custom.pdf');
}

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}