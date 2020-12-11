// Robot model
// robot = {
//     name: "R2-D2",
//     imageUrl: "/images/r2d2.png",
//     fuelType: "electric",
//     fuelLevel: 88.34,
//   }

const names = [
  "Timothy",
  "Otis",
  "Leroy",
  "Horace",
  "Maggie",
  "Zoey",
  "Konstantin",
  "Imogene",
  "Esmi",
  "Hiroki",
  "Shannon",
  "Tibor",
  "Moonbeam"
];

const maxImageUrls = 50;
const imageUrlBase = "/images/robots/Robot_Avatars_";

function imageUrlGenerator(index=0){
  return index < maxImageUrls && index >= 0 ? imageUrlBase + (index + 1) + '.png' : imageUrlBase + (Math.floor(Math.random() * (maxImageUrls - 1)) + 1) + '.png'
}

const fuelTypes = ["diesel", "electric", "gas"];

function randomFuelType() {
  return fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
}

function randomFuelLevel() {
  return Math.floor(Math.random() * (1000 - 100) + 100) / 100;
}

function generateRandomRobots() {
  return names.map((name, index) => ({
    name,
    imageUrl: imageUrlGenerator(index),
    fuelType: randomFuelType(),
    fuelLevel: randomFuelLevel(),
  }));
}

// !REMOVE - console log
// console.log(generateRandomRobots());

module.exports = generateRandomRobots();
