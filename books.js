
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let books = [];
let count = 0;

const book_form = document.forms[0];
const shelf = document.querySelector("#shelf");

book_form.onsubmit = () => {
    let read = book_form.querySelector("input[name = read]:checked").value;
    let values = {};
    book_form.querySelectorAll("input[type = text]")
                            .forEach((thing) => values[thing.id] = thing.value);
    let pages = book_form.querySelector("input[type = number]").value;
    let newBook = new Book(values.book_title, values.author, pages, read);
    add_NewBook(newBook);
    hide_modal();
    return false;
};

function add_NewBook(book) {
    books.push(book);
    let new_book = document.createElement("div");
    new_book.setAttribute("class", "book");
    let title = document.createElement("h3");
    title.textContent = book.title;
    new_book.appendChild(title);
    let author = document.createElement("h3");
    author.textContent = book.author;
    new_book.appendChild(author);
    let pages = document.createElement("h3");
    pages.textContent = "Pages: " + book.pages;
    new_book.appendChild(pages);
    let read = document.createElement("h3");
    read.style.backgroundColor = "white";
    if (book.read == "yes") {
        read.textContent = "Read: ☑";
    } else {
        read.textContent = "Unread: ☒";
    }
    read.setAttribute("class", "read");
    read.onclick = () => readBtn(book);
    new_book.appendChild(read);
    let deleteBtn = document.createElement("h3");
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("class", "delete");  
    deleteBtn.onclick = () => deleteBook(book);
    new_book.appendChild(deleteBtn);
    if (books.length % 3 == 1) {
        let bar = document.createElement("div");
        bar.setAttribute("class", "shelf_bar");
        shelf.appendChild(bar);
    }
    if (shelf.childNodes.length == 0) {
        shelf.appendChild(new_book);
    } else {
        shelf.insertBefore(new_book, shelf.childNodes[shelf.childNodes.length - 1]);
    }

}

function readBtn(book) {
    for (let i = 0; i < books.length; i++) {
        if (book == books[i]) {
            books[i].read = books[i].read == "yes" ? "no" : "yes";
        }
    }
    render();
}

function equalBook(first, second) {
    if (first.title != second.title) return false;
    if (first.author != second.author) return false;
    if (first.pages != second.pages) return false;
    if (first.read != second.read) return false;
    return true;
}

function render() {
    removeAllBooks();
    let temp = [...books];
    books = [];
    temp.forEach((thing) => add_NewBook(thing));
}

function removeAllBooks() {
    while (shelf.firstChild) {
        shelf.removeChild(shelf.lastChild);
    }
}

function deleteBook(book) {
    books = books.filter((thing) => thing != book);
    render();
}