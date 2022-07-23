import nfts from "./nft.json" assert { type: "json" };

//global elements
const input = document.querySelector("#input");
let main = document.querySelector("main");
const filter = document.querySelector(".filter");
let searchBar = document.querySelector(".search-bar");

const name = filter.children[0];
const price = filter.children[1];
const svg = document.querySelector(".icon");

//global variables
let inputValue = "";
let filteredNfts = [];
let recommendations = [];

input.addEventListener("keyup", searchNfts);
name.addEventListener("click", clickEvent(sorByName, "name"));
price.addEventListener("click", clickEvent(sortByPrice, "price"));

svg.addEventListener("click", (e) => {
  e.stopPropagation();
  inputValue = input.value;
  filteredNfts = getFilteredNfts(nfts, inputValue);
  replaceElement(main, filteredNfts, generateNfts);
  toggleShownFilters(filteredNfts);
  resetElement(searchBar);
});

function searchNfts(e) {
  e.stopPropagation();
  inputValue = input.value;
  filteredNfts = getFilteredNfts(nfts, inputValue);
  if (e.code === "Enter") {
    replaceElement(main, filteredNfts, generateNfts);
    toggleShownFilters(filteredNfts);
    resetElement(searchBar);
  } else {
    if (input.value) {
      recommendations = filteredNfts.map(({ name }) => name);
      replaceElement(searchBar, recommendations, generateRecommendationsEl);
    } else {
      resetElement(cloneSearchBar);
    }
  }
}

function clickEvent(callback, sortBy) {
  return (e) => {
    e.stopPropagation();
    filteredNfts.sort(callback);
    replaceElement(main, filteredNfts, generateNfts);
    toggleClickedAButton(sortBy);
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

function replaceElement(element, data, callback) {
  resetElement(element);
  appendChildrenWithCallback(element, data, callback);
}

function resetElement(element) {
  if (element === searchBar) {
    if (element.children.length === 3) {
      element.removeChild(element.lastElementChild);
    }
  } else {
    if (element.children.length === 2) {
      element.removeChild(element.lastElementChild);
    }
  }
}

function appendChildrenWithCallback(element, data, callback) {
  if (data.length) {
    const children = callback(data);
    element.appendChild(children);
  }
}

function toggleShownFilters(filteredNfts) {
  if (filteredNfts.length) {
    filter.classList.remove("hidden");
  } else {
    filter.classList.add("hidden");
  }
}

function toggleClickedAButton(buttonName) {
  if (buttonName === "name") {
    name.classList.add("clicked");
    price.classList.remove("clicked");
  } else {
    name.classList.remove("clicked");
    price.classList.add("clicked");
  }
}

function generateNfts(filteredNfts) {
  const nfts = document.createElement("div");
  nfts.classList.add("nfts");
  for (const nft of filteredNfts) {
    nfts.innerHTML += getNft(nft);
  }
  return nfts;
}

function generateRecommendationsEl(recommendations) {
  const ul = document.createElement("ul");
  ul.classList.add("search-bar__recommendations");
  for (const recommendation of recommendations) {
    ul.innerHTML += getRecommendation(recommendation);
  }
  ul.addEventListener("click", (e) => {
    inputValue = e.target.textContent;
    filteredNfts = getFilteredNfts(nfts, inputValue);
    replaceElement(main, filteredNfts, generateNfts);
    toggleShownFilters(filteredNfts);
    resetElement(searchBar);
  });

  return ul;
}

function getNft(nft) {
  return `
  <div class="nft">
          <div class="nft__color" style="background-color:${nft.color};"> </div>
          <div class="nft__detail">
            <div class="nft__detail__name">
              <p>NFT</p>
              <p>${nft.name}</p>
            </div>
            <div class="nft__detail__price">
              <p>Price</p>
              <p>${nft.price} Either</p>
            </div>
          </div>
        </div>
        `;
}

function getRecommendation(recommendation) {
  return `<li>${recommendation}</li>`;
}

function getFilteredNfts(nfts, inputValue) {
  return nfts.filter(({ name }) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );
}
