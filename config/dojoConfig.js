// เป็นตัวบอกว่า Widget อยู่ที่ไหน
var baseLocation = window.location.origin;
var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));

var dojoConfig = {
    parseOnLoad: true,
    isDebug: false,
    packages: [
        { name: "widget", location: baseLocation + dir + "/widget" },
        { name: "css", location: baseLocation + dir + "/css" },
    ],
    usePlainJson: true,
    locale: 'th',
    extraLocale: ['en'],
    async: true
};