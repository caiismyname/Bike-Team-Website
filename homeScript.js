function setRideDayLabels(){
	var dayAfterName = moment().add(2, 'days').format("dddd");
	var twoDaysAfterName = moment().add(3, 'days').format("dddd");

	$("#dayAfterName").text(dayAfterName);
	$("#twoDaysAfterName").text(twoDaysAfterName);
}

class Ride {
	constructor(host, date, time) {
		this.host = host;
		this.date = date;
		this.time = time;
	}
}

function removeRide(ride){
	firebase.database().ref("rides/" + ride).remove();
}

function populateRides(){
	var database = firebase.database();
	var allRidesRef = database.ref("rides");

	var today = moment().format("YYYY-MM-DD");
	var tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
	var dayAfter = moment().add(2, "days").format("YYYY-MM-DD");
	var twoDaysAfter = moment().add(3, "days").format("YYYY-MM-DD");

	allRidesRef.on("value", function(snapshot){
		snapshot.forEach(function(childSnap){
			var data = childSnap.val();
			var date = data.date;

			switch(date) {
				case today:
					$("#todayRides").append(data.host + ": " + data.time + "<br>");
					break;
				case tomorrow:
					$("#tomorrowRides").append(data.host + ": " + data.time + "<br>");
					break;
				case dayAfter:
					$("#dayAfterRides").append(data.host + ": " + data.time + "<br>");
					break;
				case twoDaysAfter:
					$("#twoDaysAfterRides").append(data.host + ": " + data.time + "<br>");
					break;
				case "foo":
					break;
				default:
					console.log('Unexpected Date');
					break;
			}
		});
	});


}

$(document).ready(function(){
	setRideDayLabels();
	populateRides();
})