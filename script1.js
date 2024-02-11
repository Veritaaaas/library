
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

let bookList = [
    new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", "Read"),
    new Book("The Catcher in the Rye", "J.D. Salinger", "234", "Not Read"),
];

var addBook = document.getElementById("add-book-btn");
var form = document.getElementById("book-form");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;

    if (title && author && pages) {
        let newBook = new Book(title, author, pages, status);
        bookList.push(newBook);
        console.log(bookList);
    } else {
        console.log("All fields must be filled out");
    }

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("status").value = "";
}

function displayBooks() {
    let container = document.getElementById("bookList");
    container.innerHTML = "";

    for (let i = 0; i < bookList.length; i++) {
        let book = bookList[i];
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let title = document.createElement("h2");
        title.textContent = book.title;
        card.appendChild(title);

        let author = document.createElement("p");
        author.textContent = book.author;
        card.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = book.pages + " pages";
        card.appendChild(pages);

        let status = document.createElement("button");
        status.textContent = book.status;

        if (status.textContent == "Read") {
            status.style.backgroundColor = "#90EE90";
        }
        else {
            status.style.backgroundColor = "#FF7F7F";
        }

        card.appendChild(status);

        container.appendChild(card);

        status.addEventListener("click", function() {
            if (status.textContent == "Read") {
                status.textContent = "Not Read";
                status.style.backgroundColor = "#FF7F7F";
            } 
            else {
                status.textContent = "Read";
                status.style.backgroundColor = "#90EE90";
            }
        });

        let remove = document.createElement("button");
        remove.textContent = "Remove";
        card.appendChild(remove);

        remove.addEventListener("click", function() {
            let titleToRemove = title.textContent;// assuming each card has a 'title' element
            bookList = bookList.filter(book => book.title !== titleToRemove);
            console.log(bookList);
            card.remove();
        });
    }

}

window.onload = function() {
    displayBooks();
}

addBook.addEventListener("click", function() {
    modal.style.display = "block";

    let submit = document.getElementById("submit");
    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        addBookToLibrary();
        displayBooks();
        form.style.display = "none";
    });
});
