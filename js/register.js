window.addEventListener("load", function () {
  userFirstName = document.getElementById("firstName");
  userLastName = document.getElementById("lastName");
  userAge = document.getElementById("Age");
  userAddress = document.getElementById("Address");
  userEmail = document.getElementById("email");

  ArrayEmails = [];

  fetch("http://localhost:3000/users", {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        ArrayEmails.push(json[i].email);
      }
    });

  userFirstName.addEventListener("blur", function () {
    if (!isuserfnamevalide()) {
      userFirstName.focus();
      userFirstName.select();
      userFirstName.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "First name is not valid";
    } else {
      userFirstName.style.border = "3px solid green";
      document.getElementsByTagName("span")[0].innerText = "";
    }
  });
  userLastName.addEventListener("blur", function () {
    if (!isuserlnamevalide()) {
      userLastName.focus();
      userLastName.select();
      userLastName.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "Last name is not valid";
    } else {
      userLastName.style.border = "3px solid green";
      document.getElementsByTagName("span")[0].innerText = "";
    }
  });

  userAge.addEventListener("blur", function () {
    if (!isuserAgevalide()) {
      userAge.focus();
      userAge.select();
      userAge.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "Age is not valid";
    } else {
      userAge.style.border = "3px solid green";
      document.getElementsByTagName("span")[0].innerText = "";
    }
  });

  userAddress.addEventListener("blur", function () {
    if (!isuserAddressvalide()) {
      userAddress.focus();
      userAddress.select();
      userAddress.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "Address is not valid";
    } else {
      userAddress.style.border = "3px solid green";
      document.getElementsByTagName("span")[0].innerText = "";
    }
  });
  userEmail.addEventListener("blur", function () {
    if (!isuserEmailvalide()) {
      userEmail.focus();
      userEmail.select();
      userEmail.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "Email is not valid";
    } else if (!isEmailNotRepeated()) {
      userEmail.focus();
      userEmail.select();
      userEmail.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "Email already exists";
    } else {
      userEmail.style.border = "3px solid green";
      document.getElementsByTagName("span")[0].innerText = "";
    }
  });

  function isuserfnamevalide() {
    return userFirstName.value.match(/^[A-Za-z]{2,15}$/);
  }
  function isuserlnamevalide() {
    return userLastName.value.match(/^[A-Za-z]{2,15}$/);
  }
  function isuserAgevalide() {
    return userAge.value.match(/^(?:1[8-9]|[2-5][0-9])$/);
  }
  function isuserAddressvalide() {
    return userAddress.value.match(/^\d+\s[A-z]+\s[A-z]+/g);
  }
  function isuserEmailvalide() {
    return userEmail.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  function isEmailNotRepeated() {
    let flage = true;
    for (let i = 0; i < ArrayEmails.length; i++) {
      if (userEmail.value == ArrayEmails[i]) {
        flage = false;
      }
    }
    return flage;
  }

  loginBtn.addEventListener("click", () => {
    window.location.href = "Login.html";
  });
  // send data to server

  registrationform.addEventListener("submit", function (e) {
    e.preventDefault();
    // create random username and password
    if (isuserfnamevalide() && isuserlnamevalide() && isuserAgevalide() && isuserAddressvalide() && isuserEmailvalide() && isEmailNotRepeated()) {
      userName = generateName();
      pass = generatePassword();
      let date = new Date();
      let today = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
      let dataa = {
        id: "",
        firsName: userFirstName.value,
        lastName: userLastName.value,
        age: userAge.value,
        email: userEmail.value,
        address: userAddress.value,
        userName: userName,
        password: pass,
        type: 0,
        accepted: false,
        startDate: today,
      };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataa),
      });
      location.href = "Login.html";
    }
  });
});

function generateName() {
  let length = 7,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
function generatePassword() {
  let length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
