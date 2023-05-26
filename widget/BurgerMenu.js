define([
  "dojo/_base/declare",
  "require",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/Evented",
  "dojo/text!./template/burgerMenu.html",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dojo/query",
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
  FormAdd,
  SelectType
) {
  (function(href) {
      let headID = document.getElementsByTagName("head").item(0),
          cssNode;
      let link = document.getElementsByTagName("link");
      let cssExist = false;
      for (let j = 0; j < link.length; j++) {
        if (
          link
            .item(j)
            .href.toString()
            .indexOf(href) > -1
        ) {
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
  })(require.toUrl("../css/burger.css"));

  let decWidget = declare(
    [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
    {
      basePath: require.toUrl("./"),
      templateString: templates,
      baseClass: "burger-table",

      _table: null,
      storage: [],

      // ต้องมี
      constructor: function (param, elem) {},

      //   ไม่ค่อยใช้
      postMixInProperties: function () {},

      // ต้องมี (เวลามีการ new Widget มันจะเข้า postCreate ก่อน ค่อยเข้า startUp)
      postCreate: function () {
        this.inherited(arguments); // ต้องมี ช่วยให้เวลาเรียก this มันจะรู้ว่าเป็นตัวไหนใน html

        //   การเปลี่ยนสีจาก prop ที่ส่งมา (วิธีเก่า)
        // if (this.headerColor) {
        //   domStyle.set(this.tableHeader1, {
        //       backgroundColor: this.headerColor
        //   });
        //   domStyle.set(this.tableHeader2, {
        //       backgroundColor: this.headerColor
        //   });
        //   domStyle.set(this.tableHeader3, {
        //       backgroundColor: this.headerColor
        //   });
        //   domStyle.set(this.tableHeader4, {
        //       backgroundColor: this.headerColor
        //   });
        // }
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
          let btnEdit = domConstruct.create("button");
          let btnDelete = domConstruct.create("button");

          for (let d = 0; d < 5; d++) {
            let tableData = domConstruct.create("td");
            if (d === 0) {
              tableData.innerText = allList[i].name;
            } else if (d === 1) {
              tableData.innerText = allList[i].type;
            } else if (d === 2) {
              tableData.innerText = allList[i].price;
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

          // Handle click on "Edit" button
          on(
            btnEdit,
            "click",
            lang.hitch(this, function (e) {
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

      onEditClick: function (item) {},

      onDeleteRow: function (item) { },

      //   การเปลี่ยนสีจาก prop ที่ส่งมา (วิธีใหม่ที่ dojo สร้างให้เราใช้โดยเติม Attr ต่อท้าย แลพรับ parameter 1 ตัว)
      _setHeaderColorAttr: function (value) {
        this.headerColor = value;
        domStyle.set(this.tableHeader1, {
          "background-color": this.headerColor,
        });
        domStyle.set(this.tableHeader2, {
          "background-color": this.headerColor,
        });
        domStyle.set(this.tableHeader3, {
          "background-color": this.headerColor,
        });
        domStyle.set(this.tableHeader4, {
          "background-color": this.headerColor,
        });
      },
    }
  );

  return decWidget;
});
