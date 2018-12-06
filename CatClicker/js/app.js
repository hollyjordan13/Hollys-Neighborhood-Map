/*=== Cats ===*/

var model = {
	currentCat: null,
	cats: [
	{
		clickCount: 0,
		name: 'Charlie',
		imgSrc: 'img/cat1.jpg',
		imgAttribution: 'https://www.flickr.com/photos/poplinre/625069434/in/photostream/'
	},

	{
		clickCount: 0,
		name: 'Mac',
		imgSrc: 'img/cat2.jpg',
		imgAttribution: 'https://www.istockphoto.com/ae/photos/silhouette-of-baby-cats?sort=mostpopular&mediatype=photography&phrase=silhouette%20of%20baby%20cats'
	},
	
	{
		clickCount: 0,
		name: 'Dee',
		imgSrc: 'img/cat3.jpg',
		imgAttribution: 'https://www.123rf.com/stock-photo/kitten.html'
	},

	{
		clickCount: 0,
		name: 'Frank',
		imgSrc: 'img/cat4.jpg',
		imgAttribution: 'https://www.colourbox.com/image/frightened-kitten-in-front-of-white-background-image-1727343'
	},

	{
		clickCount: 0,
		name: 'Dennis',
		imgSrc: 'img/cat5.jpg',
		imgAttribution: 'https://www.dreamstime.com/royalty-free-stock-photos-beautiful-cute-little-kitten-meowing-smiling-one-month-old-image31496658'
	}]
};

/*==== Octopus ====*/

var octopus = {

	init: function() {
		//set current cat to first cat on the list
		model.currentCat = model.cats[0];

		//tell our views to initialize
		catListView.init();
		catView.init();
	},

	//function to select current cat
	getCurrentCat: function() {
		return model.currentCat;
	},

	//function to select all cats
	getCats: function() {
		return model.cats;
	},

	//set the currently selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	//increments the counter for the currently selected cat
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	}
};

/*==== View ====*/

var catView = {

	init: function() {
		//store DOM elements
		this.catElem = document.getElementById('cat');
		this.catName = document.getElementById('cat-name');
		this.catImg = document.getElementById('cat_img');
		this.clickCount = document.getElementById('click-count');

		//increment cats counter when clicked	
		this.catImg.addEventListener('click', function(e) {
			octopus.incrementCounter();
		});

		//render this view (update DOM elements with new value)
		this.render();
	},

	render: function() {
		//update the DOM elements with values from current cat
		var currentCat = octopus.getCurrentCat();
		this.clickCount.textContent = currentCat.clickCount;
		this.catName.textContent = currentCat.name;
		this.catImg.src = currentCat.imgSrc;

	}
};

var catListView = {

	init: function() {
		//store the DOM element for easy access later
		this.catListElem = document.getElementById('cat-list');

		//render this view (update DOM elements with correct values)
		this.render();

	},

	render: function() {
		var cat, elem, i;
		//get the cats we'll be rendering from the octopus
		var cats = octopus.getCats();

		//empty the cat list
		this.catListElem.innerHTML = '';

		//loop over the cats
		for (i = 0; i < cats.length; i++) {
			//this is the cat we're currently looping over
			cat = cats[i];

			//make a new cat list item and set its text
			elem = document.createElement('li');
			elem.textContent = cat.name;

			//setCurrentCat and render catView on click
			//(this uses our closure in a loop trick to connect the value
			//of the cat variable to the click event function)
			elem.addEventListener('click', function(cat) {
				return function() {
					octopus.setCurrentCat(cat);
					catView.render();
				};
			})(cat);

			//finally, add the element to the list
			this.catListElem.appendChild(elem);
		};
	}
};

//make it go!
octopus.init();