let data;
let selectedBook = [];
const totalBook = document.querySelector(".book-total");
let bookSaveToRead = [];
const bookSaveContent = document.querySelector(".card-body ul");
const totalSaveBook = document.querySelector(".card-header span");
const closeBtn = document.querySelector(".close");
const card = document.querySelector(".card");
const searchIcon = document.querySelector(".search-bar i");
const searchInput = document.querySelector(".search-bar input");
const searchHeader= document.querySelector(".header-con h2");
const searchbar=document.querySelector('.book-operation .search-bar ');
let searchValue=searchInput.value;

let userData = localStorage.getItem('userData') || 0;

// icon for header 
document.addEventListener("DOMContentLoaded", () => {
  const loginIcon = document.querySelector('.icon');
   userData = localStorage.getItem('userData') || 0;


  function updateLoginIcon() {
    if (!localStorage.getItem('userData')) {
      
      loginIcon.innerHTML = `
        <i class="fa-solid fa-right-to-bracket" onclick="location.href='./login.html';"></i>
      `;
    } else {
      loginIcon.innerHTML = `
         <i class="fa-solid fa-arrow-right-from-bracket logout-icon" onclick="location.href='./index.html';"></i>
                    <i class="fa-regular fa-bookmark" onclick="openSavedBook()"></i>
                    <a title="AddBook" href="./AddBook.html"><i class="fa-solid fa-book"></i></i></a>
      `;

      document.querySelector('.logout-icon').addEventListener('click', () => {
        localStorage.removeItem('userData');
        location.reload(); 
      });
    }
  }

  // Initial call to set the correct icon
  updateLoginIcon();
});
//display card content
// const displayCardContent = () => {
//   totalSaveBook.textContent = bookSaveToRead.length;
//   const content = bookSaveToRead.map(
//     (booksave) => `<li>
//   <div>
//   <img src='${booksave.image}' alt='${booksave.title}'>
//   </div>
//   <h3>${booksave.title}</h3>
//   <span>Price : ${booksave.price}</span>
//   <div class="unread" onclick="deleteBook(${booksave.id})">UnRead</div>
//   </li>
// `
//   );
//   bookSaveContent.innerHTML = content;
// };
const displayCardContent=()=>{
  
  const content=bookSaveToRead.map((booksave)=>{ 
    
    
    return`<li>
  <div>
  <img src='${booksave.image}' alt='${booksave.title}'>
  </div>
  <h3>${booksave.title}</h3>
  <span>Price : ${booksave.price}</span>
        <i id=${booksave.id} class="fa-solid fa-check ${booksave.readedStatus==1?"readed":""}" onclick="toggleReadStatus(${booksave.id})"></i>
          <i class="fa-solid fa-trash delete-book" onclick="deleteBook('${booksave.id}')"></i>
  </li>
`  
  }
)
bookSaveContent.innerHTML =content;
}
//local storge
if (localStorage.getItem("bookSaveToRead")) {
  bookSaveToRead = JSON.parse(localStorage.getItem("bookSaveToRead"));
  displayCardContent();
}

//handele search
searchIcon.addEventListener("click", () => {
  if (searchValue) {
    renderBook(1);
    searchInput.value = "";
    searchbar.style.display = "block";
  }
});
//make request
const fetchBook = async (page) => {
 let params = searchValue;
  const response = await fetch(
    `https://api.itbook.store/1.0/search/${params}/${page}`
  );
  data = await response.json();
  return data;
};
//render search book
const renderBook = async (page, rating, id) => {
  try {
    const bookContent = document.querySelector(".book-list");
    let content = ``;
    if (rating) {
      data.books.forEach((book) => {
        if (book.isbn13 == id) {
          content += ` <div class='book-item'>
                     <div class='over-lay'>
                            <span> Save <span class='title'>${
                              book.title
                            }</span> to read later
                                <i onclick='saveBook(${
                                  book.isbn13
                                })' class="fa-regular fa-bookmark gold" ></i>
                            </span>
                       </div>
                  <h2>${book.title}</h2>
              <img src='${book.image}' >
               <div class='rating'>
                     <i onclick="renderBook(${page},${1})" class="fa-regular fa-star ${
            rating >= 1 ? "gold" : ""
          }"></i>
                     <i onclick="renderBook(${page},${2})" class="fa-regular fa-star ${
            rating >= 2 ? "gold" : ""
          }"></i>
                     <i onclick="renderBook(${page},${3})" class="fa-regular fa-star ${
            rating >= 3 ? "gold" : ""
          }"></i>
                     <i onclick="renderBook(${page},${4})" class="fa-regular fa-star ${
            rating >= 4 ? "gold" : ""
          }"></i>
                     <i onclick="renderBook(${page},${5})" class="fa-regular fa-star ${
            rating == 5 ? "gold" : ""
          }"></i>
                     <div class='user-rating'>
                      ${rating}
                     </div>
               </div>
             </div>
           `;
        } else if (selectedBook.length >= 0) {
          const selected = selectedBook.find(
            (booksel) => booksel.id == book.isbn13
          );
          if (selected) {
            content += ` <div class='book-item'>
                           <div class='over-lay'>
                                <span> Save <span class='title'>${
                                  book.title
                                }</span> to read later
                                    <i onclick='saveBook(${
                                      book.isbn13
                                    })' class="fa-regular fa-bookmark gold"></i>
                                </span>
                       </div>
                        <h2>${book.title}</h2>
                    <img src='${book.image}' >
                     <div class='rating'>
                           <i onclick="renderBook(${page},${1})" class="fa-regular fa-star ${
              selected.rating >= 1 ? "gold" : ""
            }"></i>
                           <i onclick="renderBook(${page},${2})" class="fa-regular fa-star ${
              selected.rating >= 2 ? "gold" : ""
            }"></i>
                           <i onclick="renderBook(${page},${3})" class="fa-regular fa-star ${
              selected.rating >= 3 ? "gold" : ""
            }"></i>
                           <i onclick="renderBook(${page},${4})" class="fa-regular fa-star ${
              selected.rating >= 4 ? "gold" : ""
            }"></i>
                           <i onclick="renderBook(${page},${5})" class="fa-regular fa-star ${
              selected.rating == 5 ? "gold" : ""
            }"></i>
                           <div class='user-rating'>
                           ${selected.rating}
                           </div>
                     </div>
                   </div>
                 `;
          } else {
            content += ` <div class='book-item'>
                                     <div class='over-lay'>
                                        <span> Save  <span class='title'>${
                                          book.title
                                        }</span> to read later
                                            <i onclick='saveBook(${
                                              book.isbn13
                                            })' class="fa-regular fa-bookmark gold"></i>
                                        </span>
                                    </div>
                                 <h2>${book.title}</h2>
                               <img src='${book.image}' >
                                <div class='rating'>
                                      <i onclick="renderBook(${page},${1},${
              book.isbn13
            })" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${2},${
              book.isbn13
            })" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${3},${
              book.isbn13
            })" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${4},${
              book.isbn13
            })" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${5},${
              book.isbn13
            })" class="fa-regular fa-star"></i>
                                      <div class='user-rating'>
                                     
                                      </div>
                                </div>
                              </div>
                            `;
          }
       }});

      bookContent.innerHTML = content;
      bookContent.innerHTML+=` <div class="book-total">
      <span >Total book : ${data.total}</span>
       </div>`
      selectedBook.push({ id, rating });
      return;
    }
    //first render
    data = await fetchBook(page);
    searchHeader.textContent="Search Book  Result";
    // no book result
    if (data.total == 0) {
      bookContent.textContent = "No Result ";
      return;
    } else {
      content = data.books.map((book) => {
        return ` <div class='book-item'>
                       <div class='over-lay'>
                         <span> Save <span class='title'>${
                           book.title
                         }</span> to read later
                            <i onclick='saveBook(${
                              book.isbn13
                            })' class="fa-regular fa-bookmark gold"></i>
                         </span>
                       </div>
                       <h2>${book.title}</h2>
                     <img src='${book.image}' >
                      <div class='rating'>
                            <i onclick="renderBook(${page},${1},${
          book.isbn13
        })" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${2},${
          book.isbn13
        })" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${3},${
          book.isbn13
        })" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${4},${
          book.isbn13
        })" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${5},${
          book.isbn13
        })" class="fa-regular fa-star"></i>
                            <div class='user-rating'>
                         
                            </div>
                      </div>
                    </div>
                  `;
      });

      bookContent.innerHTML = content.join("");
      bookContent.innerHTML+=` <div class="book-total">
                    <span >Total book : ${data.total}</span>
                </div>`
    }
  } catch (err) {
    console.log(err);
  }
};
renderBook(1)
// save book to card
// function saveBook(bookId) {
//   if (bookSaveToRead.length >= 0) {
//     const iscontain = bookSaveToRead.find((book) => book.id == bookId);
//     if (iscontain) {
//       return;
//     }
//     const { title, image, price } = data.books.find(
//       (book) => book.isbn13 == bookId
//     );
//     bookSaveToRead.push({title,image,price,id:bookId,readedStatus:0});    localStorage.setItem("bookSaveToRead", JSON.stringify(bookSaveToRead)); //save to local storge
//     totalSaveBook.textContent = bookSaveToRead.length;
//     const content = bookSaveToRead.map(
//       (book) => `
//           <li>
//           <div>
//           <img src='${book.image}' alt='${book.title}'>
//           </div>
//           <h3>${book.title}</h3>
//           <span>Price : ${book.price}</span>
//          <i id=${book.id} class="fa-solid fa-check read-toggle" onclick="toggleReadStatus(${book.id})"></i>
//           <i class="fa-solid fa-trash delete-book" onclick="deleteBook('${book.id}')"></i>
//           </li>
//         `
//     );
//     bookSaveContent.innerHTML = content.join("");
// }}

//hadel book to read
function saveBook(bookId){
  if(bookSaveToRead.length>0){
   const iscontain =bookSaveToRead.find(book=>book.id==bookId)
       if(iscontain){
       console.log('contain')
       return;
       }
   const {title ,image,price}=data.books.find(book=>book.isbn13==bookId);
   bookSaveToRead.push({title,image,price,id:bookId,readedStatus:0});
   localStorage.setItem('bookSaveToRead', JSON.stringify(bookSaveToRead))//save to local storge
   totalSaveBook.textContent= bookSaveToRead.length;
   const content=bookSaveToRead.map(book=> `
         <li>
         <div>
         <img src='${book.image}' alt='${book.title}'>
         </div>
         <h3>${book.title}</h3>
         <span>Price : ${book.price}</span>
         </li>
           <i id=${book.id} class="fa-solid fa-check read-toggle" onclick="toggleReadStatus(${book.id})"></i>
         <i class="fa-solid fa-trash delete-book" onclick="deleteBook('${book.id}')"></i>
       `)
       bookSaveContent.innerHTML =content.join('');
       displayCardContent();
       
  }
  else{
   const {title ,image,price}=data.books.find(book=>book.isbn13==bookId);
   bookSaveToRead.push({title,image,price,id:bookId,readedStatus:0});
   localStorage.setItem('bookSaveToRead', JSON.stringify(bookSaveToRead))
   totalSaveBook.textContent= bookSaveToRead.length;
   
   const content=   `<li>
   <div>
   <img src='${bookSaveToRead[0].image}' alt='${bookSaveToRead[0].title}'>
   </div>
   <h3>${bookSaveToRead[0].title}</h3>
   <span>Price : ${bookSaveToRead[0].price}</span>
   </li>
   <i id=${bookSaveToRead[0].id} class="fa-solid fa-check read-toggle" onclick="toggleReadStatus(${bookSaveToRead[0].id})"></i>
         <i class="fa-solid fa-trash delete-book" onclick="deleteBook('${bookSaveToRead[0].id}')"></i>
 `  
 bookSaveContent.innerHTML =content;

  }
 
  displayCardContent();

}
//Delete book from card
function deleteBook(id){
  const index = bookSaveToRead.findIndex((book) => book.id == id);
    bookSaveToRead.splice(index, 1);
    localStorage.setItem("bookSaveToRead", JSON.stringify(bookSaveToRead));
    if(bookSaveToRead.length==0)
      card.classList.remove("transform");
    displayCardContent()
}
// Function to toggle read status
function toggleReadStatus(bookId) {
 

  
  const book = bookSaveToRead.find(book => book.id === bookId);

  
  book.readedStatus = book.readedStatus === 0 ? 1 : 0;  
 localStorage.setItem('bookSaveToRead', JSON.stringify(bookSaveToRead));
displayCardContent();
 
}
//card display

// if(userData){
  
 
//   const bookMark = document.querySelector(".icon .fa-bookmark");
//   console.log(bookMark);
  
//   if (bookMark) {
// bookMark.addEventListener("click", () => 
 function openSavedBook() {
  if(bookSaveContent.textContent==''){
    Swal.fire({
      title: 'There Are No Books Currently Saved',
      icon: 'warning',
      confirmButtonColor: '#2e5eaa',
      confirmButtonText: 'Ok',
      customClass: {
        title: 'alert-text-color',  
      }
    })
   return;
  }
  card.classList.add("transform");
}
// );}
// }
closeBtn.addEventListener("click", () => {
  card.classList.remove("transform");
});
