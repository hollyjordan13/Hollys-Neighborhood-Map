window.onload=function() {
var catImgOne = document.getElementById('catOne');
var catImgTwo = document.getElementById('catTwo');
var clickCounterOne = document.getElementById('click_counter1');
clickCounterOne = 0;
var clickCounterTwo = document.getElementById('click_counter2');
clickCounterTwo = 0;

catImgOne.addEventListener('click', function() {
	clickCounterOne ++;
	document.getElementById('clicksone').innerHTML = clickCounterOne;
	clickCounterOne;
 	console.log(clickCounterOne);
 	console.log(clicksone);

});


catImgTwo.addEventListener('click', function() {
	clickCounterTwo ++;
	document.getElementById('clickstwo').innerHTML = clickCounterTwo;
	clickCounterTwo;
 	console.log(clickCounterTwo);

});
};