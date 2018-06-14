
// Initial array
var zoo = ["Cat", "Dog","Rabbit","Bird","Cow","Goat","Horse","Owl","Fish","Pig","Hamster","Squirrel"];
var animal;


// Function for button display
function renderButtons() {

  // Deletes buttons prior to adding new buttons to prevent repeat buttons
  $("#animal-buttons").empty();
  // Loops through animal array
  for (var i = 0; i < zoo.length; i++) {
    // Creates buttons for each animal in the array.
    var a = $("<button>");
    // Adding a class
    a.addClass("btn");
    a.addClass("press")
    // Adding a data-attribute.
    a.attr("data-name", zoo[i]);
    // Adding button's text.
    a.text(zoo[i]);
    // Adding the button to the HTML
    $("#animal-buttons").append(a);
  }
}



// Show buttons when page loads.
renderButtons();

// On button click, display animal gif.
$(document).on("click", ".press", displaygif);

// displaygif -grabs gif info 
function displaygif() {
  $("#images").empty();
  var name = $(this).attr("data-name");
 console.log("display gif!!!")

  // Builds a URL to search Giphy with animal name.
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    name + "&api_key=dc6zaTOxFJmzC&limit=10";

  // AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // Use API to get gif data
    .then(function (response) {
     var limit = 10;
    
      var datagif = response.data;
      // console.log(response.data[0].images.fixed_height.url);

      // console.log(response.data[0].images.fixed_height_still.url);
      // Saving the gif urls.
      for (var i =0; i < limit; i++ ){
      var imageUrlStill = response.data[i].images.fixed_height_still.url;
      var imageUrlAnimate = response.data[i].images.fixed_height.url;
      var rating = response.data[i].rating;

      // Creating and storing an image tag.
      var animalImage = $("<img>");
      var imagediv =$("<div>");
      imagediv.addClass("box")
      
      // Building image tag of gifs.
      animalImage.attr("src", imageUrlStill);
      animalImage.attr("data-still", imageUrlStill);
      animalImage.attr("data-animate", imageUrlAnimate);
      animalImage.attr("data-state", "still");
      animalImage.addClass("img-thumbnail");
      animalImage.css({"width":"250px","height":"250px"});


    //Ratings
      var ratings =$("<p>").text("Rating: "+rating); 
        // Prepending the images & ratings to the images div
      imagediv.append(ratings);
      imagediv.append(animalImage);
      $("#images").prepend(imagediv);
      
      }
    }); 
}

$(document).on("click", "img", function () {
  //  alert("ok") 
   var state = $(this).attr("data-state");
   console.log("*********")
    console.log("state1: "+state);
//If data-state = still: switch to animated gif & set data-state to animate.
//Else switch to still gif & and set data-state to still.

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          console.log("changing to animate")
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  });

// This function handles events where one button is clicked
$(".submit").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself &
  // allows user can hit enter instead of clicking the button if they want

  event.preventDefault();

  // Grab the text from the input box
  animal = $("#animal-name").val().trim();
  console.log("animal: " + animal);
  //No blank buttons!
  if (animal !== "") {
    // Push animal name onto the array
    zoo.push(animal);

    // Call function to make buttons from array.
    renderButtons();
    console.log("animal2"+animal);
  }
  
});