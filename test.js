import nfts from "./nft.json" assert { type: "json" };

//global elements
const input = document.querySelector("#input");
const main = document.querySelector("main");
const filter = document.querySelector(".filter");
const name = filter.children[0];
const price = filter.children[1];

//global variables
let inputValue = "";
let filteredNfts = [];

input.addEventListener("keypress", searchNfts);
name.addEventListener("click", clickEvent(sorByName, "name"));
price.addEventListener("click", clickEvent(sortByPrice, "price"));

function searchNfts(e) {
  if (e.code === "Enter") {
    inputValue = input.value;
    filteredNfts = nfts.filter(({ name }) => name.includes(inputValue));
    replaceNfts(filteredNfts);
  }
}

function clickEvent(callback, sortBy) {
  return (e) => {
    e.stopPropagation();
    filteredNfts.sort(callback);
    replaceNfts(filteredNfts);
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

function replaceNfts(filteredNfts) {
  removePrevNfts();
  appendCurrentNfts(filteredNfts);
}

function removePrevNfts() {
  if (main.children.length === 2) {
    main.removeChild(main.children[1]);
  }
}

function appendCurrentNfts(filteredNfts) {
  if (filteredNfts.length) {
    const nfts = generateNfts(filteredNfts);
    main.appendChild(nfts);
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

function generateNfts(filteredNfts) {
  const nfts = document.createElement("div");
  nfts.className += "nfts";
  for (const nft of filteredNfts) {
    nfts.innerHTML += getNft(nft);
  }
  return nfts;
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
