const firebaseConfig = {
    apiKey: "AIzaSyCXFC7_D8YUwu0SVTa7uMDdeES16PDfE5M",
    authDomain: "walkitd.firebaseapp.com",
    projectId: "walkitd",
    storageBucket: "walkitd.firebasestorage.app",
    messagingSenderId: "861610575148",
    appId: "1:861610575148:web:fd359e82006f4db21d9889",
    measurementId: "G-5YZQBWZN7Y"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
let dbRef = db.ref("text");


let chatContainer = document.getElementById("submissions");
let entry = document.getElementById("input_content");
let share = document.getElementById("submit_button");


dbRef.on("child_added", gotText);

function gotText(data) {
  let id = data.key;
  let value = data.val();
  console.log(value);
  chatContainer.innerHTML =
    "<div class='response'>" + value + "</div>" + chatContainer.innerHTML;
}

let textContainerElement = document.getElementById("input_content");

function submitText() {
  let textToSubmit = textContainerElement.value;
  let newKey = dbRef.push().key;
  let updates = {};
  updates[newKey] = textToSubmit;
  dbRef.update(updates);
  submitlock()
}

function submitlock() {
  entry.value = "";
}
