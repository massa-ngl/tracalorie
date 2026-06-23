class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
  }

  // PUBLIC METHODS/API
  addMeal(meal) {
    this._totalCalories += meal.calories;
    this._meals.push(meal);
    this._render();
  }
  addWorkout(workout) {
    this._totalCalories -= workout.calories;
    this._workouts.push(workout);
    this._render();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();
const lunch = new Meal("Lunch", 700);
const dinner = new Meal("Dinner", 100);
const pushups = new Workout("Pushup", 600);
const sprinting = new Workout("Sprinting", 102);
