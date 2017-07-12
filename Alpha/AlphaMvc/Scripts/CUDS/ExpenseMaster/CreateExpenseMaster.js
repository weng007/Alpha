$(document).ready(function () {
    var dataObject = { typeID: '001' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbTypeWorking').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbTypeWorking').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
});
function CreateData() {
    var Price = $("#txtPrice").val().replace(',', '');
    var dataObject = { Detail: $("#txtDetail").val(), ExpenseGroup: $("#cmbTypeWorking").find(":selected").val(), PriceList: Price, Seq: $("#txtSeq").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
    $.ajax(
    {
        url: 'http://localhost:13131/api/ExpenseMaster',
        type: 'POST',
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            //alert('Created Successfully');
            window.location.href = "../ExpenseMaster/IndexExpenseMaster";
        },
        error: function (msg) { alert(msg); }
    });
}
function convertFloat(str) {
    
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}