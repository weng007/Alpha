function CreateData() {
    var Price = $("#txtPricelist").val().replace(',', '');
    var dataObject = { Detail: $("#txtDetail").val(), PriceList: Price, Seq: $("#txtSeq").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
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
    //alert("Test");
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}