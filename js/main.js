/*jslint browser:true */
"use strict";

function addMonths(elem) {
    var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    var months = document.getElementById(elem).getElementsByTagName('input');
    console.log(months);

    for (i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    } //end loop
    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;
} //end of function

function sunHours() {
    var hrs;
    var theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;
    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    } //end switch
    return hrs;
} //end Function sunHours

function calculatePanel() {
    var userChoice = document.forms.solarForm.panel.selectedIndex;
    var panelOptions = document.forms.solarForm.panel.options;
    var power = panelOptions[userChoice].value;
    var name = panelOptions[userChoice].text;
    var x = [power, name];
    return x;
} // End Function

function calculateSolar() {
    var dailyUseKw = addMonths('mpc');
    console.log(dailyUseKw);

    var sunHoursPerDay = sunHours();
    console.log(sunHoursPerDay);

    var minKwNeeds = dailyUseKw / sunHoursPerDay;
    console.log(minKwNeeds);

    var realKWNeeds = minKwNeeds * 1.25;
    console.log(realKWNeeds);

    var realWattNeeds = realKWNeeds * 1000;
    console.log(realWattNeeds);

    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];
    console.log(panelOutput);
    console.log(panelName);

    var panelsNeeded = realWattNeeds / panelOutput;
    console.log(panelsNeeded);

    // New Feature: Energy Savings Calculation
    var electricityRate = 0.13; // Average electricity rate in USD per kWh
    var annualSavings = dailyUseKw * 365 * electricityRate;
    console.log(annualSavings);

    // New Feature: Environmental Impact
    var co2Reduction = dailyUseKw * 365 * 0.92; // Average CO2 reduction in kg per kWh
    console.log(co2Reduction);

    let feedback =
        `<p>Based on your average daily use of ${dailyUseKw} Kwh, you will need to purchase ${Math.ceil(panelsNeeded)} ${panelName} solar panels to offset 100% of your electricity bill.</p>` +
        `<h2>Additional Details</h2>` +
        `<p>Your average daily electricity consumption: ${dailyUseKw} Kwh per day.</p>` +
        `<p>Average sunshine hours per day: ${sunHoursPerDay} hours</p>` +
        `<p>Realistic watts needed per hour: ${realWattNeeds} watts/hour.</p>` +
        `<p>The ${panelName} panel you selected generates about ${panelOutput} watts per hour.</p>` +
        `<h2>Energy Savings</h2>` +
        `<p>Estimated annual savings: $${annualSavings.toFixed(2)}</p>` +
        `<h2>Environmental Impact</h2>` +
        `<p>Estimated annual CO2 reduction: ${co2Reduction.toFixed(2)} kg</p>`;

    // Update the DOM with the feedback
    document.getElementById('feedback').innerHTML = feedback;
}
