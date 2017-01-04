
function createAnnouncement(){
	// Getting the info from the forms
	var name = $("#createAnnouncementNameField").val();
	var content = $("#createAnnouncementContentField").val();
	var date = moment().format("YYYY-MM-DD");
	var title = $("#createAnnouncementTitleField").val();

	var database = firebase.database();
	var announcementId = name.replace(/\s/g, '') + "&" + date + "&" + title.substr(0,7).replace(/\s/g, '');
	database.ref("announcements/" + announcementId).set({
		author: name,
		date: date,
		title: title,
		content: content
	}, function() {
		$(location).attr('href', "home.html");
	});
}

$(document).ready(function(){
	$("#createAnnouncementSubmitButton").click(createAnnouncement);
})