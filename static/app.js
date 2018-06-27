function select_twitterData() {
    //select twitter data and highlight the button blue
    change_twitter_color();
    remove_finance_dash();

    document.getElementById("twitter_options").innerHTML = '<div class="box-background box-padding"><form><label for="eventSelect">Select Twitter Data Visualization</label><select id="eventSelect" onchange="selectViz(this.value)">\
    <option value="viz1" selected>Visual 1</option><option value="viz2">Visual 2</option><option value="viz3">Visual 3</option></select></form></div>'

}

function select_financeData() {
    //select financial data and highlight the button blue
    change_finance_color();
    remove_twitter_dash();
    document.getElementById("finance_options").innerHTML =     '<div class="box-background box-padding"><label for="eventSelect">Select Event:</label><select id="eventSelect" onchange="selectEvent(this.value)">\
    <option value="cancel" selected>Trump Cancels North Korea Summit</option><option value="reon">Trump Reopens North Korea Summit</option><option value="summitday">Day of The North Korea Summit</option>\
    </select></div><div class="box-background box-padding"><label for="sourceSelect">Select Dataset:</label><select id="dataSelect" onchange="selectData(this.value)">\
    <option value="dataset1" selected>DOW</option><option value="dataset2">S&P 500</option>\
    </select></div>';
    

// ***********TESTING HTML*****************
// '<div class="box-background box-padding">\
// <form name="myForm" action="" onsubmit="return selectFinancePlot()">Select Event:\
//     <select id="event" name="event">\
//         <option value="cancel" selected>Trump Cancels North Korea Summit</option>\
//         <option value="reon">Trump Reopens North Korea Summit</option>\
//         <option value="summitday">Day of The North Korea Summit</option>\
//     </select>\
//     Select Dataset:\
//     <select id="dataset" name="dataset">\
//         <option value="dataset1">DOW</option>\
//         <option value="dataset2">S&P 500</option>\
//     </select>\
//     <input type="submit" value="submit">\
// </form>\
// </div>'
}

function change_twitter_color() {
    document.getElementById("twitterButton").style.background = "blue";
    document.getElementById("financeButton").style.background = "red";
}

function change_finance_color() {
    document.getElementById("financeButton").style.background = "blue";
    document.getElementById("twitterButton").style.background = "red";
}

function remove_twitter_dash() {
    var myNode = document.getElementById("twitter_options");
    while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild)
    }
    remove_plotSpace();
}

function remove_finance_dash() {
    var myNode = document.getElementById("finance_options")
    while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild)
    }
    remove_plotSpace();
}

function remove_plotSpace() {
    var plotspace = document.getElementById("plotSpace");
    while(plotspace.firstChild) {
        plotspace.removeChild(plotspace.firstChild)
    }
}

// SELECT THE EVENT FOR THE FINANCE PLOTS **********TESTING**********
// function selectFinancePlot() {
//     var event = document.forms["myForm"]["event"].value;
//     var dataset = document.forms["myForm"]["dataset"].value;
//     switch(event){
//         case "cancel":
//             //Add the date range for event one here
//             console.log("Summit Cancelled selected");
//             break;
//         case "reon":
//             //Add the date range for event two here
//             console.log("Summit ReOn selected");
//             break;
//         case "summitday":
//             console.log("Day of the summit selected")
//     }
//     switch(dataset){
//         case "dataset1":
//             //Add the dataset for the DOW plot here
//             console.log("dataset 1 selected");
//             break;
//         case "dataset2":
//             //Add the dataset for the NASDAQ plot here
//             console.log("dataset 2 selected");
//             break;
//     }
// }

// SELECT THE DATES FOR THE FINANCE PLOTS: 
function selectEvent(event){
    switch(event){
        case "cancel":
            //Add the date range for event one here
            console.log("Summit Cancelled selected");
            break;
        case "reon":
            //Add the date range for event two here
            console.log("Summit ReOn selected");
            break;
        case "summitday":
            console.log("Day of the summit selected")
    }
}
// SELECT THE DATASET FOR THE FINANCE PLOT:
function selectData(dataset){
    switch(dataset){
        case "dataset1":
            //Add the dataset for the DOW plot here
            console.log("dataset 1 selected");
            break;
        case "dataset2":
            //Add the dataset for the NASDAQ plot here
            console.log("dataset 2 selected");
            break;
    }
}

// SELECT VISUALIZATION FOR THE TWITTER PLOT
function selectViz(viz){
    switch(viz){
        case "viz1":
            console.log("vis 1 selected")
        
            break;
        case "viz2":
            console.log("viz 2 selected")
            
            break;
        case "viz3":
            console.log("viz 3 selected")
            
            break;

    }
}
function createPlots(){

}