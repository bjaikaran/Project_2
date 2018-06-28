function select_twitterData() {
    //select twitter data and highlight the button blue
    change_twitter_color();
    remove_plotSpace();
    create_twitter_plot();
}

function select_financeData() {
    //select financial data and highlight the button blue
    change_finance_color();
    remove_plotSpace();
    create_finance_Plot1();
    create_finance_Plot2();
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

function create_finance_Plot1(data) {
    var data = 12;//define dataset as dictionary with 3 options so plotly can select between them

    var layout = {
        title:'Trump Reschedules the Summit: Financial Data Trends',
        xaxis: {
            range: [startDate, endDate],
            type: "date"
        },
        yaxis: {
            autorange: true,
            type: "linear"
        }
    };
    Plotly.plot('plotspace1', data, layout, {
        updatemenus: [{
            y: 1,
            yanchor: 'top',
            buttons: [{
                method: 'restyle',
                args: ['visible', [true, false, false]],
                label: 'Dow Jones Industrial Average'
            }, {
                method: 'restyle',
                args: ['visible', [false, true, false]],
                label: 'Standards and Poors'
            }, {
                method: 'restyle',
                args: ['visible', [false, false, true]],
                label: 'Euro Equities Exchange'
            }]
        }],
    });
}

function create_finance_Plot2(data) {
    var data = 2;//define dataset as dictionary with 3 options so plotly can select between them

    var layout = {
        title:'Trump Reschedules the Summit: Financial Data Trends',
        xaxis: {
            range: [startDate, endDate],
            type: "date"
        },
        yaxis: {
            autorange: true,
            type: "linear"
        }
    };
    Plotly.plot('plotspace2', data, layout, {
        updatemenus: [{
            y: 1,
            yanchor: 'top',
            buttons: [{
                method: 'restyle',
                args: ['visible', [true, false, false]],
                label: 'Dow Jones Industrial Average'
            }, {
                method: 'restyle',
                args: ['visible', [false, true, false]],
                label: 'Standards and Poors'
            }, {
                method: 'restyle',
                args: ['visible', [false, false, true]],
                label: 'Euro Equities Exchange'
            }]
        }],
    });
}

function create_twitter_plot() {

}
//Plotly.d3.select("#submit").on("click", handleSubmit);