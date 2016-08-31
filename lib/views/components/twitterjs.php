<script type="text/html" id="form_template">
<h3>Tweets</h3>

<form  role="form" data-bind="submit: handleSubmit">
<div class="form-group">
<input class="form-control" data-bind="value: author" placeholder="Author" />
<textarea class="form-control" data-bind="value: description">What?</textarea>
<input class="form-control" data-bind="value: link" placeholder="Link" />
<div class="checkbox">
    <label for="name"><input class="checkbox" name="shipping" type="checkbox" data-bind="checked: shipping, click: doShipping, cancelBubble: false"/> Shipping</label>
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</div>
</form>
</script>
<script type="text/html" id="twitter_component">
<div id="twitter" class="preview">
    <div data-bind="text: author"></div>
    <div data-bind="text: description"></div>
    <div><a data-bind="text: link,href: link">What?</a></div>
</div>
</script>

<script type="application/javascript">
(function() {
    var registry = {};
    console.log(registry);
    set_twitter_data();//convience function used for prototyping without api calls
    console.log(registry);
    load_components();
function load_components() {
load_component('#form_template','#a_forms',get_twitter_data,submit_handler);
load_component('#twitter_component','#form_preview',get_twitter_data);
}
//still need a way of having form elements that effect the rest of the form
//
//example select box of users. Selected user would load a form for modifying
//the users information.


//form element chaining. The action of one form element product another
//form element and the two are tied together. so if the parent form
//element changes it effects the child form element.


//need a function that can be passed the submit_handler definition
//and the twitter_data definition and keep track of the view model object.
//---- NOT ----
//
//the 'this' variable can be used in the submit_handler because the function
//will eventually be bound to the view model in teh load_component function
//at that point 'this' context in the submit handler becomes the view model
//making all of the data available in the view model, available in the submit handler


function submit_handler(formElement) {
    console.log("form submitted");
    console.log(formElement);
    console.log(this);
}

function set_dataObject(name,obj) {
    registry[name] = obj;
}
function get_dataObject(name) {
    var obj = {};
        obj[name] = registry[name] ;
       return obj;
}

function set_twitter_data() {
    set_dataObject('twitter', {
        "author" : ko.observable("Test Author"),
        "description" : ko.observable("A tweet description"),
        "link" : ko.observable("http://www.twitter.com/"),
        "shipping" : ko.observable(false),
        "handleSubmit" : submit_handler,
        "doShipping" : function () { console.log("do something"); }
    });

}
function get_twitter_data() {
    //this function needs to define a mapping between
    //the data returned from the api into
    //a knockoutJs compatible viewmodel
    //need to define a function that takes in a set of names
    //those names are used to filter out the properties
    //of the api response and map them to ko.observables or observableArrays or computed

    var d =  get_dataObject('twitter');
    console.log(d);
    return d;
}
function load_component (template_id,container_id,data_fn,interaction_fn) {
    //template_id is the id of the handlebars script tag
    //container_id is the id of the element in the dom where the template should be rendered
    //
    //data_fn is the function to get the data for the template.
    var template = document.querySelector(template_id),
        container = document.querySelector(container_id),
        theTemplate;
    console.log(template);
    console.log(container);
    if (!template || !container){
        return;
    }

    var vm = data_fn();
    console.log(vm);
    console.log(registry);
    ko.applyBindings(vm,container);

}
}());
</script>
