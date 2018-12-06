// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()


// Your code goes here!
//select color input
const color = document.querySelector('#colorPicker');
//set variables for height, width, canvas etc
const height = document.querySelector('#inputHeight');
const width = document.querySelector('#inputWidth');
const sizePicker = document.querySelector('#sizePicker');
const canvas = document.querySelector('#pixelCanvas');
//allows changes to input values


//makeGrid function
function makeGrid() {
	//clear old grid first
	canvas.innerHTML = '';
	let tr, td;
	//create table: (for loop runs from inside, then outside. create td, 
	//append to tr; create tr, tr to table(canvas)
	
	for(let r = 0; r < height.value; r++) {
	tr = document.createElement('tr');
	canvas.appendChild(tr);
	for (let c = 0; c < width.value; c++) {
		td = document.createElement('td');
		tr.appendChild(td);
	}
}

canvas.addEventListener('click', function(e) {
	e.preventDefault();
	if (e.target.nodeName === 'TD') {
		e.target.style.backgroundColor = color.value;
	}
})
}

sizePicker.addEventListener('submit', function(e) {
	e.preventDefault();
	makeGrid();
})