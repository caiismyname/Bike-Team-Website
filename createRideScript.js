function createRide(){
	// Getting the info from the forms
	var name = $("#createRideNameField").val();
	var date = $("#createRideDateField").val();
	var time = $("#createRideTimeField").val().replace(/\s/g, '').replace("PM", " PM").replace("AM", " AM");
	console.log(name);
	console.log(date);
	console.log(time);

	var rideId = name.replace(/\s/g, '') + "%" + date.replace(/\s/g, '') + "%" + time.replace(/\s/g, '');

	var database = firebase.database();
	database.ref("rides/" + rideId).set({
		host: name,
		time: time,
		date: date
	});

	$(location).attr('href', "home.html")

}

$(document).ready(function(){

	$(".flatpickr").flatpickr({}); 

	$('.timepicker').wickedpicker({
		title: "Select a Time",
		minutesInterval: 1,
	});

	$("#createRideSubmitButton").click(createRide);

})