function ControlEnable(Isview)
{
    //var Isview = val;
    if(Isview)
    {
        document.getElementById("txtDetail").disabled = true;
        document.getElementById("txtPrice").disabled = true;
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
           $("#txtDetail").val(data.Table[0].Detail);
           $("#txtPrice").val(data.Table[0].PriceList);
           $("#txtSeq").val(data.Table[0].Seq);
           CheckAuthorization();
       },
       error: function (msg) {
           //alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = { ID: val, Detail: $("#txtDetail").val(), PriceList: $("#txtPrice").val(), Seq: $("#txtSqe").val(), EditBy: localStorage['UserID'] }
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
//function Redirect() {
   
//}

