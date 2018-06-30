function select_twitterData() {
    //select twitter data and highlight the button blue
    change_twitter_color();
    remove_options();
    remove_plotSpace();
    create_chubby_chart();
    create_chubby_chart2();
    cwc_may();
    cwc_june();
}

function select_financeData() {
    //select financial data and highlight the button blue
    change_finance_color();
    remove_plotSpace();
    create_finance_Plot2();

    document.getElementById("finance_options").innerHTML = "<div class='box-background box-padding'><label for='Select Stock:'</label><select id='dataselect' class='finSelect' onchange='initialize_finance(this.value)'></select></div>"

    Plotly.d3.json('/tickers', function(error, tickers){
        if (error) throw error;
        for (var i = 0; i < tickers.length; i++) {
            d3.select("#dataselect").append("option").attr("value", `${tickers[i]}`).text(`${tickers[i]}`)
        }
    })
    //create_finance_Plot1();
    
}


function change_twitter_color() {
    //document.getElementById("twitterButton").style.background = "blue";
    //document.getElementById("financeButton").style.background = "red";
}

function change_finance_color() {
    //document.getElementById("financeButton").style.background = "blue";
    //document.getElementById("twitterButton").style.background = "red";
}

function remove_plotSpace() {
    var plotspace1 = document.getElementById("plotSpace1");
    var plotspace2 = document.getElementById("plotSpace2");
    var plotspace2_5 = document.getElementById("plotSpace2_5");
    var plotspace3 = document.getElementById("plotSpace3");
    var plotspace4 = document.getElementById("plotSpace4");
    var plotspace4_5 = document.getElementById("plotSpace4_5");
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
    if (plotspace2_5.firstChild) {
        while(plotspace2_5.firstChild) {
            plotspace2_5.removeChild(plotspace2_5.firstChild)
        }
    };
    if (plotspace3.firstChild) {
        while(plotspace3.firstChild) {
            plotspace3.removeChild(plotspace3.firstChild)
        }
    };
    if (plotspace4.firstChild) {
        while(plotspace4.firstChild) {
            plotspace4.removeChild(plotspace4.firstChild)
        }
    };
    if (plotspace4_5.firstChild) {
        while(plotspace4_5.firstChild) {
            plotspace4_5.removeChild(plotspace4_5.firstChild)
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
    
}



function create_finance_Plot1(select) {
    //console.log(select)
    //define dataset as dictionary with 3 options so plotly can select between them
    Plotly.d3.json(`/stocks/${select}`, function(error, response) {
        if (error) throw error;
        // console.log(response[0])
        // console.log(response[0][0])
        // console.log(response[0][1])
        var date = [];
        var event = [];
        var open =[];
        var high =[];
        var low =[];
        var close =[];

        for (var i = 0; i <= 29; i++){
            //console.log(response[i][1]);
            //console.log(response[i]);
            date.push(response[i][1]);
            event.push(response[i][3]);
            open.push(response[i][4]);
            high.push(response[i][5]);
            low.push(response[i][6]);
            close.push(response[i][7]);         
        }
        //console.log(date)
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
       data = [trace1]
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
               rangeslider: {range:['2018-05-15','2018-06-26']},
               title: 'Date',
               type: 'date'
           },
           yaxis: {
               autorange: false,
               domain: [0,1],
               range: [low[1]/1.125, high[1]*1.15],
               type: 'linear' 
           },
           title: `${select} stock data for May 15th to June 26th`
       }
       Plotly.newPlot('plotSpace1', data, layout);
    });

}

function create_finance_Plot2() {
    document.getElementById("plotSpace3").innerHTML = "<br/><br/><br/><br/><br/><br/><hr style='width: 100%; color: #192e72; height:3px; background-color: rgb(54,54,54); padding: 5px;' /><br/><br/><iframe src='https://plot.ly/~bjaikaran/14.embed' style='height:800px;width:90%;border:0px;'></iframe>"
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

    Plotly.d3.json(`/hashtags`, function(error, response) {
        if (error) throw error;
        var tweets = []
        var labels = []

        for (var i = 0; i <= 15; i++){
            tweets.push(response[i][2]);
            labels.push(response[i][1]);
        }
        console.log(tweets);

        var data = [{
            values: tweets,
            labels: labels,
            type: 'pie'
        }]

        var layout = {
            title: 'Twitter hashtags from May 15th to June 26th'
        }    
        Plotly.newPlot('plotSpace3', data, layout)
    });
}

function create_chubby_chart2(){
    var data = [{
        values: [1.1, 8.1, 57.7, 31.3, 1.7],
        labels: ["Very negative",  "Negative", "Neutral", "Positive", "Very positive"],
        domain: {
          x: [0, .48]
        },
        name: 'Tweets',
        hoverinfo: 'label+percent+name',
        hole: .7,
        type: 'pie'
      }];
      
      var layout = {
        title: 'Tweet Sentiment When Trump Cancels the North Korean Summit',
        annotations: [
          {
            font: {
              size: 14
            },
            showarrow: false,
            text: '',
            x: 0.5,
            y: 0.5
          }
        ]
      };
      
      Plotly.newPlot('plotSpace2', data, layout);
      
      
      //Pie chart for June 12 through June 14 tweet sentiment
      var data2 = [{
        values: [2.5, 9.4, 56.7, 26.9, 4.5],
        labels: ["Very negative",  "Negative", "Neutral", "Positive", "Very positive"],
        domain: {
          x: [0, .48]
        },
        name: 'Tweets',
        hoverinfo: 'label+percent+name',
        hole: .7,
        type: 'pie'
      }];
      
      var layout2 = {
        title: 'Tweet Sentiment During the North Korean Summit',
        annotations: [
          {
            font: {
              size: 14
            },
            showarrow: false,
            text: '',
            x: 0.5,
            y: 0.5
          }
        ]
      };
      
      Plotly.newPlot('plotSpace2_5', data2, layout2);      
}

function cwc_may(){
    var data = [{
        values: [73689, 29124, 27597, 21744, 20829, 19487, 17805, 17151, 16380, 16329],
        labels: ['north_korea', 'president', 'focused', 'he', 'trump', 'nuclear', 'kim', 'trade', 'i', 'deals'],
        type: 'pie',
        name: 'Top-Ten Word Count May 30, 2018' }];
    
    var layout = {title: 'Top-Ten Word Count in Tweets - May 30, 2018'};

    Plotly.newPlot('plotSpace4', data, layout);
}

function cwc_june(){
    var data2 = [{
        values: [3218, 1240, 1235, 972, 832, 776, 733, 681, 625, 573],
        labels: ['dprk', 'trump', 'us', 'peace', 'president', 'iran', 'deal', 'nukes', 'money', 'obama'],
        type: 'pie',
        name: 'Top-Ten Word Count in Tweets - July 12, 2018' }];
    
    var layout2 = {title: 'Top-Ten Word Count in Tweets - June 12, 2018'};

    Plotly.newPlot('plotSpace4_5', data2, layout2);
}
