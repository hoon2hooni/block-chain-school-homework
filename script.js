import nfts from "./nft.json" assert { type: "json" };

//global elements
const inputEl = document.querySelector("#input");
let mainEl = document.querySelector("main");
const filterEl = document.querySelector(".sort-buttons");
let searchBarEl = document.querySelector(".search-bar");

mainEl.basicChildrenCounts = mainEl.children.length;
searchBarEl.basicChildrenCounts = mainEl.children.length;

const name = filterEl.children[0];
const price = filterEl.children[1];
const svg = document.querySelector(".icon");

//global state
let inputValue = "";
let searchedNfts = [];
let recommendations = [];

inputEl.addEventListener("keyup", typeInput);
name.addEventListener("click", handleClickSort(sorByName, "name"));
price.addEventListener("click", handleClickSort(sortByPrice, "price"));
svg.addEventListener("click", handleClickSearch);

function typeInput() {
  inputValue = inputEl.value;
  searchedNfts = getSearchedNfts(nfts, inputValue);
  if (inputEl.value) {
    recommendations = searchedNfts.map(({ name }) => name);
    replaceElement(searchBarEl, recommendations, generateRecommendationsEl);
  } else {
    resetElement(searchBarEl);
  }
}

function handleClickSort(callback, sortBy) {
  return () => {
    searchedNfts.sort(callback);
    replaceElement(mainEl, searchedNfts, generateNftsEl);
    toggleClickedSortButtons(sortBy);
  };
}

function handleClickSearch() {
  inputValue = inputEl.value;
  if (!inputValue) {
    return;
  }
  searchedNfts = getSearchedNfts(nfts, inputValue);
  replaceElement(mainEl, searchedNfts, generateNftsEl);
  toggleShownSortButtons(searchedNfts);
  resetElement(searchBarEl);
  resetClickedSortButtons();
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
  if (element.children.length !== element.basicChildrenCounts) {
    element.removeChild(element.lastElementChild);
  }
}

function appendChildrenWithCallback(element, data, callback) {
  if (data.length) {
    const children = callback(data);
    element.appendChild(children);
  }
}

function toggleShownSortButtons(filteredNfts) {
  if (filteredNfts.length) {
    filterEl.classList.remove("hidden");
  } else {
    filterEl.classList.add("hidden");
  }
}

function toggleClickedSortButtons(buttonName) {
  if (buttonName === "name") {
    name.classList.add("clicked");
    price.classList.remove("clicked");
  } else {
    name.classList.remove("clicked");
    price.classList.add("clicked");
  }
}

function resetClickedSortButtons() {
  name.classList.remove("clicked");
  price.classList.remove("clicked");
}

function generateNftsEl(nfts) {
  const nftsEl = document.createElement("div");
  nftsEl.classList.add("nfts");
  nftsEl.setAttribute("data-cy", "nfts");
  for (const nft of nfts) {
    nftsEl.innerHTML += getNft(nft);
  }
  return nftsEl;
}

function generateRecommendationsEl(recommendations) {
  const recommendationsEl = document.createElement("ul");
  recommendationsEl.classList.add("search-bar__recommendations");
  recommendationsEl.setAttribute("data-cy", "recommendations");
  for (const recommendation of recommendations) {
    recommendationsEl.innerHTML += getRecommendation(recommendation);
  }
  recommendationsEl.addEventListener("click", (e) => {
    inputEl.value = e.target.textContent;
    handleClickSearch();
  });

  return recommendationsEl;
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

function getSearchedNfts(nfts, inputValue) {
  return nfts.filter(({ name }) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );
}
