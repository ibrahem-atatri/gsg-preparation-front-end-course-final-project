const saveBook=JSON.parse(localStorage.getItem('bookSaveToRead'));
const bookSaveList=document.querySelector('.book-save-list');
const header=document.querySelector('.book-save h2')
if(saveBook){
    header.textContent='Books Save '
    const content=saveBook.map(
        (booksave) => `
      <div class='item'>
      <img src='${booksave.image}' alt='${booksave.title}'>
      <h3>${booksave.title}</h3>
      <span>Price : ${booksave.price}</span>
      </div>
    `
      );
      bookSaveList.innerHTML = content.join('');
      console.log(content);
}