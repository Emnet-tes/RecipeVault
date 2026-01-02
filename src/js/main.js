/* ================= GLOBAL DATA & HELPERS ================= */

function initializeDB() {
    if (!localStorage.getItem('recipes')) {
        const initial = [
            { id: 1, name: 'Doro Wat', category: 'Dinner', ingredients: ['Chicken', 'Onion', 'Egg'], instructions: 'Spicy stew.' },
            { id: 2, name: 'Avocado Salad', category: 'Lunch', ingredients: ['Avocado', 'Tomato', 'Oil'], instructions: 'Mix well.' }
        ];
        saveToDB(initial);
    }
}

function getRecipes() {
    return JSON.parse(localStorage.getItem('recipes') || '[]');
}

function saveToDB(data) {
    localStorage.setItem('recipes', JSON.stringify(data));
}

let tempIngredients = [];

/* =================  EXPORT LOGIC (New Feature) ================= */
function exportData() {
    const data = JSON.stringify(getRecipes(), null, 2);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipe_backup_' + Date.now() + '.txt';
    a.click();
}


/* ================= AUTHENTICATION ================= */

function handleLogin(e) {
    e.preventDefault();
    if (
        document.getElementById('user').value === 'admin' &&
        document.getElementById('pass').value === '1234'
    ) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        document.getElementById('error').classList.remove('d-none');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function renderPublicList() {
    const grid = document.getElementById('publicGrid');
    if (!grid) return;

    const recipes = getRecipes();
    const sName = document.getElementById('publicSearchName').value.toLowerCase();
    const sIng = document.getElementById('publicSearchIng').value.toLowerCase();
    const showFav = document.getElementById('favFilter').checked; // Checkbox status

    grid.innerHTML = '';

    const filtered = recipes.filter(r => {
        const safeIng = Array.isArray(r.ingredients) ? r.ingredients : [];
        const matchesName = r.name.toLowerCase().includes(sName);
        const matchesIng = safeIng.some(i => i.toLowerCase().includes(sIng));
        const matchesFav = showFav ? r.isFav === true : true; // Filter logic

        return matchesName && (sIng === '' || matchesIng) && matchesFav;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="text-center text-muted">No recipes found.</p>';
        return;
    }

    filtered.forEach(r => {
        const safeIng = Array.isArray(r.ingredients) ? r.ingredients : [];
        const ingBadges = safeIng.map(i => `<span class="badge bg-secondary me-1">${i}</span>`).join('');
        // Heart Icon Logic
        const heartClass = r.isFav ? 'active' : ''; 
        const heartIcon = r.isFav ? '❤️' : '🤍';

        const card = `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span class="badge bg-warning text-dark">${r.category}</span>
                    <span class="heart-btn ${heartClass}" onclick="toggleFavorite(${r.id})">${heartIcon}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${r.name}</h5>
                    <div class="mb-2">${ingBadges}</div>
                    <p class="card-text small text-muted">${r.instructions.substring(0, 60)}...</p>
                </div>
            </div>
        </div>
        `;
        grid.innerHTML += card;
    });
}

/* ================= ADMIN LOGIC ================= */

function renderAdminList() {
    const tbody = document.getElementById('adminTableBody');
    if (!tbody) return;

    const recipes = getRecipes();
    tbody.innerHTML = '';

    recipes.forEach(r => {
        const safeIng = Array.isArray(r.ingredients) ? r.ingredients : [];
        let displayIng = safeIng.slice(0, 3).join(', ');
        if (safeIng.length > 3) displayIng += '...';

        const row = `
            <tr>
                <td class="fw-bold">${r.name}</td>
                <td>${r.category}</td>
                <td>${displayIng}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#recipeModal"
                        onclick="prepareModalForEdit(${r.id})">Edit</button>
                    <button class="btn btn-sm btn-danger"
                        onclick="deleteRecipe(${r.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('recipeId').value;
    const name = document.getElementById('recipeName').value;
    const cat = document.getElementById('recipeCategory').value;
    const inst = document.getElementById('recipeInstructions').value;

    let recipes = getRecipes();

    if (id) {
        const index = recipes.findIndex(r => r.id == id);
        if (index > -1) {
            recipes[index] = {
                id: parseInt(id),
                name,
                category: cat,
                ingredients: tempIngredients,
                instructions: inst
            };
        }
    } else {
        recipes.push({
            id: Date.now(),
            name,
            category: cat,
            ingredients: tempIngredients,
            instructions: inst
        });
    }

    saveToDB(recipes);
    bootstrap.Modal.getInstance(document.getElementById('recipeModal')).hide();
    renderAdminList();
}

function deleteRecipe(id) {
    if (confirm('Are you sure?')) {
        const recipes = getRecipes().filter(r => r.id !== id);
        saveToDB(recipes);
        renderAdminList();
    }
}

/* ================= INGREDIENT HELPERS ================= */

function addIngredient() {
    const select = document.getElementById('ingDropdown');
    const custom = document.getElementById('ingCustom');
    const val = custom.value.trim() || select.value;

    if (val && !tempIngredients.includes(val)) {
        tempIngredients.push(val);
        renderTempIng();
        custom.value = '';
        select.value = '';
    }
}

function removeIngredient(val) {
    tempIngredients = tempIngredients.filter(i => i !== val);
    renderTempIng();
}

function renderTempIng() {
    const con =
        document.getElementById('ingredientsContainer') ||
        document.getElementById('ingredientsListContainer');
    if (!con) return;

    con.innerHTML = tempIngredients
        .map(i =>
            `<span class="badge bg-info text-dark me-1 mb-1"
             style="cursor:pointer"
             onclick="removeIngredient('${i}')">${i} &times;</span>`
        )
        .join('');
}

function prepareModalForAdd() {
    document.getElementById('modalTitle').innerText = 'Add Recipe';
    document.getElementById('recipeForm').reset();
    document.getElementById('recipeId').value = '';
    tempIngredients = [];
    renderTempIng();
}

function prepareModalForEdit(id) {
    const r = getRecipes().find(item => item.id === id);
    document.getElementById('modalTitle').innerText = 'Edit Recipe';
    document.getElementById('recipeId').value = r.id;
    document.getElementById('recipeName').value = r.name;
    document.getElementById('recipeCategory').value = r.category;
    document.getElementById('recipeInstructions').value = r.instructions;
    tempIngredients = Array.isArray(r.ingredients) ? [...r.ingredients] : [];
    renderTempIng();
}




function toggleFavorite(id) {
    let recipes = getRecipes();
    const index = recipes.findIndex(r => r.id === id);
    if (index > -1) {
        // Switch true/false
        recipes[index].isFav = !recipes[index].isFav;
        saveToDB(recipes);
        renderPublicList(); // Re-render to show change
    }
}