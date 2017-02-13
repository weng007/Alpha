
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
           $("#Detail").val(data.Table[0].Detail);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}

function Update(val) {
    var dataObject = { ID: val, Detail: $("#Detail").val() }
        $.ajax(
        {
            url: 'http://localhost:13131/api/ExpenseMaster',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Update is completed');
            }
            ,
            error: function (msg) {
                alert(msg);
            }
        });
}
function Redirect() {
    window.location = "IndexExpenseMaster";
}