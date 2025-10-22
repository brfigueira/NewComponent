class CardNews extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.style());
    }

    // Método para construir o HTML do componente
        build() {
            const componentRoot = document.createElement("div");
            componentRoot.setAttribute("class", "card"); // Adiciona a classe principal

        // Card Left
        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class", "card-left");

        const author = document.createElement("span");
        author.textContent = "Vagas de emprego"; // Você pode mudar isso depois

        const authorInfo = document.createElement("span");
        const authorImg = document.createElement("img");
        authorImg.src = "./assets/mutley.jpeg"; // Caminho relativo ao index.html
        authorImg.alt = "Foto de perfil";
        authorInfo.appendChild(authorImg);
        authorInfo.appendChild(document.createTextNode(" Mutley Vigarista"));
        
        const linkTitle = document.createElement("h1");
        linkTitle.textContent = "Dick Vigarista contrata Devs";

        const newsContent = document.createElement("p");
        newsContent.textContent = `Procura-se Devs que saibam trabalhar sobre pressão,
             para trabalhar no Project Catch the Pigeon. Ambiente acolhedor e 
             amigavel, dando enfase no crescimento pessoal. 
             Café por conta da casa!!!!!!`;
        
        cardLeft.appendChild(author);
        cardLeft.appendChild(document.createElement("br"));
        cardLeft.appendChild(authorInfo);
        cardLeft.appendChild(linkTitle);
        cardLeft.appendChild(newsContent);

        // Card Right
        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card-right");

        const newsImage = document.createElement("img");
        newsImage.src = "./assets/images.jpeg"; // Caminho relativo ao index.html
        newsImage.alt = "Imagem da notícia";
        cardRight.appendChild(newsImage);

        // Adiciona os lados esquerdo e direito ao root do componente
        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        return componentRoot;
    }

    // Método para aplicar os estilos CSS
    style() {
        const style = document.createElement("style");
        style.textContent = `
            .card {
                background-color: white;
                box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
                -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
                -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
                width: 750px;
                display: flex;
                flex-direction: row;
                border: solid 1px gray;
                margin-bottom: 8px;
            }

            .card-left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 10px;
            }

            .card-left > span {
                color: rgb(82, 81, 81);
            }
            
            .card-left span img {
                width: 20px;
                border-radius: 50%;
                border: solid 1px red;
                vertical-align: middle; /* Alinha a imagem com o texto */
            }

            .card-left > h1 {
                margin-top: 15px;
                font-size: 25px;
            }

            .card-left > p {
                color: rgb(67, 67, 67);
            }

            .card-right {
                display: flex; /* Adicionado para centralizar melhor */
                align-items: center;
                justify-content: center;
            }

            .card-right > img {
                width: 180px;
                margin: 30px;
            }
        `;
        return style;
    }
}

customElements.define('card-news', CardNews);
