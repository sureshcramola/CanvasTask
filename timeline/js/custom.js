const startTime = 1516496636793 // when the event start in unix epoch time
acceptedTubeins =  [
    [
        {
            startTime: 646, // you need this one
            track: 2, // you need this one
            filled: true, // if it is filled get the user image from
            // "https://s3.amazonaws.com/multitube-users-assets/"+userID+/"profile.jpeg"
            fullname: "Salah Faroughi",
            userID: "5a45b89786971e00040a270d",
        },
        {
            startTime: 850,
            track: 1,
            icon: "female-user.jpeg",
            filled: false // // if it is not filled get the placeholder image from
            // "https://s3.amazonaws.com/multitube-brand-assets/"+icon
        }
    ],
    [
        {
            startTime: 1600,
            track: 4,
            icon: "female-user.jpeg",
            filled: false
        }
    ]
]

// blocks
tubeinBlocks =  [
    {
        blockStarts: 600,
        blockEnds: 1200
    },
    {
        blockStarts: 1500,
        blockEnds: 3300
    }
]

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat= position.coords.latitude;
    long= position.coords.longitude;
    initMap(lat,long);
}

function initMap(latitude,longitude) {
	var location;
	console.log(latitude)
	location = {lat: latitude, lng: longitude};
	

	
	
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 13,
	  center: location,
	  control:3,
	  align:1,
	  animation : google.maps.Animation.DROP
	});
	var marker = new google.maps.Marker({position: location, map: map})
}

function showError(error) {
	lat= 32.716529;
    lng= -117.16951799999998;
	initMap(lat,lng)
    switch(error.code) {
        case error.PERMISSION_DENIED:

            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}


$(document).ready(function(){
	getLocation();
	$( ".track1User" ).draggable({
		revert: "invalid",
		containment: ".timeWrap1",
		drag: function() {
			$('.timeWrap1 .userTimeInfo').css('left',$(this).position().left - 15);
			timelineCurrentTime1($(this).position().left)
		},
		stop: function(){
			$('.timeWrap1 .userTimeInfo').css('left',$(this).position().left - 15);
			timelineCurrentTime1($(this).position().left)
		},
	});

	$( ".track2User" ).draggable({
		revert: "invalid",
		containment: ".timeWrap2",
		drag: function() {
			$('.timeWrap2 .userTimeInfo').css('left',$(this).position().left - 15);
			timelineCurrentTime2($(this).position().left)
		},
		stop: function(){
			$('.timeWrap2 .userTimeInfo').css('left',$(this).position().left - 15);
			timelineCurrentTime2($(this).position().left)
		},
	});

	$( ".timeLineTrack1" ).droppable({
		accept: '.track1User',
	});

	$( ".timeLineTrack2" ).droppable({
		accept: '.track2User',
	});

	$(document).on('click','.timeWrap1 .user',function(){
		$('.userTimeInfo').css('display','none');
		$('.timeWrap1 .userTimeInfo').css({
			'left':$(this).position().left - 15,
			'display':'inline-block'
		});

		timelineCurrentTime1($(this).position().left)
	})

	$(document).on('click','.timeWrap2 .user',function(){
		$('.userTimeInfo').css('display','none');
		$('.timeWrap2 .userTimeInfo').css({
			'left':$(this).position().left - 15,
			'display':'inline-block'
		});
		timelineCurrentTime2($(this).position().left)
	})

	timeLine1Minutes = getTimeLineMin1();
	timeLine2Minutes = getTimeLineMin2();
	minutesToTime1(timeLine1Minutes);
	minutesToTime2(timeLine2Minutes);
});

var block1PerMinute,block2PerMinute;

function getTimeLineMin1(){
  // StartTime for timeline1
  var startHours1 = $('.timeWrap1 .timeLine2 .startTime .timeTxt').text().split(':')[0];
  var startMinutes1 = $('.timeWrap1 .timeLine2 .startTime .timeTxt').text().split(':')[1];
  startHours1 = startHours1 * 60;
  var startTimeMin1 = parseInt(startHours1) + parseInt(startMinutes1);
  

  // StartTime for timeline2
  var startHours2 = $('.timeWrap1 .timeLine2 .endTime .timeTxt').text().split(':')[0];
  var startMinutes2 = $('.timeWrap1 .timeLine2 .endTime .timeTxt').text().split(':')[1];
  startHours2 = startHours2 * 60;
  var startTimeMin2 = parseInt(startHours2) + parseInt(startMinutes2);
  minutesTimeline1 = startTimeMin2 - startTimeMin1;

  return minutesTimeline1;
}

function getTimeLineMin2(){
  // StartTime for timeline1
  var startHours1 = $('.timeWrap2 .timeLine2 .startTime .timeTxt').text().split(':')[0];
  var startMinutes1 = $('.timeWrap2 .timeLine2 .startTime .timeTxt').text().split(':')[1];
  startHours1 = startHours1 * 60;
  var startTimeMin1 = parseInt(startHours1) + parseInt(startMinutes1);
  

  // StartTime for timeline2
  var startHours2 = $('.timeWrap2 .timeLine2 .endTime .timeTxt').text().split(':')[0];
  var startMinutes2 = $('.timeWrap2 .timeLine2 .endTime .timeTxt').text().split(':')[1];
  startHours2 = startHours2 * 60;
  var startTimeMin2 = parseInt(startHours2) + parseInt(startMinutes2);
  minutesTimeline1 = startTimeMin2 - startTimeMin1;

  return minutesTimeline1;
}



function minutesToTime1(minutes1){
	block1PerMinute=($('.timeWrap1 .timeLine2').width())/(minutes1+.6);
}

function minutesToTime2(minutes1){
	block2PerMinute=($('.timeWrap2 .timeLine2').width())/(minutes1+.6);
}

function timelineCurrentTime1(leftPos){
	currentTime =  leftPos;
	currentMin = currentTime/block1PerMinute;

	var startHours1 = $('.timeWrap1 .timeLine2 .startTime .timeTxt').text().split(':')[0];
  	var startMinutes1 = $('.timeWrap1 .timeLine2 .startTime .timeTxt').text().split(':')[1];
  	startHours1 = startHours1 * 60;
  	var startTimeMin1 = parseInt(startHours1) + parseInt(startMinutes1);

  	currentMin = startTimeMin1 + parseInt(currentMin);
	var hours = Math.floor(currentMin / 60);          
    var minutes = ((currentMin % 60) < 10? '0' : '') + (currentMin % 60);

    var ampm = hours >= 12 ? 'PM' : 'AM';
    $('.timeWrap1 .userTimeInfo .hoursVal').text(hours);
    $('.timeWrap1 .userTimeInfo .minVal').text(minutes);
    $('.timeWrap1 .userTimeInfo .meridianVal').text(ampm);
}

function timelineCurrentTime2(leftPos){
	currentTime =  leftPos;
	currentMin = currentTime/block2PerMinute;

	var startHours1 = $('.timeWrap2 .timeLine2 .startTime .timeTxt').text().split(':')[0];
  	var startMinutes1 = $('.timeWrap2 .timeLine2 .startTime .timeTxt').text().split(':')[1];
  	startHours1 = startHours1 * 60;
  	var startTimeMin1 = parseInt(startHours1) + parseInt(startMinutes1);

  	currentMin = startTimeMin1 + parseInt(currentMin);

	var hours = Math.floor(currentMin / 60);          
    var minutes = ((currentMin % 60) < 10? '0' : '') + (currentMin % 60);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    $('.timeWrap2 .userTimeInfo .hoursVal').text(hours);
    $('.timeWrap2 .userTimeInfo .minVal').text(minutes);
    $('.timeWrap2 .userTimeInfo .meridianVal').text(ampm);

}