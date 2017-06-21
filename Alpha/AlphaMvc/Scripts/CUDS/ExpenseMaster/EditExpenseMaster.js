function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("txtDetail").disabled = true;
        document.getElementById("btnSave").disabled = true;
    }
}
function GetData(val) {
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://alphagroup.co.th:8082/api/ExpenseMaster',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtDetail").val(data.Table[0].Detail);
           CheckAuthorization();
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = { ID: val, Detail: $("#txtDetail").val(), EditBy: localStorage['UserID'] }
        $.ajax(
        {
            url: 'http://alphagroup.co.th:8082/api/ExpenseMaster',
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