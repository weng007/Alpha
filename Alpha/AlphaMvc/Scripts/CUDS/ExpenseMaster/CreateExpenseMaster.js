function CreateData() {
    var dataObject = { Detail: $("#txtDetail").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
    $.ajax(
    {
        url: 'http://alphagroup.co.th:8082/api/ExpenseMaster',
        type: 'POST',
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            //alert('Created Successfully');
            window.location.href = "../ExpenseMaster/IndexExpenseMaster";
        },
        error: function (msg) { alert(msg); }
    });
}