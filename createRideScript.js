function createRide(){
	// Getting the info from the forms
	var name = $("#createRideNameField").val();
	var date = $("#createRideDateField").val();
	// var time = $("#createRideTimeField").val().replace(/\s/g, '').replace("PM", " PM").replace("AM", " AM");
	var time = $("#createRideTimeField").val();
	console.log(name);
	console.log(date);
	console.log(time);

	var rideId = name.replace(/\s/g, '') + "&" + date.replace(/\s/g, '') + "&" + time.replace(/\s/g, '');
	console.log(rideId);

	var database = firebase.database();
	database.ref("rides/" + rideId).set({
		host: name,
		time: time,
		date: date
	}, function() {
		$(location).attr('href', "home.html");
	});
}

$(document).ready(function(){

	$("#createRideDateField").flatpickr({
		enableTime: false
	}); 

	// $("#createRideTimeField").flatpickr({
	// 	enableTime: true,
	// 	noCalendar: true
	// })

	// $('.timepicker').wickedpicker({
	// 	title: "Select a Time",
	// 	minutesInterval: 1,
	// });

	$("#createRideSubmitButton").click(createRide);

})