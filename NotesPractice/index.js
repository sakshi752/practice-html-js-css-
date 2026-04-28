const toggleBtns = document.querySelectorAll('.toggle');
const formSection = document.querySelector('.formSection');
const form = document.querySelector('#addNote');
const noteSection = document.querySelector('#noteSection');
let notes = [];
let editTodo = null;

window.onload = () => {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    renderNote()

}

// for modal logic
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (formSection.style.display === "none") {
            formSection.style.display = "flex";
        } else {
            formSection.style.display = "none"
        }
    })
})

formSection.addEventListener("click", (e) => {
    if (e.target === formSection) {
        formSection.style.display = "none";
    }
});

// on submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    const date = document.querySelector('#date').value;
    let desc = document.querySelector('#desc').value;

    if (title.trim() === "" || date.trim() === "") {
        alert("Enter fields properly")
    }

    if (desc.trim() === "") {
        desc = "No description for this note";
    }
    const formattedDate = new Date(date).toLocaleDateString();
    const categories = ["career", "health", "hobbies"];

    if (editTodo) {

    } else {
        addToArray(title, categories[category], formattedDate, desc);
        renderNote();
        addToLocalStorage();

    }

    form.reset();
    formSection.style.display = "none"
})

const addToArray = (title, category, date, desc) => {
    const categories = ["career", "health", "hobbies"];
    notes.push({
        id: Date.now(),
        title,
        desc,
        category,
        date
    })
}

const renderNote = () => {
    noteSection.innerHTML = "";

    notes.forEach(note => {
        createNote(note);
    });
}

const createNote = (noteData) => {

    const note = document.createElement("div");
    note.classList.add("note");


    const noteTitle = document.createElement("div");
    noteTitle.classList.add("noteTitle");

    noteTitle.innerHTML = `
        <p>${noteData.title}</p>
        <span>${noteData.date}</span>
    `;


    const noteDesc = document.createElement("div");
    noteDesc.classList.add("noteDesc");

    const description = document.createElement("p");
    description.textContent = noteData.desc;

    noteDesc.appendChild(description);


    const subInfo = document.createElement("div");
    subInfo.classList.add("subInfo");

    subInfo.innerHTML = `
        <div class="noteBtns">
            <span class="delete" data-id="${noteData.id}">
                <i class="fa-solid fa-trash"></i>
            </span>

            <span class="edit" data-id="${noteData.id}">
                <i class="fa-solid fa-pen-to-square"></i>
            </span>
        </div>

        <span>${noteData.category}</span>
    `;


    note.appendChild(noteTitle);
    note.appendChild(noteDesc);
    note.appendChild(subInfo);

    noteSection.appendChild(note);
}

const addToLocalStorage = () => {

    localStorage.setItem("notes", JSON.stringify(notes))
}

noteSection.addEventListener("click", (e) => {
    const span = e.target.closest("span");
    if (!span) return;
    // const noteDiv = e.target.closest(".note");
    const id = Number(span.dataset.id);
    if (span.classList.contains("delete")) {
        notes = notes.filter(note => note.id != id);
        addToLocalStorage();
        renderNote();
    } else {
        // edit note
    }
})