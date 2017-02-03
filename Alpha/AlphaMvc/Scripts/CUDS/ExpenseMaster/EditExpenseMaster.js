
function GetData(val) {
    var dataObject = { ID: val}
    //alert('Round2');
    $.ajax(
   {
       url: 'http://localhost:13131/api/ExpenseMaster',
       type: 'GET',
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
    alert(val);
    var dataObject = { ID: val, Detail: $("#Detail").val() }
            //{ ID: @Request.Params["id"], Detail: $("#Detail").val() };
        $.ajax(
        {
            url: 'http://localhost:13131/api/ExpenseMaster',
            type: 'PUT',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                alert('Update is completed');
                top.location.href = "/ExpenseMaster/IndexExpenseMaster";
            }
            ,
            error: function (msg) {
                alert(msg);
                top.location.href = "/ExpenseMaster/Index";
            }
        });
}