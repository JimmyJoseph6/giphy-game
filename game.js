//Createa  funtion on an array of cars for initial buttons
var carsArray = ["Ferrari", "Mercedes", "Bentley", "Porsche", "Pagani"];



$(document).ready(function() {
    for (var i = 0; i < carsArray.length; i++) {
        //Using the <div id="car-buttons">, create new buttons, that uses the function "searchGIF"
        $("#car-buttons").append("<button type='button' onclick='searchGif(\"" + carsArray[i] + "\")' class='btn btn-primary' value=' " + carsArray[i] + "'> " + carsArray[i] + " </button>");
    }
});



//
function carButtonClicked() {
    var userInput = $('#car-input').val();
    searchGif(userInput);
}


//adds a new button when search button is clicked to the array
function submitButtonClicked() {
    var userInput = $('#car-input').val();

    if (userInput) {
        $('#car-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}



//function to use API key
function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=0R2hGaNLQSxxb81xF7dJoqyawj7OOneH',
            type: 'GET',
            
        })
        .done(function(response) {
            displayGif(response);
            
        })
    
}





//function to display GIF and ratings
function displayGif(response) {
    $('#cars').empty();
    for (var i = 0; i < response.data.length; i++) {
        
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';


        // using "col-md=4" class allows to have rows of 3 images 
        image = '<div class="col-md-4">' + image + "</div>";
        $('#cars').append(image);
    }

    //This onclick function allows you to swap between still and animated GIFs
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}


