// Require axios
var axios = require('axios');

// drug1 and drug2 are hard-coded for testing purposes, but will be extracted from the forms that the user fills out in the real app
var drug1 = "ibuprofen";
var drug2 = "zoloft";

// This array is initialized as empty but will be filled in with the symptoms that are common to both the user's age and gender
var symptoms = [];

// age and gender are hard-coded for testing purposes, but will also be extracted from forms just like drug1 and drug2
var age = 28;
var gender = "male";

// Query URL
var queryUrl = "https://www.ehealthme.com/api/v1/drug-interaction/" + drug1 + "/" + drug2 + "/";

// Keys
var ageKey = '20-29';
var genderKey = 'male';

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