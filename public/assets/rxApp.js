
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
    



});