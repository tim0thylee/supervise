$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var carInventory;
  var carInventoryId;
  var updating = false;
  var currentId;

  var make = $("#make");
  var model = $("#model");
  var color = $("#color");
  var year = $("#year");
  var msrp = $("#msrp_price");
  var invoice = $("#invoice_price");
  var sticker = $("#sticker_pric1e");
  var sale = $("#sale_price");
  // Getting jQuery references to the post body, title, form, and category select
  var make1 = $("#make1");
  var model1 = $("#model1");
  var color1 = $("#color1");
  var year1 = $("#year1");
  var msrp1 = $("#msrp_price1");
  var invoice1 = $("#invoice_price1");
  var sticker1 = $("#sticker_pric1e");
  var sale1 = $("#sale_price1");
  var saleDate = $("#sale_date");
  var cardContent = $("#cardContent");
  var updateCard = $("#modal1");
  var tableContainer = $("#carTable");

  var modal = document.getElementById("modal1");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  $("#submit2").on("click", handlePostEdit);

  function handlePostEdit(event) {
    console.log("trigger");
    var update = {
      id: currentId,
      //   make: make1.val().trim(),
      //   model: model1.val().trim(),
      //   year: year1.val(),
      //   color: color1.val().trim(),
      //   msrp_price: msrp1.val(),
      //   invoice_price: invoice1.val(),
      //   sticker_price: sticker1.val(),
      sale_date: moment().format("MMDDYY"),
      sold: true,
      sale_price: sale1.val()
    };
    updatePost(update);
  }

  function updatePost(inventory) {
    console.log(inventory);
    $.ajax({
      method: "PUT",
      url: "/api/inventory",
      data: inventory
    }).then(getInventory);
    
  }

  function getInventory() {
    $.get("/api/inventory", function(data) {
      console.log("Inventory", data);
      carInventory = data;
      initializeRows();
    });
  }
  function createNewRow(postArray) {
    
    if (postArray.sold === true) {
      postArray.sold = "Yes";
    } else {
      postArray.sold = "No";
    }

    var row = $("<tr>");
    row.addClass("addedCar");
    row.append("<td>" + postArray.id + "</td>");
    row.append("<td>" + postArray.make + "</td>");
    row.append("<td>" + postArray.model + "</td>");
    row.append("<td>" + postArray.year + "</td>");
    row.append("<td>" + postArray.color + "</td>");
    row.append("<td>" + postArray.msrp + "</td>");
    row.append("<td>" + postArray.sold + "</td>");
    // row.append("<td><a class='waves-effect waves-light btn delete' id='deleteButton'>delete</a></td>")
    row.append(
      "<td><a value='" +
        postArray.id +
        "' class='waves-effect waves-light btn modal-trigger updateInput' href='#modal1'>update</a>"
    );
    row.data("Inventory", postArray);
    $("#carTable").prepend(row);
  }

  function initializeRows() {
    tableContainer.empty();
    var carToAdd = [];
    for (var i = 0; i < carInventory.length; i++) {
      carToAdd.push(createNewRow(carInventory[i]));
    }
  }

  $(cardContent).on("submit", function handleFormSubmit(event) {
    event.preventDefault();

    var newPost = {
      make: make.val().trim(),
      model: model.val().trim(),
      year: year.val(),
      color: color.val().trim(),
      msrp_price: msrp.val(),
      invoice_price: invoice.val(),
      sticker_price: sticker.val(),
      sale_price: sale.val(),
      sale_date: sale.val().trim()
    };

    console.log(newPost);

    submitCarInfo(newPost);

    $("#make").val("");
    $("#model").val("");
    $("#year").val("");
    $("#color").val("");
    $("#msrp_price").val("");
    $("#invoice_price").val("");
    $("#sticker_price").val("");
    $("#sale_price").val("");
    $("#sale_date").val("");
  });

  function submitCarInfo(Inventory) {
    $.post("/api/inventory/", Inventory, function() {
      console.log(Inventory);
      window.location.href = "/inventory";
    });
  }

  function getPostData(id) {
    $.get("/api/inventory/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our forms with its data
        make.val(data.body);
        model.val(data.body);
        year.val(data.body);
        color.val(data.body);
        msrp_price.val(data.body);
        invoice_price.val(data.body);
        sticker_price.val(data.body);
        sale_price.val(data.body);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  $(document).on("click", ".updateInput", function() {
    // var thisVlaue = document.getElementsByClassName('updateInput')
    currentId = $(this).attr("value");
  });

  $("#modal1").ready(function() {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $(".modal").modal();
  });

  getInventory();
});

// this is the function for the search bar
function inventorySearch() {
  
      var input, filter, table, tr, td, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("customerInfoTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }