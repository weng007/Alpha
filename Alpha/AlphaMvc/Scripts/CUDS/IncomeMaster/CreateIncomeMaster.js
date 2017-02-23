function CreateData() {
    var dataObject = { Detail: $("#txtDetail").val(),CreateBy: localStorage['UserID'],EditBy:localStorage['UserID'] };
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