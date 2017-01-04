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

function populateRides(){
	var database = firebase.database();
	var allRidesRef = database.ref("rides");

	var today = moment().format("YYYY-MM-DD");
	var tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
	var dayAfter = moment().add(2, "days").format("YYYY-MM-DD");
	var twoDaysAfter = moment().add(3, "days").format("YYYY-MM-DD");

	allRidesRef.once("value").then(function(snapshot){
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

function populateAnnouncements(){
	var database = firebase.database();
	var announcementsRef = database.ref("announcements");

	announcementsRef.once("value").then(function(snapshot){
		snapshot.forEach(function(childSnap){
			var data = childSnap.val();
			if (data.title != "foo") {
				$("#announcementContents").append("<span style='font-size:1.5em'><strong>" + data.title + "</strong></span><br><span style='color:darkgray'>" + data.author + " | " + data.date + "</span><br>" + data.content + "<br><br>");
			}
		})
	})
}

$(document).ready(function(){
	setRideDayLabels();
	populateRides();
	populateAnnouncements();
})