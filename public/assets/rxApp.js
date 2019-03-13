
$(document).ready(function() {

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
        // remove any drug name values from page on search submit
        $("#drugReturnList").remove();
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
            .then(function(data) {
                console.log(data);
                console.log(typeof(data));
                if(data === '500 Error') {
                    // if empty response from API due to no interaction data
                    var header = $('<p>');
                    header.text('THERE IS NO INTERACTION DATA FOR THAT DRUG COMBINATION. TAKE PLENTY!')
                    $("#drugInteractionsReturn").append(header);
                
                } else {
                    
                    //console.log(data);
                    // add interaction data to page
                    var header = $('<p>');
                    var interactions = $('<p>');
                    header.text('MOST LIKELY INTERACTIONS FOR YOUR AGE:')
                    interactions.text(data[0]);
                    $("#drugInteractionsReturn").append(header);
                    $("#drugInteractionsReturn").append(interactions);
                
                    var header = $('<p>');
                    var interactions = $('<p>');
                    header.text('ALL POSSIBLE INTERACTIONS FOR YOUR AGE:')
                    interactions.text(data[1]);
                    $("#drugInteractionsReturn").append(header);
                    $("#drugInteractionsReturn").append(interactions);
                }
            });
    });
});

