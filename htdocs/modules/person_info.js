define(['vendor/knockoutjs/knockout-3.2.0'], function (ko) {
    'use strict';
    function module(params) {
        var person_id = params.data().person_num();
        this.person = ko.observable();
        load_person_info(this);
        function load_person_info(context) {

                var url = "/api/v1/person/" + person_id;
                ko.populate_property_by_api(url,configSubs);
                function configSubs(data) {
                    var result = JSON.parse(data);
                    console.log(result);
                    //pin must be hidden or empty unless user has permissions to see value
                    //need ACL for determining if user can see PIN
                    //pin_secured value still unknown.
                    //
                    //Person.at_BCBS
                    //need to iterate over  result.person properties
                    context.person = new Person(result.person);
                }
        }

        function Person(data) {
            this.person_num = ko.observable(data.personnum);
            this.social_sec = ko.observable(data.socialsec);
            this.dob = ko.observable(data.dob);
            this.dod = ko.observable(data.dod);
            this.firstname = ko.observable(data.first);
            this.middlename = ko.observable(data.middle);
            this.lastname = ko.observable(data.last);
            this.nameprefix = ko.observable(data.nameprefix);
            this.salutation = ko.observable(data.salutation);
            this.sex = ko.observable(data.sex);
            this.pin = ko.observable(data.pin);
            this.leroyage = ko.observable(data.leroyage);
            this.maritalstat = ko.observable(data.maritalstat);
            this.at_bcbs = ko.observable(data.at_bcbs);
            this.at_afbp = ko.observable(data.at_afbp);
            this.question_id = ko.observable(data.question_id);
            this.answer = ko.observable(data.answer);
            this.wsc_password = ko.observable(data.wsc_password);
            this.web_enable_id = ko.observable(data.web_enable_id);
            this.web_eprgenrlseqnum = ko.observable(data.web_eprgenrlseqnum);
            this.lastlogin = ko.observable(data.lastlogin);
            this.faillogin = ko.observable(data.faillogin);
            this.ntuserid = ko.observable(data.ntuserid);
            this.username = ko.observable(data.username);
            this.multiple_birth_code = ko.observable(data.multiple_birth_code);
            this.commentseqnum = ko.observable(data.commentseqnum);
            this.spouse_personnum = ko.observable(data.spouse_personnum);
            this.person_id = ko.observable(data.person_id);
            this.afbp_id = ko.observable(data.afbp_id);
        }
    }
    return { viewModel: module, template: {require: "text!modules/person_info.html"} };
});
