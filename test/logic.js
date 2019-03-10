// Require axios
var axios = require('axios');

// drug1 and drug2 are hard-coded for testing purposes, but will be extracted from the forms that the user fills out in the real app
var drug1 = "ibuprofen";
var drug2 = "zoloft";

// This array is initialized as empty but will be filled in with the symptoms that are common to both the user's age and gender
var mostLikelySymptoms = [];
var otherPossibleSymptoms = [];

// age and gender are hard-coded for testing purposes, but will also be extracted from forms just like drug1 and drug2
var age = 28;
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

var test;

// Populates mostLikelySymptoms array
axios.get(queryUrl).then(
    function(response) {
        test = response;
        for (var i = 0; i < test.data.age_interaction[ageKey].length; i++) {
            for (var j = 0; j < test.data.gender_interaction[genderKey].length; j++) {
                if (test.data.age_interaction[ageKey][i] === test.data.gender_interaction[genderKey][j]) {
                    mostLikelySymptoms.push(test.data.age_interaction[ageKey][i]);
                }
            }
        }
    }).then(
    function() {
        for (var i = 0; i < test.data.age_interaction[ageKey].length; i++) {
            for (var j = 0; j < mostLikelySymptoms.length; j++) {
                if (test.data.age_interaction[ageKey][i] !== mostLikelySymptoms[j]) {
                    if (!otherPossibleSymptoms.includes(test.data.age_interaction[ageKey][i])) {
                    otherPossibleSymptoms.push(test.data.age_interaction[ageKey][i]);
                    }
                }
            }
        }

        for (var i = 0; i < test.data.gender_interaction[genderKey].length; i++) {
            for (var j = 0; j < mostLikelySymptoms.length; j++) {
                if (test.data.gender_interaction[genderKey][i] !== mostLikelySymptoms[j]) {
                    if (!otherPossibleSymptoms.includes(test.data.gender_interaction[genderKey][i])) {
                    otherPossibleSymptoms.push(test.data.gender_interaction[genderKey][i]);
                    }
                }
            }
        }
        console.log(mostLikelySymptoms.length);
        console.log(otherPossibleSymptoms.length);
    });