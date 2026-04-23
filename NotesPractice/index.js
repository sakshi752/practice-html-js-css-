const toggleBtns = document.querySelectorAll('.toggle');
const formSection = document.querySelector('.formSection');
const form = document.querySelector('#addNote');
const noteSection = document.querySelector('#noteSection');

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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    const date = document.querySelector('#date').value;
    const desc = document.querySelector('#desc').value;

    if (title.trim() === "" || date.trim() === "") {
        alert("Enter fields properly")
    }

    if (desc.trim === "") {
        desc = "No description for this note";
    }
    const formattedDate = new Date(date).toLocaleDateString();

    console.log(title, category, formattedDate, desc);
    createNote(title, category, formattedDate, desc);

    
})

const createNote = (title, category, date, desc) => {
    const note = document.createElement("div");
    note.classList.add("note");

    const noteTitle = document.createElement("div");
    noteTitle.innerHTML = `   <p>${title}</p>
                    <span>${date}</span>`
    noteTitle.classList.add("noteTitle");

    const subInfo = document.createElement("div");
    subInfo.innerHTML = ` <div class="noteBtns">
                <span class="delete"><i class="fa-solid fa-trash"></i></span>
                <span class="edit"><i class="fa-solid fa-pen-to-square"></i></span>
            </div>
            <span>${category}</span>`
    subInfo.classList.add("subInfo");

    const noteDesc = document.createElement("div")
    noteDesc.classList.add("noteDesc");
    const description = document.createElement("p");
    description.innerText = desc;

    note.appendChild(noteTitle);
    note.appendChild(noteDesc);
    note.appendChild(subInfo);
    noteSection.appendChild(note);

    
}

const addToArray =()=>{}
