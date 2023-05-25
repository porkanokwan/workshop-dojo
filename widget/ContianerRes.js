define([
  "dojo/_base/declare",
  "require",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/Evented",
  "dojo/text!./template/containerRes.html", // Import file
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dojo/query",
  "widget/RestuarantTable",
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
  RestuarantTable,
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
  })(require.toUrl("../css/containerRes.css"));

  let type = ["All", "Fast Food", "Japanese", "Thai", "French"];

  let restuarant = [
    { name: "Max Burger", type: "Fast Food", detail: "" },
    { name: "Tenryu", type: "Japanese", detail: "" },
    { name: "W and A", type: "Fast Food", detail: "" },
    { name: "Raan Pad Thai", type: "Thai", detail: "" },
    { name: "La viva", type: "French", detail: "" },
  ];

  let decWidget = declare(
    [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
    {
      basePath: require.toUrl("./"), // ต้องมี
      templateString: templates, // ต้องมี
      baseClass: "container-res", // ต้องมี อันนี้มีไว้เพื่อกันการชื่อซ้ำ จะใช้เวลากำนหด css จะได้รู้ว่า css ของใคร

      // ต้องมี
      constructor: function (param, elem) {},

      //   ไม่ค่อยใช้
      postMixInProperties: function () {},

      // ต้องมี (เวลามีการ new Widget มันจะเข้า postCreate ก่อน ค่อยเข้า startUp)
      postCreate: function () {
        this.inherited(arguments); // ต้องมี ช่วยให้เวลาเรียก this มันจะรู้ว่าเป็นตัวไหนใน html

        // ในนี้จะมีทุกอย่างที่ต้องการทำ
        localStorage.setItem("restuarantList", JSON.stringify(restuarant));

        let select = new SelectType({ type: type, title: "Select type: " });
        this.container.appendChild(select.domNode);

        let widgetRestuarant = new RestuarantTable();
        this.container.appendChild(widgetRestuarant.domNode);
        widgetRestuarant.setTable("start", restuarant);

        // Handle click on "Add" button
        let btnAdd = domConstruct.create(
          "button",
          { id: "add", type: "button" },
          this.container
        );
        btnAdd.innerText = "Add New Restaurant";
        domAttr.set(btnAdd, "data-dojo-attach-point", "add");
        let widgetFormAdd = new FormAdd({
          type,
          title: "Restaurant",
          mode: "ADD",
        });
        on(
          btnAdd,
          "click",
          lang.hitch(this, function (e) {
            this.container.appendChild(widgetFormAdd.domNode);
          })
        );

        // Example use public event of RestuarantTable
        // คอยดูว่ามีการใช้ Event EditClick เกิดขึ้นไหม ถ้ามี function on นี้ถึงจะทำงาน
        on(
          widgetRestuarant,
          "EditClick",
          lang.hitch(this, function (i, e) {
            let widgetFormEdit = new FormAdd({
              type,
              title: "Restaurant",
              mode: "EDIT",
              data: restuarant[i],
            });
            this.container.appendChild(widgetFormEdit.domNode);
          })
        );

        // Handle work on "DeleteRow" event
        on(
          widgetRestuarant,
          "DeleteRow",
          lang.hitch(this, function (i, e) {
            let newList = restuarant.filter((item, idx) => idx !== i);
            localStorage.clear();
            localStorage.setItem("restuarantList", JSON.stringify(newList));
            widgetRestuarant.setTable("delete", newList);
          })
        );

        // Handle form save on "SaveForm" event (Add new)
        on(
          widgetFormAdd,
          "SaveForm",
          lang.hitch(this, function (param, e) {
            restuarant.push(param);
            widgetRestuarant.setTable("add", restuarant);
          })
        );

        //      on(
        //         this.selectFood,
        //         "click",
        //         lang.hitch(this, function(e) {
        //           let search = select.getValue();
        //           if (search) {
        //             let list = restuarant.filter(item => item.type === search)
        //             localStorage.clear()
        //             localStorage.setItem('restuarantList', JSON.stringify(list))
        //             this.setTable()
        //           }
        //         })
        //     );
      },

      startup: function () {
        this.inherited(arguments);
      },
    }
  );

  return decWidget;
});
