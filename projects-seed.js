// Projects Model
// const projects = [
//   { id: 1, title: "Build barn", description: "Lorem Ipsum" },
//   { id: 2, title: "Discover love", completed: true, deadline: anHourFromNow },
//   { id: 3, title: "Open the pod bay doors", priority: 10 },
// ];

const taskNames = [
  "Fetch Images",
  "Tile Images",
  "Format Tiles",
  "Send Tiles to Pre-Sorter",
  "Fetch Tiles from Pre-Sorter",
  "Bundle Tiles for Labeling",
  "Send Tiles to Labeling",
  "Fetch Tiles from Labeling",
  "Split Tiles for T/V/E",
  "Send Tiles to Model Training",
  "Fetch Models",
  "Send Models to T&V",
  "Fetch T&V Results",
  "File T&V Report",
];

const randomWords = [
  "class",
  "sugar",
  "husband",
  "night",
  "number",
  "mill",
  "south",
  "sort",
  "stems",
  "girl",
  "upon",
  "driven",
  "occur",
  "affect",
  "history",
  "sense",
  "pie",
  "cage",
  "total",
  "capital",
  "master",
  "cotton",
  "apartment",
  "train",
  "soon",
  "lift",
  "burst",
  "last",
  "combine",
  "tired",
  "fed",
  "win",
  "very",
  "sometime",
  "hope",
  "difference",
  "thirty",
  "grow",
  "onlinetools",
  "oil",
  "bet",
  "come",
  "date",
  "needs",
  "massage",
  "pack",
  "rhyme",
  "has",
  "white",
  "necessary",
  "suit",
  "push",
  "smoke",
  "front",
  "all",
  "load",
  "accept",
  "expect",
  "tribe",
  "lose",
  "atomic",
  "fighting",
  "aside",
  "yellow",
  "themselves",
  "gas",
  "shoot",
  "safe",
  "middle",
  "between",
  "drive",
  "science",
  "worry",
  "someone",
  "machine",
  "say",
  "word",
  "shade",
  "task",
  "frequently",
  "half",
  "burn",
  "examine",
  "mouse",
];

const highPriority = 1;
const lowPriority = 10;

function randomPriority() {
  return Math.floor(Math.random() * (lowPriority - 1)) + highPriority;
}

const minDescLength = 10;
const maxDescLength = 25;

function randomDescription() {
  let randomLength =
    Math.floor(Math.random() * (maxDescLength - minDescLength - 1)) +
    minDescLength;
  let randomDesc = [];
  let randomWordsLength = randomWords.length;
  for (let i = 0; i < randomLength; i++) {
    randomDesc.push(
      randomWords[Math.floor(Math.random() * (randomWordsLength - 1))]
    );
  }

  let randomDescStr = randomDesc.join(" ") + ".";
  randomDescStr = randomDescStr.charAt(0).toUpperCase() + randomDescStr.slice(1);

  return randomDescStr;
}

// !REPLACE
// In production make this a user setting variable
// .toLocaleString('en-US', { timeZone: "America/New_York" })
const usersTimeZone = "America/New_York";
// new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-US', { timeZone: usersTimeZone }))
const minDeadline = 0.01 * 60 * 60 * 1000;
const maxDeadline = 12 * 60 * 60 * 1000;
const offSetDeadline = 3 * 60 * 60 * 1000

function randomDeadline() {
  let randomDeadline = Math.floor(
    Math.random() * (maxDeadline - minDeadline) + minDeadline
  ) - offSetDeadline;
  let randomDate = new Date(
    new Date(new Date().getTime() + randomDeadline).toLocaleString("en-US", {
      timeZone: usersTimeZone,
    })
  );
  return randomDate;
}

const completedPercentage = 0.33;

function randomCompleted() {
  return Math.random() < completedPercentage;
}

function generateRandomProjects() {
  return taskNames.map((task, index) => ({
    title: task,
    description: randomDescription(),
    completed: randomCompleted(),
    priority: randomPriority(),
    deadline: randomDeadline(),
  }));
}

// !REMOVE - console log
// console.log(generateRandomProjects());

module.exports = generateRandomProjects();
