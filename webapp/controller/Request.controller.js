sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter"
], (Controller, formatter, Filter, FilterOperator, Fragment, Sorter) => {
    "use strict";

    return Controller.extend("project1.controller.Request", {
        formatter: formatter,

        onSearch: function() {
            let ReqNum= this.byId("ReqNum").getValue();
            let ReqGood = this.byId("ReqGood").getValue();
            let Requester = this.byId("Requester").getValue();
            let ReqDate = this.byId("ReqDate").getValue();
            let ReqStatus = this.byId("ReqStatus").getSelectedKey();

            if(ReqDate) {
                let ReqYear = ReqDate.split(".")[0];
                let ReqMonth = ReqDate.split(".")[1].padStart(2, '0');
                ReqDate=ReqYear+ "-"+ ReqMonth;
            }

            var aFilter = [];

            if(ReqNum) {aFilter.push(new Filter("ReqNum",FilterOperator.Contains, ReqNum))}
            if(ReqGood) {aFilter.push(new Filter("ReqGood", FilterOperator.Contains,ReqGood))}
            if(Requester) {aFilter.push(new Filter("Requester",FilterOperator.Contains, Requester))}
            if(ReqDate) {aFilter.push(new Filter("ReqDate", FilterOperator.Contains,ReqDate))}
            if(ReqStatus) {aFilter.push(new Filter("ReqStatus",FilterOperator.Contains, ReqStatus))}

            let oTable = this.byId("RequestTable").getBinding("rows");
            oTable.filter(aFilter);
        },

        onSort : function () {
            if(!this.byId("SortDialog")) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.fragment.SortDialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    oDialog.open("filter")
                }.bind(this))
            }  else {
                this.byId("SortDialog").open("filter")
            }
            this.onSearch();
        },
        onConfirmSortDialog: function (oEvent) {
            let mParams = oEvent.getParameters();
            let sPath = mParams.sortItem.getKey();
            let bDescending = mParams.sortDescending;
            let aSorters = [];

            console.log(mParams)
            console.log(sPath)

            aSorters.push(new Sorter(sPath, bDescending));
            let oBinding = this.byId("RequestTable").getBinding("rows");
            oBinding.sort(aSorters);
        }
    });
});