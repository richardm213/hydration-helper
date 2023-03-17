import SimpleCalculator from './SimpleCalculator';

export default class APICalculator extends SimpleCalculator {
  constructor(unit, age, gender, height, weight, exercise, weather, food) {
    super(unit, age, gender, height, weight, exercise);
    this.weather = weather;
    this.food = food;
  }

  calculate() {
    this.recommendation = super.calculate();
    if (this.food) {
      this.calorieFactor();
      this.sodiumFactor();
    }
    if (this.weather) this.temperatureFactor();
    return this.recommendation;
  }

  /* Calorie factor: check if today's caloric intake is greater
  or less than the average intake over the past week. If so, increase 
  or decrease the water recommendation accordingly. */
  calorieFactor() {
    if (this.food.calorieIntake > this.food.avgCalorieIntake) {
      this.recommendation *= 1.1;
    } else if (this.food.calorieIntake < this.food.avgCalorieIntake) {
      this.recommendation *= 0.9;
    }
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
