var axios = require('axios');
var drug1 = "ibuprofen";
var drug2 = "zoloft";
var symptoms = [];
var age = 28;
var gender = "male";
var queryUrl = "https://www.ehealthme.com/api/v1/drug-interaction/" + drug1 + "/" + drug2 + "/";
var ageKey = '20-29';
var genderKey = 'male';

axios.get(queryUrl).then(
    function(response) {
        for (var i = 0; i < response.data.age_interaction[ageKey].length; i++) {
            // console.log(response.data.age_interaction[ageKey][i]);
            for (var j = 0; j < response.data.gender_interaction[genderKey].length; j++) {
                if (response.data.age_interaction[ageKey][i] === response.data.gender_interaction[ageKey][j]) {
                    // symptoms.push(response.data.age_interaction[ageKey][i]);
                    console.log("Match!");
                }
            }
        }
    });

// console.log(symptoms);