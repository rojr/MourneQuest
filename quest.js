$(document).ready(function(){
	/*
		Global variables
	*/
	var clues = [];
	var markers = [];
	var answers = [];
	
	/*
		Down here is the generating of clues and all that stuff
	*/
	clues[0] = {id: 0, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	
	
	clues[3] = {id: 3, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[4] = {id: 4, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[5] = {id: 5, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[6] = {id: 6, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[7] = {id: 7, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[8] = {id: 8, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[9] = {id: 9, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};

	clues[1] = {id: 1, name:"Bucket of Treasure", done:false, description:"The bucket is somewhere, but can you find it and find out what is inside?!", latlng: [13.9234, -56.25]};
	clues[2] = {id: 2, name:"Sea of the undead", done: false, description: "The sea of the undead hasn't been visited in over 200 years, will you be the first to see what's inside?", latlng: [-8.40717, 81.5625]};

	function submit(input,index){
		for(var	i = 0; i < answers.length; i++ ){
			if(answers[i].clue == index){
				answers[i].answer = input;
				alert("submitted");
				return;
			}
		}
		clues[index].done = true;
		answers.push({answer: input, clue: index, id: answers.length});
		alert(clues[index].done);
		$("#clueList #" + index).attr("data-theme", "a");
		updateColors(index);
	}
	
	for(var i = 0; i < clues.length; i++){
		generateClues(clues[i], i);
		generateCluesList(clues[i], i);
	}

	function generateClues(clues, index){
		append("body", "<div id=\"clue"+index+"\" data-role=\"page\"></div>");
		append("#clue"+index, "<div id=\"content\" align=\"center\"></div>");
		append("#clue"+index+" #content", "<div data-role=\"header\" data-position=\"fixed\" id=\"head\"></div>");
		append("#clue"+index+" #content #head","<h1>"+clues.name+"</h1>");
		append("#clue"+index+ " #content", "<div id=\"title\"></div>");
		append("#clue"+index+" #content #title", "<img src=\"place.png\"> </img>");
		append("#clue"+index+" #content #title", "<h2>"+clues.name+"</h2>");
		append("#clue"+index+ " #content", "<p>"+clues.description+"</p>");
		append("#clue"+index+ " #content #head", "<a href=\"#clues\" data-icon=\"arrow-l\" data-role=\"button\">Back</a>");
	 	
		append("#clue"+index+" #content", "<input type=\"text\" name=\"text-basic\" id=\"text-basic\" value=\"Enter your answer here!\">");
		append("#clue"+index+" #content","<div id=\"submit-answer\"data-role=\"controlgroup\" data-type=\"horizontal\" data-mini=\"true\">");
		append("#clue"+index+" #content", "<input type=\"button\" value=\"Submit\" id=\"submitButton"+index+"\" data-theme=\"b\">");
		
		$("#clue" +index+" #content #text-basic").click(function(e){
			$("#clue" +index+" #content #text-basic").val("");
		});
	
			
		$("#submitButton" +index).click(function(){
			var value = $("#clue"+index+" #content #text-basic").val();
			submit(value, index);
		});
		$("#back" + index).click(function(){
			window.history.back();
		});
	}

	function answerQuestion(question, answer){
		clues[question].done = true;
		answers.push(aswer);
	}

	function generateCluesList(clues, index){
		append("#clueList ", "<a href=\"body #clue"+index+"\" data-theme=\"\" id=\""+index+"\" data-role=\"button\">"+clues.name+"</a> </li>");
		updateColors(index);
	}
	function updateColors(index){
		if(clues[index].done){
			$("#clueList #" + index).attr("data-theme", "a");
		}else{
			$("#clueList #" + index).attr("data-theme", "c");
		}
	}
	
	function append(to, args){
		$(to).append(args);
	}
	
	$("#back").click(function(){
		window.history.back();
	});
	
	
	/*
		Initializing leaflet.js
	*/
	var map = L.map('map', {
		center: [0,0],
		zoom: 0
	});
	var id = 0;	
	map.on('click', function(e) {
		id++;
		$(".text").append("<p>click["+id+"] = "+e.latlng.toString()+"</p>");
	});
	
	var imageUrl = '/Map.png',
    imageBounds = [[28.30438, -108.28125], [-84.40594, 75.9375]];
	L.imageOverlay(imageUrl, imageBounds).addTo(map);
	
	/*L.tileLayer('HighResCat/{z}/{x}/{y}.jpg', {
            minZoom: 0,
            maxZoom: 6,
            attribution: 'ESO/INAF-VST/OmegaCAM',
            tms: true,
			noWrap: true
        }).addTo(map);*/

	for(var i = 0; i < clues.length; i++){
		var marker = L.marker(clues[i].latlng,{title: clues[i].name, riseOnHover: true }).addTo(map);
		addClueMarker(marker, i);
		markers.push(marker);
	}
	
	function addClueMarker(marker, route){
		marker.on('click', function(){
			location.href = "#clue"+route;
		});
	}
});
