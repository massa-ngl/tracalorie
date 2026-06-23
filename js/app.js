class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    document.addEventListener('DOMContentLoaded', this._render.bind(this));
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

  // PRIVATE METHODS
  _render() {
    this._displayCalorieLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();  
  }
  _displayCalorieLimit() {
    const calorieLimitEl = document.querySelector('#calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector('#calories-total');
    const consumed = this._meals.map((item) => item.calories).reduce((total, calories) => total + calories, 0);
    const burned = this._workouts.map((item) => item.calories).reduce((total, calories) => total + calories, 0);
    totalCaloriesEl.innerHTML = consumed - burned;
  }
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');
    const consumed = this._meals.map((item) => item.calories).reduce((total, calories) => total + calories, 0);
    caloriesConsumedEl.innerHTML = consumed;
  }
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector('#calories-burned');
    const burned = this._workouts.map((item) => item.calories).reduce((total, calories) => total + calories, 0);
    caloriesBurnedEl.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector('#calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
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

tracker.addMeal(lunch);
// tracker.addMeal(dinner);

tracker.addWorkout(pushups);
// tracker.addWorkout(sprinting);
console.log(tracker);