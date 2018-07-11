$(document).ready(function() {
  let myPieChart = document.getElementById("chartOne").getContext("2d");
  let myLineChart = document.getElementById("chartTwo").getContext("2d");
  // let myLineChart = document.getElementById("chartTwo").getContext("2d");

  getSalesToday();
  getInventoryValue();
  getInventoryCount();
  getSalesForBrand();
  getSaleGoals();

  function getSalesToday() {
    let currentDay = {
      sale_date: moment().format("MMDDYY"),
      sale: 1
    };

    $.post("/api/sales", currentDay).then(function(result) {
      initCounters(result);
    });
  }

  function getInventoryValue() {
    $.post("/api/inventory").then(function(result) {
      console.log(result);
      let msrp = 0;
      let invoice = 0;

      for (var i = 0; i < result.length; i++) {
        msrp += parseInt(result[i].msrp);
        invoice += parseInt(result[i].invoice);
      }
      let total = msrp - invoice;

      $(".count-value").countTo({
        onComplete: function() {
          $(".value").append(
            '<div class="value">' + "$" + numberWithCommas(msrp) + "<div>"
          );
        }
      });
    });
  }

  // Function to add commas in our number
  const numberWithCommas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  function getInventoryCount() {
    $.post("/api/invcount").then(function(result) {
      console.log(result);
      $(".count-inv").countTo({
        from: 0,
        to: result.length
      });
    });
  }

  function initCounters(result) {
    console.log(result);
    $(".count-today").countTo({
      from: 0,
      to: result.length
    });
  }

  function getSalesForBrand() {
    let saleMonth = {
      firstDay: moment().format("MMDDYY"),
      todayDate: moment().subtract()
    };

    $.post("/api/brand").then(function(result) {
      let carData = [0, 0, 0, 0, 0];

      for (i = 0; i < result.length; i++) {
        if (result[i].make === "BMW") {
          carData[0] += 1;
        } else if (result[i].make === "Mercedes") {
          carData[1] += 1;
        } else if (result[i].make === "Jaguar") {
          carData[2] += 1;
        } else if (result[i].make === "Maserati") {
          carData[3] += 1;
        } else {
          carData[4] += 1;
        }
      }
      let carBar = new Chart(myPieChart, {
        type: "pie", // bar, horizontalBar, pie, line, doughnut, radar polarArea
        data: {
          labels: ["BMW", "Mercedes", "Jaguar", "Maserati", "Range Rover"],
          datasets: [
            {
              label: "Cars Sold",
              data: carData,
              //backgroundColor: 'green' Change the color of all data
              // Change the color of each data starting from index 0
              backgroundColor: [
                "#525564",
                "#74828F",
                "#96C0CE",
                "#BEB9B5",
                "#C25B56"
              ],
              borderWidth: 1,
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#333"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Brands Sold for Month",
            fontSize: 25
          },
          legend: {
            display: true, //Turn off the legend
            position: "right", //Top, right, bottom
            labels: {
              fontColor: "black"
            }
          },
          layout: {
            // Adjusting where the chart will be
            padding: {
              left: 50,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          tooltips: {
            //Toggle off the tool tips.
            enabled: true
          }
        }
      });
    });
  }

  function getSaleGoals() {
    $.post("/api/goal").then(function(result) {
      let grossSale = 0;
      let invoicePrice = 0;
      let saleNum = [0, 0, 0, 0, 0, 0, 0];

      for (let i = 0; i < result.length; i++) {
        // Get Gross Sales overall
        grossSale += parseInt(result[i].sale_price);
        invoicePrice += parseInt(result[i].invoice);

        if (result[i].sale_date === "020518") {
          saleNum[0] += 1;
        } else if (result[i].sale_date === "020618") {
          saleNum[1] += 1;
        } else if (result[i].sale_date === "020718") {
          saleNum[2] += 1;
        } else if (result[i].sale_date === "020818") {
          saleNum[3] += 1;
        } else if (result[i].sale_date === "020918") {
          saleNum[4] += 1;
        } else if (result[i].sale_date === "021018") {
          saleNum[5] += 1;
        } else {
          saleNum[6] += 1;
        }
      }

      $(".count").countTo({
        onComplete: function() {
          $("#gross").append(
            '<div class="gross">' + "$" + numberWithCommas(grossSale) + "<div>"
          );
        }
      });

      let saleLine = new Chart(myLineChart, {
        type: "line", // bar, horizontalBar, pie, line, doughnut, radar polarArea
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          datasets: [
            {
              label: "Sale Goal",
              data: [3, 3, 3, 4, 4, 5, 6],
              type: "line",
              borderColor: "black"
            },
            {
              label: "Sales",
              data: saleNum,
              borderWidth: 1,
              borderColor: "#fffcf0",
              backgroundColor: "#96C0CE",
              hoverBorderWidth: 3,
              hoverBorderColor: "#fffcf0"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Weekly Sales",
            fontSize: 25
          },
          legend: {
            display: true, //Turn off the legend
            position: "right", //Top, right, bottom
            labels: {
              fontColor: "black"
            }
          },
          layout: {
            // Adjusting where the chart will be
            padding: {
              left: 50,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          tooltips: {
            //Toggle off the tool tips.
            enabled: true
          }
        }
      });
    });
  }

  function getNewsFeed() {

    let news = {
      sale_date: moment().format("MMDDYY"),
      sale: 1
    };

    $.post("/api/sales", news).then(function(data) {
      console.log(data);
      

      for (let i = 0; i < 6; i++) {
        let carName = data[i].make + " " + data[i].model;
        // let time = data.updatedAt[i]
        let time = moment().format("MMMM Do YYYY, h:mm:ss a");
        $("#time-line").append(
          '<p class="time"><bold>Sold:<bold> ' + carName + " on " + time + "<p>"
        );
      }
    });
  }

  function getCustomerFeed(){
    $.get('/api/customerposts/').then(function(result){
      
      for (i = 0; i < 4; i++){

      let name = result[i].name 
      let phone = result[i].phone_number
      let created = result[i].createdAt
        $("#time").append(
          '<p class="customer">Name: ' + name + '<br> Phone: '+ phone +"<p>"
        );
      }
    })
  }
  getNewsFeed()
  getCustomerFeed()
});
