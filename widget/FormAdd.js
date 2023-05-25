define([
  "dojo/dom",
  "dojo/_base/declare",
  "require",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/Evented",
  "dojo/text!./template/formAdd.html" /*template*/,
  "dojo/_base/lang",
  "dojo/on",
  "widget/SelectType",
], function (
  dom,
  declare,
  require,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Evented,
  templates /*template*/,
  lang,
  on,
  SelectType
) {
  (function (href) {
    var headID = document.getElementsByTagName("head").item(0),
      cssNode;
    var link = document.getElementsByTagName("link");
    var cssExist = false;
    for (var j = 0; j < link.length; j++) {
      if (link.item(j).href.toString().indexOf(href) > -1) {
        cssExist = true;
        break;
      }
    }
    if (!cssExist) {
      cssNode = document.createElement("link");
      cssNode.type = "text/css";
      cssNode.rel = "stylesheet";
      cssNode.href = href;
      headID.appendChild(cssNode);
    }
  })(require.toUrl("../css/form.css"));

  let decWidget = declare(
    [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
    {
      basePath: require.toUrl("./"),
      templateString: templates,
      baseClass: "form-add",

      constructor: function (param, elem) {},

      postMixInProperties: function () {},

      postCreate: function () {
        this.inherited(arguments);

        let select = new SelectType({ type: this.type, title: "Type: " });
        this.selectType.appendChild(select.domNode);

        this._attachEvent(select);
        //   let widgetBurger = new BurgerMenu();
        if (this.mode === "EDIT") {
          if (this.title === "BurgerMenu") {
            this.setText(this.data.name);
            select.setValue(this.data.type);
            this.setValueAttr(this.data.price);
          } else {
            this.setText(this.data.name);
            select.setValue(this.data.type);
            this.setValueAttr(this.data.detail);
          }
        }
      },

      startup: function () {
        this.inherited(arguments);
      },

      _attachEvent: function (selected) {
        // Handle click on "Save" button
        // on(this.form, "submit", lang.hitch(this, "_saveForm")); เขียนแบบนี้ก็ได้
        on(
          this.form,
          "submit",
          lang.hitch(this, function (evt) {
            this._saveForm(evt, selected);
          })
        );
        // Handle click on "Cancel" button
        on(
          this.cancel,
          "click",
          lang.hitch(this, function () {
            this._cancel(selected);
          })
        );
      },

      _saveForm: function (evt, selected) {
        evt.preventDefault();
        if (this.title === "BurgerMenu") {
          list = JSON.parse(localStorage.getItem("foodList"));
          if (this.mode === "EDIT") {
            let objEdit = list.find(
              (item) =>
                item.name === this.data.name && item.type === this.data.type
            );
            objEdit.name = this.getText();
            objEdit.type = selected.getValue();
            objEdit.price = this.detail.value;
            this._params = objEdit;
            localStorage.setItem("foodList", JSON.stringify(list));
          } else {
            this._params = {};
            this._params.name = this.getText();
            this._params.type = selected.getValue();
            this._params.detail = this.detail.value;
            list.push(this._params);
            localStorage.setItem("foodList", JSON.stringify(list));
          }
        } else {
          list = JSON.parse(localStorage.getItem("restuarantList"));
          if (this.mode === "EDIT") {
            let objEdit = list.find(
              (item) =>
                item.name === this.data.name && item.type === this.data.type
            );
            objEdit.name = this.getText();
            objEdit.type = selected.getValue();
            objEdit.detail = this.detail.value;
            this._params = objEdit;
            localStorage.setItem("restuarantList", JSON.stringify(list));
          } else {
            this._params = {};
            this._params.name = this.getText();
            this._params.type = selected.getValue();
            this._params.detail = this.detail.value;
            list.push(this._params);
            localStorage.setItem("restuarantList", JSON.stringify(list));
          }
        }

        this._cancel(selected);
        this.onSaveForm(this._params);
      },

      // Start: Private Method
      _clearForm: function (selected) {
        this.nameInput.value = "";
        this.setValueAttr("");
        selected.clearSelected(this.type[0]);
      },

      _cancel: function (selected) {
        this.formAdd.remove();
        this._clearForm(selected);
      },
      // End: Private Method

      // Start: Public Method
      getValueAttr: function () {
        return this.detail.value;
      },

      setValueAttr: function (value) {
        this.detail.value = value;
      },

      getText: function () {
        // ใช้ได้ทั้ง 2 วิธี
        // return domAttr.get(this.nameInput, "value");
        return dom.byId("nameInput").value;
      },

      setText: function (text) {
        this.text = text;
        this.nameInput.value = this.text;
        // this.nameInput.value = domAttr.get(this.nameInput, "value");
      },
      // End: Public Method

      // Start: Public Event
      onSaveForm: function () {},
      // End: Public Event
    }
  );

  return decWidget;
});
