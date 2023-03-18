import SimpleCalculator from './SimpleCalculator';

export default class APICalculator extends SimpleCalculator {
  constructor(
    unit,
    age,
    gender,
    height,
    weight,
    exercise,
    weather,
    calories,
    protein,
  ) {
    super(unit, age, gender, height, weight, exercise);
    this.weather = weather;
    this.calories = calories;
    this.protein = protein;
  }

  calculate() {
    this.recommendation = super.calculate();
    if (this.calories) this.calorieFactor();
    if (this.protein) this.proteinFactor();
    if (this.weather) this.temperatureFactor();
    return this.recommendation;
  }

  /* Calorie factor: find the percent difference between today's
  caloric intake and the average caloric instake over previous days.
  If the difference exceeds 20 percent, update the recommendation
  accordingly. */
  calorieFactor() {
    const percentDiff =
      (100 * (this.calories.today - this.calories.average)) /
      this.calories.average;
    if (percentDiff >= 20) this.recommendation *= 1.1;
    else if (percentDiff <= -20) this.recommendation *= 0.9;
  }

  /* Protein factor: find the percent difference between today's
  protein intake and the average protein instake over previous days.
  If the difference exceeds 10 percent, update the recommendation
  accordingly. */
  proteinFactor() {
    const percentDiff =
      (100 * (this.protein.today - this.protein.average)) /
      this.protein.average;
    if (percentDiff >= 10) this.recommendation *= 1.05;
    else if (percentDiff <= -10) this.recommendation *= 0.95;
  }

  /* Sodium factor: when sodium intake during the day surpasses 
  2,300mg, then add 1 cup = 8 oz = 237 ml */
  sodiumFactor() {
    if (this.food.sodiumIntake > 2300) {
      this.recommendation += this.unit === 'us-system' ? 8 : 237;
    }
  }

  /* Temperature factor: for every 10 degrees that the temperature 
  is above room temperature, add 1 cup = 8 oz = 237 ml. */
  temperatureFactor() {
    if (this.weather.temperature > 80) {
      let amount = 8 * Math.floor((this.weather.temperature - 80) / 10);
      if (this.unit === 'metric') amount *= 30;
      this.recommendation += amount;
    }
  }
}
