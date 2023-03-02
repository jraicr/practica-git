/**
 *  @summary Funciones de utilidad para crear nodos del DOM 
 *  @author J. Rai <jraicr@gmail.com>
 *
 */

export class RaiNodeHelper {

    /**
     * Crea y devuelve un enlace o anchor <a>
     * 
     * @param {string} text El texto del enlace
     * @param {string} href Dirección del nelace
     * @param {string} target Ventana donde se abrirá el enlace. Por defecto "_self" 
     * @param {string[]} classList Los valores del atributo class del elemento html. Por defecto undefined
     * @returns 
     */
    static createAnchor(text, href, target = "_self", classList = undefined) {
        let anchorElement = document.createElement("a");
        anchorElement.text = text;
        anchorElement.href = href;
        anchorElement.target = target;

        if (classList != undefined && classList.length > 0) {
            classList.forEach(styleClass => {
                anchorElement.classList.add(styleClass);
            });
        }

        return anchorElement;
    }


    /**
     * Crea y devuelve el nodo HTMl de una imagen <img>
     * @param {string} src La fuente de la imagen
     * 
     * @returns El elemento HTML de la imagen
     */
    static createImg(src, alt='') {
        let imgElement = document.createElement("img");
        //imgElement.loading = "lazy"; // Carga diferida de imágenes
        imgElement.src = src;
        imgElement.alt = alt;
        imgElement.title = alt;

        return imgElement;
    }


    /**
     * Crea y devuelve un nodo HTML del tipo encabezado (h1, h2, h3...)
     * @param {HTMLHeadingElement} titleType El tipo de elemento titulo (h1, h2, h3...)
     * @param {string} titleText El texto del título
     * @param {string[]} classArray Los valores del atributo class del elemento html. Por defecto undefined
     * @returns El elemento HTML del título
     */
    static createTitle(titleType, titleText, classArray = undefined) {
        let titleElement = document.createElement(titleType);
        titleElement.innerText = titleText;

        if (classArray != undefined && classArray.length > 0) {
            classArray.forEach(styleClass => {
                titleElement.classList.add(styleClass);
            });
        }

        return titleElement;
    }



    /**
     *  Devuelve un elemento HTML párrafo <p>
     * @param {string} paragraphText El texto del párrafo
     * @param {string[]} classList Los valores del atributo class del elemento html
     * 
     * @returns El elemento HTML del párrafo
     */

    static createParagraph(paragraphText, classList = undefined) {
        let paragraphElement = document.createElement("p");
        paragraphElement.innerText = paragraphText;

        if (classList != undefined && classList.length > 0) {
            classList.forEach(styleClass => {
                paragraphElement.classList.add(styleClass);
            });
        }

        return paragraphElement;
    }


    /**
     * Crea y devuelve un elemento <svg>
     * @param {*} viewBox La posicion y dimensión de un viewport SVG
     * @param {*} fill El valor del relleno del vector
     * @param {*} width El ancho en el sistema de coordenadas del usuario (px, em, rem...)
     * @param {*} height  El alto en el sistema de coordenadas del usuario (px, em, rem...)
     * @returns El elemento HTML SVG
     */
    static createSVGElement(viewBox, fill, width, height) {
        let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttributeNS(null, "viewBox", viewBox);
        svgElement.setAttributeNS(null, "fill", fill);

        svgElement.setAttributeNS(null, "width", width);
        svgElement.setAttributeNS(null, "height", height);

        return svgElement;
    }

    /**
     * Crea y devuelve un elemento <path>
     * @param {*} shape Los comandos que forman el dibujo del polígono
     * @param {*} fill El color de relleno
     * @returns El elemento path
     */
    static createSVGPathElement(shape, fill) {
        let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttributeNS(null, "d", shape);
        pathElement.setAttributeNS(null, "fill", fill);

        return pathElement;
    }


    /**
     *  Devuelve un elemento HTML <div>
     * @param {string} id El atributo ID elemento HTML
     * @param {string[]} classList Los valores del atributo class del elemento html
     * 
     * @returns El elemento HTML del DIV
     */
    static createDivElement(id = undefined, classList = undefined) {
        let divElement = document.createElement("div");

        if (id != undefined) divElement.id = id;

        if (classList != undefined && classList.length > 0) {
            classList.forEach(styleClass => {
                divElement.classList.add(styleClass);
            });
        }


        

        return divElement;
    }  
}

