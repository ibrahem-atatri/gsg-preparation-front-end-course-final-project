

//handel search bar
const searchIcon=document.querySelector('.search-bar i');
const input=document.querySelector('.search-bar input');
const searchButton=document.querySelector('.search-bar a');
const email = document.querySelector('.email input');
const password =document.querySelector('.password input');
const form = document.querySelector('form');
console.log(form);

form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const email = event.target.email.value;
    const password = event.target.password.value;

    const userData = { email, password };

    
    localStorage.setItem("userData", JSON.stringify(userData));

    console.log("User data saved in local storage:", userData);
    
    event.target.reset();
    window.location.href=`index.html`;    
});


















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
        window.location.href=`index.html?search=${input.value}`;
    }
})


