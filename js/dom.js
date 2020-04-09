export function addBooksToDOM(book) {
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

export function updateError() {
  const errorHtml = '<p class=" text-center">Please fill in the form</p>';
  document.getElementById('errors').innerHTML = errorHtml;
}
