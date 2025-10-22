```js
// 'class' é uma palavra-chave do JavaScript usada para declarar uma classe (modelo ou molde de objetos).
// 'CardNews' é o nome da classe (por convenção, nomes de classes começam com letra maiúscula).
// 'extends' indica que esta classe herda (ou seja, ganha os recursos) de outra classe.
// 'HTMLElement' é a classe nativa do navegador que representa um elemento HTML padrão.
// Assim, 'CardNews' passa a ser um componente HTML personalizado.
class CardNews extends HTMLElement {

    // 'constructor()' é um método especial executado automaticamente quando uma nova instância da classe é criada.
    constructor() {

        // 'super()' chama o construtor da classe pai ('HTMLElement'),
        // garantindo que o componente seja corretamente inicializado como um elemento HTML.
        super();

        // 'const' cria uma constante, ou seja, uma variável cujo valor não pode ser reatribuído.
        // 'shadow' é o nome da variável que armazenará o shadow DOM.
        // 'this' representa a instância atual da classe, ou seja, o próprio componente 'CardNews'.
        // 'attachShadow()' é um método nativo de 'HTMLElement' que cria um shadow root (DOM isolado).
        // '{ mode: "open" }' é um objeto passado como parâmetro, indicando que o shadow root será acessível via JavaScript externo.
        const shadow = this.attachShadow({ mode: "open" });

        // 'shadow.appendChild()' adiciona um elemento filho dentro do shadow DOM.
        // 'this.build()' chama o método definido mais abaixo, que constrói a estrutura HTML do componente.
        shadow.appendChild(this.build());

        // 'shadow.appendChild()' novamente adiciona um filho dentro do shadow DOM.
        // 'this.style()' chama o método que cria e retorna os estilos CSS do componente.
        shadow.appendChild(this.style());
    }

    // 'build()' é o nome de um método criado dentro da classe.
    // Ele é responsável por montar toda a estrutura HTML do componente.
    build() {

        // 'const' cria uma constante chamada 'componentRoot'.
        // 'document.createElement("div")' cria um novo elemento <div> no DOM.
        const componentRoot = document.createElement("div");

        // 'setAttribute()' define um atributo HTML.
        // Aqui, adicionamos 'class="card"' à div criada.
        componentRoot.setAttribute("class", "card");

        // Criação da seção esquerda do card:
        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class", "card-left");

        // Criação de um elemento <span> para exibir o título da seção.
        const author = document.createElement("span");
        author.textContent = "Vagas de emprego";
        // 'textContent' define o texto exibido dentro do elemento.

        // Criação de outro <span> que conterá informações do autor.
        const authorInfo = document.createElement("span");

        // Criação de uma imagem dentro do span anterior.
        const authorImg = document.createElement("img");
        authorImg.src = "../../assets/mutley.jpeg";
        // '.src' define o caminho da imagem.
        authorImg.alt = "Foto de perfil";
        // '.alt' define o texto alternativo da imagem.

        // 'appendChild()' adiciona a imagem como filho do span 'authorInfo'.
        authorInfo.appendChild(authorImg);

        // 'appendChild()' novamente adiciona um texto após a imagem.
        // 'document.createTextNode()' cria um nó de texto simples.
        authorInfo.appendChild(document.createTextNode(" Mutley Vigarista"));

        // Criação de um título principal <h1>.
        const linkTitle = document.createElement("h1");
        linkTitle.textContent = "Dick Vigarista contrata Devs";

        // Criação do parágrafo <p> com o conteúdo da notícia.
        const newsContent = document.createElement("p");
        newsContent.textContent = `Procura-se Devs que saibam trabalhar sobre pressão,
             para trabalhar no Project Catch the Pigeon. Ambiente acolhedor e 
             amigavel, dando enfase no crescimento pessoal. 
             Café por conta da casa!!!!!!`;

        // Adiciona os elementos criados dentro da seção esquerda (cardLeft).
        cardLeft.appendChild(author);
        // 'createElement("br")' cria uma quebra de linha (<br>).
        cardLeft.appendChild(document.createElement("br"));
        cardLeft.appendChild(authorInfo);
        cardLeft.appendChild(linkTitle);
        cardLeft.appendChild(newsContent);

        // Criação da seção direita do card:
        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card-right");

        // Criação da imagem principal da notícia.
        const newsImage = document.createElement("img");
        newsImage.src = "./assets/images.jpeg";
        newsImage.alt = "Imagem da notícia";

        // Adiciona a imagem dentro da seção direita.
        cardRight.appendChild(newsImage);

        // Junta as duas seções (esquerda e direita) dentro do componente principal.
        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        // 'return' devolve o elemento completo, pronto para ser adicionado ao shadow DOM.
        return componentRoot;
    }

    // Método responsável por criar o estilo CSS do componente.
    style() {

        // Criação de um elemento <style>, onde será inserido o CSS.
        const style = document.createElement("style");

        // 'textContent' insere todo o conteúdo CSS dentro da tag <style>.
        style.textContent = `
            .card {
                background-color: white; /* define cor de fundo */
                box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); /* adiciona sombra */
                -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); /* compatibilidade com WebKit */
                -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); /* compatibilidade com Firefox */
                width: 750px; /* define largura */
                display: flex; /* usa layout flexível */
                flex-direction: row; /* posiciona os filhos lado a lado */
                border: solid 1px gray; /* define borda cinza */
                margin-bottom: 8px; /* adiciona espaçamento inferior */
            }

            .card-left {
                display: flex; /* ativa flexbox */
                flex-direction: column; /* organiza elementos em coluna */
                justify-content: center; /* centraliza verticalmente */
                padding: 10px; /* espaçamento interno */
            }

            .card-left > span {
                color: rgb(82, 81, 81); /* cor do texto */
            }
            
            .card-left span img {
                width: 20px; /* largura da imagem */
                border-radius: 50%; /* deixa a imagem redonda */
                border: solid 1px red; /* borda vermelha */
                vertical-align: middle; /* alinha a imagem com o texto */
            }

            .card-left > h1 {
                margin-top: 15px; /* espaço acima do título */
                font-size: 25px; /* tamanho da fonte */
            }

            .card-left > p {
                color: rgb(67, 67, 67); /* cor do parágrafo */
            }

            .card-right {
                display: flex; /* ativa flexbox */
                align-items: center; /* centraliza verticalmente a imagem */
                justify-content: center; /* centraliza horizontalmente a imagem */
            }

            .card-right > img {
                width: 180px; /* define a largura da imagem */
                margin: 30px; /* espaçamento ao redor da imagem */
            }
        `;

        // Retorna o elemento <style> pronto para ser adicionado ao shadow DOM.
        return style;
    }
}

// 'customElements' é um objeto global do navegador que gerencia os componentes personalizados.
// 'define()' é o método que registra um novo elemento personalizado.
// Primeiro parâmetro: nome do novo elemento ('card-news') — precisa conter um hífen obrigatoriamente.
// Segundo parâmetro: a classe que define o comportamento desse elemento (CardNews).
customElements.define('card-news', CardNews);

```
