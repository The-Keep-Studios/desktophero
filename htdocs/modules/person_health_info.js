define(['vendor/knockoutjs/knockout-3.2.0'], function (ko) {
    'use strict';
    function module(params) {
        this.person = params.data;
    }
    return { viewModel: module, template: {require: "text!modules/person_info.html"} };
});
