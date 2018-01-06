
//WIP

function createPageHandler(){


	const PageHandler = {

		gifList : []











	}

	return PageHandler;
}

//WIP
function createGif(title, rating){

	const Gif = {

		title:title,
		rating:rating,
		//stillGif:stillGif,
		//animatedGif:animatedGif,
		playGif : function(){

		}

	}
	return Gif;

}

//Rough and functional
function createSearch(term, limit){

	const endpointURL = 'http://api.giphy.com/v1/gifs/search?';
	const apiKey = 'Xf7PPUM1XuuApnCxWAbDigorZErENhef'; //this is just for testing so nbd that it's uploaded.

	const Search = {
		queryURL : function(){
			let endpointURL = this.endpointURL;
			endpointURL +='api_key=' + apiKey + '&';
			endpointURL +='q=' + term + '&';
			endpointURL +='limit=' + limit;

			return endpointURL;
		},


		getResults : function(){
			const gifResults = this.gifResults;

			$.ajax({
	        	url: this.queryURL(),
	        	method: "GET"
	      	}).done(function(response){

	      		response.data.map(function(gif){gifResults.push(createGif(gif.title,gif.rating))});
	      		 
	      	});

	      	return gifResults;
	    },


	    endpointURL: endpointURL,
		apiKey: apiKey,
		term : term,
		limit : limit,
		gifResults : [],
		rawResponse : [],
    
	}

	Search.gifList = Search.getResults();

	return Search;
}


$(document).ready(function(){
	//testing 
	let search = createSearch('cats',2);
	console.log(search.gifResults);
	

	


});