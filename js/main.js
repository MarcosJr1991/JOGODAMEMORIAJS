const cardBoard = document.querySelector("#cardboard"); // pegando o card atraves do id

//pegando as imagens atraves de um array
const imgs = [
  "vue.svg",
  "angular.svg",
  "react.svg",
  "ember.svg",
  "backbone.svg",
  "aurelia.svg"
];
/* vair ser para nossa html com as imagens para cria vou usar um forEarch nas imagens
esse forEach vai trazer um img e vai concatenar o cardHTML utlizando uma div onde tem dois tipos de imagem
o img src pra colocar a pasta img e utilizar o nome que vai vim da const.
e logo abaixo o img src do padrão js-badge  e nomear o card front e back*/
let cardHTML = "";

imgs.forEach(img => {
  cardHTML += `<div class="memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}"/>
    <img class="back-face" src="img/js-badge.svg">
  </div>`;
});
//da um innerhtml e somar o card html
cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim da Renderização HTML */


/* cards vai pegar todos que tiver a classe memory card  com duas variaveis */
const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;
// flip card
function flipCard() {
  if (lockCards) return false;
  this.classList.add("flip");
 
  /*if para verficar se foi preenchida e dar um firstcard para definir com this, e dar um return false para 
  sair dentro da função */
  if (!firstCard) {
    firstCard = this;
    return false;
  }
//definição da segunda carta
  secondCard = this;

  checkForMatch();
}
//checar se é uma carta é parecida com a outra
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  //se for false remove a carta e limpa o card com reset
  !isMatch ? unFlipCards() : resetCards(isMatch);
}
//vai desabilitar as cartas e remover se a carta não é igual usando o ismatch
function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

//random
(function shuffle(){
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    })
})()

// função pra limpar 
function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}
//para cada card pecorrido vai receber um click e rodar a função desse modo flip card
cards.forEach(card => card.addEventListener("click", flipCard));