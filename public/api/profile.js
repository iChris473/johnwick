
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirmPassword");
const country = document.querySelector(".country");
const phone = document.querySelector(".phone");
const form = document.querySelector(".thisForm");
const submit = document.querySelector(".submit");
const btcAddress = document.querySelector(".btcAddress");

const currentUser = JSON.parse(localStorage.getItem("user"))

const getUserInfo = async () => {

  try {

    let response = await fetch(`${url}/user/get/${currentUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const user = await response.json();

    fullName.value = user.name;
    email.value = user.email;
    country.value = user.country;
    phone.value = user.phone;
    btcAddress.value = user.btc || "Add your bitcoin wallet adress";

  } catch (error) {
      console.log(error)
  }

}

getUserInfo()


const submitcurrentUser= async e => {
    e.preventDefault()

    submit.innerHTML = "Updating..."
    const newUser = {
        email: email.value,
        country: country.value,
        phone: phone.value,
        name: fullName.value,
        btc: btcAddress.value
    }


    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data))
          submit.innerHTML = "Submit"
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error)
          window.alert("Check your credentials and try again", error);
          submit.innerHTML = "Submit"
        })
    
}

form.addEventListener("submit", submitcurrentUser)
