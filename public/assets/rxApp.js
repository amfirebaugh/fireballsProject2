
$(document).ready(function() {

    // This array is initialized as empty but will be filled in with the symptoms that are common to both the user's age and gender
    var mostLikelySymptoms = [];
    var otherPossibleSymptoms = [];

    // Initialize Keys
    var ageKey;
    var genderKey;

    // We may not need these event bubblers but here they are and they work
    // event bubbling: listening on parent 
    $('#userAge').on('click', (event) => { 
        event.preventDefault();
        var userAge1 = $( "#userAge" ).val();
        console.log(userAge1);
        }); 

    // event bubbling: listening on parent 
    $('#userSex').on('click', (event) => { 
        event.preventDefault();
        var userSex1 = $( "#userSex" ).val();
        console.log(userSex1);
        }); 


    // call to squelize for user emails
    $('#dropdownNDFindYouButton').on('click', (event) => {
        console.log('clicked');
        event.preventDefault();
        // get emails from sequelize within users route
        $.get("/users", function(data) {
            if (data) {
                //console.log(data);
                // send data back to page
                $.each(data, function(index, value) {
                    console.log('value is', value)
                    // populate the select dropdown
                    var optionItemEmail = $('<option>');
                    optionItemEmail.text(value);
                    $("#emailReturn").append(optionItemEmail);
                });

            }
        });
    });


    // call to drug search API for drug names
    $('#drugSearchBtn').on('click', (event) => {
        console.log('clicked');
        event.preventDefault();

        // create object so api can recieve req.body
        var drugName = {name: $('#drugSearch').val().trim()};

        console.log(drugName);
        // send object to api.  POST requires promise
        $.post("/api/getDrug", drugName)
            // recieve data back to page
             .then(function(data) {
                if (data) {
                    console.log(data);
                    // construct data paragraph and append to page
                    var drugs = $('<p>');
                    drugs.text(data);
                    $("#drugReturnList").append(drugs);
                }
            });
    });

    // drug interactions API search
    $('#newDrugComboSubmit').on('click', (event) => {
        event.preventDefault()
        // create object so api can recieve req.body, object will also be used to insert into drugs db
        var drugInterActions = {
                name1: $('#drug1').val().trim(),
                name2: $('#drug2').val().trim(),
                email: $('#emailReturn').val().trim()
            };

        console.log(drugInterActions);
        // send object to api.  POST requires promise
        $.post("/api/interaction", drugInterActions)
            // recieve data back to page
            .then(function(response) {
                if(response) {
                    console.log(response)
                    test = response;
                    for (var i = 0; i < test.data.age_interaction[ageKey].length; i++) {
                        for (var j = 0; j < test.data.gender_interaction[genderKey].length; j++) {
                            if (test.data.age_interaction[ageKey][i] === test.data.gender_interaction[genderKey][j]) {
                                mostLikelySymptoms.push(test.data.age_interaction[ageKey][i]);
                            }
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
                });
    });

});