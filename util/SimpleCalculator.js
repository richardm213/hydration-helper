export default class SimpleCalculator {
  constructor(unit, age, gender, height, weight, exercise) {
    this.unit = unit;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.exercise = exercise;
    this.recommendation = 0;
  }

  calculate() {
    this.weightFactor();
    this.exerciseFactor();
    this.waterUnitFactor();
    this.genderFactor();
    this.ageFactor();
    return this.recommendation;
  }

  /* Weight factor: generally, it is recommended that people drink
  0.5 to 1 oz of water per lb of bodyweight. We will use 0.5 as 
  a starting point, which will allow for additional factors such as
  exercise to bring the recommended amount up. If unit is metric, 
  convert user's weight from kg to lbs. */
  weightFactor() {
    if (this.unit === 'metric') {
      this.recommendation += (this.weight / 0.453592) * 0.5;
    } else {
      this.recommendation += this.weight * 0.5;
    }
  }

  /* Water unit factor: if unit is metric, convert oz to ml. */
  waterUnitFactor() {
    if (this.unit === 'metric') {
      this.recommendation *= 30;
    }
  }

  /* Exercise factor: for every 30 min of exercise, add 12 oz */
  exerciseFactor() {
    this.recommendation += (this.exercise / 30) * 12;
  }

  /* Gender factor: if user is male, increase recommendation 
  slightly */
  genderFactor() {
    if (this.gender === 'male') this.recommendation *= 1.05;
  }

  /* Age factor: if user is elderly, decrease recommendation.
  If user is a child, increase recommendation. */
  ageFactor() {
    if (this.age > 65) this.recommendation *= 0.9;
    if (this.age <= 12) this.recommendation *= 1.05;
  }
}
