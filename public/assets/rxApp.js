
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



});