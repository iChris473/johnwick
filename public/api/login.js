

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const form = document.querySelector(".thisForm");
const thisLogin = document.querySelector(".authSubmitBtn");

const loginUser= async e => {
    
    e.preventDefault();
    
    thisLogin.innerHTML = "Loading...";

    const newUser = {
        email: email.value,
        password: password.value
    }

    fetch(`${url}/user/login`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            return response.text().then((text) => {
              console.log(text)
              window.alert(text.replace(/"/g, ''));
              thisLogin.innerHTML = "Submit"
              return Promise.reject()
            });
          }
          return Promise.reject(response);
        })
        .then(function (data) {

          if(data.redirect){
            window.location.href = '/emailer';
            return
          }

          localStorage.setItem("user", JSON.stringify(data));
          
          thisLogin.innerHTML = "Submit";
          
          window.location.href = '/dashboard';

        })
        .catch(function (error) {
          console.log(error)
        })
    
}

form.addEventListener("submit", loginUser)