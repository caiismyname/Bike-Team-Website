function createRide(){
	// Getting the info from the forms
	var name = $("#createRideNameField").val();
	var date = $("#dateTimePicker").data("DateTimePicker").date().format("YYYY-MM-DD");
	var time = $("#dateTimePicker").data("DateTimePicker").date().format("h:mm A");
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

	$(function() {
		$('#dateTimePicker').datetimepicker({
			inline: true,
			sideBySide: true
		});
	});

	$("#createRideSubmitButton").click(createRide);

})