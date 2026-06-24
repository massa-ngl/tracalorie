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
    this._displayCaloriesProgress();
  }
  _displayCalorieLimit() {
    const calorieLimitEl = document.querySelector('#calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector('#calories-total');
    const consumed = this._meals.map((meal) => meal.calories).reduce((total, calories) => total + calories, 0);
    const burned = this._workouts.map((workout) => workout.calories).reduce((total, calories) => total + calories, 0);
    const total = consumed - burned;
    totalCaloriesEl.innerHTML = total;
  }
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');
    const consumed = this._meals.map((meal) => meal.calories).reduce((total, calories) => total + calories, 0);
    caloriesConsumedEl.innerHTML = consumed;
  }
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector('#calories-burned');
    const burned = this._workouts.map((workout) => workout.calories).reduce((total, calories) => total + calories, 0);
    caloriesBurnedEl.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector('#calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
    const progressEl = document.querySelector('#calorie-progress');

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
      caloriesRemainingEl.style.color = '#fff';
      caloriesRemainingEl.nextElementSibling.style.color = '#fff';
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
      caloriesRemainingEl.style.color = '#000';
      caloriesRemainingEl.nextElementSibling.style.color = '#000';
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }
  _displayCaloriesProgress() {
    const progressEl = document.querySelector('#calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
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

class App {
  constructor() {
    this._tracker = new CalorieTracker();

  this._render();
  }
  
  _render() {
    document.querySelector('#meal-form').addEventListener('submit', this._newMeal.bind(this));
    document.querySelector('#workout-form').addEventListener('submit', this._newWorkout.bind(this));
  }
  _newMeal(e) { 
    e.preventDefault();

    let name = document.querySelector('#meal-name');
    let calories = document.querySelector('#meal-calories');
    // let calories = Number(document.querySelector('#meal-calories').value); // or
    // const meal = new Meal(name, +calories); // Line 188 to comnvert to Number

    if (name.value === '' || calories.value === '') {
      alert('Please enter values in all fields');
      return;
    }
    const meal = new Meal(name.value, +calories.value);
    this._tracker.addMeal(meal);
    
    name.value = '';
    calories.value = '';

    const collapseMeal = document.querySelector('#collapse-meal');
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
    console.log(this);
  }

  _newWorkout(e) { 
    e.preventDefault();

    let name = document.querySelector('#workout-name');
    let calories = document.querySelector('#workout-calories');
    // let calories = Number(document.querySelector('#workout-calories').value); // or
    // const meal = new Meal(name, +calories); // Line 188 to comnvert to Number

    if (name.value === '' || calories.value === '') {
      alert('Please enter values in all fields');
      return;
    }
    const workout = new Workout(name.value, +calories.value);
    this._tracker.addWorkout(workout);
    
    name.value = '';
    calories.value = '';

    const collapseWorkout = document.querySelector('#collapse-workout');
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
    console.log(this);
  }
}

const app = new App();