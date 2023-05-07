window.addEventListener("load", function () {
  let adminFirstName = localStorage.getItem("admin_firstname");
  let adminLastName = localStorage.getItem("admin_lastname");
  this.document.getElementById("AdminName").innerText = `${adminFirstName} ${adminLastName}`;

  /////////////////////////////////////////////////////////////
  ///////////////////////pending table//////////////////////////
  /////////////////////////////////////////////////////////////
  let Body1 = document.getElementById("example1").children[1];
  fetch("http://localhost:3000/users?accepted=false", {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let createdtr = document.createElement("tr");
        Body1.appendChild(createdtr);

        let name = document.createElement("td");
        name.innerText = `${data[i].firsName} ${data[i].lastName}`;
        createdtr.appendChild(name);

        let email = document.createElement("td");
        email.innerText = data[i].email;
        createdtr.appendChild(email);

        let age = document.createElement("td");
        age.innerText = data[i].age;
        createdtr.appendChild(age);

        let role = "employee";
        switch (data[i].type) {
          case 0:
            role = "Employee";
            break;
          case 1:
            role = "Security";
            break;
          case 2:
            role = "Admin";
            break;
        }
        let Position = document.createElement("td");
        Position.innerText = role;
        createdtr.appendChild(Position);

        let Confirm = document.createElement("td");
        Confirm.innerHTML = `<kbd id="confirm-${data[i].id}" data-confirmed="${data[i].id}">Accept</kbd> <kbd id="delete-${data[i].id}" data-deleted="${data[i].id}">Decline</kbd>`;
        createdtr.appendChild(Confirm);

        /* remove the declined employee */
        let removebtn = document.getElementById("delete-" + data[i].id);
        let targetDelete = removebtn.getAttribute("data-deleted");
        removebtn.addEventListener("click", function (callerrr) {
          let row = callerrr.target.parentElement.parentElement;
          if (confirm("Are You Sure you want to delete!")) {
            fetch("http://localhost:3000/users/" + targetDelete, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((res) => {
                $("example1").DataTable().rows($(row)).remove().draw();
              });
          }
        }); //end of removing the declined employee

        /* remove the accepted employee */
        let confirmbtn = document.getElementById("confirm-" + data[i].id);
        let targetConfirm = confirmbtn.getAttribute("data-confirmed");
        confirmbtn.addEventListener("click", function (callerrr) {
          let row = callerrr.target.parentElement.parentElement;
          if (confirm("Are You Sure you want to accept this employee!")) {
            let acceptedVariable = { accepted: true };
            emailjs
              .send("service_ns5hozn", "template_fl8fvxb", {
                to_name: `${data[i].firsName}`,
                body: "this is a confimation email",
                username: `${data[i].userName}`,
                password: `${data[i].password}`,
                Email: `${data[i].email}`,
              })
              .then(() => {
                fetch("http://localhost:3000/users/" + targetConfirm, {
                  method: "PATCH",
                  headers: { "Content-type": "application/JSON;charset=UTF-8" },
                  body: JSON.stringify(acceptedVariable),
                })
                  .then((res) => res.json())
                  .then(() => {
                    $("example1").DataTable().rows($(row)).remove().draw();
                  });
              });
          }
        }); //end of removing the accepted employee
      }
      $("#example1")
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: false,
        })
        .buttons()
        .container()
        .appendTo("#example1_wrapper .col-md-6:eq(0)");
    });
  /////////////////////////////////////////////////////////////
  ///////////////////////Daily report//////////////////////////
  /////////////////////////////////////////////////////////////
  let Body2 = document.getElementById("example2").children[1];
  fetch(" http://localhost:3000/users?_embed=attendances&accepted=true", {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let date = new Date();
        let today = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        let attend = data[i].attendances.find((item) => item.date === today);

        let createdtr = document.createElement("tr");
        Body2.appendChild(createdtr);

        let name = document.createElement("td");
        name.innerText = `${data[i].firsName} ${data[i].lastName}`;
        createdtr.appendChild(name);

        let Datee = document.createElement("td");
        Datee.innerText = "-";
        createdtr.appendChild(Datee);

        let In = document.createElement("td");
        In.innerText = "-";
        createdtr.appendChild(In);

        let out = document.createElement("td");
        out.innerText = "-";
        createdtr.appendChild(out);

        let lateTr = document.createElement("td");
        lateTr.innerText = "-";
        createdtr.appendChild(lateTr);

        let leaveTr = document.createElement("td");
        leaveTr.innerText = "-";
        createdtr.appendChild(leaveTr);

        let absence = document.createElement("td");
        absence.innerText = "-";
        createdtr.appendChild(absence);

        if (attend != null) {
          Datee.innerText = attend.date;
          In.innerText = attend.in;
          out.innerText = attend.out;
          lateTr.innerText = attend.Late;
          leaveTr.innerText = attend.excuse;
          absence.innerText = "No";
        } else {
          absence.innerText = "Yes";
        }
      }
      $("#example2").DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: false,
        autoWidth: false,
        responsive: true,
        buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
      });
    });
  /////////////////////////////////////////////////////////
  ////////////////////Employees table//////////////////////
  /////////////////////////////////////////////////////////
  let Body3 = document.getElementById("example3").children[1];
  fetch("http://localhost:3000/users?accepted=true", {
    method: "GET",
    headers: { "Content-type": "application/JSON;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let createdtr = document.createElement("tr");
        Body3.appendChild(createdtr);

        let name = document.createElement("td");
        name.innerText = `${data[i].firsName} ${data[i].lastName}`;
        createdtr.appendChild(name);

        let email = document.createElement("td");
        email.innerText = data[i].email;
        createdtr.appendChild(email);

        let age = document.createElement("td");
        age.innerText = data[i].age;
        createdtr.appendChild(age);

        let role = "employee";
        switch (data[i].type) {
          case 0:
            role = "Employee";
            break;
          case 1:
            role = "Security";
            break;
          case 2:
            role = "Admin";
            break;
        }
        let Position = document.createElement("td");
        Position.innerText = role;
        createdtr.appendChild(Position);

        let Confirm = document.createElement("td");
        Confirm.innerHTML = `<kbd id="delete-${data[i].id}" data-deleted="${data[i].id}">Remove</kbd>`;
        createdtr.appendChild(Confirm);

        /* remove the declined employee */
        let removebtn = document.getElementById("delete-" + data[i].id);
        let targetDelete = removebtn.getAttribute("data-deleted");
        removebtn.addEventListener("click", function (callerrr) {
          let row = callerrr.target.parentElement.parentElement;
          if (confirm("Are You Sure you want to delete!")) {
            fetch("http://localhost:3000/users/" + targetDelete, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((res) => {
                $("example3").DataTable().rows($(row)).remove().draw();
              });
          }
        }); //end of removing the declined employee
      }
      $("#example3")
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: false,
          // buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        })
        .buttons()
        .container()
        .appendTo("#example1_wrapper .col-md-6:eq(0)");
      removeSortingFromLast("example3");
    });
  /////////////////////////////////////////////////////////
  ////////////////////Monthly report///////////////////////
  /////////////////////////////////////////////////////////
  let dateField = document.getElementById("reservation");
  $("#reservation").change(function () {
    let Body4 = document.getElementById("example4").children[1];
    let Datepicker = dateField.value.split(" - ");
    let firstDay = `${Datepicker[0].split("/")[0]}-${Datepicker[0].split("/")[1]}-${Datepicker[0].split("/")[2]}`;
    let lastDay = `${Datepicker[1].split("/")[0]}-${Datepicker[1].split("/")[1]}-${Datepicker[1].split("/")[2]}`;
    let arrayOfRangeDays = [];
    let newData = [];

    fetch("http://localhost:3000/attendances?_expand=user", {
      method: "GET",
      headers: { "Content-type": "application/JSON;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        $("#example4").DataTable().clear().destroy();
        for (let i = 0; i < data.length; i++) {
          let currentDate = new Date(data[i].date).getTime();
          if (currentDate >= new Date(firstDay).getTime() && currentDate <= new Date(lastDay).getTime()) {
            arrayOfRangeDays.push(i);
          }
        }
        console.log("-----");
        console.log(arrayOfRangeDays);
        for (let i = arrayOfRangeDays[0]; i <= arrayOfRangeDays[arrayOfRangeDays.length - 1]; i++) {
          newData.push(data[i]);
        }

        for (let i = 0; i < newData.length; i++) {
          let createdtr = document.createElement("tr");
          Body4.appendChild(createdtr);

          let name = document.createElement("td");
          name.innerText = `${newData[i].user.firsName} ${newData[i].user.lastName}`;
          createdtr.appendChild(name);

          let attend = document.createElement("td");
          attend.innerText = "Yes";
          createdtr.appendChild(attend);

          let lateTr = document.createElement("td");
          lateTr.innerText = newData[i].Late;
          createdtr.appendChild(lateTr);

          let leaveTr = document.createElement("td");
          leaveTr.innerText = newData[i].excuse;
          createdtr.appendChild(leaveTr);

          let dateTr = document.createElement("td");
          dateTr.innerText = newData[i].date;
          createdtr.appendChild(dateTr);
        }
        $("#example4").DataTable({
          paging: true,
          lengthChange: true,
          searching: true,
          ordering: true,
          info: false,
          autoWidth: false,
          responsive: true,
          buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        });
      });
  });

  pending1.addEventListener("click", function () {
    document.getElementById("card1").style.display = "block";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "none";
  });
  pending2.addEventListener("click", function () {
    document.getElementById("card1").style.display = "block";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "none";
  });
  emp1.addEventListener("click", function () {
    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "block";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "none";
  });
  emp2.addEventListener("click", function () {
    document.getElementById("card1").style.display = "block";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "none";
  });
  daily1.addEventListener("click", function () {
    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "block";
    document.getElementById("card4").style.display = "none";
  });
  daily2.addEventListener("click", function () {
    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "block";
    document.getElementById("card4").style.display = "none";
  });
  monthly1.addEventListener("click", function () {
    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "block";
  });
  monthly2.addEventListener("click", function () {
    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "block";
  });
  Logout1.addEventListener("click", function () {
    localStorage.clear();
    location.assign("Login.html");
  });
  Logout2.addEventListener("click", function () {
    localStorage.clear();
    location.assign("Login.html");
  });
  function removeSortingFromLast(tableID) {
    $(`#${tableID} thead th`)
      .eq($(`#${tableID} thead th`).length - 1)
      .toggleClass("sorting")
      .off("click");
  }
});
