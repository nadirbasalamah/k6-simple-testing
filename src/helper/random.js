export function getRandomUser(csvData) {
  let randIndex = getRandomInt(0, csvData.length);
  return csvData[randIndex];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
