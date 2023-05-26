define([
  "dojo/_base/declare",
  "require",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/Evented",
  "dojo/text!./template/containerMenu.html", // Import file
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dojo/query",
  "widget/BurgerMenu",
  "widget/FormAdd",
  "widget/SelectType",
], function (
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
  BurgerMenu,
  FormAdd,
  SelectType
) {
  (function (href) {
    let headID = document.getElementsByTagName("head").item(0),
      cssNode;
    let link = document.getElementsByTagName("link");
    let cssExist = false;
    for (let j = 0; j < link.length; j++) {
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
  })(require.toUrl("../css/containerMenu.css"));

  let type = ["All", "Food", "Dessert", "Beverage"];
  let typeForForm = ["Food", "Dessert", "Beverage"];

  let fastFood = [
    { name: "Cheese Burger", type: "Food", price: 100 },
    { name: "Fish Burger", type: "Food", price: 80 },
    { name: "Double Cheese Burger", type: "Food", price: 120 },
    { name: "Chocholate Sundae", type: "Dessert", price: 30 },
    { name: "Water", type: "Beverage", price: 10 },
    { name: "Soft Drink", type: "Beverage", price: 15 },
  ];

  let decWidget = declare(
    [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
    {
      basePath: require.toUrl("./"), // ต้องมี
      templateString: templates, // ต้องมี
      baseClass: "container-menu", // ต้องมี อันนี้มีไว้เพื่อกันการชื่อซ้ำ จะใช้เวลากำนหด css จะได้รู้ว่า css ของใคร

      // ต้องมี
      constructor: function (param, elem) {},

      //   ไม่ค่อยใช้
      postMixInProperties: function () {},

      // ต้องมี (เวลามีการ new Widget มันจะเข้า postCreate ก่อน ค่อยเข้า startUp)
      postCreate: function () {
        this.inherited(arguments); // ต้องมี ช่วยให้เวลาเรียก this มันจะรู้ว่าเป็นตัวไหนใน html

        // ในนี้จะมีทุกอย่างที่ต้องการทำ
        localStorage.setItem("foodList", JSON.stringify(fastFood));

        this.nameMenu.innerText = this.title;

        let select = new SelectType({ type, title: "Select type: ", width: "80%" });
        this.containerMenu.appendChild(select.domNode);

        let widgetMenu = new BurgerMenu({ headerColor: "#11167a" });
        this.containerMenu.appendChild(widgetMenu.domNode);
        widgetMenu.setTable(
          "start",
          JSON.parse(localStorage.getItem("foodList"))
        );

        // Handle click on "Add" button
        let btnAdd = domConstruct.create(
          "button",
          { id: "add", type: "button" },
          this.containerMenu
        );
        btnAdd.innerText = "Add New Menu";
        domAttr.set(btnAdd, "data-dojo-attach-point", "add");

        let widgetFormAdd = new FormAdd({
          type: typeForForm,
          title: "BurgerMenu",
          mode: "ADD",
        });
        on(
          btnAdd,
          "click",
          lang.hitch(this, function (e) {
            this.containerMenu.appendChild(widgetFormAdd.domNode);
          })
        );

        // Handle form save on "SaveForm" event (Add new)
        on(
          widgetFormAdd,
          "SaveForm",
          lang.hitch(this, function (e) {
            let newList = JSON.parse(localStorage.getItem("foodList"));
            widgetMenu.setTable("add", newList);
          })
        );

        // Example use public event of BuregerMenu
        // คอยดูว่ามีการใช้ Event EditClick เกิดขึ้นไหม ถ้ามี function on นี้ถึงจะทำงาน
        on(
          widgetMenu,
          "EditClick",
          lang.hitch(this, function (i, e) {
            let widgetFormEdit = new FormAdd({
              type: typeForForm,
              title: "BurgerMenu",
              mode: "EDIT",
              data: JSON.parse(localStorage.getItem("foodList"))[i],
            });
            this.containerMenu.appendChild(widgetFormEdit.domNode);

            // Handle form save on "SaveForm" event (Edit)
            on(
              widgetFormEdit,
              "SaveForm",
              lang.hitch(this, function (e) {
                let newList = JSON.parse(localStorage.getItem("foodList"));
                widgetMenu.setTable("edit", newList);
              })
            );
          })
        );

        // Handle work on "DeleteRow" event
        on(
          widgetMenu,
          "DeleteRow",
          lang.hitch(this, function (i, e) {
            let newList = JSON.parse(localStorage.getItem("foodList")).filter(
              (item, idx) => idx !== i
            );
            localStorage.setItem("foodList", JSON.stringify(newList));
            widgetMenu.setTable("delete", newList);
          })
        );

        //   Handle Search type
        on(
          select,
          "SearchBySelect",
          lang.hitch(this, function (e) {
            let search = select.getValue();
            if (search === "All") {
              let list = JSON.parse(localStorage.getItem("foodList"));
              widgetMenu.setTable("search", list);
            } else {
              let list = JSON.parse(localStorage.getItem("foodList")).filter(
                (item) => item.type === search
              );
              widgetMenu.setTable("search", list);
            }
          })
        );
      },

      startup: function () {
        this.inherited(arguments);
      },
    }
  );

  return decWidget;
});
