define(['vendor/knockoutjs/knockout-3.2.0'], function (ko) {
    'use strict';
    function module(params) {
        this.person = params.data;
        this.claims_data = { alpha: "number", person: this.person };
        //need to decide what the claims_data looks like for loading a the GUI.
        //the claims data will be passed on to the claims_form module.
        //the person id should be passed on to be sent with other queries
    }
    return { viewModel: module, template: {require: "text!modules/claims.html"} };
});
