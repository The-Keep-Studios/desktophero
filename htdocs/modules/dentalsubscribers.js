define(['vendor/knockoutjs/knockout-3.2.0'], function (ko) {
    'use strict';

    /**
     * function creates the view model that is bound to the markup
     *
     * The viewModel object's properties are accessible via
     * data-bind attributes in the templates.
     *
     * Use ko.observable or ko.observableArray() to create
     * properties that are "auto-updating"
     */
    function module() {
           /**
            *
            * 1. Define properties that will be bound to the templates
            * 2. Define function to request data to populate properties with data
            * 3. Define actions to handle events in the interface
            * 4. Bind action handlers to view modal properties
            *
            **/

           this.subscribers = ko.observableArray([]);

           //this will populate the drop down of subscriber actions
           this.subscriberActions = ko.observableArray([]);
           //placeholder to keep track of the currently selected user
           this.selectedPerson = ko.observable();
           //placeholder to keep track of the currently open modal
           this.openModal = ko.observable(false);

           //this tracks which subscriber action was selected
           this.selectedSubAction = ko.observable();
           //this tracks which action was selected
           this.selectedAction = ko.observable();

           //this will populate the action drop down
           this.actions = ko.observableArray([]);

           var that = this;
           //load data into the properties that have been defined
           //each of these function calls are making ajax requests
           //when the ajax request completes it will update the observed property

            //Step 2: Define function to request data to populate properties with data
            //helper function to decorate JSON as Person objects
            //map the XHR return to the Person object
            function load_subscribers (context) {

                var url = "/api/v1/subscribers";
                ko.populate_property_by_api(url,configSubs);
                /**
                 * function that is responsible for
                 * building the table of person records
                 **/
                function configSubs (data) {
                    var result = JSON.parse(data);
console.log(result);
                    var subs = result.subscribers,i,people = [],subs_length = subs.length;
                    for(i=0;i<subs_length; i++){
                        people.push(new Person(subs[i]));
                    }
                    context.subscribers(people);
                }
            }
            function load_subscriber_actions (context) {

                var url = "/api/v1/interface/actions/subscriber";
                ko.populate_property_by_api(url,configSubActions);
                /**
                 * function that is responsible for
                 * populating the subscriber action drop down
                 **/
                function configSubActions (data) {
                    var result = JSON.parse(data),subs = result.actions,i,actions=[],subs_length = subs.length;
                    for(i=0;i<subs_length; i++){
                        actions.push(subs[i]);
                    }
                    context.subscriberActions(actions);
                }
            }
            function load_main_actions (context) {

                var url = "/api/v1/interface/actions/main";
                ko.populate_property_by_api(url,configSubActions);
                /**
                 * function that is responsible for
                 * populating the subscriber action drop down
                 **/
                function configSubActions (data) {
                    var result = JSON.parse(data),subs = result.actions,i,actions=[],subs_length = subs.length;
                    for(i=0;i<subs_length; i++){
                        actions.push(subs[i]);
                    }
                    context.actions(actions);
                }
            }

           //Step 4: Attach handlers to modal properties via subscribe
           this.selectedSubAction.subscribe(handleDropDownSelect);
           this.selectedAction.subscribe(handleDropDownSelect);

           //Step 3: Define functions for handling actions.
           function handleDropDownSelect(selected_option) {

               //the purpose of the function is to take the selected Record from the table
               //and open the modal with a view modal

               //based on the selected option from the subscribers drop down
               var title = selected_option[0],
                   name = title.toLowerCase().replace(/ /g,"_"),
                   modal_config = {
                       modal_title : title,
                       modal_name  : name
                   };
               if (title == 'Select an option') {
                return;
               }
               that.openModal(new modalView(that.selectedPerson,modal_config));
           }
           this.handleSubmit = function() {
            console.log(that.selectedPerson().lastname());
           };

           /**
            * Constructor function for the Person data set
            * defined inside the viewModal contructor
            * to close over the parent viewModel
            * and allow access to populate selectedPerson property
            * data is expected to look like
            * {
            *   person_num : Number,
            *   social_sec : String,
            *   firstname  : String,
            *   lastname   : String,
            *   dental_effective :  Date,
            *   dental_expires : Date,
            *   employer : Number,
            *   isSelected : Boolean
            * }
            */
            function Person(data) {
                    //this could be more resilient by adding a white list
                    //check for properties fo data that are expected
                    //and to error out when the properties are missing
                    this.person_num = ko.observable(data.person_num);
                    this.social_sec = ko.observable(data.social_sec);
                    this.firstname = ko.observable(data.firstname);
                    this.lastname = ko.observable(data.lastname);
                    this.dental_effective = ko.observable(data.dental_effective);
                    this.dental_expires = ko.observable(data.dental_expires);
                    this.employer = ko.observable(data.employer);
                    this.isSelected = ko.observable(false);

                    this.setIsSelected = function () {
                        if (that.selectedPerson()) {
                            that.selectedPerson().isSelected(false);
                        }
                        this.isSelected(true);
                        that.selectedPerson(this);
                    }
            }


           //load data into interface
           load_subscribers(this);
           load_subscriber_actions(this);
           load_main_actions(this);
        }
        /**
         * Contructor function for the view model for the modal
         */
        function modalView(person,config) {
                this.person = person;
                this.modal_title = ko.observable(config.modal_title);
                this.modal_name = ko.observable(config.modal_name);
                this.visible = ko.observable(true);
                $("#personinfo").modal('show');
        }

    return { viewModel: module, template: {require: "text!modules/dentalsubscribers.html"} };

});
