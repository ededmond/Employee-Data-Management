// Initialize Firebase
var config = {
apiKey: "AIzaSyCVonF7CLfBq7JzkbwBDndqrrOoykjR-0E",
authDomain: "timesheet-742ad.firebaseapp.com",
databaseURL: "https://timesheet-742ad.firebaseio.com",
projectId: "timesheet-742ad",
storageBucket: "",
messagingSenderId: "30282190889"
};
firebase.initializeApp(config);


// On click of submit button, grab input from the forms, assign to variable names, set the variables in the database,
// append variable names to html table

var database = firebase.database();

var name = "";
var role = "";
var rate = "";
var start_date = "";

// commit resetVals function to memory
function resetVals() {
    $("#input-name").val("");
    $("#input-role").val("");
    $("#input-monthly-rate").val("");
    $("#input-start-date").val("");
}

$(document).ready(function(){

    $("form").submit(function(event){
        console.log('got here');
    // prevents the page from executing a full refresh on the click of the submission
    event.preventDefault();

    // Assigin the user input values to the name, role rate, start_date variables
    name = $("#input-name").val(); 
    role = $("#input-role").val(); 
    rate = $("#input-monthly-rate").val(); 
    start_date = $("#input-start-date").val(); 

        // establish variables in database
        database.ref().add({
            name: name,
            role: role,
            rate: rate,
            start_date: start_date
        });

    // Close on submit function
    })

// create event listener for when a child is added to the database via a user form submission
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot);

    var newTR = $("<tr>");
    var newTDname = $("<td>").text(snapshot.val().name);
    











// close doc ready function 
})





