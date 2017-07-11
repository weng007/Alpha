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
        document.getElementById("txtPrice").disabled = true;
        document.getElementById("btnSave").disabled = true;
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
           //alert(data.Table[0].ExpenseGroup);
           $("#txtDetail").val(data.Table[0].Detail);
           $("#cmbExpenseGroup").val(data.Table[0].ExpenseGroup);
           $("#txtPrice").val(data.Table[0].PriceList);
           $("#txtSeq").val(data.Table[0].Seq);
           CheckAuthorization();
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = { ID: val, Detail: $("#txtDetail").val(), ExpenseGroup: $("#cmbExpenseGroup").find(":selected").val(), PriceList: $("#txtPrice").val(), Seq: $("#txtSeq").val(), EditBy: localStorage['UserID'] };
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