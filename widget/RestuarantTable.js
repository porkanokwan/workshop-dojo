define([
  "dojo/_base/declare",
  "require",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/Evented",
  "dojo/text!./template/restuarantTable.html", // Import file
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dojo/query",
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
  })(require.toUrl("../css/restuarant.css"));

  let decWidget = declare(
    [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
    {
      basePath: require.toUrl("./"), // ต้องมี
      templateString: templates, // ต้องมี
      baseClass: "restuarant-table", // ต้องมี อันนี้มีไว้เพื่อกันการชื่อซ้ำ จะใช้เวลากำนหด css จะได้รู้ว่า css ของใคร

      // Private  Properties ของอันนี้โดยเฉพาะ
      storage: [],

      // ต้องมี
      constructor: function (param, elem) {},

      //   ไม่ค่อยใช้
      postMixInProperties: function () {},

      // ต้องมี (เวลามีการ new Widget มันจะเข้า postCreate ก่อน ค่อยเข้า startUp)
      postCreate: function () {
        this.inherited(arguments); // ต้องมี ช่วยให้เวลาเรียก this มันจะรู้ว่าเป็นตัวไหนใน html
      },

      startup: function () {
        this.inherited(arguments);
      },

      setTable: function (from, allList) {
        if (from !== "start") {
          domConstruct.empty(this.tbody);
        }
        for (let i = 0; i < allList.length; i++) {
          let tableRow = domConstruct.create("tr");
          let btnView = domConstruct.create("button");
          let btnEdit = domConstruct.create("button");
          let btnDelete = domConstruct.create("button");

          for (let d = 0; d < 5; d++) {
            let tableData = domConstruct.create("td");
            if (d === 0) {
              tableData.innerText = allList[i].name;
            } else if (d === 1) {
              tableData.innerText = allList[i].type;
            } else if (d === 2) {
              btnView.type = "button";
              btnView.id = "view";
              btnView.innerText = "View Menu";
              domAttr.set(btnView, "data-dojo-attach-point", "view");
              tableData.appendChild(btnView);
            } else if (d === 3) {
              btnEdit.type = "button";
              btnEdit.id = "edit";
              btnEdit.innerText = "Edit";
              domAttr.set(btnEdit, "data-dojo-attach-point", "edit");
              tableData.appendChild(btnEdit);
            } else if (d === 4) {
              btnDelete.type = "button";
              btnDelete.id = "delete";
              btnDelete.innerText = "Delete";
              domAttr.set(btnDelete, "data-dojo-attach-point", "delete");
              tableData.appendChild(btnDelete);
            }
            tableRow.appendChild(tableData);
          }
          this.tbody.appendChild(tableRow);

          // Handle click on "View Menu" button
          // let widgetBurger = new BurgerMenu({headerColor: "#11167a", label: restuarant[i].name});
          //     on(
          //       btnView,
          //       "click",
          //       lang.hitch(this, function(e) {
          //           this.burgerTable.appendChild(widgetBurger.domNode)
          //       })
          //     );

          // Handle click on "Edit" button
          on(
            btnEdit,
            "click",
            lang.hitch(this, function (e) {
              // เรียกใช้ Event EditClick ที่เราสร้างเพื่อส่งข้อมูลที่ต้องการส่งเข้าไปใน event นั้น และเมื่อมี widget ตัวอื่นที่ bind event EditClick ไว้มันก็จะสามารถใช้ event นี้ได้และยังสามารถเรียกใช้ข้อมูลที่ส่งไปได้ด้วย
              // หรือจะไม่ส่งข้อมูลไปก็ได้ เราก็เรียกใช้เฉยๆ เพื่อให้ Widget อื่นที่ bind event EditClick ไว้มันทำงานได้
              this.onEditClick(i);
            })
          );

          // Handle click on "Delete" button
          on(
            btnDelete,
            "click",
            lang.hitch(this, function (e) {
              this.onDeleteRow(i);
            })
          );
        }
      },

      // Public event ที่สร้างขึ้นมาลอยๆ ให้ widget ตัวอื่นเรียกใช้ event นี้ได้ โดยไม่ต้อง import
      onEditClick: function (item) {},

      onDeleteRow: function (item) {},
    }
  );

  return decWidget;
});
