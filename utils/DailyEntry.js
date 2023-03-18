export default class DailyEntry {
  constructor(
    recommendation,
    intake,
    drinkEntries,
    exercise,
    calories,
    protein,
  ) {
    this.recommendation = recommendation;
    this.intake = intake;
    this.drinkEntries = drinkEntries;
    this.exercise = exercise;
    this.calories = calories;
    this.protein = protein;
  }
}
