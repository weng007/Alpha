function CreateData() {
    var Price = $("#txtPrice").val().replace(',', '');
    var dataObject = { Detail: $("#txtDetail").val(), PriceList: Price, Seq: $("#txtSqe").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
    $.ajax(
    {
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'POST',
        data: dataObject,
        datatype: 'json',

        success: function (result) {
            //alert('Create is completed')
            window.location.href = "../IncomeMaster/IndexIncomeMaster";
        }
        ,
        error: function (msg) {
            //alert(msg)
        }
    });
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}