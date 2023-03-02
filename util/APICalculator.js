import SimpleCalculator from './SimpleCalculator';

export default class APICalculator extends SimpleCalculator {
  constructor(
    unit,
    age,
    gender,
    height,
    weight,
    exercise,
    isNewDay,
    weather,
    food,
  ) {
    super(unit, age, gender, height, weight, exercise);
    this.isNewDay = isNewDay;
    this.weather = weather;
    this.food = food;
  }

  calculate() {
    this.recommendation = super.calculate();
    if (this.isNewDay) this.calorieFactor();
    this.sodiumFactor();
    this.temperatureFactor();
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
    if (this.weather.temperature > 75) {
      this.recommendation +=
        ((this.weather.temperature - 75) / 10) * this.unit === 'us-system'
          ? 8
          : 237;
    }
  }
}
