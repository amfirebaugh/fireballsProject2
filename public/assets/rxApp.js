$(document).ready(function() {

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
});