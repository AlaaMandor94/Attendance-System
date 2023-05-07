window.addEventListener("load", function () {
  let currentHour = new Date().getHours();
  if (currentHour < 8 || currentHour > 16) {
    alert("after hours");
    location.assign("security.html");
  }
  const formUsernameElm = document.getElementById("userName");
  function isuserNameValide() {
    return formUsernameElm.value.match(/^[A-Za-z]{7}$/);
  }
  formUsernameElm.addEventListener("blur", function () {
    if (!isuserNameValide()) {
      formUsernameElm.focus();
      formUsernameElm.select();
      formUsernameElm.style.border = "3px solid red";
      document.getElementsByTagName("span")[0].innerText = "user name is not correct";
    } else {
      document.getElementsByTagName("span")[0].innerText = "";
      formUsernameElm.style.border = "3px solid green";
    }
  });

  attendanceForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // e.stopPropagation()

    fetch(`http://localhost:3000/users?userName=${formUsernameElm.value}`, {
      method: "GET",
      headers: { "Content-type": "application/JSON;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 1 && data[0].userName === formUsernameElm.value) {
          document.getElementsByTagName("span")[0].innerText = "";
          let date = new Date();
          let today = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
          let userId = data[0].id;

          fetch(`http://localhost:3000/users/${userId}/attendances?date=${today}`, {
            method: "GET",
            headers: { "Content-type": "application/JSON;charset=UTF-8" },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.length) {
                let hoursOut = new Date().getHours();
                let minuteOut = new Date().getMinutes();

                let leaveTime = 930;
                let excuseTime = hoursOut * 60 + minuteOut;

                if (leaveTime > excuseTime) {
                  excuseStatus = "Yes";
                } else {
                  excuseStatus = "No";
                }

                let patchBody = { out: `${hoursOut}:${minuteOut}`, excuse: excuseStatus };
                fetch(`http://localhost:3000/attendances/${data[0].id}`, {
                  method: "PATCH",
                  headers: { "Content-type": "application/JSON;charset=UTF-8" },
                  body: JSON.stringify(patchBody),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    document.getElementsByTagName("span")[0].innerText = "departure confirmed";
                    document.getElementsByTagName("span")[0].style.color = "green";
                  });
              } else {
                let hoursIn = new Date().getHours();
                let minutesIn = new Date().getMinutes();

                let minimumLate = 570;
                Late = hoursIn * 60 + minutesIn;

                if (Late > minimumLate) {
                  lateStatus = "Yes";
                } else {
                  lateStatus = "No";
                }
                let postBody = { id: "", in: `${hoursIn}:${minutesIn}`, out: 0, date: today, userId: userId, Late: lateStatus, excuse: "No" };
                fetch(`http://localhost:3000/attendances`, {
                  method: "POST",
                  headers: { "Content-type": "application/JSON;charset=UTF-8" },
                  body: JSON.stringify(postBody),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    document.getElementsByTagName("span")[0].innerText = "attendance confirmed";
                    document.getElementsByTagName("span")[0].style.color = "green";
                  });
              }
            });
        } else {
          document.getElementsByTagName("span")[0].innerText = "user name is not correct";
        }
      });
  });
});
