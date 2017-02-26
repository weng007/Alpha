
function GetData(val) {
    alert(val);
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
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                alert('Update is completed');
            },
            error: function (msg) {
                alert(msg);
            }           
        })
};
function Redirect() {
    window.location = "IndexIncomeMaster";
}

