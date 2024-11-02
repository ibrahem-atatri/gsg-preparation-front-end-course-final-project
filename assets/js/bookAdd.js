const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("books");
let bookAdd = [];
let id=0;
// handel form submission & add book
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const bookName = document.getElementById("bookName").value.toUpperCase();
  const author = document.getElementById("author").value.toUpperCase();
  const genre = document.getElementById("genre").value.toUpperCase();
  const imageUrl = document.getElementById("imageUrl").value;
  const book = {id, bookName, author, genre,imageUrl };
  bookAdd.push(book);
  console.log(book);
  addBookToLocalStorage(bookAdd);
  displayBook(bookAdd);
  bookForm.reset();
  id++;
});

//  add  book to local storage
function addBookToLocalStorage(bookAdd) {
  localStorage.setItem("booksAdd", JSON.stringify(bookAdd));
}

//render book added
function displayBook(bookAdd) {
  const cont = bookAdd.map(
    (book) => `<li>
                       <img src='${book.imageUrl}' alt='${book.bookName}' style='width:100%'>
                        <h3>${book.bookName}</h3>
                        <span>${book.author}</span>
                        <span>${book.genre}</span>
                        <button onclick='removeBook(${id})'>Remove</button>
                      </li>`
  );
  console.log(cont);
  bookList.innerHTML = cont.join("");
}
function removeBook(id) {
    const index = bookAdd.findIndex((book) => book.id == id);
    bookAdd.splice(index, 1);
    addBookToLocalStorage(bookAdd);
    displayBook(bookAdd);
}
function loadBooks() {
  if (localStorage.getItem("booksAdd")) {
    bookAdd = JSON.parse(localStorage.getItem("booksAdd")) ;
    id=bookAdd.length-1
    displayBook(bookAdd)
  }
}
//handele search bar
const searchIc=document.querySelector('.search-bar i');
const input=document.querySelector('.search-bar input');
console.log(searchIc,input)

searchIc.addEventListener('click',()=>{
    if(input.style.display=='block'){
        input.style.display='none';
        searchIcstyle.border='1px solid #2E5EAA';
        
    }else{
        input.style.display='block';
        input.value='';
        input.focus();
        searchIc.style.border='none';

    }
});
input.addEventListener('keyup',()=>{
  const filter =bookAdd.filter((book)=>book.bookName.toLowerCase().startsWith(input.value.toLowerCase()))
  if(filter.length >0){
    displayBook(filter)
  }
  else{
    displayBook(bookAdd) 
  }

})
loadBooks();
