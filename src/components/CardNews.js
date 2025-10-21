class CardNews extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.style());
    }

    build(){
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class","card");

        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class","card-left");

        const author = document.createElement("span");
        author.textContent = "Vagas de Emprego";

        const bbreak = document.createElement("br")

        const authorInfo = document.createElement("span");
        const authorImg = document.createElement("img");
        authorImg.src = "../../assets/mutley.jpeg";
        authorImg.alt = "Foto de perfil";
        authorInfo.appendChild(authorImg);
        authorInfo.appendChild(document.textContent(" Mutley Vigarista"));

        const linkTitle =document.createElement("h1");
        linkTitle.textContent = `Dick Vigarista contrata Devs`;

        const newContent = document.createElement("p");
        newContent.textContent = `Procura-se Devs que saibam trabalhar sobre pressão,
             para trabalhar no Project Catch the Pigeon. Ambiente acolhedor e 
             amigavel, dando enfase no crescimento pessoal. 
             Café por conta da casa!!!!!!`;
    }
    
}

customElements.define('card-news', CardNews)