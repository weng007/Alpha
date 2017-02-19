function CreateData() {
    var dataObject = { Detail: $("#Detail").val(),CreateBy: 1,EditBy:1 };
    $.ajax(
    {
        url: 'http://localhost:13131/api/IncomeMaster',
        type: 'POST',
        data: dataObject,
        datatype: 'json',

        success: function (result) {
            alert('Create is completed')
            window.location.href = "../IncomeMaster/IndexIncomeMaster";
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });
}