function createPageHandler(){

	const PageHandler = {

		createGifContainer : function(gif){
			let element = '';

			element +=
			element +='<div class=\"col-sm-4\">';
			element +='<div class=\"thumbnail\">';
			element +='<img src=\"' + gif.stillGif + '\" is-playing=\"false\" still-gif=\"' + 
						gif.stillGif +'\"'+ ' animated-gif=\"' + gif.animatedGif +'\">';
			element +='<div class=\"caption text-center\">';
			//element +='<h4>' + gif.title + '</h4>';
			element +='<h4> Rating: ' + gif.rating.toUpperCase() + '</h4>';
			element +='</div>';
			element +='</div>';
			element +='</div>';
			
			this.gifRowContainer.append(element);
		},

		createGifButton : function(term){

			if(!this.gifTerms.includes(term)){
				let element = '';
				element+='<div class=\"col-sm-1 gif-term-column\">';
				element+='<button type="submit" class=\"btn btn-default gif-term-button\" search-term=\"' + term +'\">' + term + '</button>';
				element+='</div>';

				this.gifTerms.push(term);
				this.gifTermContainer.append(element);

			}
			

		},

		createDefaultGifButtons : function(){
			const pageHandler = this;

			pageHandler.defaultGifTerms.map(function(term){

				pageHandler.createGifButton(term);

			});
		},

		clearGifRowContainer : function(){

			this.gifRowContainer.empty();
		},
		clearTermContainer : function(){
			this.gifTermContainer.empty();
		},
		gifRowContainer : $('.row-image-container'),
		gifTermContainer : $('.term-container'),
		defaultGifTerms : ['cats','dogs','walrus','pokemon','sloth','star wars'],
		gifTerms : [],

	}

	PageHandler.createDefaultGifButtons();
	

	return PageHandler;
}


function createGif(/*title,*/rating, stillGif,animatedGif){

	const Gif = {

		//title:title,
		rating:rating,
		stillGif:stillGif,
		animatedGif:animatedGif,
	}
	return Gif;

}


function createSearch(term, limit){

	const Search = {
		queryURL : function(){
			let endpointURL = this.endpointURL;
			endpointURL +='api_key=' + this.apiKey + '&';
			endpointURL +='q=' + term + '&';
			endpointURL +='limit=' + limit;

			return endpointURL;
		},


		getResults : function(pageHandler){
			const gifResults = [];

			$.ajax({
	        	url: this.queryURL(),
	        	method: "GET",
	        	//the following is needed because of some security issues. I guess the api loads images/script from non-https source
	        	//chrome doesnt like that
	        	crossDomain: true,
	        	xhrFields: {
       				withCredentials: false,
       				'Access-Control-Allow-Origin': '*',
    			}
    			
	      	}).done(function(response){

	      		response.data.map(function(gif){
	      			gifResults.push(createGif(
	      				/*gif.title,*/
	      				gif.rating,
	      				gif.images.fixed_height_still.url,
	      				gif.images.fixed_height.url));});

	      		gifResults.map(function(gif){pageHandler.createGifContainer(gif)});
	      		 
	      	});    	
	    },
	    //i'm aware that people can use this key...it's just for fun
	    endpointURL : 'https://api.giphy.com/v1/gifs/search?',
		apiKey : 'Xf7PPUM1XuuApnCxWAbDigorZErENhef',
		term : term,
		limit : limit,
    
	}

	return Search;
}


$(document).ready(function(){

	const pageHandler = createPageHandler();

	$(document).on('click', '.search-button', function(){
		pageHandler.clearGifRowContainer();

		const searchInput = $('.search-input').val();
		const search = createSearch(searchInput,9);
		pageHandler.createGifButton(searchInput);
		search.getResults(pageHandler);

	});

	$(document).on('click', '.gif-term-button', function(){
		pageHandler.clearGifRowContainer();

		const searchInput = $(this).attr('search-term');
		const search = createSearch(searchInput,9);
		search.getResults(pageHandler);

	});

	$(document).on('click', 'img', function(){

		const isPlaying = $(this).attr('is-playing');

		if(isPlaying === 'false'){

			$(this).attr('src', $(this).attr('animated-gif'));
			$(this).attr('is-playing', 'true');
		}
		else if(isPlaying === 'true'){
			$(this).attr('src', $(this).attr('still-gif'));
			$(this).attr('is-playing', 'false');
		}


	});
	
});