import { updateError, addBooksToDOM } from "./dom.js"; // eslint-disable-line

let myLibrary = [];

function Book(title, author, pages, status) {
  this.id = title.concat(author).concat(Math.floor(Math.random() * 99) + 1);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleRead = (book) => {
  book.status = !book.status;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

window.onload = () => {
  if (localStorage.getItem('books') === null) {
    localStorage.setItem('books', JSON.stringify(myLibrary));
  } else {
    myLibrary = JSON.parse(localStorage.getItem('books'));
    myLibrary.forEach((book) => {
      addBooksToDOM(book);
    });
  }
};

function submitForm(e) {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').checked;

  if (!title || !author || !pages) {
    updateError();
    return false;
  }

  const book = new Book(title, author, pages, status);

  addBookToLibrary(book);
  addBooksToDOM(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  document.getElementById('searchBook').reset();
  return true;
}

function deleteLocalStorage(id) {
  const books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book, index) => {
    if (book.id === id) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}

function deleteBook(e) {
  if (e.classList.contains('btn-danger')) {
    const book = e.parentElement;
    const id = book.getAttribute('data-id');
    book.remove();
    for (let i = 0; i < myLibrary.length; i += 1) {
      if (i === id) {
        myLibrary.splice(i, 1);
      }
    }
    deleteLocalStorage(id);
  }
}

function toogleBook(e) {
  if (e.classList.contains('btn-primary')) {
    const book = e.parentElement;
    const id = book.getAttribute('data-id');
    const actualStatus = document.querySelector(
      `div[data-id='${id}'] > #status`,
    ).innerHTML;
    document.querySelector(`div[data-id='${id}'] > #status`).innerHTML = actualStatus === 'read' ? 'un-read' : 'read';
    const books = JSON.parse(localStorage.getItem('books'));

    for (let i = 0; i < myLibrary.length; i += 1) {
      if (myLibrary[i].id === id) {
        myLibrary[i].toggleRead(myLibrary[i]);
        books[i].status = !books[i].status;
        localStorage.setItem('books', JSON.stringify(books));
      }
    }
  }
}

document.querySelector('#searchBook').addEventListener('submit', submitForm);
document
  .querySelector('#books')
  .addEventListener('click', (e) => deleteBook(e.target));
document
  .querySelector('#books')
  .addEventListener('click', (e) => toogleBook(e.target));
