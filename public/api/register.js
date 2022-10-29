
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const ticket = document.querySelector(".ticket");;
const country = document.querySelector(".country");
const paymentMethod = document.querySelector(".paymentMethod");
const phone = document.querySelector(".phone");
const meetDate = document.querySelector(".meetDate");
const form = document.querySelector(".thisForm");
const submit = document.querySelector(".authSubmitBtn");

const submitUser= async e => {

    e.preventDefault()

    submit.innerHTML = "Creating...";

    const newUser = {
        email: email.value,
        country: country.value,
        phone: phone.value,
        name: fullName.value,
        ticket: ticket.value,
        paymentMethod: paymentMethod.value,
        meetDate: meetDate.value
    }

    fetch(`https://keanureeves.up.railway.app/api/user/register`, {
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
                submit.innerHTML = "Submit"
                window.alert("An error occured");
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          submit.innerHTML = "Submit"
          window.location.href = '/ticket'
          // localStorage.setItem("user", JSON.stringify(data))
        })
        .catch(function (error) {
          console.log(error)
        })
    
}

form.addEventListener("submit", submitUser)