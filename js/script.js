let myLibrary = [];

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

window.onload = (event) => {
  for (book of myLibrary) {
    addBooksToDOM(book, myLibrary.indexOf(book));
  }
};

document.querySelector('#searchBook').addEventListener('submit', submitForm);
document.querySelector("#books").addEventListener('click', (e) => deleteBook(e.target));

function submitForm(e) {
  e.preventDefault();
  let title = document.querySelector('#title').value
  let author = document.querySelector('#author').value
  let pages = document.querySelector('#pages').value
  let status = document.querySelector('#status').checked

  if (!title || !author || !pages) {
    alert('Please fill in the form');
    return false;
  }
  
  let book = new Book(title, author, pages, status);
  addBookToLibrary(book);
  addBooksToDOM(book, myLibrary.indexOf(book));
}


function deleteBook(e) {
  if (e.classList.contains('btn-danger')) {
    let book = e.parentElement;
    let id = book.getAttribute('data-id');
    book.remove();
    for (let i = 0; i < myLibrary.length; i++) {
      if (i = id) {
        myLibrary.splice(i,1);
      }
    }
  }
}
