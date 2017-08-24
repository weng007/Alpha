function CheckAuthorization() {
    //alert('test');
    var IsDashboard = 0;
    var IsIncome = 0;
    var IsExpense = 0;
    var IsSecurity = 0;
    var IsUser = 0;
    var IsActivity = 0;
    var IsJobCalendar = 0;
    var IsManCalendar = 0;
    var IsTechnician = 0;
    var IsExpired = 0;
    var IsStock = 0;
    var IsStockAdjust = 0;
    var IsRequisition = 0;
    var IsEstimate = 0;
    var IsJobOrder = 0;
    var IsPaymentAlpha = 0;
    var IsRptJobOrder = 0;
    var IsRptRequisition = 0;
    var IsRptJobPayment = 0;
    var dataObject = { ID: localStorage['UserID'] };
    console.log(dataObject);
    //alert(localStorage['UserID']);
    if (localStorage['UserID'] != undefined) {
        $.ajax(
        {
            url: 'http://localhost:13131/api/CheckAuthorization',
            type: 'GET',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                for (var i = 0; i < data.Table.length; i++) {
                    //(Dashboard)Dashboard
                    if (data.Table[i].MenuName == "MN001") {
                        if (data.Table[i].Role == 0) {
                            $('#mnDashboard').attr("style", "display:none");
                            IsDashboard = 1;
                        }
                    }
                    //(Administrator)Income
                    if (data.Table[i].MenuName == "MN002") {
                        if (data.Table[i].Role == 7) {
                            //Update,Delete
                            $('#imgIncomeCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //Insert, Delete
                            $('img.imgIncomeUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            $('img.imgIncomeDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            $('#imgIncomeCreate').attr("style", "display:none");
                            $('img.imgIncomeUpdate').attr("style", "display:none");
                            //$('img.imgIncomeView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgIncomeCreate').attr("style", "display:none");
                            $('img.imgIncomeDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgIncomeUpdate').attr("style", "display:none");
                            $('img.imgIncomeDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgIncomeUpdate').attr("style", "display:none");
                            $('img.imgIncomeDelete').attr('style', 'display:none');
                            $('#imgIncomeCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subIncome').attr("style", "display:none");
                            IsIncome = 1;
                        }
                    }
                    //(Administrator)Expense
                    if (data.Table[i].MenuName == "MN003") {
                        if (data.Table[i].Role == 7) {
                            //Update,Delete
                            $('#imgExpenseCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //Insert, Delete
                            $('img.imgExpenseUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            $('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            $('#imgExpenseCreate').attr("style", "display:none");
                            $('img.imgExpenseUpdate').attr("style", "display:none");
                            //$('img.imgExpenseView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgExpenseCreate').attr("style", "display:none");
                            $('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgExpenseUpdate').attr("style", "display:none");
                            $('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgExpenseUpdate').attr("style", "display:none");
                            $('#imgExpenseCreate').attr("style", "display:none");
                            $('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subExpense').attr("style", "display:none");
                            IsExpense = 1;
                        }
                    }
                    //(Administrator)Security Profile, User
                    if (data.Table[i].MenuName == "MN004") {
                        if (data.Table[i].Role == 7) {
                            //Update,Delete
                            $('#imgSecurityCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //Insert, Delete
                            $('img.imgSecurityUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            $('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            $('#imgSecurityCreate').attr("style", "display:none");
                            $('img.imgSecurityUpdate').attr("style", "display:none");
                            //$('img.imgSecurityView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgSecurityCreate').attr("style", "display:none");
                            $('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgSecurityUpdate').attr("style", "display:none");
                            $('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgSecurityUpdate').attr("style", "display:none");
                            $('#imgSecurityCreate').attr("style", "display:none");
                            $('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subSecurity').attr("style", "display:none");
                            IsSecurity = 1;
                        }
                    }
                    //(Administrator)User
                    if (data.Table[i].MenuName == "MN005") {
                        if (data.Table[i].Role == 7) {
                            //Update,Delete
                            $('#imgUserCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //Insert, Delete
                            $('img.imgUserUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            $('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            $('#imgUserCreate').attr("style", "display:none");
                            $('img.imgUserUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgUserCreate').attr("style", "display:none");
                            $('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgUserUpdate').attr("style", "display:none");
                            $('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgUserUpdate').attr("style", "display:none");
                            $('#imgUserCreate').attr("style", "display:none");
                            $('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subUser').attr("style", "display:none");
                            IsUser = 1;
                        }
                    }
                    //(Activity)All Activity
                    if (data.Table[i].MenuName == "MN006") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgActivityUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgActivityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgActivityUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {

                            $('img.imgActivityDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgActivityDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgActivityUpdate').attr("style", "display:none");
                            $('img.imgActivityDelete').attr("style", "display:none");
                            //$('#ActivitycreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subActivity').attr("style", "display:none");
                            IsActivity = 1;
                        }
                    }
                    //(Activity)JobCalendar
                    if (data.Table[i].MenuName == "MN007") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgJobCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                            $('img.imgJobCalendarView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {

                            $('img.imgJobCalendarDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                            $('img.imgJobCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                            $('img.imgJobCalendarDelete').attr('style', 'display:none');
                            //$('#JobCalendarcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subJobCalendar').attr("style", "display:none");
                            IsJobCalendar = 1;
                        }
                    }
                    //(Activity)ManCalendar
                    if (data.Table[i].MenuName == "MN008") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgManCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                            $('img.imgManCalendarView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {

                            $('img.imgManCalendarDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                            $('img.imgManCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                            $('img.imgManCalendarDelete').attr('style', 'display:none');
                            //$('#ManCalendarcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subManCalendar').attr("style", "display:none");
                            IsManCalendar = 1;
                        }
                    }
                    //(Technician & Card)Technician
                    if (data.Table[i].MenuName == "MN009") {
                        if (data.Table[i].Role == 7) {

                            $('img.imgTechCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {

                            $('img.imgTechUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgTechDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgTechCreate').attr("style", "display:none");
                            $('img.imgTechUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('img.imgTechCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgTechUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgTechUpdate').attr("style", "display:none");
                            $('img.imgTechCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subTechnician').attr("style", "display:none");
                            IsTechnician = 1;
                        }
                    }
                    //(Technician & Card)Expired Technician
                    if (data.Table[i].MenuName == "MN010") {
                        if (data.Table[i].Role == 7) {

                            $('img.imgExpiredCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {

                            $('img.imgExpiredUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgExpiredDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgExpiredCreate').attr("style", "display:none");
                            $('img.imgExpiredUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('img.imgExpiredCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgExpiredUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgExpiredUpdate').attr("style", "display:none");
                            $('img.imgExpiredCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subExpired').attr("style", "display:none");
                            IsExpired = 1;
                        }
                    }
                    //(Tools & Machine)Stock
                    if (data.Table[i].MenuName == "MN011") {
                        //Role7 CreateäÁèä´é
                        if (data.Table[i].Role == 7) {
                            $('#imgProductsCreate').attr("style", "display:none");
                        }
                        //Role6 UpdateäÁèä´é
                        if (data.Table[i].Role == 6) {
                            $('img.imgProductsUpdate').attr("style", "display:none");
                        }
                        //Role5 DeleteäÁèä´é
                        if (data.Table[i].Role == 5) {

                            $('img.imgProductsDelete').attr("style", "display:none");
                        }
                        //Role4 Create, UpdateäÁèä´é
                        if (data.Table[i].Role == 4) {
                            $('#imgProductsCreate').attr("style", "display:none");
                            $('img.imgProductsUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgProductsCreate').attr("style", "display:none");
                            $('img.imgProductsDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgProductsUpdate').attr("style", "display:none");
                            $('img.imgProductsDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgProductsUpdate').attr("style", "display:none");
                            $('img.imgProductsDelete').attr("style", "display:none");
                            $('#imgProductsCreate').attr("style", "display:none");
                        }
                        //Role0 à¢éÒàÁ¹ÙäÁèä´é
                        if (data.Table[i].Role == 0) {
                            $('#subProducts').attr("style", "display:none");
                            IsStock = 1;
                        }
                    }
                    //(Tools & Machine)StockAdjust
                    if (data.Table[i].MenuName == "MN012") {
                        //Role7 CreateäÁèä´é
                        if (data.Table[i].Role == 7) {
                            $('#StockAdjustCreate').attr("style", "display:none");
                        }
                        //Role6 UpdateäÁèä´é
                        if (data.Table[i].Role == 6) {
                            $('img.imgStockAdjustUpdate').attr("style", "display:none");
                        }
                        //Role5 DeleteäÁèä´é
                        if (data.Table[i].Role == 5) {

                            $('img.imgStockAdjustDelete').attr("style", "display:none");
                        }
                        //Role4 Create, UpdateäÁèä´é
                        if (data.Table[i].Role == 4) {
                            $('#StockAdjustCreate').attr("style", "display:none");
                            $('img.imgStockAdjustUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#StockAdjustCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgStockAdjustUpdate').attr("style", "display:none");
                            $('img.imgStockAdjustDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgStockAdjustUpdate').attr("style", "display:none");
                            $('#StockAdjustCreate').attr("style", "display:none");
                        }
                        //Role0 à¢éÒàÁ¹ÙäÁèä´é
                        if (data.Table[i].Role == 0) {
                            $('#subStockAdjust').attr("style", "display:none");
                            IsStockAdjust = 1;
                        }
                    }
                    //(Tools & Machine)Requisition & Return
                    if (data.Table[i].MenuName == "MN013") {
                        //Role7 CreateäÁèä´é
                        if (data.Table[i].Role == 7) {
                            $('#RequisitionCreate').attr("style", "display:none");
                        }
                        //Role6 UpdateäÁèä´é
                        if (data.Table[i].Role == 6) {
                            $('img.imgRequisitionUpdate').attr("style", "display:none");
                        }
                        //Role5 DeleteäÁèä´é
                        if (data.Table[i].Role == 5) {

                            $('img.imgRequisitionDelete').attr("style", "display:none");
                        }
                        //Role4 Create, UpdateäÁèä´é
                        if (data.Table[i].Role == 4) {
                            $('#RequisitionCreate').attr("style", "display:none");
                            $('img.imgRequisitionUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#RequisitionCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgRequisitionUpdate').attr("style", "display:none");
                            $('img.imgRequisitionDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgRequisitionUpdate').attr("style", "display:none");
                            $('#RequisitionCreate').attr("style", "display:none");
                        }
                        //Role0 à¢éÒàÁ¹ÙäÁèä´é
                        if (data.Table[i].Role == 0) {
                            $('#subReqisition').attr("style", "display:none");
                            IsRequisition = 1;
                        }
                    }
                    //(Estimate & Job Order)Estimate Price
                    if (data.Table[i].MenuName == "MN014") {
                        if (data.Table[i].Role == 7) {
                            $('#imgBDCCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            $('img.imgBDCUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            $('img.imgBDCDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            $('#imgBDCCreate').attr("style", "display:none");
                            $('img.imgBDCUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgBDCCreate').attr("style", "display:none");
                            $('img.imgBDCDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgBDCUpdate').attr("style", "display:none");
                            $('img.imgBDCDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgBDCUpdate').attr("style", "display:none");
                            $('img.imgJobOrderCreate').attr("style", "display:none");
                            $('img.imgBDCDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subBDC').attr("style", "display:none");
                            IsEstimate = 1;
                        }
                    }
                    //(Estimate & Job Order)Job Order
                    if (data.Table[i].MenuName == "MN015") {
                        if (data.Table[i].Role == 7) {
                            $('#JobOrderCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            $('img.imgJobOrderUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            $('img.imgJobOrderDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            $('#JobOrderCreate').attr("style", "display:none");
                            $('img.imgJobOrderUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#JobOrderCreate').attr("style", "display:none");
                            $('img.imgJobOrderDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgJobOrderUpdate').attr("style", "display:none");
                            $('img.imgJobOrderDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgJobOrderUpdate').attr("style", "display:none");
                            $('img.createDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#subJobOrder').attr("style", "display:none");
                            IsJobOrder = 1;
                        }
                    }
                    //Cost & Price
                    if (data.Table[i].MenuName == "MN016") {
                        //alert("Test");
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#txtPrice').attr("style", "display:none");
                            $('#txtProfit').attr("style", "display:none");
                            $('#txtCost').attr("style", "display:none");
                            $('#lblPrice').attr("style", "display:none");
                            $('#lblProfit').attr("style", "display:none");
                            $('#lblCost').attr("style", "display:none");
                            $('.gvPrice').attr("style", "display:none");
                            $('.gvProfit').attr("style", "display:none");
                            $('.gvCost').attr("style", "display:none");

                            //footer JobOrderIncome
                            $('#txtTotal').attr("style", "display:none");
                            $('#txtDiscount').attr("style", "display:none");
                            $('#txtSubTotal').attr("style", "display:none");
                            $('.ftTotal').attr("style", "display:none");
                            $('.ftDiscount').attr("style", "display:none");
                            $('.ftSubTotal').attr("style", "display:none");
                            //table JobOrderIncome
                            $('.Price').attr("style", "display:none");
                            $('.Amountop').attr("style", "display:none");
                            $('.UnitPrice').attr("style", "display:none");
                            $('.UnitPrice1').attr("style", "display:none");
                            $('.Amount').attr("style", "display:none");

                            //footer JobOrderExpense
                            $('#txtTotalExpense').attr("style", "display:none");
                            $('#txtNoCompound').attr("style", "display:none");
                            $('#txtExpense').attr("style", "display:none");
                            $('#txtProfit').attr("style", "display:none");
                            $('.lblNoCompound').attr("style", "display:none");
                            $('.lblExpense').attr("style", "display:none");
                            $('.lblProfit').attr("style", "display:none");

                            //table JobOrderExpense
                            $('.Amount1').attr("style", "display:none");

                            //JobOrderSaleOrder, Invoice, Receipt
                            $('.gvAmount').attr("style", "display:none");
                            $('.Amount2').attr("style", "display:none");
                            $('.Amount3').attr("style", "display:none");
                            $('.Amount4').attr("style", "display:none");

                        }
                    }
                    //(Payment)Alpha & Outsource
                    if (data.Table[i].MenuName == "MN017") {
                        if (data.Table[i].Role == 7) {
                            $('#PaymentCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //alert("Role 6");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //alert("Role 5");
                            $('img.imgPaymentDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            //alert("Role 4");
                            //$('#PaymentCreate').attr("style", "display:none");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            //alert("Role 3");
                            $('img.imgPaymentDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            //alert("Role 2");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            //alert("Role 1");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                            //$('img.createDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#subPayment').attr("style", "display:none");
                            IsPaymentAlpha = 1;
                        }
                    }
                    //(Report)Job Order, Requisition
                    if (data.Table[i].MenuName == "MN018") {
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#subRptJob').attr("style", "display:none");
                            IsRptJobOrder = 1;
                            //alert("subRptJob");
                        }
                    }
                    //(Report)Requisition
                    if (data.Table[i].MenuName == "MN019") {
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#subRptRequisition').attr("style", "display:none");
                            IsRptRequisition = 1;
                            //alert("subRptRequisition");
                        }
                    }

                    if (data.Table[i].MenuName == "MN020") {
                        if (data.Table[i].Role == 0) {
                            $('#Manpowertab').attr("style", "display:none");
                        }
                    }
                    //Approve
                    if (data.Table[i].MenuName == "MN021") {
                        if (data.Table[i].Role == 0) {
                            var temp = document.getElementById("chkApprove");
                            if (temp != null) {
                                document.getElementById("chkApprove").disabled = true;
                            }

                        }
                    }
                    //Return
                    if (data.Table[i].MenuName == "MN022") {
                        if (data.Table[i].Role == 0) {
                            var temp = document.getElementById("chkReturn");
                            if (temp != null) {
                                document.getElementById("chkReturn").disabled = true;
                            }
                            $('.mnReturn').attr("style", "display:none");
                            //$('.mnReturn').css("visibility", "hidden");
                        }
                    }
                    if (data.Table[i].MenuName == "MN023") {
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#subRptJobPayment').attr("style", "display:none");
                            IsRptJobPayment = 1;
                            //alert("subRptJobPayment");
                        }
                    }


                    if (IsDashboard == 1) {
                        $('#mnDashboard').attr("style", "display:none");
                    }
                    if (IsIncome == 1 && IsExpense == 1 && IsSecurity == 1 && IsUser == 1) {
                        $('#mnAdministrator').attr("style", "display:none");
                    }
                    if (IsActivity == 1 && IsJobCalendar == 1 && IsManCalendar == 1) {
                        $('#mnActivity').attr("style", "display:none");
                    }
                    if (IsTechnician == 1 && IsExpired == 1) {
                        $('#mnTechnician').attr("style", "display:none");
                    }
                    if (IsStock == 1 && IsStockAdjust == 1 && IsRequisition == 1) {
                        $('#mnTools').attr("style", "display:none");
                    }
                    if (IsEstimate == 1 && IsJobOrder == 1) {
                        $('#mnEstimate').attr("style", "display:none");
                    }
                    if (IsPaymentAlpha == 1) {
                        $('#mnPayment').attr("style", "display:none");
                    }
                    if (IsRptJobOrder == 1 && IsRptRequisition == 1 && IsRptJobPayment == 1) {
                        //alert("mnReport");
                        $('#mnReport').attr("style", "display:none");
                    }
                    
                }
                //alert(data.Table.length);

            },
            error: function (msg) {
                alert(msg)
            }
        });
    }
    else {
        location = "../Login/IndexLogin";
    }
   



}

