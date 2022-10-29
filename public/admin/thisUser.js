

const currentUser = JSON.parse(localStorage.getItem("thisUser"))

console.log(currentUser)

const currentadmin = JSON.parse(localStorage.getItem("admin"))

document.querySelector(".name").innerHTML = currentUser.name || "N/A"
document.querySelector(".phone").innerHTML = currentUser.phone || "N/A"
document.querySelector(".email").innerHTML = currentUser.email || "N/A"
document.querySelector(".amount").innerHTML = currentUser.amount
document.querySelector(".btc").innerHTML = currentUser.btc || "N/A"
document.querySelector(".country").innerHTML = currentUser.country || "N/A"
document.querySelector(".picture").href = currentUser.picture
document.querySelector(".profitGen").innerHTML = currentUser.profit
currentUser.picture && document.querySelector(".pictureUrl").classList.remove("hidden")



// OTHER QUERY SELECTORS
const Input = document.querySelector(".Input")

const profitInput = document.querySelector(".profitInput")

const updateForm = document.querySelector(".updateForm")

const profitForm = document.querySelector(".profitForm")

const btn = document.querySelector(".button")

const profitBtn = document.querySelector(".profitBtn")

const sendProfitEmail = async (userName, email, profit) => {

  try {

    const newEmail = {
      userName,
      email,
      profit
    }

    let response = await fetch(`${url}/email/profit`, {
      method: "POST",
      body: JSON.stringify(newEmail),
      headers: {
        "Content-Type": "application/json"
      },
    });

    await response.json();
    
    console.log("EMAIL SENT");

    window.location.href = "/admin/users";

  } catch (error) {
      console.log(error)
      window.alert("Error sending Email");
  }

}

const updateAmountInvested = async e => {

    e.preventDefault()

    const newUser = {
        amount: Input.value,
        status: "Approved! Trading...",
        pending: true
        
    }

    btn.innerHTML = "Updating..."


    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                btn.innerHTML = "Update"
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data)
          sendProfitEmail(data.name, data.email, data.profit)
        })
        .catch(function (error) {
          console.log(error)
          btn.innerHTML = "Update"
        })


}

updateForm.addEventListener("submit", updateAmountInvested)

const updateProfit = async e => {

    e.preventDefault()

    const newUser = {
        profit: profitInput.value,
        status: "Approved! Trading...",
        pending: true
        
    }

    profitBtn.innerHTML = "Updating..."


    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                btn.innerHTML = "Update"
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          window.location.href = "/admin/users"
        })
        .catch(function (error) {
          console.log(error)
          btn.innerHTML = "Update"
        })


}

profitForm.addEventListener("submit", updateProfit)

