(function($){
    'use strict';

    var $loginform = $("#login-form");

    if (!$loginform) {
        return; //there isn't a login form so don't bother do anything.
    }
    $loginform.on('submit', submit);
    function submit(e) {

        var btn      = $('#login-submit button'),
            email    = $('#email').val(),
            password = $('#password').val();
        btn
            .text('Signing in...')
            .prop('disabled', true)
        ;
        e.stopPropagation();
        e.preventDefault();
        $.ajax('/api/v1/login', {
            type: 'POST',
            data: {
                username: email,
                password: password
            },
            success: function() {
                console.log("successful login");
                window.location = "/";
            },
            error: function() {
                console.log("login failed");
                alert('bad username or password, so here you would do the normal password failure things');
            },
            complete: function() {
                btn.text('Sign in')
                    .prop('disabled', false);
            }
        });
    }

    /*UI Actions */
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

}(jQuery));
