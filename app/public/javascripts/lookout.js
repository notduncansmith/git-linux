var Lookout = {
  models: {},
  init: function(options){
    //Set up hooks
    Lookout.beforeWatch = options.beforeWatch || function(){};
    Lookout.afterWatch = options.afterWatch || function(){};
    Lookout.beforeUpdate = options.beforeUpdate || function(){};
    Lookout.afterUpdate = options.afterUpdate || function(){};

    //Watch objects
    options.models.forEach(function (item, index){
      var self = options.models[index];
      var storedSelf = docCookies.getItem(self.id)
      
      var model = Lookout.models[self.id] = storedSelf || self; //Add to Lookout's list of models

      Lookout.beforeWatch(model)
      Lookout.watch(model)
      Lookout.afterWatch(model)
    });
  },
  watch: function(model) {
    var watchString = ''
      , props = Object.getOwnPropertyNames(model); //Get a list of this object's properties

    //Construct the watchString
    for (var i = props.length - 1; i >= 0; i--) {
      watchString += "input[data-" + model.id + "='" + props[i] + "'],";
      watchString += "select[data-" + model.id + "='" + props[i] + "'],";
      watchString += "textarea[data-" + model.id + "='" + props[i] + "'],";
      //input[data-user="userName"],select[data-user="userName"],textarea[data-user="userName"]
    }//rinse and repeat for each property of model

    watchString = watchString.substring(0, watchString.length - 1); //Drop the last comma

    $(watchString).map(function (index, item) {
      $(this).val(Lookout.models[model.id][$(this).data(model.id)]) //Set inputs to initial values
    });

    for (var i = props.length - 1; i >= 0; i--) {
      $("[data-" + model.id + "='" + props[i] + "']").map(function (item, index){
        var updatedModel = model
          , updatedProp = props[i]
          , newValue = model[updatedProp];

        //Update the DOM with current values
        Lookout.beforeUpdate(updatedModel, updatedProp, newValue)
        Lookout.update(updatedModel, updatedProp, newValue)
        Lookout.afterUpdate(updatedModel, updatedProp, newValue)
      })
    };

    if(options.onKeyUp){
      $(watchString).keyup(function(){ //if onKeyUp is true, watch on keyup
        var updatedModel = model
          , updatedProp = $(this).data(model.id)
          , newValue = $(this).val();

        Lookout.beforeUpdate(updatedModel, updatedProp, newValue)
        Lookout.update(updatedModel, updatedProp, newValue)
        Lookout.afterUpdate(updatedModel, updatedProp, newValue)
      })
    } else { //otherwise, watch on change
      $(watchString).change(function(){
        var updatedModel = model
          , updatedProp = $(this).data(model.id)
          , newValue = $(this).val();

        Lookout.beforeUpdate(updatedModel, updatedProp, newValue)
        Lookout.update(updatedModel, updatedProp, newValue)
        Lookout.afterUpdate(updatedModel, updatedProp, newValue)
      });
    }
  },
  update: function(updatedModel, updatedProp, newValue) {
    Lookout.models[updatedModel.id][updatedProp] = newValue;
    var selector = "[data-" + updatedModel.id + "='" + updatedProp + "']";
    $(selector).map(function (index, item) {
      if(!$(item).data('view')){
        $(item).data('view', $(item).html())  // Set the data-view to the innerHtml (the template)
        // if(Array.isArray(updatedModel[updatedProp])){
        //   $(item).data('view', '{{#' + updatedProp + '}}{{#.}}' + $(item).data('view') + '{{/.}}{{/' + updatedProp + '}}')
        // }
      }
      var template = '{{#' + updatedModel.id + '}}' + $(this).data("view") + '{{/' + updatedModel.id + '}}'
        , data = {}
        , newHtml = '';
      data[updatedModel.id] = Lookout.models[updatedModel.id];
      newHtml = Mustache.render(template, data);

      $(item).html(newHtml)
      docCookies.setItem(updatedModel.id, updatedModel)
    })
  }
}