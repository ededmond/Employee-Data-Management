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

//Compute total months worked
function totalMonths(startDate) {
    var convertedDate = moment(startDate, "MM/DD/YYYY")
    return totalMonths = -(convertedDate.diff(moment(), "months"))
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
        var newTDrole = $("<td>").text(snapshot.val().role);
        var newTDrate = $("<td>").text(snapshot.val().rate);
        var newTDstart_date = $("<td>").text(snapshot.val().start_date);
        
        //Grab start date and rate information to manipulate
        var start_date = snapshot.val().start_date;
        var rate = snapshot.val().rate;

        //Compute number of months work based off of start date and today
        var monthsWorked = totalMonths(start_date);

        //Compute total amount paid by numMonths * rate
        var totalPay = monthsWorked * parseInt(rate);

        //Create table elements for numMonths and total pay
        var newTDtotalPay = $("<td>").text(totalPay);
        var newTDmonthsWorked = $("<td>").text(monthsWorked);

        //Append elements to new table row then append the row to the table body
        newTR.append(newTDname, newTDrole, newTDstart_date, newTDmonthsWorked, newTDrate, newTDtotalPay);
        $("#employee-row").append(newTR)

    //Close database event listener
    });

// close doc ready function 
})





