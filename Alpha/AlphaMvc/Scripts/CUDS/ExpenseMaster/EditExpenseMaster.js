$(document).ready(function () {
    GetExpenseGroup();
});
function GetExpenseGroup() {
    var dataObject = { typeID: '001' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        async:false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbExpenseGroup').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbExpenseGroup').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("txtDetail").disabled = true;
        document.getElementById("txtPricelist").disabled = true;
        document.getElementById("txtSeq").disabled = true;
        document.getElementById("btnSave").disabled = true;
        document.getElementById("cmbExpenseGroup").disabled = true;
    }
}
function GetData(val) { 
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13131/api/ExpenseMaster',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           var price = AddComma(parseFloat(data.Table[0].PriceList).toFixed(2))
           //alert(data.Table[0].ExpenseGroup);
           $("#txtDetail").val(data.Table[0].Detail);
           $("#cmbExpenseGroup").val(data.Table[0].ExpenseGroup);
           $("#txtPricelist").val(price);
           $("#txtSeq").val(data.Table[0].Seq);
           CheckAuthorization();
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var Price = $("#txtPricelist").val().replace(',', '');
    var dataObject = { ID: val, Detail: $("#txtDetail").val(), ExpenseGroup: $("#cmbExpenseGroup").find(":selected").val(), PriceList: Price, Seq: $("#txtSeq").val(), EditBy: localStorage['UserID'] };
        $.ajax(
        {
            url: 'http://localhost:13131/api/ExpenseMaster',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',

            success: function (data) {
                //alert('Update is completed');
                Redirect();
            }
            ,
            error: function (msg) {
                alert(msg);
            }
        });
}
function Redirect() {
    window.location.href = "../ExpenseMaster/IndexExpenseMaster";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}