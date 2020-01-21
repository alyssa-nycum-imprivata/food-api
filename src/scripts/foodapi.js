const foodFactory = food => {
    return `
    <section class="foodList">
    <h1 class="food">${food.name}</h1>
    <p class="category">${food.category}</p>
    <p class="ethnicity">${food.ethnicity}</p>
    </section>
    `
};

const addFoodToDom = foodHtml => {
    const container = document.querySelector(".foodList");
    container.innerHTML += foodHtml;
};

const url = "http://localhost:8088/food";

fetch(url)
    .then(foods => foods.json())
    .then(foodData => {
        foodData.forEach(food => {
        const foodHtml = foodFactory(food);
        addFoodToDom(foodHtml);
    });
        console.table(foodData)
    });

