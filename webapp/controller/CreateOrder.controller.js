sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
        "usestrict";
        return Controller.extend("project1.controller.CreateOrder",{
            onBack: function() {
                this.getOwnerComponent().getRouter().navTo("Request");
            }
    });
 });