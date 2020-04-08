let myLibrary = [];

function Book(title, author, pages, status) {
  this.id = title.concat(author).concat(Math.floor(Math.random() * 99) + 1);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleRead = function () {
  this.status = !this.status;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBooksToDOM(book) {
  const htmlBook = `
  <div class="card-body card mb-3 col-4 mx-auto text-center" data-id="${
  book.id
}">
    <h2 id="bookTitle">${book.title}</h2>
    <div id="pages">${book.author}</div>
    <div id="pages">${book.pages}</div>
    <div id="status">${book.status ? 'read' : 'un-read'}</div>
    <button class="btn btn-primary btn-block">Read</button>
    <button class="btn btn-danger btn-block">Delete</button>
  </div>
`;

  document.getElementById('books').innerHTML += htmlBook;
}

window.onload = () => {
  if (localStorage.getItem('books') === null) {
    localStorage.setItem('books', JSON.stringify(myLibrary));
  } else {
    myLibrary = JSON.parse(localStorage.getItem('books'));
    for (const book of myLibrary) {
      addBooksToDOM(book);
    }
  }
};


function submitForm(e) {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').checked;

  if (!title || !author || !pages) {
    alert('Please fill in the form');
    return false;
  }

  const book = new Book(title, author, pages, status);
  addBookToLibrary(book);
  addBooksToDOM(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  document.getElementById('searchBook').reset();
}

function deleteBook(e) {
  if (e.classList.contains('btn-danger')) {
    const book = e.parentElement;
    const id = book.getAttribute('data-id');
    book.remove();
    for (let i = 0; i < myLibrary.length; i++) {
      if (i === id) {
        myLibrary.splice(i, 1);
      }
    }
    deleteLocalStorage(id);
  }
}

function deleteLocalStorage(id) {
  let books = JSON.parse(localStorage.getItem('books'))
  books.forEach((book, index) => {
    if (book.id === id) {
      books.splice(index, 1)
    }
  })
  localStorage.setItem('books', JSON.stringify(books));
}

function toogleBook(e) {
  if (e.classList.contains('btn-primary')) {
    const book = e.parentElement;
    const id = book.getAttribute('data-id');
    const actualStatus = document.querySelector(`div[data-id='${id}'] > #status`)
      .innerHTML;
    document.querySelector(`div[data-id='${id}'] > #status`).innerHTML = actualStatus === 'read' ? 'un-read' : 'read';
    for (const elem of myLibrary) {
      if (elem.id === id) {
        elem.prototype = Object.create(Book.prototype);
        elem.prototype.toggleRead();
      };
    }
    localStorage.setItem('books', JSON.stringify(myLibrary));
  }
}

document.querySelector('#searchBook').addEventListener('submit', submitForm);
document.querySelector('#books').addEventListener('click', (e) => deleteBook(e.target));
document.querySelector('#books').addEventListener('click', (e) => toogleBook(e.target));
