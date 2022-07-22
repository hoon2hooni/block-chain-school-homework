const names = [
  "멋사",
  "멋사 11",
  "멋사 13",
  "멋사 짱 123",
  "멋사 짱 1235",
  "블록체인",
  "블록체인 123",
  "메타콩즈",
  "메타콩즈 5455",
  "메타콩즈 54551233",
  "메타콩즈 54553",
  "메타콩즈 543123355",
  "메타콩즈 54523",
  "메타 바리스타 1234",
  "메타 바리스타 1111",
  "메타 바리스타 1212",
  "메타 바리스타 12333",
  "메타 홀리몰리 123",
];

const prices = [
  "0.101",
  "0.318",
  "0.369",
  "0.691",
  "0.435",
  "0.115",
  "0.773",
  "0.816",
  "0.285",
  "0.423",
  "0.900",
  "0.566",
  "0.557",
  "0.256",
  "0.285",
  "0.528",
  "0.392",
  "0.635",
];

const object = {};
const colors = Array.from({ length: 18 }).map(
  (_) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
);
const results = Array.from({ length: 18 }).map((_, idx) => {
  return {
    name: names[idx],
    price: prices[idx],
    color: colors[idx],
  };
});
console.log(JSON.stringify(results));
