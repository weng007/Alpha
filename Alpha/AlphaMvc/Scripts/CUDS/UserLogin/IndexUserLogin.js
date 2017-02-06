$(document).ready(function () {

    $("#UserLogin").click(function () {
        alert("test0");
        var dataObject = { UserName: $("#txtUserName").val(), Password: $("#txtpassword").val() };
        //console.log(dataObject);
        var IsExists = false;
        event.PreventDefault();
        $.ajax(
        {
            url: 'http://localhost:13131/api/UserLogin',
            type: 'GET',
            async:false,
            datatype: 'json',
            //success: function (data) {
            //    data = JSON.parse(data);
            //    console.log(data);
            //    for (var i = 0; i < data.Table.length; i++) {
            //        if (dataObject.UserName == data.Table[i].UserName) {
            //            console.log(dataObject.UserName);
            //            alert(dataObject.UserName);
            //            IsExists = true;
            //        }
            //    }
                success: function(data, textStatus, jqXHR){
                    console.log(jqXHR.status);
                    window.location.href =  'http://localhost:1042/Technician/indexTechnician';

                //if (IsExists) {
                //    //alert('Insert');
                //    window.location = 'http://localhost:1042/Technician/indexTechnician';
                //    //window.location = "/Home/Index";
                //}
                //else{
                //    alert('User is not found');
                //}

            },
            error: function (msg) {
                alert(msg)
            }
        });
    });
});