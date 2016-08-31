# Building an Interface

## KnockoutJs
KnockoutJS has two main elements
the template with data-bind attriubtes
and the ViewModel object that relates to the
template.

ViewModals are objects that have properties
which relate to data from an api.

Example:

A view model Person has properties: first_name, last_name, id.

They would relate to an api reponse of

    {
    people: [
                {
                    "id":"10202",
                    "first_name":"John",
                    "last_name":"Smith"
                }

            ];
    }

The relationship of the api reponse to the view modal must be created.

in htdocs/modules/dentalsubscibers.js

The function *load_subscriber* is an example of how to map
a api reponse to a view model object.

## Components

Components are a new feature available in version 3.2.0 of KnockoutJS.
They allow portions of the interface to be loaded asynchronously from the main interface and on demand based on the users actions.

Components are made up of two main parts, both of which are stored in the htdocs/modules directory.

The .html file defines the template and the .js file defines the javascript module.

The define function is used to pass dependencies and a function
is called to associate the template and the the view model.

Components can nest other components in their templates. Data for a component
can be passed via the params attribute in the data-bind definition.

[KnockoutJS Components](http://knockoutjs.com/documentation/component-binding.html)

## Two way binding

ko.observable() and ko.observerableArray() are two functions
that can be used to create a bound variable in the template
that matches a View Model's object properties.

This will assist in updating the value of a property whereever it
is referenced in the interface.

[KnockoutJS Observables](http://knockoutjs.com/documentation/observables.html)

## Subscriptions

The knockoutjs function *subscribe* will attach a function
to a property of a view model.

## Appendix

[Knockoutjs](http://knockoutjs.com/)
