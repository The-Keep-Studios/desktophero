define(['vendor/knockoutjs/knockout-3.2.0'], function (ko) {
    'use strict';
    function module(params) {
        this.person = params.data;
        this.subscriber_number = "30303";
        this.ssn = "3424";
        this.subscriber_name ="Foo";
        this.claims = ko.observableArray(get_claimsAndEstimates());
        this.claims_status = ko.observableArray(get_claims_status());
        this.related_claims = ko.observableArray(get_related_claims());
    }
    return { viewModel: module, template: {require: "text!modules/claims_form.html"} };
    function get_claims_status() {
        return [];
    }
    function get_related_claims() {
        return [];
    }
    function get_claimsAndEstimates() {
        //xhr.requset to /subscriber/{subscriber_id}/claims
        return [
            {
                afbp_claim_num : 3434,
                depend_person_num : 2320,
                depend_firstname: "Kyle",
                received: "",
                closed: "",
                est: "",
                dentist_claim_num: 4304,
                read_relse: 2323,
                released: "2014-12-14",
                isSelected: 0,
                setIsSelected : function () { return false;}
            }
        ];
    }
});

