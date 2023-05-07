window.addEventListener("load", function () {
  const formUsernameElm = document.getElementById("userName");
  const formPassElm = document.getElementById("pwd");

  formUsernameElm.addEventListener("blur", function () {
    if (!isuserNameValide()) {
      formUsernameElm.focus();
      formUsernameElm.select();
      formUsernameElm.style.border = "3px solid red";
    } else {
      formUsernameElm.style.border = "3px solid green";
    }
  });

  formPassElm.addEventListener("blur", function () {
    if (!isPasswordValide()) {
      formPassElm.focus();
      formPassElm.select();
      formPassElm.style.border = "3px solid red";
    } else {
      formPassElm.style.border = "3px solid green";
    }
  });
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // e.stopPropagation();
    console.log("after");

    const formUsernameElm = document.getElementById("userName");
    const formPassElm = document.getElementById("pwd");

    // submit fields and check authentication
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: { "Content-type": "application/JSON;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        {
          for (let i = 0; i < data.length; i++) {
            if (formUsernameElm.value == data[i].userName && formPassElm.value == data[i].password && data[i].accepted == true) {
              document.getElementsByTagName("span")[0].style.display = "none";
              if (data[i].type == 0) {
                localStorage.setItem("employee_userId", data[i].id);
                localStorage.setItem("employee_username", data[i].userName);
                localStorage.setItem("employee_firstname", data[i].firsName);
                localStorage.setItem("employee_lastname", data[i].lastName);
                localStorage.setItem("role", data[i].type);
                location.assign("employee.html");
              } else if (data[i].type == 1) {
                localStorage.setItem("security_userId", data[i].id);
                localStorage.setItem("security_username", data[i].userName);
                localStorage.setItem("security_firstname", data[i].firsName);
                localStorage.setItem("security_lastname", data[i].lastName);
                localStorage.setItem("role", data[i].type);
                location.assign("security.html");
              } else {
                localStorage.setItem("admin_username", data[i].userName);
                localStorage.setItem("admin_firstname", data[i].firsName);
                localStorage.setItem("admin_lastname", data[i].lastName);
                localStorage.setItem("role", data[i].type);
                location.assign("Admin.html");
              }
            } else {
              document.getElementsByTagName("span")[0].innerText = "Check your information";
            }
          }
        }
      });
  });

  function isuserNameValide() {
    return formUsernameElm.value.match(/^[A-Za-z]{7}$/);
  }

  function isPasswordValide() {
    return formPassElm.value.match(/^[A-Za-z0-9]{8}$/);
  }
});
