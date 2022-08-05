const nfts = [
  { name: "Dog 15", price: "0.101", color: "#758ead" },
  { name: "Dog 13", price: "0.318", color: "#56fe0e" },
  { name: "Cow 11", price: "0.369", color: "#4f86e2" },
  { name: "Lion 18", price: "0.691", color: "#678844" },
  { name: "Lion 13", price: "0.435", color: "#1b6e40" },
  { name: "Lion 15", price: "0.115", color: "#86d2df" },
  { name: "Lion 16", price: "0.773", color: "#d9b9c5" },
  { name: "Lion 21", price: "0.816", color: "#c50542" },
  { name: "Lion 19", price: "0.285", color: "#ab4df4" },
  { name: "Dog 44", price: "0.423", color: "#9c6521" },
  { name: "Dog 53", price: "0.900", color: "#ab00fa" },
  { name: "Cat 77", price: "0.566", color: "#fb335a" },
  { name: "Cat 55", price: "0.557", color: "#3af26c" },
  { name: "Cat 13", price: "0.256", color: "#fd4b0b" },
  { name: "Cat 12", price: "0.285", color: "#8b248e" },
  { name: "Fish 13", price: "0.528", color: "#c40682" },
  { name: "Fish 55", price: "0.392", color: "#4be659" },
  { name: "Fish 99", price: "0.635", color: "#f7c83b" },
];

//global elements
const inputEl = document.querySelector("#input");
const sortEl = document.querySelector(".sort-buttons");
const nftsEl = document.querySelector(".nfts");
const autocompletesUl = document.querySelector(".search-bar__autocompletes");

const nameEl = sortEl.children[0];
const priceEl = sortEl.children[1];
const iconEl = document.querySelector(".icon");

//global state
let inputValue = "";
let searchedNfts = [];
let autocompletes = [];

//type event
inputEl.addEventListener("keyup", typeInput);

//search events
iconEl.addEventListener("click", handleClickSearch);
autocompletesUl.addEventListener("click", (e) => {
  inputEl.value = e.target.textContent;
  handleClickSearch();
});

//sort events
nameEl.addEventListener("click", handleClickSort(sorByName, "name"));
priceEl.addEventListener("click", handleClickSort(sortByPrice, "price"));

function typeInput() {
  inputValue = inputEl.value;
  searchedNfts = getSearchedNfts(nfts, inputValue);
  if (inputEl.value) {
    autocompletes = searchedNfts.map(({ name }) => name);
    replaceElement(autocompletes, autocompletesUl, getAutocomplete);
  } else {
    resetElement(autocompletes);
  }
}

function handleClickSearch() {
  inputValue = inputEl.value;
  if (!inputValue) {
    return;
  }
  searchedNfts = getSearchedNfts(nfts, inputValue);
  replaceElement(searchedNfts, nftsEl, getNft);
  toggleShownSortButtons(searchedNfts);
  resetElement(autocompletesUl);
  resetClickedSortButtons();
}

function getSearchedNfts(nfts, inputValue) {
  return nfts.filter(({ name }) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function replaceElement(data, element, getElementCallback) {
  resetElement(element);
  appendChildren(data, element, getElementCallback);
}

function resetElement(element) {
  element.innerHTML = "";
}

function appendChildren(data, element, getElementCallback) {
  for (const datum of data) {
    element.innerHTML += getElementCallback(datum);
  }
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

function handleClickSort(callback, sortBy) {
  return () => {
    searchedNfts.sort(callback);
    replaceElement(searchedNfts, nftsEl, getNft);
    toggleClickedSortButtons(sortBy);
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
