function select_twitterData() {
    //select twitter data and highlight the button blue
    change_twitter_color();
    remove_options();
    remove_plotSpace();
    create_chubby_chart();


}

function select_financeData() {
    //select financial data and highlight the button blue
    change_finance_color();
    remove_plotSpace();
    create_finance_Plot1();
    //create_finance_Plot2();

    document.getElementById("finance_options").innerHTML = "<div class='box-background box-padding'><label for='Select Stock:'</label><select id='dataselect' onchange='initialize_finance(this.value)'></select></div>"

    Plotly.d3.json('/tickers', function(error, tickers){
        if (error) throw error;
        for (var i = 0; i < tickers.length; i++) {
            d3.select("#dataselect").append("option").attr("value", `${tickers[i]}`).text(`${tickers[i]}`)
        }
    })
}

function change_twitter_color() {
    document.getElementById("twitterButton").style.background = "blue";
    document.getElementById("financeButton").style.background = "red";
}

function change_finance_color() {
    document.getElementById("financeButton").style.background = "blue";
    document.getElementById("twitterButton").style.background = "red";
}

function remove_plotSpace() {
    var plotspace1 = document.getElementById("plotSpace1");
    var plotspace2 = document.getElementById("plotSpace2");
    if (plotspace1.firstChild) {
        while(plotspace1.firstChild) {
            plotspace1.removeChild(plotspace1.firstChild)
        }
    };
    if (plotspace2.firstChild) {
        while(plotspace2.firstChild) {
            plotspace2.removeChild(plotspace2.firstChild)
        }
    };
}

function remove_options() {
    var finance_options =document.getElementById("finance_options");
    if (finance_options.firstChild) {
        while(finance_options.firstChild) {
            finance_options.removeChild(finance_options.firstChild)
        }
    }

}

function initialize_finance(select) {
    create_finance_Plot1(select);
    create_finance_Plot2();
}



function create_finance_Plot1(select) {
    //define dataset as dictionary with 3 options so plotly can select between them
    Plotly.d3.json(`/stocks/${select}`, function(error, response) {
        if (error) throw error;

        var date = [];
        var symbol = [];
        var event = [];
        var open =[];
        var high =[];
        var low =[];
        var close =[];

        for (var i = 0; i <=210; i++){
            symbol.push(response[0][i]);
            date.push(response[1][i]);
            event.push(response[3][i]);
            open.push(response[4][i]);
            high.push(response[5][i]);
            low.push(response[6][i]);
            close.push(response[7][i]);
        }

       var trace1 = {
           x: date,
           close: close,
           decreasing: {line: {color: '#7F7F7F'}},
           high: high,
           increasing: {line: {color: '17BECF'}},
           line: {color: 'rgb(31,119,180,1)'},
           low: low,
           open: open,
           type: 'candlestick',
           xaxis: 'x',
           yaxis: 'y'
       };
       
       var data = [trace1];

       var layout = {
           dragmode: 'zoom',
           margin: {
               r: 10,
               t: 25,
               b: 40,
               l: 60
           },
           showlegend: false,
           xaxis: {
               autorange: true,
               domain: [0,1],
               range:['2018-05-15','2018-06-26'],
               title: 'Date',
               type: 'date'
           },
           yaxis: {
               autorange: false,
               domain: [0,1],
               range: [42, 266],
               type: 'linear' 
           }
       };

       Plotly.plot('plotSpace1', data, layout);
    })
}

function create_finance_Plot2(data) {

}

function create_chubby_chart() {
    var trace1 = {
        x: ['May 30 - June 1', 'June 12 - June 14'],
        y: [3022, 892],
        name: 'Very Negative',
        type: 'bar',
        width: [.5, .5]
      };
      
      var trace2 = {
        x: ['May 30 - June 1', 'June 12 - June 14'],
        y: [22387, 3363],
        name: 'Negative',
        type: 'bar',
        width: [.5, .5]
      };
      
      var trace3 = {
        x: ['May 30 - June 1', 'June 12 - June 14'],
        y: [3022, 892],
        name: 'Neutral',
        opacity: 0.5,
        type: 'bar',
        width: [.5, .5]
      };
      
      var trace4 = {
        x: ['May 30 - June 1', 'June 12 - June 14'],
        y: [158879, 20350],
        name: 'Positive',
        type: 'bar',
        width: [.5, .5]
      };
      
      var trace5 = {
        x: ['May 30 - June 1', 'June 12 - June 14'],
        y: [4600, 1629],
        name: 'Very Positive',
        type: 'bar',
        width: [.5, .5]
      };
      
      var data = [trace1, trace2, trace3, trace4, trace5];
      
      var layout = {
          title: "Volume of Tweets after Events",
          barmode: "stack"
      };
      
      Plotly.newPlot('plotSpace1', data, layout);
}
//Plotly.d3.select("#submit").on("click", handleSubmit);