const API_URL = 'https://api.edamam.com/search?q=pizza&app_id=a5de3521&app_key=2818a20bd89362740e68d4bbb349b977&from=0&to=10';

async function fetchRecipes(query = "pizza") {
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=2818a20bd89362740e68d4bbb349b977&from=0&to=10`);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}
function filterRecipes(filterType) {
    alert("Filtering recipes for: " + filterType);
}
function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeCard = `
            <div class="recipe">
                <img src="${recipe.image}" alt="${recipe.label}">
                <h3>${recipe.label}</h3>
                <button onclick="saveFavorite('${recipe.uri}', '${recipe.image}', '${recipe.label}')">❤️</button>
            </div>
        `;
        container.innerHTML += recipeCard;
    });
}

function searchRecipes() {
    const query = document.getElementById('search').value;
    fetchRecipes(query);
}

function saveFavorite(uri, image, label) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.uri === uri)) {
        favorites.push({ uri, image, label });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
    }
}

function viewFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';

    if (favorites.length === 0) {
        container.innerHTML = '<h3>No favorite recipes yet.</h3>';
        return;
    }

    favorites.forEach(recipe => {
        const recipeCard = `
            <div class="recipe">
                <img src="${recipe.image}" alt="${recipe.label}">
                <h3>${recipe.label}</h3>
                <button onclick="removeFavorite('${recipe.uri}')">❌ Remove</button>
            </div>
        `;
        container.innerHTML += recipeCard;
    });
}

function removeFavorite(uri) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(recipe => recipe.uri !== uri);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    viewFavorites();
}

function filterRecipes(category) {
    fetchRecipes(category);
}

// Fetch default recipes on page load
fetchRecipes();




let mealPlan = [];

function addMeal() {
    let mealTime = document.getElementById("meal-time").value;
    let mealName = document.getElementById("meal-name").value;
    let servings = document.getElementById("servings").value;
    let notes = document.getElementById("notes").value;

    if (mealName.trim() === "") {
        alert("Please enter a meal name.");
        return;
    }

    let meal = {
        time: mealTime,
        name: mealName,
        servings: servings,
        notes: notes
    };

    mealPlan.push(meal);
    renderMealPlan();
    clearFields();
}

function renderMealPlan() {
    let mealList = document.getElementById("meal-list");
    mealList.innerHTML = "";

    mealPlan.forEach((meal, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${meal.name}</strong> (${meal.time}) - Servings: ${meal.servings}</span>
            <span class="actions">
                <button class="edit" onclick="editMeal(${index})">Edit</button>
                <button class="delete" onclick="deleteMeal(${index})">Delete</button>
            </span>
        `;
        mealList.appendChild(li);
    });
}

function editMeal(index) {
    let meal = mealPlan[index];

    document.getElementById("meal-time").value = meal.time;
    document.getElementById("meal-name").value = meal.name;
    document.getElementById("servings").value = meal.servings;
    document.getElementById("notes").value = meal.notes;

    mealPlan.splice(index, 1);
    renderMealPlan();
}

function deleteMeal(index) {
    mealPlan.splice(index, 1);
    renderMealPlan();
}

function clearFields() {
    document.getElementById("meal-name").value = "";
    document.getElementById("servings").value = "1";
    document.getElementById("notes").value = "";
}
// gluteen free recipe code
        function searchRecipes() {
            console.log("Searching for recipes...");
        }

        function filterRecipes(type) {
            if (type === 'vegetarian') {
                alert("Showing Vegetarian Recipes...");
            } else if (type === 'oil-free') {
                alert("Showing Oil-Free Recipes...");
            }
        }
        // veg recipe code
        // Recipe Data
const recipes = [
    {
        id: 1,
        name: "Veggie Burger",
        category: "Vegetarian",
        image: "vegetarian-burger.jpg",
        ingredients: [
            "1 can (15 oz) black beans, drained and mashed",
            "1/2 cup oats",
            "1/2 cup breadcrumbs",
            "1/2 cup chopped onion",
            "1/4 cup chopped bell pepper",
            "2 cloves garlic, minced",
            "1 tsp cumin",
            "1/2 tsp smoked paprika",
            "1/2 tsp salt",
            "1/4 tsp black pepper",
            "1 egg (or flax egg for vegan option)",
            "1 tbsp olive oil",
            "4 burger buns",
            "Lettuce, tomato, and condiments"
        ],
        instructions: [
            "Mash the black beans in a bowl.",
            "Add oats, breadcrumbs, onion, bell pepper, garlic, and spices.",
            "Mix in the egg and form into patties.",
            "Heat oil in a pan and cook for 4-5 minutes per side.",
            "Toast burger buns and assemble with lettuce and tomato.",
            "Serve hot and enjoy!"
        ]
    },
    {
        id: 2,
        name: "Gluten-Free Pancakes",
        category: "Gluten-Free",
        image: "gluten-free-pancakes.jpg",
        ingredients: [
            "1 cup gluten-free flour",
            "1 tsp baking powder",
            "1/2 tsp salt",
            "1 cup milk (or almond milk)",
            "1 egg",
            "1 tbsp melted butter",
            "1 tbsp honey or maple syrup"
        ],
        instructions: [
            "Mix dry ingredients in a bowl.",
            "Add milk, egg, butter, and honey. Stir well.",
            "Heat a non-stick pan and pour batter.",
            "Cook until bubbles form, then flip and cook another minute.",
            "Serve with honey or fresh fruits."
        ]
    }
];

// Load Recipes Dynamically
function loadRecipes(category = "All") {
    const recipeContainer = document.getElementById("recipe-list");
    recipeContainer.innerHTML = ""; // Clear previous recipes

    recipes.forEach(recipe => {
        if (category === "All" || recipe.category === category) {
            const recipeCard = `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
                    <button class="fav-btn" onclick="toggleFavorite(${recipe.id})">❤️</button>
                </div>
            `;
            recipeContainer.innerHTML += recipeCard;
        }
    });
}

// View Recipe Details
function viewRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    const recipeDetail = `
        <h1>${recipe.name}</h1>
        <img src="${recipe.image}" alt="${recipe.name}">
        <h2>Ingredients:</h2>
        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
        <h2>Instructions:</h2>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join("")}</ol>
        <button onclick="goBack()">⬅ Back</button>
    `;
    
    document.getElementById("recipe-detail").innerHTML = recipeDetail;
    document.getElementById("recipe-list").style.display = "none";
    document.getElementById("recipe-detail").style.display = "block";
}

// Go Back to Recipe List
function goBack() {
    document.getElementById("recipe-list").style.display = "flex";
    document.getElementById("recipe-detail").style.display = "none";
}

// Search Functionality
document.getElementById("search").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchText));
    
    document.getElementById("recipe-list").innerHTML = "";
    filteredRecipes.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <h2>${recipe.name}</h2>
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
                <button class="fav-btn" onclick="toggleFavorite(${recipe.id})">❤️</button>
            </div>
        `;
        document.getElementById("recipe-list").innerHTML += recipeCard;
    });
});

// Manage Favorite Recipes in Local Storage
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavorites();
}

// Load Favorite Recipes
function updateFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.querySelectorAll(".fav-btn").forEach(btn => {
        const id = parseInt(btn.getAttribute("onclick").match(/\d+/)[0]);
        btn.style.color = favorites.includes(id) ? "red" : "black";
    });
}

// Initial Load
loadRecipes();
updateFavorites();
