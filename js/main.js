let foodData = document.getElementById("foodData");
let searchTab = document.getElementById("searchTab");
let submitBtn;

//////////// loading page
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-page").fadeOut(400)
        $("body").css("overflow", "visible")

    })
})
///////////navbar
function openSideNav() {
    $(".side-navbar").animate({
        left: 0
    }, 500)
    $(".toggle-icon").removeClass("fa-align-justify");
    $(".toggle-icon").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let xWidth = $(".side-navbar .navbar-tab").outerWidth()
    $(".side-navbar").animate({
        left: -xWidth
    }, 500)

    $(".toggle-icon").addClass("fa-align-justify");
    $(".toggle-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-navbar i.toggle-icon").click(() => {
    if ($(".side-navbar").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
////////search
function showSearchInputs() {
    searchTab.innerHTML = `<div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control text-white bg-transparent" type="text" placeholder="Search by name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFL(this.value)" class="form-control text-white bg-transparent " type="text" maxlength="1"  placeholder="Search by first letter">
        </div>
    </div>`

    foodData.innerHTML = ""
}

async function searchByName(word) {
    closeSideNav()
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-page").fadeOut(200)

}

async function searchByFL(word) {
    closeSideNav()
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    word == "" ? word = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-page").fadeOut(200)

}


//////////meals

function displayMeals(exp) {
    let temp = "";

    for (let i = 0; i < exp.length; i++) {
        temp += ` <div class="col-md-3">
                <div onclick="getMealDetails('${exp[i].idMeal}')" class="meal overflow-hidden rounded-3 position-relative cursor-pointer">
                    <img src="${exp[i].strMealThumb}" class="w-100">
                    <div class="meal-layer text-black text-black p-4 position-absolute d-flex align-items-center ">
                        <h3>${exp[i].strMeal}</h3>
                    </div>
                </div>
            </div> `
    }

    foodData.innerHTML = temp
}
//////(1)catagory///////
async function getCategories() {
    foodData.innerHTML = "";
    $(".inner-loading-page").fadeIn(200)
    searchTab.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".inner-loading-page").fadeOut(200)
}

function displayCategories(exp) {
    let temp = "";
    for (let i = 0; i < exp.length; i++) {
        temp += ` <div class="col-md-3">
                <div onclick="getCategoryMeals('${exp[i].strCategory}')" class="meal overflow-hidden rounded-3 position-relative  cursor-pointer">
                    <img src="${exp[i].strCategoryThumb}" class="w-100">
                    <div class="meal-layer text-center text-black p-4 position-absolute ">
                        <h3>${exp[i].strCategory}</h3>
                        <p>${exp[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div> `
    }

    foodData.innerHTML = temp
}

//////(2) area///////
async function getArea() {
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    searchTab.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
    $(".inner-loading-page").fadeOut(200)
}


function displayArea(exp) {
    let temp = "";
    for (let i = 0; i < exp.length; i++) {
        temp += ` <div class="col-md-3">
                <div onclick="getAreaMeals('${exp[i].strArea}')" class="text-center rounded-3 cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${exp[i].strArea}</h3>
                </div>
        </div>  `
    }

    foodData.innerHTML = temp
}

//////(3) Ingredients///////
async function getIngredients() {
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    searchTab.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-page").fadeOut(200)

}

function displayIngredients(exp) {
    let temp = "";
    for (let i = 0; i < exp.length; i++) {
        temp += ` <div class="col-md-3">
                <div onclick="getIngredientsMeals('${exp[i].strIngredient}')" class="text-center rounded-3 cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${exp[i].strIngredient}</h3>
                        <p>${exp[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div> `
    }

    foodData.innerHTML = temp
}
///////////////////////////////////////////////////////////////////////////////////////

async function getCategoryMeals(category) {
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-page").fadeOut(200)
}
async function getAreaMeals(area) {
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-page").fadeOut(200)
}
async function getIngredientsMeals(ingredients) {
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-page").fadeOut(200)
}
////////////////////////////////////////////////////////////////////////////////////////


//////// Details
async function getMealDetails(mealID) {
    closeSideNav()
    foodData.innerHTML = ""
    $(".inner-loading-page").fadeIn(200)
    searchTab.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".inner-loading-page").fadeOut(200)

}

function displayMealDetails(meal) {
    searchTab.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info p-1 m-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let temp = ` <div class="col-md-4">
                <img class="rounded-4 w-100" src="${meal.strMealThumb}">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-items d-flex flex-wrap g-3 ">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-items d-flex flex-wrap g-3 ">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    foodData.innerHTML = temp
}

////////contact
function displayContacts() {
    foodData.innerHTML = `<div class="d-flex align-items-center justify-content-center min-vh-100">
    <div class="container text-center w-75">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" class="form-control" type="text"  placeholder="Enter your name">
                <div id="nameAlert" class="alert alert-danger mt-3 w-100  d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
               <input id="emailInput" onkeyup="inputsValidation()" class="form-control " type="email"  placeholder="Enter your email">
                <div id="emailAlert" class="alert alert-danger mt-3 w-100  d-none">
                    Email not valid *exemple@xxx.yyy*
                </div>
            </div>
            <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation()" class="form-control " type="text"  placeholder="Enter your phone">
                <div id="phoneAlert" class="alert alert-danger mt-3 w-100  d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" class="form-control " type="number"  placeholder="Enter your age">
                <div id="ageAlert" class="alert alert-danger mt-3 w-100  d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
         <input  id="passwordInput" onkeyup="inputsValidation()" class="form-control " type="password"  placeholder="Enter your password">
                <div id="passwordAlert" class="alert alert-danger mt-3 w-100  d-none">
                    Enter valid password minimum 8 characters, at least 1 letter and 1 number
                </div>
            </div>
            <div class="col-md-6">
      <input  id="repasswordInput" onkeyup="inputsValidation()" class="form-control " type="password" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger mt-3 w-100  d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger mt-3 px-3 " disabled >Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")

/////////////// clear function
    submitBtn.addEventListener('click',function clear(e) {
        e.preventDefault();
        let inputs = document.querySelectorAll('#nameInput, #emailInput,#phoneInput,#ageInput,#passwordInput,#repasswordInput');
        inputs.forEach(input => {
            input.value = '';
          });
          if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
            submitBtn.removeAttribute("disabled")
        } else {
            submitBtn.setAttribute("disabled", true)
        }
    })
  

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputContact = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputContact = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputContact = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputContact = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputContact = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputContact = true
    })
}

let nameInputContact = false;
let emailInputContact = false;
let phoneInputContact = false;
let ageInputContact = false;
let passwordInputContact = false;
let repasswordInputContact = false;


function inputsValidation() {
    if (nameInputContact) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputContact) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputContact) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputContact) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputContact) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputContact) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]{2,30}$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(1[89]|[2-9]\d)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}