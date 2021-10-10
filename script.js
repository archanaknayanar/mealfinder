const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');

//Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    //Clear single meal
    singleMealEl.innerHTML = '';

    //Get search term
    const term = search.value;

    //Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`;

            if(data.meals === null) {
                resultHeading.innerHTML = `<h2>There is no result for '${term}</h2>`;
            }else {
                mealsEl.innerHTML = data.meals.map(meal => `
                <div class = "meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                </div>
                </div>
                `)
                .join('');

                //Clear search text
                search.value = '';
            }
        });
    }else {
        alert('Please enter a search term');
    }
}

//Get meal by id
function getMealByID(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });
}

//Add meal to DOM
function addMealToDOM(meal) {
    
}

//Event Listner
submit.addEventListener('submit', searchMeal);
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        }else {
            return false;
        }
    });
    //To get only the id attribute of selected meal
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }
});