// const logBtn=document.querySelector('[type="submit"]');
// const emailInput=document.querySelector('[type="email"]');
// const passwordInput=document.querySelector('[type="password"]');
// const emailErrorMsg=document.querySelector('.email-error-msg');
// const passwordErrorMsg=document.querySelector('.password-error-msg');

// //login validation --required
// logBtn.addEventListener('click',(e)=>{
//     e.preventDefault();
//     if( !(emailInput.value && passwordInput.value)){
//         console.log('Please enter')
//         emailErrorMsg.style.display = 'block';
//         passwordErrorMsg.style.display = 'block';
//     }
//     else{
//         window.location='index.html';
//     }
// })

// emailInput.addEventListener('keydown',()=>{
//     emailErrorMsg.style.display = 'none';
// })
// passwordInput.addEventListener('keydown',()=>{
//     passwordErrorMsg.style.display = 'none';
// })




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
    window.location.href=`./index.html`;    
});

















