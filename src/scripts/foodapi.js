const foodFactory = food => {
    return `
    <section class="foodList">
        <div>
            <h1 class="food">${food.name}</h1>
            <p>${food.category}<br>${food.ethnicity}</p>
            <p><strong>Ingredients:</strong> <br> ${food.ingredients}</p>
            <p><strong>Country of Origin:</strong> <br> ${food.countries}</p>
            <p><strong>Sugar per Serving:</strong> <br> ${food.sugar}</p>
            <p><strong>Saturated Fat per Serving:</strong> <br> ${food.saturated_fat}</p>
        </div>
    </section>
    `
};

const addFoodToDom = foodHtml => {
    const container = document.querySelector(".foodList");
    container.innerHTML += foodHtml;
};

const url = "http://localhost:8088/food";

// fetch(url)
//     .then(foods => foods.json())
//     .then(foodData => {
//         foodData.forEach(food => {
//             const foodHtml = foodFactory(food);
//             addFoodToDom(foodHtml);
//         });
//         console.table(foodData)
//     });


fetch(url)
    .then(resp => resp.json())
    .then(myFoodData => {
        myFoodData.forEach(food => {
            console.log(food);

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(resp => resp.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.countries = "no country of origin listed"
                    }
                    if (productInfo.product.nutriscore_data.sugars) {
                        food.sugar = productInfo.product.nutriscore_data.sugars
                    } else {
                        food.sugar = "sugar not listed"
                    }
                    if (productInfo.product.nutriscore_data.saturated_fat) {
                        food.saturated_fat = productInfo.product.nutriscore_data.saturated_fat
                    } else {
                        food.saturated_fat = "saturated fat not listed"
                    }
                    
                    const foodHtml = foodFactory(food)

                    addFoodToDom(foodHtml)
                });

        });
    });



