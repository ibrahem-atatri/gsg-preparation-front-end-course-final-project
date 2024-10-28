//handel search bar
const searchIcon=document.querySelector('.search-bar i');
const input=document.querySelector('.search-bar input');
const searchButton=document.querySelector('.search-bar a')
console.log(searchIcon,input)
searchIcon.addEventListener('click',()=>{
    if(input.style.display=='block'){
        input.style.display='none';
        searchButton.style.display='none';
        searchIcon.style.border='1px solid #2E5EAA';
        
    }else{
        input.style.display='block';
        input.value='';
        searchButton.style.display='inline-block';
        input.focus();
        searchIcon.style.border='none';

    }
});
searchButton.addEventListener('click',()=>{
    if(input.value==''){
        alert('Please enter a search term')
    }else{
        window.location.href=`book.html?search=${input.value}`;
    }
})

