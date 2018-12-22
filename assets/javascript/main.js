 // Initialize Firebase

 $(document).ready(function() {

  $.backstretch("assets/images/hogwarts.jpg");

 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyBg6JuiAKTGtsDCC-9l6W_yAbBPJ-F3byU",
   authDomain: "traintimes-4de46.firebaseapp.com",
   databaseURL: "https://traintimes-4de46.firebaseio.com",
   projectId: "traintimes-4de46",
   storageBucket: "traintimes-4de46.appspot.com",
   messagingSenderId: "893312226748"
 };
    
    firebase.initializeApp(config);
  // Create a variable to reference the database

var database = firebase.database();

    // //initlalize variables
    // ;
    // var nextarrival ="";
    // var minutesaway ="";

     // Capture Button Click
     $("#add-train-btn").on("click", function() {
        // // Don't refresh the page!
        // event.preventDefault();


    // taking user input and putting into vars

     var trainname = $("#train-name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firsttrain = $("#firstTrain-input").val().trim();
    var frequency = $("#freq-input").val().trim();

    

    //creates object we hold the data in
    var newTrain = {
        name: trainname,
        destination: destination,
        start: firsttrain,
        frequency: frequency
    };

     // Uploads train data to the databases
     database.ref().push(newTrain);

     
	console.log(newTrain.name);
	console.log(newTrain.dest);
	console.log(newTrain.first);
	console.log(newTrain.freq);


     // Alert
        alert("Train successfully added");

   // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
    });

    // });
        //     trainname: trainname,
        //     destination: destination,
        //     frequency: frequency,
        //     nextarrival: nextarrival,
        //     minutesaway: minutesaway
        // })
        // https://firebase.google.com/docs/database/admin/retrieve-data this is where you can find out how to "If you want to retrieve only the data on each new post added to your blogging app, you could use child_added:"
     // Firebase watcher + initial loader HINT: .on("value")

     database.ref().on("child_added",function(childSnapshot) {

        //we then create variables to store data in db

	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
      var trainFreq = childSnapshot.val().frequency;


      //First time
	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
      // Current time
	var currentTime = moment();
  console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));
  

      // Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

      	// Time apart (remainder)
	var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);
  
         // Mins until train
  var tMinutesTillTrain = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
          // Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest  + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

      
    //   // Create Error Handling
      
    //   function(errorobj) {
    //     console.log(errorobj.code);
    
     })
    
})