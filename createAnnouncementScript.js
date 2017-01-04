function createAnnouncement(){
	// Getting the info from the forms
	var name = $("#createAnnouncementNameField").val();
	var content = $("#createAnnouncementContentField").val();
	var date = moment().format("YYYY-MM-DD");


	var announcementId = name.replace(/\s/g, '') + "%" + date + "%" + content.substr(0,7);

	var database = firebase.database();
	database.ref("announcements/" + announcementId).set({
		author: name,
		date: date,
		content: content
	});

	$(location).attr('href', "home.html")

}

$(document).ready(function(){

	$("#createAnnouncementSubmitButton").click(createAnnouncement);

})