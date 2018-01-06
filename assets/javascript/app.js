
//WIP

function createPageHandler(){


	const PageHandler = {

		targetContainer : $('.row-image-container'),

		createGifContainer : function(gif){
			let element = '';

			element +=
			element +='<div class=\"col-sm-4\">';
			element +='<div class=\"thumbnail\">';
			element +='<img src=\"' + gif.stillGif + '\">';
			element +='<div class=\"caption text-center\">';
			element +='<h3>' + gif.title + '</h3>';
			element +='<h4> Rating: ' + gif.rating + '</h4>';
			element +='</div>';
			element +='</div>';
			element +='</div>';
			
			this.targetContainer.append(element);
		},

		clearGifContainers : function(){

			this.targetContainer.empty();
		},

	}

	PageHandler.clearGifContainers();

	return PageHandler;
}


//WIP
function createGif(title, rating, stillGif,animatedGif){

	const Gif = {

		title:title,
		rating:rating,
		stillGif:stillGif,
		animatedGif:animatedGif,
		

	}
	return Gif;

}

//Rough and functional
function createSearch(term, limit){

	const Search = {
		queryURL : function(){
			let endpointURL = this.endpointURL;
			endpointURL +='api_key=' + apiKey + '&';
			endpointURL +='q=' + term + '&';
			endpointURL +='limit=' + limit;

			return endpointURL;
		},


		getResults : function(pageHandler){
			const gifResults = [];

			$.ajax({
	        	url: this.queryURL(),
	        	method: "GET"
	      	}).done(function(response){

	      		//console.log(response.data);
	      		response.data.map(function(gif){
	      			gifResults.push(createGif(gif.title,gif.rating,
	      				gif.images.fixed_height_still.url,
	      				gif.images.fixed_height.url));});

	      		gifResults.map(function(gif){pageHandler.createGifContainer(gif)});
	      		 
	      	});

	      	
	    },
	    //i'm aware that people can use this key...it's just for fun
	    endpointURL : 'http://api.giphy.com/v1/gifs/search?';
		apiKey : 'Xf7PPUM1XuuApnCxWAbDigorZErENhef';
	    endpointURL: endpointURL,
		apiKey: apiKey,
		term : term,
		limit : limit,
    
	}

	//Search.gifList = Search.getResults();

	return Search;
}


$(document).ready(function(){

	$(document).on('click', '.search-button', function(){

		const pageHandler = createPageHandler();
		const search = createSearch($('.search-input').val(),9);
		search.getResults(pageHandler);

	});
	
});