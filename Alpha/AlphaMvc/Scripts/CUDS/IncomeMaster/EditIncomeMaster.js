
function GetData(val) {
    var dataObject = { ID: val}
        //{ ID : @Request.Params["id"]};
    $.ajax(
   {
       url: 'http://localhost:13131/api/IncomeMaster',
       type: 'GET',
       data : dataObject,
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
            url: 'http://localhost:13131/api/IncomeMaster',
            type: 'PUT',
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                alert('Update is completed');
                window.location.href = "../IncomeMaster/IndexIncomeMaster";
            }
            ,
            error: function (msg) {
                alert(msg);
            }
        });
}