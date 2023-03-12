const ageList = [];
for (let i = 5; i <= 100; i += 1) {
  ageList.push(`${i}`);
}

const heightList = [];
for (let i = 36; i <= 250; i += 1) {
  heightList.push(`${i}`);
}

const weightList = [];
for (let i = 50; i <= 350; i += 1) {
  weightList.push(`${i}`);
}

const AGES = {
  ages: ageList,
  heights: heightList,
  weights: weightList,
};
export default AGES;
