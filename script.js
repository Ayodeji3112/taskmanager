$(function () {
  // Function to save user input to local storage
  $(".saveBtn").on("click", function () {


    // Get the hour id of the corresponding time-block
    var hourId = $(this).parent().attr("id");
    

    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();



    // Save the user input to local storage using the hour id as the key
    localStorage.setItem(hourId, userInput);



    // Show the "Appointment added to local storage" message
    $("#added").show();
  });

  // Function to update time-block colors based on current time
  function updateColors() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();


    // Loop through each time-block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);



      // Remove past, present, and future classes
      $(this).removeClass("past present future");



      // Add the appropriate class based on the comparison with the current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  

  // Function to retrieve user input from local storage and set textarea values
  function retrieveData() {
    $(".time-block").each(function () {
      var hourId = $(this).attr("id");
      var savedInput = localStorage.getItem(hourId);

      // Set the textarea value to the saved input
      $(this).children(".description").val(savedInput);
    });
  }

  // Call the updateColors function when the page loads
  updateColors();

  // Call the retrieveData function when the page loads
  retrieveData();

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
