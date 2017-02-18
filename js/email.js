'use strict';

(function($){
    var API_SERVER = "//api.serverchef.io:8080/";

    $(document).ready(function(){


        var formDisabled = false;
        //override email collection form submit
        $("#emailCollectionForm").on('submit',function(e){
            e.preventDefault();

            var data = $(this).serializeArray();

            var email = data.find(function(x) {return x.name == "email"}).value;

            $.ajax({
                type: 'POST',
                url: API_SERVER,
                data: JSON.stringify({email: email}),
                contentType: 'application/json',
                success: function (data) {
                    $("#emailFormError").html("");
                    $("#emailFormSuccess").show();

                    $("#emailCollectionForm").hide();

                    formDisabled = true;
                },
                error: function(xhr, type){
                    var errorMessage = "Something is not right. Please try again";
                    if (xhr.status == 400){
                        var response = JSON.parse(xhr.response);
                        errorMessage = response.message;

                    } else {
                        errorMessage = "Please check your internet connection"
                    }

                    $("#emailFormError").html(errorMessage);

                    formDisabled = false;
                    $("#submitEmailCollectionForm").html("Notify Me");
                    $("#submitEmailCollectionForm").removeAttr("disabled");
                }
            });

            //as soon as the ajax is fired, we need to disable the submit button
            formDisabled = true;

            $("#submitEmailCollectionForm").attr("disabled", true);
            $("#submitEmailCollectionForm").html("Processing...");

        });

    });

})(Zepto);