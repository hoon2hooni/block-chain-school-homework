import nfts from "./nft.json" assert { type: "json" };

//global elements
const input = document.querySelector("#input");
const main = document.querySelector("main");
const filter = document.querySelector(".filter");
const name = filter.children[0];
const price = filter.children[1];

//global variables
let inputValue = "";
let filteredCards = [];

input.addEventListener("keypress", enterEvent);
name.addEventListener("click", clickEvent(sorByName, "name"));
price.addEventListener("click", clickEvent(sortByPrice, "price"));


function enterEvent(e) {
  if (e.code === "Enter") {
    inputValue = input.value;
    filteredCards = nfts.filter(({ name }) => name.includes(inputValue));
    replaceCards(filteredCards);
  }
}

function clickEvent(callback, sortBy) {
  return (e) => {
    e.stopPropagation();
    filteredCards.sort(callback);
    replaceCards(filteredCards);
    toggleFilters(sortBy);
  };
}

function sorByName(n, m) {
  return n.name > m.name ? 1 : -1;
}

function sortByPrice(n, m) {
  const a = Number(n.price);
  const b = Number(m.price);
  return a < b ? 1 : -1;
}

function replaceCards(filteredCards) {
  removePrevCards();
  appendCurrentCards(filteredCards);
}

function removePrevCards() {
  if (main.children.length === 2) {
    main.removeChild(main.children[1]);
  }
}

function appendCurrentCards(filteredCards) {
  if (filteredCards.length) {
    const cards = generateCards(filteredCards);
    main.appendChild(cards);
    filter.classList.remove("hidden");
  } else {
    filter.classList.add("hidden");
  }
}

function toggleFilters(sortBy) {
  if (sortBy === "name") {
    name.classList.add("clicked");
    price.classList.remove("clicked");
  } else {
    name.classList.remove("clicked");
    price.classList.add("clicked");
  }
}

function generateCards(filteredCards) {
  const cards = document.createElement("div");
  cards.className += "cards";
  for (const nft of filteredCards) {
    cards.innerHTML += getCard(nft);
  }
  return cards;
}

function getCard(nft) {
  return `
  <div class="card">
          <div class="card__color" style="background-color:${nft.color};"> </div>
          <div class="card__detail">
            <div class="card__detail__name">
              <p>NFT</p>
              <p>${nft.name}</p>
            </div>
            <div class="card__detail__price">
              <p>Price</p>
              <p>${nft.price} Either</p>
            </div>
          </div>
        </div>
        `;
}
