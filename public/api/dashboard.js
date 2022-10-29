
const btcAddress = document.querySelector(".btcAddress"); 
const userStatus = document.querySelector(".userStatus");
const amountInvested = document.querySelector(".amountInvested");
const usersName = document.querySelector(".usersName");
const equityVal = document.querySelector(".equityVal");
const profitGen = document.querySelector(".profitGen");

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

      equityVal.innerHTML = user.profit + user.amount

      profitGen.innerHTML = user.profit
      
      user.btc && (btcAddress.innerHTML = user.btc)
      
      user.status && (userStatus.innerHTML = user.status)
      
      amountInvested.innerHTML = user.amount
      
      usersName.innerHTML = user.name
  
    } catch (error) {
        console.log(error)
    }
  
  }
  
getUserInfo()

// clickImg.addEventListener("click", function clickInput(){
//     uploadImg.click()
// })

