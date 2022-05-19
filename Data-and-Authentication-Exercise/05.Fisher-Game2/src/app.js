let user = null;
window.addEventListener(`DOMContentLoaded`, () => {
    user = JSON.parse(sessionStorage.getItem(`userData`));

    if (user != null) {
        const welcome = document.querySelector(`.email span`);
        welcome.textContent = user.email;
        const guestDiv = document.getElementById(`guest`);
        guestDiv.style.display = 'none';
        const addButton = document.querySelector(`#addForm .add`);
        addButton.disabled = false;
    } else {
        const userDiv = document.getElementById(`user`);
        userDiv.style.display = 'none';
    }

    document.getElementById(`logout`).addEventListener(`click`, logOut);

    document.querySelector(`.load`).addEventListener(`click`, loadCatches);

    document.getElementById(`addForm`).addEventListener(`submit`, onAddSubmit);

    document.getElementById(`main`).addEventListener(`click`, updateOrDelete);

    loadCatches();
});

function updateOrDelete(ev) {
    if (ev.target.classList.contains('delete')) {
        onDelete(ev.target);
    } else if (ev.target.classList.contains('update')) {
        onUpdate(ev.target);
    }
}

async function onDelete(button) {

    const id = button.dataset.id;

    if (!user) {
        window.location = '/RemoteData and Authentication/05.Fisher-Game/login.html';
        return;
    }

    const token = user.token;
    const catchToDelete = await getCatchById(id);

    if (catchToDelete._ownerId == user.id) {
        const res = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        });
        const data = await res.json();
        loadCatches();
    }
}

async function onUpdate(button) {

    const id = button.dataset.id;

    if (!user) {
        window.location = '/RemoteData and Authentication/05.Fisher-Game/login.html';
        return;
    }

    const token = user.token;

    const catchToUpdate = await getCatchById(id);

    if (catchToUpdate._ownerId == user.id) {
        const div = button.parentElement;

        const [anglerIn, weightIn, speciesIn, locationIn, baitIn, captureTimeIn] = Array.from(div.querySelectorAll(`input`));

        const angler = anglerIn.value.trim();
        const weight = weightIn.value.trim();
        const species = speciesIn.value.trim();
        const location = locationIn.value.trim();
        const bait = baitIn.value.trim();
        const captureTime = captureTimeIn.value.trim();


        const newFish = { angler, weight, species, location, bait, captureTime };

        const res = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(newFish)
        });

        const data = await res.json();

        loadCatches();
    }
}

async function onAddSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const angler = formData.get(`angler`);
    const weight = formData.get(`weight`);
    const species = formData.get(`species`);
    const location = formData.get(`location`);
    const bait = formData.get(`bait`);
    const captureTime = formData.get(`captureTime`);

    const result = { angler, weight, species, location, bait, captureTime };

    try {
        const areAllFilled = Object.values(result).some(fieldValue => fieldValue == '');
        if (areAllFilled) {
            throw new Error(`Please, fill all input fields`);
        };

        const res = await fetch(`http://localhost:3030/data/catches`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.token
            },
            body: JSON.stringify(result)
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        loadCatches();
        ev.target.reset();
    } catch (err) {
        alert(err.message);
    }
}

async function loadCatches() {

    const res = await fetch(`http://localhost:3030/data/catches`);
    const data = await res.json();

    const allCatches = data.map(createCatchForm);

    const catchesField = document.getElementById(`catches`);
    catchesField.replaceChildren(...allCatches);
}

async function getCatchById(id) {
    const res = await fetch(`http://localhost:3030/data/catches/${id}`);
    const fish = await res.json();

    return fish;
}

function createCatchForm(fish) {
    const div = document.createElement(`div`);
    div.classList.add(`catch`);
    if (user && fish._ownerId == user.id) {
        div.innerHTML =
            `<label>Angler</label>
<input type="text" class="angler" value="${fish.angler}">
<label>Weight</label>
<input type="text" class="weight" value="${fish.weight}">
<label>Species</label>
<input type="text" class="species" value="${fish.species}">
<label>Location</label>
<input type="text" class="location" value="${fish.location}">
<label>Bait</label>
<input type="text" class="bait" value="${fish.bait}">
<label>Capture Time</label>
<input type="number" class="captureTime" value="${fish.captureTime}">
<button class="update" data-id="${fish._id}">Update</button>
<button class="delete" data-id="${fish._id}">Delete</button>`;
    } else {
        div.innerHTML =
            `<label>Angler</label>
<input type="text" class="angler" value="${fish.angler}" disabled>
<label>Weight</label>
<input type="text" class="weight" value="${fish.weight}" disabled>
<label>Species</label>
<input type="text" class="species" value="${fish.species}" disabled>
<label>Location</label>
<input type="text" class="location" value="${fish.location}" disabled>
<label>Bait</label>
<input type="text" class="bait" value="${fish.bait}" disabled>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${fish.captureTime}" disabled>
<button class="update" data-id="${fish._id}" disabled>Update</button>
<button class="delete" data-id="${fish._id}" disabled>Delete</button>`;
    }

    return div;
}

function logOut() {
    sessionStorage.clear();

    window.location = `/RemoteData and Authentication/05.Fisher-Game/index.html`;
}