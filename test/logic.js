// Require axios
var axios = require('axios');

// drug1 and drug2 are hard-coded for testing purposes, but will be extracted from the forms that the user fills out in the real app
var drug1 = "ibuprofen";
var drug2 = "zoloft";

// This array is initialized as empty but will be filled in with the symptoms that are common to both the user's age and gender
var symptoms = [];

// age and gender are hard-coded for testing purposes, but will also be extracted from forms just like drug1 and drug2
var age = 60;
var gender = "M";

// Query URL
var queryUrl = "https://www.ehealthme.com/api/v1/drug-interaction/" + drug1 + "/" + drug2 + "/";

// Keys
var ageKey;

// switch(true) {

//     case age < 2:
//       ageKey = '0-1';
//       break;

//     case age < 10:
//       ageKey = '2-9';
//       break;

//     case age < 20:
//       ageKey = '10-19';
//       break;

//     case age < 30:
//       ageKey = '20-29';
//       break;

//     case age < 40:
//       ageKey = '30-39';
//       break;

//     case age < 50:
//       ageKey = '40-49';
//       break;

//     case age < 60:
//       ageKey = '50-59';
//       break;

//     case (age > 59):
//       ageKey = '60+';
//       break;
// }

if (age === 0 || age === 1) {
    ageKey = '0-1';
} else if (age > 1 && age < 10) {
    ageKey = '2-9';
} else if (age > 9 && age < 20) {
    ageKey = '10-19';
} else if (age > 19 && age < 30) {
    ageKey = '20-29';
} else if (age > 29 && age < 40) {
    ageKey = '30-39';
} else if (age > 39 && age < 50) {
    ageKey = '40-49';
} else if (age > 49 && age < 60) {
    ageKey = '50-59';
} else if (age > 59) {
    ageKey = '60+';
}

var genderKey;

if (gender === "M") {
    genderKey = 'male';
} else {
    genderKey = 'female';
}

axios.get(queryUrl).then(
    function(response) {
        for (var i = 0; i < response.data.age_interaction[ageKey].length; i++) {
            for (var j = 0; j < response.data.gender_interaction[genderKey].length; j++) {
                if (response.data.age_interaction[ageKey][i] === response.data.gender_interaction[genderKey][j]) {
                    symptoms.push(response.data.age_interaction[ageKey][i]);
                }
            }
        }
    });