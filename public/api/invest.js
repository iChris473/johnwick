
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKGq3pK0wh5t2PlWkh73p2HcYW61KIbuk",
  authDomain: "ig-version-c.firebaseapp.com",
  projectId: "ig-version-c",
  storageBucket: "ig-version-c.appspot.com",
  messagingSenderId: "738256329845",
  appId: "1:738256329845:web:e770cf1df72fc89deb2c3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage =  getStorage(app)

const currentUser = JSON.parse(localStorage.getItem("user"))

const thisForm = document.querySelector(".thisForm"); 
const uploadImg = document.querySelector(".uploadImg");
const paymentImg = document.querySelector(".paymentImg");
const clickImg = document.querySelector(".clickImg");
const clickImg2 = document.querySelector(".clickImg2");
const success = document.querySelector(".success");
const error = document.querySelector(".error");
const submit = document.querySelector(".submitBtn");
const amountInput = document.querySelector(".amountInput");

clickImg2.addEventListener("click", function clickInput(){
    uploadImg.click()
});

let newImg = null;

uploadImg.addEventListener("change", function displayImage(){
    paymentImg.classList.remove("d-none")
    paymentImg.src = URL.createObjectURL(uploadImg.files[0])
    newImg = uploadImg.files[0]
});


const completePayment = async e => {

    e.preventDefault()
    submit.innerHTML = "Sending..."
    if(newImg){

        const newUser = {status: "Pending" }

        const postImg = () => {
            return new Promise((resolve) => {
              async function addImg() {
                const firebaseImageRef = ref(storage, `${newImg.name}`);
                const metadata = {
                  contentType: "image/jpeg",
                };
                // Upload the file and metadata
                try {
                  // const uploadTask = uploadBytes(storageRef, file, metadata)
                  await uploadBytes(firebaseImageRef, newImg, metadata).then(
                    async (snapshot) => {
                      const downloadURL = await getDownloadURL(firebaseImageRef);
                      newUser.picture = downloadURL;
                      resolve();
                    }
                  );
                } catch (err) {
                  console.log(err);
                  submit.innerHTML = "Submit";
                  return;
                }
              }
              addImg()
            });
            
          }


          postImg()
          .then(() => {
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
                }
                return Promise.reject(response);
              })
              .then(function (data) {
                submit.innerHTML = "Complete Investment"
                newImg = null
                uploadImg.src = ""
                uploadImg.classList.add("d-none")
                error.classList.add("d-none")
                success.classList.remove("d-none")
                localStorage.setItem("user", JSON.stringify(data))
                window.location.href = "/dashboard"
              })
              .catch(function (err) {
                console.log(err)
                submit.innerHTML = "Complete Investment"
                error.classList.remove("d-none")
                success.classList.add("d-none")
                
              })
          }
          )
    
    } else {
        window.alert("Add a screenshot of the transaction")
        submit.innerHTML = "Complete Investment"
        return
    }
};

thisForm.addEventListener("submit", completePayment);
