sap.ui.define([], function (){
    "usestrict";
    return {
        statusText:function (sStatus) {
                switch (sStatus) {
                    case"A":
                        return"승인"
                    case"B":
                        return"처리대기";
                    case"C":
                        return"반려";
                    default:
                return sStatus;
            }
        }
    };
});