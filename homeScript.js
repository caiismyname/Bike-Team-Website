function setRideDayLabels(){
	var dayAfterName = moment().add(2, 'days').format("dddd");
	var twoDaysAfterName = moment().add(3, 'days').format("dddd");

	$("#dayAfterName").text(dayAfterName);
	$("#twoDaysAfterName").text(twoDaysAfterName);
}

function populateRides(){

}

$(document).ready(function(){
	setRideDayLabels();
})