function setRideDayLabels() {
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

function populateRides() {
	var database = firebase.database();
	var allRidesRef = database.ref("rides");

	var today = moment().format("YYYY-MM-DD");
	var tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
	var dayAfter = moment().add(2, "days").format("YYYY-MM-DD");
	var twoDaysAfter = moment().add(3, "days").format("YYYY-MM-DD");

	var bikeTrackLat = "29.716015";
	var bikeTrackLong = "-95.411224";

	var secret = "21a9cf2760ec2731b94424cf2c1b1eb1";

	allRidesRef.once("value").then(function(snapshot){
		snapshot.forEach(function(childSnap){
			var data = childSnap.val();
			var date = data.date;
			var weatherRequestDateString = moment(date + " " + data.time, "YYYY-MM-DD h:mm A").format("YYYY-MM-DDTHH:mm:ss");
			console.log(weatherRequestDateString);

			// Getting weather data
			var request = new XMLHttpRequest();
			request.open("GET", "https://thingproxy.freeboard.io/fetch/https://api.darksky.net/forecast/" + secret + "/" + bikeTrackLat + "," + bikeTrackLong + "," + weatherRequestDateString + "?exclude=daily,alerts,flags", true);
			request.send();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					var response = JSON.parse(request.responseText);
					var weatherString = response.currently.icon + " | TEMP: " + response.currently.apparentTemperature + 
					" | RAIN: " + response.currently.precipProbability + "%";

					switch(date) {
						case today:
							$("#todayRides").append("<strong>" + data.host + ": " + data.time + "</strong>" + "<br>" + weatherString + "<br>");
							break;
						case tomorrow:
							$("#tomorrowRides").append("<strong>" + data.host + ": " + data.time + "</strong>" + "<br>" + weatherString + "<br>");
							break;
						case dayAfter:
							$("#dayAfterRides").append("<strong>" + data.host + ": " + data.time + "</strong>" + "<br>" + weatherString + "<br>");
							break;
						case twoDaysAfter:
							$("#twoDaysAfterRides").append("<strong>" + data.host + ": " + data.time + "</strong>" + "<br>" + weatherString + "<br>");
							break;
						case "foo":
							break;
						default:
							console.log('Unexpected Date');
							break;
					}

				}
			};
		});
	});
}

function populateAnnouncements() {
	var database = firebase.database();
	var announcementsRef = database.ref("announcements");

	announcementsRef.once("value").then(function(snapshot){
		snapshot.forEach(function(childSnap){
			var data = childSnap.val();
			if (data.title != "foo") {
				$("#announcementContents").append("<tr><td><span style='font-size:1.5em'><strong>" + data.title + "</strong></span>" + "  " + "<span>" 
					+ data.author + " | " + data.date + "</span><br>" + data.content + "</td></tr>");
				// Alternating row colors
				$("tr:even").css("background-color", "lightgray");
				$("td").css("padding", "10px");
			}
		})
	})
}

function populateWorkouts() {
	var database = firebase.database();
	var workoutsRef = database.ref("workouts");

	workoutsRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnap) {
			var data = childSnap.val();
			if (data.title != "foo") {
				$("#workoutContents").append("<tr><td><span style='font-size:1.5em'><strong>" + data.title + "</strong></span>" + "  " + "<span>" 
					+ data.weekOf + "</span><br>" + data.content + "</td></tr>");
				// Alternating row colors
				$("tr:even").css("background-color", "lightgray");
				$("td").css("padding", "10px 10px");
			}
		})
	})


}

$(document).ready(function() {
	setRideDayLabels();
	populateRides();
	populateWorkouts();
	populateAnnouncements();
})