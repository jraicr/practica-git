import { RaiNodeHelper } from './RaiNodeHelper.js';

export class Ingredient {

    #disabledButton;

    /**
     *  Crea un objeto que guarda los datos de los ingredientes. 
     * @param {string} id El ID unico del ingrediente
     * @param {string} displayName  El nombre que se mostrará
     * @param {string} description  La descripción del ingrediente
     */
    constructor(id, displayName, description, htmlContainer, imgSrc) {

        this.id = id;
        this.displayName = displayName;
        this.description = description;
        this.selected = false;
        this.button = undefined;
        this.card = this.#createCard(htmlContainer, imgSrc)

        this.#disabledButton = false;
    }

    /**
     *  Crea una representación del ingrediente
     * @param {HTMLElement} htmlContainer Contenedor donde insertar nodos de tarjetas de ingredientes
     * @param {string} imgSrc La ruta de la imagen que contendrá la tarjeta
     * @returns El nodo del DOM insertado
     */
    #createCard(htmlContainer, imgSrc) {
        let cardDiv = RaiNodeHelper.createDivElement(this.id, ["card"]);
        let ingredientPic = RaiNodeHelper.createImg(imgSrc, `Ingrediente: ${this.displayName}`);
        let cardContentDiv = RaiNodeHelper.createDivElement(`${this.id}-content`, ["card-content"]);

        let ingredientDisplayTitle = RaiNodeHelper.createTitle("h4", this.displayName);

        let descriptionParagraph = RaiNodeHelper.createParagraph(this.description);


        // footer de card
        let cardFooterDiv = RaiNodeHelper.createDivElement(`${this.id}-footer`, ["card-footer"])
        let colorBandDiv = RaiNodeHelper.createDivElement(undefined, ["color-band"]);
        let selectButton = RaiNodeHelper.createAnchor("Seleccionar", "", "_self", ['ingredient-btn']);

        selectButton.addEventListener("click", (e) => {
            this.switchSelection(e);
        });

        cardDiv.append(ingredientPic, cardContentDiv, cardFooterDiv);
        cardContentDiv.append(ingredientDisplayTitle, descriptionParagraph);

        cardFooterDiv.append(colorBandDiv, selectButton);

        htmlContainer.append(cardDiv);

        this.button = selectButton;

        return cardDiv;
    }


    switchSelection(e) {
        e.preventDefault();

        if (!this.#disabledButton) {
            const button = e.target;
            const cardDiv = button.parentNode.parentNode;

            this.selected = !this.selected;

            if (this.selected) {
                button.innerText = "Eliminar selección"
                cardDiv.classList.add('card-selected');
                cardDiv.lastChild.firstChild.classList.add('color-band-selected');

            } else {
                button.innerText = "Seleccionar";
                cardDiv.classList.remove('card-selected');
                cardDiv.lastChild.firstChild.classList.remove('color-band-selected');
            }
        }
    }

    disableButton() {
        this.#disabledButton = true;

        this.button.classList.add('ingredient-btn-disabled');
        this.button.previousSibling.classList.add("color-band-disabled");
        
    }

    enableButton() {
        this.#disabledButton = false;

        this.button.classList.remove('ingredient-btn-disabled');
        this.button.previousSibling.classList.remove("color-band-disabled");
    }
}