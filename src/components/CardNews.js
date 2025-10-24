// Arquivo: src/components/CardNews.js

class CardNews extends HTMLElement {
    constructor() {
        super();
        
        // O constructor agora só cria o "Shadow DOM" (a raiz)
        // Ele não constrói mais o card aqui.
        this.attachShadow({ mode: "open" }); 
    }

    // Este método é chamado AUTOMATICAMENTE pelo navegador
    // QUANDO o elemento é adicionado na tela (ex: com appendChild).
    connectedCallback() {
        // Agora sim, chamamos o build e o styles,
        // pois os atributos já foram setados pelo app.js
        this.shadowRoot.appendChild(this.build());
        this.shadowRoot.appendChild(this.styles());
    }

    build() {
        // O seu método build() original está perfeito.
        // Não precisa mudar nada dentro dele.
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "card");

        // card-left
        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class", "card-left");

        const span = document.createElement("span");
        // Agora, this.getAttribute() vai funcionar!
        span.textContent = this.getAttribute("setor") || "Setor não informado";

        const h1 = document.createElement("h1");
        h1.textContent = this.getAttribute("titulo") || "Título da Vaga não informado";

        const p = document.createElement("p");
        p.textContent = this.getAttribute("descricao") || "Descrição da vaga não informada";

        const anunciante = document.createElement("div");
        anunciante.setAttribute("class", "anunciante");

        const imgAnunciante = document.createElement("img");
        imgAnunciante.src = this.getAttribute("foto-anunciante") || "https://via.placeholder.com/20";
        imgAnunciante.alt = "Foto do Anunciante";

        const nomeAnunciante = document.createElement("span");
        nomeAnunciante.textContent = " | Postado por: " + (this.getAttribute("nome-anunciante") || "Anunciante Desconhecido");

        anunciante.appendChild(imgAnunciante);
        anunciante.appendChild(nomeAnunciante);

        cardLeft.appendChild(span);
        cardLeft.appendChild(h1);
        cardLeft.appendChild(p);
        cardLeft.appendChild(anunciante);

        // card-right
        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card-right");

        const imgEmpresa = document.createElement("img");
        imgEmpresa.src = this.getAttribute("imagem-empresa") || "https://via.placeholder.com/180";
        imgEmpresa.alt = "Imagem da Empresa";

        cardRight.appendChild(imgEmpresa);

        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        return componentRoot;
    }

    styles() {
        // O seu método styles() original está perfeito.
        // Não precisa mudar nada dentro dele.
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

            .card-right {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .card-left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 10px;
                flex-grow: 1;
            }

            .card-left > span {
                color: rgb(82, 81, 81);
                font-size: 14px;
            }

            .card-left > h1 {
                margin-top: 15px;
                font-size: 25px;
            }

            .card-left > p {
                color: rgb(67, 67, 67);
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .card-right > img {
                width: 180px;
                height: 180px;
                object-fit: cover;
                margin: 30px;
            }

            .anunciante {
                display: flex;
                align-items: center;
                margin-top: 5px;
            }

            .anunciante img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 1px solid red;
                margin-right: 5px;
            }

            .anunciante span {
                font-size: 12px;
                color: #333;
            }
        `;
        return style;
    }
}

customElements.define("card-news", CardNews);