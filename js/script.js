let myLibrary = [
  {
    title: "title5",
    author: "author5",
    pages: 200,
    status: false,
  },
  {
    title: "title6",
    author: "author6",
    pages: 250,
    status: true,
  },
  {
    title: "title7",
    author: "author7",
    pages: 50,
    status: false,
  },
];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBooksToDOM(book, id) {
  let htmlBook = `
  <div class="card-body card mb-3 col-4 mx-auto text-center" data-id="${id}">
    <h2 id="bookTitle">${book.title}</h2>
    <div id="pages">${book.author}</div>
    <div id="pages">${book.pages}</div>
    <div id="status">${book.status ? "read" : "un-read"}</div>
    <button id="read-book" class="btn btn-primary btn-block">Read</button>
    <button id="delete-book" class="btn btn-danger btn-block">Delete</button>
  </div>
`;

  document.getElementById("books").innerHTML += htmlBook;
}

let book1 = new Book("title1", "author1", 100, true);
let book2 = new Book("title2", "author2", 100, true);
let book3 = new Book("title3", "author3", 100, true);
let book4 = new Book("title4", "author4", 100, true);

myLibrary.push(book1, book2, book3, book4);

window.onload = (event) => {
  for (book of myLibrary) {
    addBooksToDOM(book, myLibrary.indexOf(book));
  }
};
