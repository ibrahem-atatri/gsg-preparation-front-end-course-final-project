let data;
let selectedBook=[];
const totalBook=document.querySelector('.header-con span');
let bookSaveToRead=[];
const bookSaveContent=document.querySelector('.card-body ul');
const totalSaveBook=document.querySelector('.card-header span');
// const readedOrUnreaded = document.querySelector('.card-body ul li .fa-check');
const closeBtn=document.querySelector('.close');
const card=document.querySelector('.card')
const bookMark=document.querySelector('.icon i');
const searchIcon=document.querySelector('.search-bar i');
const searchInput=document.querySelector('.search-bar input');
let searchValue;
//display card content



const displayCardContent=()=>{
  
  const content=bookSaveToRead.map((booksave)=> `<li>
  <div>
  <img src='${booksave.image}' alt='${booksave.title}'>
  </div>
  <h3>${booksave.title}</h3>
  <span>Price : ${booksave.price}</span>
        <i id=${booksave.id} class="fa-solid fa-check read-toggle" onclick="toggleReadStatus(${booksave.id})"></i>
          <i class="fa-solid fa-trash delete-book" onclick="deleteBook('${booksave.id}')"></i>
  </li>
`  

)

bookSaveContent.innerHTML =content;
}



// Function to toggle read status
function toggleReadStatus(bookId) {
 

  
  const book = bookSaveToRead.find(book => book.id === bookId);
  let icon = document.getElementById(`${book.id}`);
  
icon.classList.toggle("readed");
 
}

// Function to delete a book
function deleteBook(bookId) {

  let index = bookSaveToRead.findIndex((book) =>  book.id === bookId); 
bookSaveToRead= bookSaveToRead.splice(index,1);

  
  
  localStorage.setItem('bookSaveToRead', JSON.stringify(bookSaveToRead)); 
  displayCardContent(); 
}
//local storge
if(localStorage.getItem('bookSaveToRead')){
  bookSaveToRead=JSON.parse(localStorage.getItem('bookSaveToRead'));
  displayCardContent()
}

//handel search
searchIcon.addEventListener('click',()=>{
  searchValue=searchInput.value;
  if(searchValue){
    renderBook(1)
    searchInput.value='';
  }
})

const fetchBook=async(page)=>{
 let params;
//  if(searchValue){
  params=searchValue;
//  }
//  else{
//    params=window.location.search.split('=').at(1);

//  }
    const response= await fetch(`https://api.itbook.store/1.0/search/${params}/${page}`);
     data=await response.json();
    return data;
}
const renderBook=async (page,rating,ind,id)=>{
    try{
        const bookContent=document.querySelector('.book-list')
        let content=``;
          
        if(rating){
            
             data.books.forEach((book,index)=>{
            if(book.isbn13==id){
                content+=  ( ` <div class='book-item'>
                     <div class='over-lay'>
                            <span> Save <span class='title'>${book.title}</span> to read later
                                <i onclick='saveBook(${book.isbn13})' class="fa-regular fa-bookmark gold" ></i>
                            </span>
                       </div>
                  <h2>${book.title}</h2>
              <img src='${book.image}' >
               <div class='rating'>
                     <i onclick="renderBook(${page},${1})" class="fa-regular fa-star ${rating >=1?'gold':''}"></i>
                     <i onclick="renderBook(${page},${2})" class="fa-regular fa-star ${rating >=2?'gold':''}"></i>
                     <i onclick="renderBook(${page},${3})" class="fa-regular fa-star ${rating >=3?'gold':''}"></i>
                     <i onclick="renderBook(${page},${4})" class="fa-regular fa-star ${rating >=4?'gold':''}"></i>
                     <i onclick="renderBook(${page},${5})" class="fa-regular fa-star ${rating ==5?'gold':''}"></i>
                     <div class='user-rating'>
                      ${rating}
                     </div>
               </div>
             </div>
           ` )
            }
             else if(selectedBook.length > 0) {
                const selected=selectedBook.find(booksel=>booksel.id==book.isbn13)
                if(selected){
                    content+=  ( ` <div class='book-item'>
                           <div class='over-lay'>
                                <span> Save <span class='title'>${book.title}</span> to read later
                                    <i onclick='saveBook(${book.isbn13})' class="fa-regular fa-bookmark gold"></i>
                                </span>
                       </div>
                        <h2>${book.title}</h2>
                    <img src='${book.image}' >
                     <div class='rating'>
                           <i onclick="renderBook(${page},${1})" class="fa-regular fa-star ${selected.rating >=1?'gold':''}"></i>
                           <i onclick="renderBook(${page},${2})" class="fa-regular fa-star ${selected.rating >=2?'gold':''}"></i>
                           <i onclick="renderBook(${page},${3})" class="fa-regular fa-star ${selected.rating >=3?'gold':''}"></i>
                           <i onclick="renderBook(${page},${4})" class="fa-regular fa-star ${selected.rating >=4?'gold':''}"></i>
                           <i onclick="renderBook(${page},${5})" class="fa-regular fa-star ${selected.rating ==5?'gold':''}"></i>
                           <div class='user-rating'>
                           ${selected.rating}
                           </div>
                     </div>
                   </div>
                 ` )
                }
                else{
                    console.log('other')
                   content+= ` <div class='book-item'>
                                     <div class='over-lay'>
                                        <span> Save  <span class='title'>${book.title}</span> to read later
                                            <i onclick='saveBook(${book.isbn13})' class="fa-regular fa-bookmark gold"></i>
                                        </span>
                                    </div>
                                 <h2>${book.title}</h2>
                               <img src='${book.image}' >
                                <div class='rating'>
                                      <i onclick="renderBook(${page},${1},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${2},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${3},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${4},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                      <i onclick="renderBook(${page},${5},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                      <div class='user-rating'>
                                     
                                      </div>
                                </div>
                              </div>
                            `
                           
                   }
            }
            else{
                content+= ` <div class='book-item'>
                                <div class='over-lay'>
                                    <span> Save <span class='title'>${book.title}</span> to read later
                                        <i onclick='saveBook(${book.isbn13})' class="fa-regular fa-bookmark gold"></i>
                                    </span>
                                </div>
                              <h2>${book.title}</h2>
                            <img src='${book.image}' >
                             <div class='rating'>
                                   <i onclick="renderBook(${page},${1},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                   <i onclick="renderBook(${page},${2},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                   <i onclick="renderBook(${page},${3},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                   <i onclick="renderBook(${page},${4},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                   <i onclick="renderBook(${page},${5},${index},${book.isbn13})" class="fa-regular fa-star"></i>
                                   <div class='user-rating'>
                                  
                                   </div>
                             </div>
                           </div>
                         `
            }
        })
         
         bookContent.innerHTML=content;
         selectedBook.push({id,rating})
         return;
        }
        //first render
       data=await fetchBook(page);
       totalBook.textContent=`Total book : ${data.total}`;
       //handel no book result
        if(data.total==0){
            bookContent.textContent='no result ';
            return;
        }
        else{

        content= data.
         books.map((book,ind)=>{
            return ` <div class='book-item'>
                       <div class='over-lay'>
                         <span> Save <span class='title'>${book.title}</span> to read later
                            <i onclick='saveBook(${book.isbn13})' class="fa-regular fa-bookmark gold"></i>
                         </span>
                       </div>
                       <h2>${book.title}</h2>
                     <img src='${book.image}' >
                      <div class='rating'>
                            <i onclick="renderBook(${page},${1},${ind},${book.isbn13})" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${2},${ind},${book.isbn13})" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${3},${ind},${book.isbn13})" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${4},${ind},${book.isbn13})" class="fa-regular fa-star"></i>
                            <i onclick="renderBook(${page},${5},${ind},${book.isbn13})" class="fa-regular fa-star"></i>
                            <div class='user-rating'>
                         
                            </div>
                      </div>
                    </div>
                  `
         })
       
         bookContent.innerHTML=content.join('');
        }

    }
    catch(err){
      console.log(err);
    }
  
}


//hadel book to read
function saveBook(bookId){
   if(bookSaveToRead.length>0){
    const iscontain =bookSaveToRead.find(book=>book.id==bookId)
        if(iscontain){
        console.log('contain')
        return;
        }
    const {title ,image,price}=data.books.find(book=>book.isbn13==bookId);
    bookSaveToRead.push({title,image,price,id:bookId})
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
        `)
        bookSaveContent.innerHTML =content.join('');
   }
   else{
    const {title ,image,price}=data.books.find(book=>book.isbn13==bookId);
    bookSaveToRead.push({title,image,price,id:bookId});
    localStorage.setItem('bookSaveToRead', JSON.stringify(bookSaveToRead))
    totalSaveBook.textContent= bookSaveToRead.length;
    
    const content=   `<li>
    <div>
    <img src='${bookSaveToRead[0].image}' alt='${bookSaveToRead[0].title}'>
    </div>
    <h3>${bookSaveToRead[0].title}</h3>
    <span>Price : ${bookSaveToRead[0].price}</span>
    </li>
  `  
  bookSaveContent.innerHTML =content;
   }
  

 
}
//card display
closeBtn.addEventListener("click",()=>{
  card.classList.remove("transform")
})
bookMark.addEventListener("click",()=>{
    card.classList.add("transform")
})




 