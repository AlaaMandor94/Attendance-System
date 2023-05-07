window.addEventListener("load", function () {
  let securityFirstName = localStorage.getItem("security_firstname");
  let securityLastName = localStorage.getItem("security_lastname");

  this.document.getElementById("SecurityName").innerText = `${securityFirstName} ${securityLastName}`;
  let userId = this.localStorage.getItem("security_userId");
  let Body2 = document.getElementById("example2").children[1];
  $("#DailyId").change(function () {
    dailyDateArray = document.getElementsByTagName("input")[0].value.split("-");
    dailyDate = `${dailyDateArray[1]}-${dailyDateArray[2]}-${dailyDateArray[0]}`;
    fetch(`http://localhost:3000/users/?_embed=attendances&accepted=true&id=${userId}`, {
      method: "GET",
      headers: { "Content-type": "application/JSON;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        $("#example2").DataTable().clear().destroy();
        let attend = 0;
        for (let i = 0; i < data[0].attendances.length; i++) {
          attend = data[0].attendances[i];
          if (new Date(data[0].attendances[i].date).getTime() == new Date(dailyDate).getTime()) {
            break;
          }
        }
        // console.log(dailyDate);
        // console.log(data[0].attendances[0].date);
        // console.log(data[0].attendances.length);
        let createdtr = document.createElement("tr");
        Body2.appendChild(createdtr);

        let name = document.createElement("td");
        name.innerText = `${data[0].firsName} ${data[0].lastName}`;
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

        $("#example2").DataTable({
          paging: false,
          lengthChange: true,
          searching: false,
          ordering: false,
          info: false,
          autoWidth: false,
          responsive: true,
          buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        });
      });
  });

  let dateField = document.getElementById("reservation");
  $("#reservation").change(function () {
    let Body4 = document.getElementById("example4").children[1];
    let Datepicker = dateField.value.split(" - ");
    let firstDay = `${Datepicker[0].split("/")[0]}-${Datepicker[0].split("/")[1]}-${Datepicker[0].split("/")[2]}`;
    let lastDay = `${Datepicker[1].split("/")[0]}-${Datepicker[1].split("/")[1]}-${Datepicker[1].split("/")[2]}`;
    let arrayOfRangeDays = [];
    let newData = [];

    function datediff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    } //1-25-2023
    function parseDate(str) {
      var mdy = str.split("-");
      return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }
    let numberOfDays = datediff(parseDate(firstDay), parseDate(lastDay)) + 1;

    fetch(`http://localhost:3000/attendances?_expand=user&userId=${userId}`, {
      method: "GET",
      headers: { "Content-type": "application/JSON;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        $("#example4").DataTable().clear().destroy();
        console.log(firstDay);
        console.log(lastDay);
        for (let i = 0; i < data.length; i++) {
          let currentDate = new Date(data[i].date).getTime();

          if (currentDate == new Date(firstDay).getTime()) {
            arrayOfRangeDays.push(i);
          }
        }

        if (arrayOfRangeDays.length == 0) {
          arrayOfRangeDays.push(0);
        }
        for (let i = 0; i < data.length; i++) {
          let currentDate = new Date(data[i].date).getTime();

          if (currentDate == new Date(lastDay).getTime()) {
            arrayOfRangeDays.push(i);
          }
        }
        if (arrayOfRangeDays.length) {
          arrayOfRangeDays.push(data.length - 1);
        }

        console.log(arrayOfRangeDays);
        for (let i = arrayOfRangeDays[0]; i <= arrayOfRangeDays[arrayOfRangeDays.length - 1]; i++) {
          newData.push(data[i]);
        }
        console.log("/////");
        console.log(newData);
        attendCounter = newData.length;
        absentCounter = numberOfDays - attendCounter;
        let lateCounter = 0;
        let excuseCounter = 0;

        for (let i = 0; i < newData.length; i++) {
          if (newData[i].Late == "Yes") {
            lateCounter++;
          }
          if (newData[i].excuse == "Yes") {
            excuseCounter++;
          }
        }
        let createdtr = document.createElement("tr");
        Body4.appendChild(createdtr);

        let name = document.createElement("td");
        name.innerText = `${newData[0].user.firsName} ${newData[0].user.lastName}`;
        createdtr.appendChild(name);

        let attend = document.createElement("td");
        attend.innerText = attendCounter;
        createdtr.appendChild(attend);

        let lateTr = document.createElement("td");
        lateTr.innerText = lateCounter;
        createdtr.appendChild(lateTr);

        let leaveTr = document.createElement("td");
        leaveTr.innerText = excuseCounter;
        createdtr.appendChild(leaveTr);

        let absence = document.createElement("td");
        absence.innerText = absentCounter;
        createdtr.appendChild(absence);

        $("#example4").DataTable({
          paging: true,
          lengthChange: true,
          searching: false,
          ordering: true,
          info: false,
          autoWidth: false,
          responsive: true,
          buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        });
      });
  });
  Logout1.addEventListener("click", function () {
    localStorage.clear();
    location.assign("Login.html");
  });
  Logout2.addEventListener("click", function () {
    localStorage.clear();
    location.assign("Login.html");
  });
});
