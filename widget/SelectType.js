define([
    "dojo/_base/declare",
    "require",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/Evented",
    "dojo/text!./template/selectType.html",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/query",
  ], function(
    declare,
    require,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    Evented,
    templates /*template*/,
    lang,
    on,
    domClass,
    array,
    domAttr,
    domStyle,
    domConstruct,
    query,
) {    
    let decWidget = declare(
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
        {
          basePath: require.toUrl("./"),
          templateString: templates,
          baseClass: "select-type",
        
        // ต้องมี
         constructor: function (param, elem) {
          },
    
          postMixInProperties: function() {},
            
          postCreate: function () {
            this.inherited(arguments); 

            this.labels.innerText = this.title;
            
            for (let i = 0; i < this.type.length; i++) {
                let optType = document.createElement("option");
                optType.value = this.type[i];
                optType.innerHTML = this.type[i];
                this.typeFood.appendChild(optType);
              }

              on(this.typeFood, "change", lang.hitch(this, function () {
                this._onChange()
              }))
          },
    
          startup: function() {
            this.inherited(arguments);
          },
    
          // Start: Public Method
          setValue: function (value) {
            this.typeFood.value = value;
          },
          
          getValue: function () {
            return this.typeFood.value  
          },
          
          clearSelected: function (value) {
            this.setValue(value)
          },
          // End: Public Method
          
          // Start: Public Event
          _onChange: function (value) {  },
          // End: Public Event
        }
    );
    
    return decWidget
  })