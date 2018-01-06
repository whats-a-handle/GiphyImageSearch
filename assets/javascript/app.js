
//WIP
function createGif(title, rating, stillGif,animatedGif){

	const Gif = {

		title:title,
		rating:rating,
		stillGif:stillGif,
		animatedGif:animatedGif,
		playGif:function(){

		}

	}
	return Gif;

}

//Rough and functional
function createSearch(term, limit){

	const endpointURL = 'http://api.giphy.com/v1/gifs/search?';
	const apiKey = 'Xf7PPUM1XuuApnCxWAbDigorZErENhef';

	const Search = {

		endpointURL: endpointURL,
		apiKey: apiKey,
		term : term,
		limit : limit,

		queryURL : function(){
			let endpointURL = this.endpointURL;
			endpointURL +='api_key=' + apiKey + '&';
			endpointURL +='q=' + term + '&';
			endpointURL +='limit=' + limit;

			return endpointURL;
		},


		getResults : function(){

			$.ajax({
	        	url: this.queryURL(),
	        	method: "GET"
	      	}).done(function(response){
	      		console.log(response); //this will actually call createGif. We're just testing for now.
	      	});

	      	//return gif;
	    }
	}

	return Search;
}


$(document).ready(function(){
	//testing 
	let search = createSearch('cats',2);

	search.getResults();


});