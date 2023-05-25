let GlobalFunction = new Object()


(GlobalFunction.CallAPIService = function(serviceUrl, param, callBack) {
    $.ajax({
      type: "POST",
      url: serviceUrl,
      dataType: "json",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      data: JSON.stringify(param || {}),
      crossDomain: true
    })
      .done(function(r) {
        callBack(r);
      })
      .fail(function(e) {
        console.log(e);
      });
  })
    (GlobalFunction.CallAPIServicePUT = function(serviceUrl, param, callBack) {
      $.ajax({
        type: "PUT",
        url: serviceUrl,
        dataType: "json",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(param || {}),
        crossDomain: true
      })
        .done(function(r) {
          callBack(r);
        })
        .fail(function(e) {
          console.log(e);
        });
    })
    (GlobalFunction.CallAPIServiceGet = function(serviceUrl, callBack) {
      //กดปุ่มย้ายสถานะ
      $.ajax({
        type: "GET",
        url: serviceUrl,
        dataType: "json",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        crossDomain: true
      })
        .done(function(r) {
          // console.log("resu", r);
          callBack(r);
        })
        .fail(function(e) {
          console.log(e);
        });
    })
    (GlobalFunction.CallAPIServiceAsync = function(serviceUrl, param) {
      var deffered = $.ajax({
        type: "POST",
        url: serviceUrl,
        dataType: "json",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(param || {}),
        crossDomain: true
      });
      return deffered;
    })
    (GlobalFunction.getSqlDataDateNowFormat = function() {
      var date = new Date();
  
      function fillZero(val) {
        return val < 10 ? "0" + val : val;
      }
  
      var theDate =
        date.getFullYear() +
        "-" +
        fillZero(date.getMonth() + 1) +
        "-" +
        fillZero(date.getDay());
      var theTime =
        fillZero(date.getHours()) +
        ":" +
        fillZero(date.getMinutes()) +
        ":" +
        fillZero(date.getSeconds()) +
        "." +
        fillZero(date.getMilliseconds());
      return theDate + " " + theTime;
    })
    (GlobalFunction.convertDateFormat = function(value) {
      var sDate = new Date(value);
      var sDay = sDate.getDate();
      var sMonth = sDate.getMonth() + 1;
      var sYear = sDate.getFullYear();
      if (sMonth < 10) sMonth = "0" + sMonth;
      if (sDay < 10) sDay = "0" + sDay;
      var date = sYear + "/" + sMonth + "/" + sDay;
  
      return date;
    });
  GlobalFunction.currencyFormat = function(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      s +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : "")
    );
  };
  
  GlobalFunction.convertDateNow = function() {
    var sDate = new Date();
    var sDay = sDate.getDate();
    var sMonth = sDate.getMonth() + 1;
    var sYear = sDate.getFullYear();
    if (sMonth < 10) sMonth = "0" + sMonth;
    if (sDay < 10) sDay = "0" + sDay;
    var date = sYear + "-" + sMonth + "-" + sDay;
  
    return date;
  };
  GlobalFunction.convertDateJson = function(value) {
    var dateString = value.substr(6);
    var currentTime = new Date(parseInt(dateString));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var date = year + "-" + month + "-" + day;
    return date;
  };
  
  GlobalFunction.convertDateForControl = function(value) {
    var n = value.split(" ");
    var m = n[0].split("-");
    var sDate = new Date();
    sDate.setFullYear(m[0], m[1] - 1, m[2]);
  
    return sDate;
  };
  
  GlobalFunction.convertToComboBoxAutoCompleteData = function(
    data,
    labelName,
    idName
  ) {
    var reData = new Array();
  
    for (var i = 0; i < data.length; i++) {
      //   objectCbo.push({ key: this.arrJson[i].id, name: this.arrJson[i].name })
      reData.push({
        name: data[i][labelName],
        key: data[i][idName]
      });
    }
  
    return reData;
  };
  
  GlobalFunction.convertToComboBoxData = function(
    data,
    labelName,
    idName,
    additionalFields
  ) {
    var reData = new Array();
  
    for (var i = 0; i < data.length; i++) {
      var obj = {
        label: data[i][labelName],
        id: data[i][idName]
      };
  
      if (additionalFields && additionalFields.length > 0) {
        //for (var key in additionalFields) {
        //    obj[key] = data[i][additionalFields[key]];
        //}
        for (var ind = 0; ind < additionalFields.length; ind++) {
          obj[additionalFields[ind]] = data[i][additionalFields[ind]];
        }
      }
  
      reData.push(obj);
    }
  
    return reData;
  };
  
  GlobalFunction.convertPriceForTable = function(value) {
    if (value) {
      return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  };
  GlobalFunction.convertDateTimeForTable = function(value) {
    if (value) {
      console.log(value);
      console.log(value.split(" "));
      var strDate = value.split(" ");
      console.log(strDate);
      var convertDate = strDate[0];
  
      var strConvertDate = convertDate.split("-");
  
      var sDay = strConvertDate[2];
      var sMonth = strConvertDate[1];
      var sYear = parseInt(strConvertDate[0]) + 543;
  
      switch (sMonth) {
        case "01":
          sMonth = "ม.ค.";
          break;
        case "02":
          sMonth = "ก.พ.";
          break;
        case "03":
          sMonth = "มี.ค.";
          break;
        case "04":
          sMonth = "เม.ย.";
          break;
        case "05":
          sMonth = "พ.ค.";
          break;
        case "06":
          sMonth = "มิ.ย.";
          break;
        case "07":
          sMonth = "ก.ค.";
          break;
        case "08":
          sMonth = "ส.ค.";
          break;
        case "09":
          sMonth = "ก.ย.";
          break;
        case "10":
          sMonth = "ต.ค.";
          break;
        case "11":
          sMonth = "พ.ย.";
          break;
        case "12":
          sMonth = "ธ.ค.";
          break;
        default:
          sMonth = "-";
          break;
      }
      var date = sDay + " " + sMonth + " " + sYear + " " + strDate[1];
      return date;
    } else {
      return "";
    }
  };
  GlobalFunction.convertDateForTable = function(value) {
    if (value) {
      var strDate = value.split(" ");
      var convertDate = strDate[0];
  
      var strConvertDate = convertDate.split("-");
  
      var sDay = strConvertDate[2];
      var sMonth = strConvertDate[1];
      var sYear = parseInt(strConvertDate[0]) + 543;
  
      switch (sMonth) {
        case "01":
          sMonth = "ม.ค.";
          break;
        case "02":
          sMonth = "ก.พ.";
          break;
        case "03":
          sMonth = "มี.ค.";
          break;
        case "04":
          sMonth = "เม.ย.";
          break;
        case "05":
          sMonth = "พ.ค.";
          break;
        case "06":
          sMonth = "มิ.ย.";
          break;
        case "07":
          sMonth = "ก.ค.";
          break;
        case "08":
          sMonth = "ส.ค.";
          break;
        case "09":
          sMonth = "ก.ย.";
          break;
        case "10":
          sMonth = "ต.ค.";
          break;
        case "11":
          sMonth = "พ.ย.";
          break;
        case "12":
          sMonth = "ธ.ค.";
          break;
        default:
          sMonth = "-";
          break;
      }
      var date = sDay + " " + sMonth + " " + sYear;
      return date;
    } else {
      return "";
    }
  };
  GlobalFunction.convertDateForTableDaysNotZero = function(value) {
    if (value) {
      var strDate = value.split(" ");
      var convertDate = strDate[0];
  
      var strConvertDate = convertDate.split("-");
  
      var sDay = parseInt(strConvertDate[2]);
      var sMonth = strConvertDate[1];
      var sYear = parseInt(strConvertDate[0]) + 543;
      sYear = sYear.toString().substring(2);
  
      switch (sMonth) {
        case "01":
          sMonth = "ม.ค.";
          break;
        case "02":
          sMonth = "ก.พ.";
          break;
        case "03":
          sMonth = "มี.ค.";
          break;
        case "04":
          sMonth = "เม.ย.";
          break;
        case "05":
          sMonth = "พ.ค.";
          break;
        case "06":
          sMonth = "มิ.ย.";
          break;
        case "07":
          sMonth = "ก.ค.";
          break;
        case "08":
          sMonth = "ส.ค.";
          break;
        case "09":
          sMonth = "ก.ย.";
          break;
        case "10":
          sMonth = "ต.ค.";
          break;
        case "11":
          sMonth = "พ.ย.";
          break;
        case "12":
          sMonth = "ธ.ค.";
          break;
        default:
          sMonth = "-";
          break;
      }
      var date = sDay + " " + sMonth + " " + sYear;
      return date;
    } else {
      return "";
    }
  };
  GlobalFunction.convertDateTimeForTable = function(value) {
    if (value) {
      var strDate = value.split(" ");
      var convertDate = strDate[0];
  
      var strConvertDate = convertDate.split("-");
  
      var sDay = strConvertDate[2];
      var sMonth = strConvertDate[1];
      var sYear = parseInt(strConvertDate[0]) + 543;
  
      switch (sMonth) {
        case "01":
          sMonth = "ม.ค.";
          break;
        case "02":
          sMonth = "ก.พ.";
          break;
        case "03":
          sMonth = "มี.ค.";
          break;
        case "04":
          sMonth = "เม.ย.";
          break;
        case "05":
          sMonth = "พ.ค.";
          break;
        case "06":
          sMonth = "มิ.ย.";
          break;
        case "07":
          sMonth = "ก.ค.";
          break;
        case "08":
          sMonth = "ส.ค.";
          break;
        case "09":
          sMonth = "ก.ย.";
          break;
        case "10":
          sMonth = "ต.ค.";
          break;
        case "11":
          sMonth = "พ.ย.";
          break;
        case "12":
          sMonth = "ธ.ค.";
          break;
        default:
          sMonth = "-";
          break;
      }
  
      var date = sDay + " " + sMonth + " " + sYear;
      var time = value.substring(11, 16) + " น.";
      var dateTime = date + " เวลา " + time;
  
      return dateTime;
    } else {
      return "";
    }
  };
  GlobalFunction.mapReposition = function() {
    $(".dijitTooltip").css("display", "none");
  
    //document.getElementById("btnFocus").focus();
    if (
      GlobalVariable.Map.mapControl != null &&
      GlobalVariable.Map.flagPreSurvery == true
    ) {
      GlobalVariable.Map.mapControl.reposition();
    }
  };
  GlobalFunction.showLoading = function() {
    document.getElementById("divFilterLoading").style.display = "block";
    //$("#divFilterLoading").css("display", "block");
  };
  
  GlobalFunction.hideLoading = function() {
    document.getElementById("divFilterLoading").style.display = "none";
    //$("#divFilterLoading").css("display", "none");
  };
  
  GlobalFunction.showMessageBox = function(message, type, onConfirm, onCancel) {
    require([
      "dojo/ready",
      "dojo/parser",
      "dojo/on",
      "dojo/dom",
      "dojo/_base/lang",
      "dijit/registry",
      "dojo/dom-construct",
      "widget/core/Popup",
      "widget/core/Dialog"
    ], function(
      ready,
      parser,
      on,
      dom,
      lang,
      registry,
      domConstruct,
      Popup,
      Dialog
    ) {
      ready(function() {
        type = type || "Message";
  
        var wgDialog = new Dialog({
          setTextConfirm: "ปิด"
        });
        wgDialog.setContain(message);
        wgDialog.setDataType(type);
  
        var popup = new Popup({
          width: 400,
          height: 160,
          content: wgDialog,
          title: "ข้อความ"
        });
  
        on(
          wgDialog,
          "Confirm",
          lang.hitch(this, function() {
            popup.close();
  
            if (onConfirm != null) {
              onConfirm();
            }
          })
        );
  
        on(
          wgDialog,
          "Cancle",
          lang.hitch(this, function() {
            popup.close();
  
            if (onCancel != null) {
              onCancel();
            }
          })
        );
  
        popup.open();
      });
    });
  };
  
  GlobalFunction.showConfirm = function(
    message,
    onConfirm,
    onCancel,
    width,
    height,
    showImage,
    confirmTxt,
    cancelTxt
  ) {
    var wgDialog = new GlobalVariable.require.Dialog();
    wgDialog.setContain(message || GlobalVariable.msg.PopupMessage.confirm);
    wgDialog.setDataType("Confirm");
  
    if (showImage) {
      wgDialog.showAlertImage(true);
    } else {
      wgDialog.showAlertImage(false);
    }
  
    if (confirmTxt && cancelTxt) {
      wgDialog.setBtnText(confirmTxt, cancelTxt);
    }
  
    width = width || 400;
    height = height || 150;
  
    var popupConfirm = new GlobalVariable.require.Popup({
      width: width,
      height: height,
      content: wgDialog,
      title: GlobalVariable.msg.PopupMessage.header
    });
    GlobalVariable.require.domStyle.set(popupConfirm.domNode, "zIndex", 1001);
    GlobalVariable.require.on(
      wgDialog,
      "Confirm",
      GlobalVariable.require.lang.hitch(this, function() {
        popupConfirm.close();
  
        if (onConfirm != undefined && onConfirm != null) {
          onConfirm();
        }
      })
    );
  
    GlobalVariable.require.on(
      wgDialog,
      "Cancle",
      GlobalVariable.require.lang.hitch(this, function() {
        popupConfirm.close();
  
        if (onCancel != undefined && onCancel != null) {
          onCancel();
        }
      })
    );
  
    popupConfirm.open();
  };
  
  GlobalFunction.showMessage = function(message, width, height, onClose) {
    var subscriptNameUnique = "SHOWMESSAGE_" + Date.now();
    var wgDialog = new GlobalVariable.require.Dialog({
      setTextConfirm: "ปิด",
      setClose: subscriptNameUnique
    });
    wgDialog.setContain(message || GlobalVariable.msg.PopupMessage.noMessage);
    wgDialog.setDataType("Message");
  
    width = width || 400;
    height = height || 150;
    var popup = new GlobalVariable.require.Popup({
      width: width,
      height: height,
      content: wgDialog,
      title: GlobalVariable.msg.PopupMessage.header,
      zIndex: 1010,
      subscribeName: subscriptNameUnique
    });
    GlobalVariable.require.on(
      wgDialog,
      "Confirm",
      GlobalVariable.require.lang.hitch(this, function() {
        popup.close();
        //if (onClose != undefined && onClose != null) {
        //    onClose();
        //}
      })
    );
    GlobalVariable.require.on(
      popup,
      "Close",
      GlobalVariable.require.lang.hitch(this, function() {
        if (onClose != undefined && onClose != null) {
          onClose();
        }
        //popup.close();
      })
    );
  
    popup.open();
  };
  
  GlobalFunction.showError = function(
    message,
    service,
    messageError,
    width,
    height
  ) {
    width = width || 400;
    height = height || 150;
    var wgDialog = new GlobalVariable.require.Dialog({
      setTextConfirm: "ปิด"
    });
    wgDialog.setContain(message || GlobalVariable.MessageError);
    wgDialog.setDataType("Message");
    console.log("service ", service);
    console.log("messageError ", messageError);
    var popup = new GlobalVariable.require.Popup({
      width: width,
      height: height,
      content: wgDialog,
      title: "ข้อความ",
      subscribeName: "wgShowError",
      zIndex: 1010
    });
    GlobalVariable.require.on(
      wgDialog,
      "Confirm",
      GlobalVariable.require.lang.hitch(this, function() {
        popup.close();
      })
    );
  
    popup.open();
  };
  
  GlobalFunction.showBubble = function(message, time, onClose, width, height) {
    width = width || 400;
    height = height || 150;
    time = time || GlobalVariable.TimeBuble;
    var wgDialog = new GlobalVariable.require.Dialog({
      setTextConfirm: "ปิด"
    });
    wgDialog.setContain(message || GlobalVariable.MessageSuccess);
    wgDialog.setDataType("Message");
    var popup = new GlobalVariable.require.Popup({
      width: width,
      height: height,
      content: wgDialog,
      title: "ข้อความ",
      subscribeName: "wgShowBubble",
      zIndex: 1010,
      closeBtn: false
    });
    var timer = setTimeout(
      GlobalVariable.require.lang.hitch(this, function() {
        popup.close();
        if (onClose != undefined && onClose != null) {
          onClose();
        }
      }),
      time
    );
    GlobalVariable.require.on(
      wgDialog,
      "Confirm",
      GlobalVariable.require.lang.hitch(
        this,
        function(_timer) {
          if (onClose != undefined && onClose != null) {
            clearTimeout(_timer);
            onClose();
          }
          popup.close();
        },
        timer
      )
    );
  
    popup.open();
  };
  
  GlobalFunction.startTimeout = function() {
    if (GlobalVariable.WebTimeout > 0) {
      GlobalFunction.clearTimeout();
      GlobalVariable.timer = setTimeout(
        GlobalVariable.TimeoutCallbackFunction,
        GlobalVariable.WebTimeout * 60 * 1000
      );
    }
  };
  
  GlobalFunction.clearTimeout = function() {
    clearTimeout(GlobalVariable.timer);
  };
  
  GlobalFunction.getRequestUrl = function(requestType, requestId) {
    /*1 = คำขอขอเปิดแฟรนไชส์ (เปิดร้านใหม่) 
      2 = คำขอโอนสิทธิ์-เปลี่ยนชื่อนิติบุคคล เจ้าของเดิม (ใช้ SHOP ID เดิม)
      3 = คำขอโอนสิทธิ์-เปลี่ยนชื่อนิติบุคคล เจ้าของใหม่ (สร้าง SHOP ID ใหม่)
      */
    var url_return = GlobalVariable.request_sharepoint_Path;
    var request_type_folder = "";
    var request_year = "";
    if (requestType != undefined && requestType > 0 && requestType <= 3) {
      switch (requestType) {
        case 1:
          request_type_folder = "new_request";
          break;
        case 2:
          request_type_folder = "transfer_old_owner";
          break;
        case 3:
          request_type_folder = "transfer_new_owner";
          break;
      }
      var date_now = new Date();
      var buddha_year =
        date_now.getFullYear() > 2500
          ? date_now.getFullYear()
          : date_now.getFullYear() + 543;
      url_return = url_return.replace("{year}", buddha_year);
      url_return = url_return.replace("{request_type}", request_type_folder);
      url_return = url_return.replace("{request_id}", requestId);
    } else {
      url_return = GlobalVariable.SharepointRootURL;
    }
  
    return url_return;
  };
  
  GlobalFunction.getCustomerProfileUrl = function(folderCustomerProfile, shopId) {
    //general
    //construct
    //contract
    //payment
    //equipment
    //    POS
    //audit
    //pm_cm
    var url_return = GlobalVariable.customerprofile_sharepoint_Path;
    if (folderCustomerProfile != undefined && shopId != undefined) {
      url_return = url_return.replace("{shop_id}", shopId);
      if (folderCustomerProfile != "")
        url_return = url_return + folderCustomerProfile;
    } else {
      url_return = GlobalVariable.SharepointRootURL;
    }
    return url_return;
  };
  GlobalFunction.getViewMode = function(func_id) {
    var view_mode = false;
    var arrMenu = GlobalVariable.require.JsonQuery(
      "..[?id='" + func_id + "']",
      global.menu
    );
  
    if (arrMenu.length > 0) {
      view_mode = arrMenu[0].viewmode;
    }
    return view_mode;
  };
  
  GlobalFunction.checkTouchable = function() {
    var isTouchable = false;
    // console.log(navigator.appName, "navigator.appName");
    // console.log(navigator.userAgent, "navigator.userAgent");
    if (navigator.appName == "Netscape") {
      var ua = navigator.userAgent;
      isTouchable = ua.indexOf(" Touch") > 0;
    }
  
    return isTouchable;
  };
  
  GlobalFunction.uniqueObjects = function extend(fobj, sobj) {
    if (typeof fobj == "object" && typeof sobj == "object") {
      var newfobj = Object();
      for (var prop in fobj) {
        if (prop != undefined) {
          newfobj[prop] = fobj[prop];
        }
      }
      return newfobj;
    }
  };
  
  GlobalFunction.getUniqueKey = function(digits) {
    return (Math.random().toString(36) + "00000000000000000").slice(
      2,
      digits + 2
    );
  };
  