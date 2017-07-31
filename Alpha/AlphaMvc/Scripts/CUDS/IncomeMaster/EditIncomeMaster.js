function ControlEnable(Isview)
{
    //var Isview = val;
    if(Isview)
    {
        document.getElementById("txtDetail").disabled = true;
        document.getElementById("txtPricelist").disabled = true;
        document.getElementById("txtSeq").disabled = true;
        document.getElementById("btnSave").disabled = true;
    }
}
function GetData(val) {
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13131/api/IncomeMaster',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           var price = AddComma(parseFloat(data.Table[0].PriceList).toFixed(2))
           $("#txtDetail").val(data.Table[0].Detail);
           $("#txtPricelist").val(price);
           $("#txtSeq").val(data.Table[0].Seq);
           CheckAuthorization();
       },
       error: function (msg) {
           //alert(msg);
       }

   });
}
function Update(val) {
    var Price = $("#txtPricelist").val().replace(',', '');
    var dataObject = { ID: val, Detail: $("#txtDetail").val(), PriceList: Price, Seq: $("#txtSeq").val(), EditBy: localStorage['UserID'] };
       $.ajax(
        {
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                //alert('Update is completed');
                window.location.href = "../IncomeMaster/IndexIncomeMaster";
            },
            error: function (msg) {
                //alert(msg);
            }           
        })
};
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}
//function Redirect() {
   
//}

