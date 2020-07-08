const topDiv = document.getElementById('topdiv');
const newBookBtn = document.getElementById("newbtn");
const bookList = document.querySelector('ul');

let myLibrary = [{title:"The Catcher in the Rye",author:"J.D. Salinger",pages:294,read:true},{title:"The Right Stuff",author:"Tom Wolfe",pages:594,read:false}];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`
  }
}

Book.prototype.toggle = function() {
  (this.read)? this.read = false: this.read = true;  
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))

  // Every time a new book is added to the library, re-render the HTML list and then delete the New Book form
  renderBookList()
  deleteForm();
}

function removeBookFromLibrary(index) {
  // Filters (keeps) all objects in the array except for the object that is at the index passed to this function
  myLibrary = myLibrary.filter((book,ind) => ind !== index)
  renderBookList()
}

function toggleRead(index) {
  // Map through each object(book) in the array(library)
  myLibrary = myLibrary.map((book,ind) => { 
    // If the index passed to this function is the same as the mapped book index, then call the 
    // toggle function to change the true/false status
    if (ind===index) {
      book.toggle();
      return book;
    // Otherwise, just return the book as is
    } else {
      return book;
    }
  });
  renderBookList()
}

function renderBookList() {
  // We will render the list fresh each time, so first remove any existing HTML line items from bookList
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild)
  }

  // For each book in myLibrary, create a line item, add the text, and append it to bookList
  // Also, create a Delete button for each book and append it to the end of the line item
  // Finally, create a Read button for each book and append it to the end of the line item
  myLibrary.forEach((book,index) => {
    const li = document.createElement('li');
    const deleteBookBtn = document.createElement('button');
    const readBookBtn = document.createElement('button');
    deleteBookBtn.textContent = "Delete"
    readBookBtn.textContent = "Read/Not Read"
    li.append(document.createTextNode(`${book.title}, ${book.author}, ${book.pages} pages, ${book.read}`));
    li.append(deleteBookBtn);
    li.append(readBookBtn);
    bookList.appendChild(li);

    // Add an event listener to each Delete button that removes the book from the library by calling the removeBookFromLibrary function
    deleteBookBtn.addEventListener('click', function() {
      removeBookFromLibrary(index);
    })

    // Add an event listener for each Read/Not Read button to call the toggleRead function that toggles the true/false of the object's key:value 'read:true' 
    readBookBtn.addEventListener('click', function() {
      toggleRead(index);
    })
  });
}

function createForm() {
  // If there is an existing HTML form already, delete it first
  deleteForm();

  // Assign the form elements to variables
  const form = document.createElement('form');
  const labelTitle = document.createElement('label');
  labelTitle.htmlFor = 'title'
  labelTitle.innerHTML = "Title:"
  const inputTitle = document.createElement('input');
  inputTitle.type = 'text'
  inputTitle.id = 'title'
  const labelAuthor = document.createElement('label');
  labelAuthor.htmlFor = 'author'
  labelAuthor.innerHTML = "Author:"
  const inputAuthor = document.createElement('input');
  inputAuthor.type = 'text'
  inputAuthor.id = 'author'
  const labelPages = document.createElement('label');
  labelPages.htmlFor = 'pages'
  labelPages.innerHTML = "Pages:"
  const inputPages = document.createElement('input');
  inputPages.type = 'text'
  inputPages.id = 'pages'
  const labelRead = document.createElement('label');
  labelRead.htmlFor = 'read'
  labelRead.innerHTML = "Read:"
  const inputRead = document.createElement('input');
  inputRead.type = 'checkbox'
  inputRead.id = 'read'
  const inputSubmit = document.createElement('input');
  inputSubmit.id = 'submitNewBook'
  inputSubmit.type = 'button'
  inputSubmit.value = "Submit"
  const inputCancel = document.createElement('input');
  inputCancel.id = 'cancelNewBook'
  inputCancel.type = 'button'
  inputCancel.value = "Cancel"

  // Append the form elements to the form, then append the form to the "topDiv" div
  form.append(labelTitle, inputTitle, labelAuthor, inputAuthor, labelPages, inputPages, labelRead, inputRead, inputSubmit, inputCancel);
  topDiv.appendChild(form);

  // Add an event listener to the Submit button that passes the input values as arguments to the AddBookToLibrary function 
  const inputSubmitNewBook = document.getElementById("submitNewBook")
  inputSubmitNewBook.addEventListener('click', function() {
    addBookToLibrary(inputTitle.value,inputAuthor.value,inputPages.value,inputRead.checked);
  })

  // Add an event listener to the Cancel button that calls the deleteForm function
  const inputCancelNewBook = document.getElementById("cancelNewBook")
  inputCancelNewBook.addEventListener('click', deleteForm)
}

function deleteForm() {
  // As long as there is a HTML form element, select it and remove it from the "topDiv" div
  while (document.querySelector('form')) {
    const formerForm = document.querySelector('form')
    topDiv.removeChild(formerForm)
  }
}


renderBookList();
newBookBtn.addEventListener('click', createForm);
