import nfts from "./nft.json" assert { type: "json" };

//global elements
const inputEl = document.querySelector("#input");
let mainEl = document.querySelector("main");
const sortEl = document.querySelector(".sort-buttons");
let searchBarEl = document.querySelector(".search-bar");

mainEl.basicChildrenCounts = mainEl.children.length;
searchBarEl.basicChildrenCounts = searchBarEl.children.length;

const nameEl = sortEl.children[0];
const priceEl = sortEl.children[1];
const iconEl = document.querySelector(".icon");

//global state
let inputValue = "";
let searchedNfts = [];
let autocompletes = [];

inputEl.addEventListener("keyup", typeInput);
nameEl.addEventListener("click", handleClickSort(sorByName, "name"));
priceEl.addEventListener("click", handleClickSort(sortByPrice, "price"));
iconEl.addEventListener("click", handleClickSearch);

function typeInput() {
  inputValue = inputEl.value;
  searchedNfts = getSearchedNfts(nfts, inputValue);
  if (inputEl.value) {
    autocompletes = searchedNfts.map(({ name }) => name);
    replaceElement(searchBarEl, autocompletes, generateAutocompletesEl);
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
    sortEl.classList.remove("hidden");
  } else {
    sortEl.classList.add("hidden");
  }
}

function toggleClickedSortButtons(buttonName) {
  if (buttonName === "name") {
    nameEl.classList.add("clicked");
    priceEl.classList.remove("clicked");
  } else {
    nameEl.classList.remove("clicked");
    priceEl.classList.add("clicked");
  }
}

function resetClickedSortButtons() {
  nameEl.classList.remove("clicked");
  priceEl.classList.remove("clicked");
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

function generateAutocompletesEl(autocompletes) {
  const autocompletesEl = document.createElement("ul");
  autocompletesEl.classList.add("search-bar__autocompletes");
  autocompletesEl.setAttribute("data-cy", "autocompletes");
  for (const autocomplete of autocompletes) {
    autocompletesEl.innerHTML += getAutocomplete(autocomplete);
  }
  autocompletesEl.addEventListener("click", (e) => {
    inputEl.value = e.target.textContent;
    handleClickSearch();
  });

  return autocompletesEl;
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

function getAutocomplete(autocomplete) {
  return `<li>${autocomplete}</li>`;
}

function getSearchedNfts(nfts, inputValue) {
  return nfts.filter(({ name }) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );
}
