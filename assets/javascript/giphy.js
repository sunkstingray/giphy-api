var searchTerms = ["South Park","The Simpsons","Futurama","Family Guy","Adventure Time","Spongebob Squarepants","Minions"];

for (var i = 0; i < searchTerms.length; i++) {
	var a = $("<button>");
	a.addClass("btn btn-dark giphy-go");
	a.attr("data-name", searchTerms[i]);
  	a.text(searchTerms[i]);
  	$("#button-view").append(a);
};

function displayGifs() {

	$("#gif-view").empty();

	var offset = (Math.floor(Math.random()*100));
	var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=vnXP5TjPryfPeqdtiyRVk560wSAinVtu&limit=10&offset="+offset;
    
    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        		
        	for (var i = 0; i < response.data.length; i++) {
        		
        		var animatedImage = response.data[i].images.fixed_height.url;
				var stillImage = response.data[i].images.fixed_height_still.url;
				var rating = "Rating: "+response.data[i].rating;

	          	var gifFig = $("<figure class='figure'>");

	          	var image = $("<img>").attr({
	          		src: stillImage,
	          		"data-still": stillImage,
	          		"data-animate": animatedImage,
	          		"data-state": "still",
	          		class: "gif"
	          	});

	          	var figCaption = $("<figcaption>").addClass("figure-caption");
	          	figCaption = figCaption.text(rating);

	          	gifFig.append(image);
	          	gifFig.append(figCaption);

	        
	          $("#gif-view").prepend(gifFig);
        	}

        		


	        });

        

};



function animateGifs() {
	var state = $(this).data("state");
	if (state === "still"){
          $(this).attr("src", $(this).data("animate"));
          $(this).data("state", "animate");
        }

        else if (state === "animate"){
          $(this).attr("src", $(this).data("still"));
          $(this).data("state", "still");
        }

};


function addButton() {

	$("#button-view").empty();

	for (var i = 0; i < searchTerms.length; i++) {
	var a = $("<button>");
	a.addClass("btn btn-dark giphy-go");
	a.attr("data-name", searchTerms[i]);
  	a.text(searchTerms[i]);
  	$("#button-view").append(a);
};
};

$("#gifSubmit").on("click", function(event) {
        
        event.preventDefault();

        var newGif = $("#newGif").val().trim();

        searchTerms.push(newGif);

        $('#newGif').val('');

        addButton();
      });

$(document).on("click", ".giphy-go", displayGifs);

$(document).on("click", ".gif", animateGifs);