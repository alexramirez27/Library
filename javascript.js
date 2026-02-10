const myLibrary = [];

// The constructor
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read already`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    };
}

// Take params, create a book then store it in the array
function addBookToLibrary(lib, title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    lib.push(newBook);
}

function displayEachBook(lib) {
    for (const book of lib) {
        const tbody = document.querySelector("tbody");
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const id = document.createElement("td");
        id.textContent = book.id
        tr.setAttribute("data-row-id", id.textContent);
        tr.appendChild(id);

        const title = document.createElement("td");
        title.textContent = book.title
        tr.appendChild(title);

        const author = document.createElement("td");
        author.textContent = book.author
        tr.appendChild(author);

        const pages = document.createElement("td");
        pages.textContent = book.pages
        tr.appendChild(pages);

        const readTd = document.createElement("td");
        const readBtn = document.createElement("button");
        readBtn.classList = "toggle-read";

        readTd.appendChild(readBtn);
        book.read === true ? readBtn.textContent = "true" : readBtn.textContent = "false";

        readBtn.addEventListener("click", () => {
            readBtn.textContent === "true" ? readBtn.textContent = "false" : readBtn.textContent = "true";
        });

        tr.appendChild(readTd);

        const removeBtnTd = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtnTd.appendChild(removeBtn);
        removeBtn.classList = "remove-btn";
        removeBtn.textContent = "Remove Book";
        tr.appendChild(removeBtnTd);

        activateRemoveButton(removeBtn);
    }
}

addBookToLibrary(myLibrary, "A Game of Thrones", "George R.R. Martin", 500, false);
addBookToLibrary(myLibrary, "A Clash of Kings", "George R.R. Martin", 400, false);
addBookToLibrary(myLibrary, "A Storm of Swords", "George R.R. Martin", 800, false);
addBookToLibrary(myLibrary, "A Feast for Crows", "George R.R. Martin", 400, false);
addBookToLibrary(myLibrary, "A Dance with Dragons", "George R.R. Martin", 800, false);

displayEachBook(myLibrary);

const button = document.querySelector(".new-book");

button.addEventListener("click", () => {
    const submitBtn = document.querySelector(".submit-btn");
    if (!submitBtn) {
        createForm();
    }
});

function createForm() {
    const body = document.querySelector("body");
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    body.appendChild(form);

    const div = document.createElement("div");
    form.appendChild(div);

    appendFormInput(div, "title", "TITLE", "text");
    appendFormInput(div, "author", "AUTHOR", "text");
    appendFormInput(div, "pages", "PAGES", "number");

    // Read
    const readParagraph = document.createElement("p");
    div.appendChild(readParagraph);

    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read");
    readLabel.textContent = "READ";
    readParagraph.appendChild(readLabel);

    const yesInput = document.createElement("input");
    yesInput.type = "radio";
    yesInput.name = "read";
    yesInput.id = "yes";
    yesInput.value = "yes";
    yesInput.required = true;
    readParagraph.appendChild(yesInput);

    const yesLabel = document.createElement("label");
    yesLabel.setAttribute("for", "yes");
    yesLabel.textContent = "Yes";
    readParagraph.appendChild(yesLabel);

    const noInput = document.createElement("input");
    noInput.type = "radio";
    noInput.name = "read";
    noInput.id = "no";
    noInput.value = "no";
    readParagraph.appendChild(noInput);

    const noLabel = document.createElement("label");
    noLabel.setAttribute("for", "no");
    noLabel.textContent = "No";
    readParagraph.appendChild(noLabel);

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.classList = "submit-btn";
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Add Book";
    form.appendChild(submitButton);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const tbody = document.querySelector("tbody");
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const id = document.createElement("td");
        id.textContent = crypto.randomUUID();
        tr.setAttribute("data-row-id", id.textContent);
        tr.appendChild(id);

        const title = document.createElement("td");
        const titleInput = document.querySelector("#title");
        title.textContent = titleInput.value;
        tr.appendChild(title);

        const author = document.createElement("td");
        const authorInput = document.querySelector("#author");
        author.textContent = authorInput.value;
        tr.appendChild(author);

        const pages = document.createElement("td");
        const pagesInput = document.querySelector("#pages");
        pages.textContent = pagesInput.value;
        tr.appendChild(pages);

        const readTd = document.createElement("td");
        const selected = document.querySelector('input[name="read"]:checked');
        const readButton = document.createElement("button");
        readButton.classList = "toggle-read";

        readTd.appendChild(readButton);
        selected.value === "yes" ? readButton.textContent = "true" : readButton.textContent = "false";

        readButton.addEventListener("click", () => {
            readButton.textContent === "true" ? readButton.textContent = "false" : readButton.textContent = "true";
        });

        tr.appendChild(readTd);
    
        const removeBtnTd = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtnTd.appendChild(removeBtn);
        removeBtn.classList = "remove-btn";
        removeBtn.textContent = "Remove Book";
        tr.appendChild(removeBtnTd);

        activateRemoveButton(removeBtn);

        body.removeChild(form);
    });
}

function appendFormInput(div, attributeName, textContent, type) {
    const paragraph = document.createElement("p");
    div.appendChild(paragraph);

    const label = document.createElement("label");
    label.setAttribute("for", attributeName);
    label.textContent = textContent;
    paragraph.appendChild(label);

    const input = document.createElement("input");
    input.type = type;
    input.id   = attributeName;
    input.name = attributeName;
    input.required = true;
    paragraph.appendChild(input);
}

function activateRemoveButton(removeButton) {
    removeButton.addEventListener("click", () => {
        const tbody = removeButton.parentElement.parentElement.parentElement;
        const tr = removeButton.parentElement.parentElement;

        if (tbody) 
            tbody.removeChild(tr);

        // Remove the book from our myLibrary array
        const index = myLibrary.findIndex(book => book.id === tr.dataset.rowId);

        if (index !== -1)
            myLibrary.splice(index, 1);
    });
}