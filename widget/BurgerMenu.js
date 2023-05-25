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
    FormAdd,
    SelectType,
) {
    // (function(href) {
    //     let headID = document.getElementsByTagName("head").item(0),
    //         cssNode;
    //     let link = document.getElementsByTagName("link");
    //     let cssExist = false;
    //     for (let j = 0; j < link.length; j++) {
    //       if (
    //         link
    //           .item(j)
    //           .href.toString()
    //           .indexOf(href) > -1
    //       ) {
    //         cssExist = true;
    //         break;
    //       }
    //     }
    //     if (!cssExist) {
    //       cssNode = document.createElement("link");
    //       cssNode.type = "text/css";
    //       cssNode.rel = "stylesheet";
    //       cssNode.href = href;
    //       headID.appendChild(cssNode);
    //     }
    // })(require.toUrl("../css/burger.css"));

    let type = [
        "All",
        "Food",
        "Dessert",
        "Beverage",
    ];

    let fastFood = [
        {name:"Cheese Burger", type:"Food", price: 100},
        {name:"Fish Burger", type:"Food", price: 80},
        {name:"Double Cheese Burger", type:"Food", price: 120},
        {name:"Chocholate Sundae", type:"Dessert", price: 30},
        {name:"Water", type:"Beverage", price: 10},
        {name:"Soft Drink", type:"Beverage", price: 15},
    ];
    
    let decWidget = declare(
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
        {
          basePath: require.toUrl("./"),
          templateString: templates,
          baseClass: "burger-table",
    
          _table: null,
          storage: [],
          
        // ต้องมี
         constructor: function (param, elem) {
          },
    
        //   ไม่ค่อยใช้
          postMixInProperties: function() {},
            
          // ต้องมี (เวลามีการ new Widget มันจะเข้า postCreate ก่อน ค่อยเข้า startUp)
          postCreate: function () {
            this.inherited(arguments); // ต้องมี ช่วยให้เวลาเรียก this มันจะรู้ว่าเป็นตัวไหนใน html

                // ในนี้จะมีทุกอย่างที่ต้องการทำ
                localStorage.setItem('foodList', JSON.stringify(fastFood))
                this.setTable()
            
                let selectType = new SelectType({ type })
                this.selectFood.appendChild(selectType.domNode)
          
                // Handle click on "Add" button
               let widgetFormAdd = new FormAdd({type, title: "BurgerMenu", mode: "ADD"});
               on(
                 this.add,
                 "click",
                 lang.hitch(this, function(e) {
                     this.form.appendChild(widgetFormAdd.domNode)
                 })
               );
              
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
                
                    on(
                      this.selectFood,
                      "click",
                      lang.hitch(this, function(e) {
                        let search = selectType.getValue();
                        if (search) {
                          let list = fastFood.filter(item => item.type === search)
                          localStorage.clear()
                          localStorage.setItem('foodList', JSON.stringify(list))
                          this.setTable()
                        }
                      })
                  );
            },
    
          startup: function() {
            this.inherited(arguments);
          },

          setTable: function(from) {
            this.storage = localStorage.getItem('foodList')
                
                for (let i = 0; i < JSON.parse(this.storage).length; i++) {
                    let tableRow = domConstruct.create('tr')
                    let btnEdit = domConstruct.create("button")
                    let btnDelete = domConstruct.create("button")

                    for (let d = 0; d < 5; d++) { 
                        let tableData = domConstruct.create("td")
                        if (d === 0) {
                            tableData.innerText = fastFood[i].name
                        } else if (d === 1) {
                            tableData.innerText = fastFood[i].type
                        } else if (d === 2) {
                            tableData.innerText = fastFood[i].price
                        } else if (d === 3) {
                            btnEdit.type = "button"
                            btnEdit.id = "edit"
                            btnEdit.innerText = "Edit"
                            domAttr.set(btnEdit, "data-dojo-attach-point", "edit");
                            tableData.appendChild(btnEdit)
                        } else if (d === 4) {
                            btnDelete.type = "button"
                            btnDelete.id = "delete"
                            btnDelete.innerText = "Delete"
                            domAttr.set(btnDelete, "data-dojo-attach-point", "delete");
                            tableData.appendChild(btnDelete)
                        }
                        tableRow.appendChild(tableData)
                  }
                  if (from === "delete") {
                    // ต้อง replace ของเก่าที่มี จะได้ไม่แสดงซ้อนของเก่า
                  } else {
                    this.burgertable.appendChild(tableRow)
                  }

                     // Handle click on "Edit" button
                    on(
                     btnEdit,
                     "click",
                     lang.hitch(this, function(e) {
                      let widgetFormEdit = new FormAdd({type, title: "BurgerMenu", mode: "EDIT", data: fastFood[i]});
                      this.form.appendChild(widgetFormEdit.domNode)
                     })
                    );
    
                    // Handle click on "Delete" button
                     on(
                        btnDelete,
                        "click",
                        lang.hitch(this, function (e) {
                        let newList = fastFood.filter((item,idx) => idx !== i)
                        localStorage.setItem('foodtList', JSON.stringify(newList))
                        this.setTable("delete")
                       })
                      );
              }
          },
    
          onEdit: function(item) {},
    
          onDelete: function(item) {},
            
            //   การเปลี่ยนสีจาก prop ที่ส่งมา (วิธีใหม่ที่ dojo สร้างให้เราใช้โดยเติม Attr ต่อท้าย แลพรับ parameter 1 ตัว)
          _setHeaderColorAttr: function (value) {
            this.headerColor = value;
            domStyle.set(this.tableHeader1, {
                "background-color": this.headerColor
            });
            domStyle.set(this.tableHeader2, {
                "background-color": this.headerColor
            });
            domStyle.set(this.tableHeader3, {
                "background-color": this.headerColor
            });
            domStyle.set(this.tableHeader4, {
                "background-color": this.headerColor
            });

        },
        }
    );
    
    return decWidget
  })