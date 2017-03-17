function CreateData() {
    var input = window.location.href;
    var after = input.split('?')[1]
    var ID = after.split('-');
    //alert(ID);
    var dataObject = {
        RefID: ID, Brand: $("#txtBrand").val(), Serial: $("#txtSerial").val(), Model: $("#txtModel").val(), Size: $("#txtSize").val(), Amount: $("#txtAmount").val(), Remark: $("#txtRemark").val(), ReturnGood: $("#txtReturnGood").val(), ReturnLost: $("#txtReturnLost").val(),
        ReturnRepair: $("#txtReturnRepair").val(), ReturnBad: $("#txtReturnBad").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID']
    };
    $.ajax(
    {
        url: 'http://localhost:13131/api/JobOrderBorrow',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (result) {
            alert('Create is completed')
            window.location.href = "../Borrow/EditBorrow?id=" + ID;
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });
}