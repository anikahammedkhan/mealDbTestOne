fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(res => res.json())
    .then(data => loadMeal(data.meals))

function loadMeal(meals) {
    // console.log(meals);
    for (meal of meals) {
        const mealTitle = meal.strMeal;
        const mealId = meal.idMeal;
        const mealInstarction = meal.strInstructions.slice(0, 170);
        const mealPhoto = meal.strMealThumb;
        const mealParent = document.getElementById('mealDivParent');
        let mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${mealPhoto}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${mealTitle}</h5>
                            <p class="card-text">${mealInstarction}</p>
                            <div class="btn btn-primary" onclick="loadDetails(${mealId})"  data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</div>
                        </div>
                    </div>
        `
        mealParent.appendChild(mealDiv);
    }

}


function loadDetails(mealId) {
    let link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(link)
        .then(res => res.json())
        .then(data => modal(data))

    function modal(mealsData) {
        const mealsInfo = mealsData.meals[0];
        console.log(mealsInfo);
        const mealInfoTitle = mealsInfo.strMeal;
        const mealInfoId = mealsInfo.idMeal;
        const mealInfoCatagory = mealsInfo.strArea;
        const mealInfoInstraction = mealsInfo.strInstructions.slice(0, 200);
        const mealImg = mealsInfo.strMealThumb;
        const mealYoutube = mealsInfo.strYoutube;

        const modalDiv = document.createElement('div');
        modalDiv.classList.add('modal-body');
        modalDiv.innerHTML = `
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Meal Id : ${mealInfoId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${mealImg}" alt="" class="img-fluid">
                        <h3>Meal Name: ${mealInfoTitle}</h3>
                        <p>Meal Catagory : ${mealInfoCatagory}</p>
                        <p>Meal Instraction : ${mealInfoInstraction}</p>
                        <p>Youtube Link : ${mealYoutube}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
        `
        const modalParent = document.getElementById('modalDiv');
        modalParent.innerHTML = '';
        modalParent.appendChild(modalDiv);
    }
}

