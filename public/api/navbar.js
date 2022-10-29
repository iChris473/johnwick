
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const dashboard = document.querySelector(".dashboard");
const profile = document.querySelector(".profile");
const logout = document.querySelector(".logout");

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
   
    login.classList.add("d-none d-lg-none d-md-none")
}