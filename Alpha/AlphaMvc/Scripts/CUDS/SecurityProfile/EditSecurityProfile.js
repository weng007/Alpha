function ControlEnable(Isview) {
    //var Isview = val;
    //alert(Isview);
    if (Isview) {
        document.getElementById("txtProfile").disabled = true;
        document.getElementById("btnSave").disabled = true;
        $('input:checkbox').attr("disabled", 'disabled');
    }
}
function GetData(val) {
    //alert('test');
    CheckAuthorization();
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13131/api/SecurityProfile',
       type: 'GET',
       async: false,
       data : dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtProfile").val(data.Table[0].Profile);

           //alert(data.Table1.length);
           if (data.Table1.length > 0) {

                   var html = '';
                   for (var i = 0; i < data.Table1.length; i++) {
                       //alert(data.Table1[i].IsView);
                       var IsView = data.Table1[i].IsView == '1' ? 'Checked' : '';
                       var IsInsert = data.Table1[i].IsInsert == '1' ? 'Checked' : '';
                       var IsUpdate = data.Table1[i].IsUpdate == '1' ? 'Checked' : '';
                       var IsDelete = data.Table1[i].IsDelete == '1' ? 'Checked' : '';

                       //alert(IsView);
                       html += '<tr class="RowCal">';
                       html += '<td>' + data.Table1[i].RowNum + '</td>';
                       html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '"/></td>';
                       html += '<td>' + data.Table1[i].MenuType + '</td>';
                       html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table1[i].MenuTypeID + '"/></td>';
                       html += '<td><input id="chkIsView" type="checkbox" class="IsView"' + IsView + ' ></td>';
                       if (data.Table1[i].MenuTypeID != 57)
                       {
                           html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()" ' + IsInsert + '></td>';
                           html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()" ' + IsUpdate + '></td>';
                           html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete" ' + IsDelete + '></td>';
                       }
                       else
                       {
                           html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" style="display:none" onchange="GetChecked()" ' + IsInsert + '></td>';
                           html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" style="display:none" onchange="GetChecked()" ' + IsUpdate + '></td>';
                           html += '<td><input id="chkIsDelete" type="checkbox" style="display:none" class="IsDelete" ' + IsDelete + '></td>';
                       }
                       
                       html += '</tr>';
                   }
                   document.getElementById("result").innerHTML = html;
           }
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var dataObject = { ID: val,Profile: $("#txtProfile").val(), EditBy: localStorage['UserID'] };
    var SecurityID = val;
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/SecurityProfile',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            //alert('data ' + data);

        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });

    var dataObject = {};
    $(".RowCal").each(function () {
        dataObject.ID = $(this).find(".hidID").val();
        dataObject.SecurityID = SecurityID;
        dataObject.MenuTypeID = $(this).find(".hidMenuTypeID").val();
        dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
        dataObject.IsInsert = $(this).find('.IsInsert').is(":checked") == true ? 1 : 0;
        dataObject.IsUpdate = $(this).find(".IsUpdate").is(":checked") == true ? 1 : 0;
        dataObject.IsDelete = $(this).find(".IsDelete").is(":checked") == true ? 1 : 0;
        dataObject.EditBy = localStorage['UserID'];
        $.ajax(
        {
            url: 'http://localhost:13131/api/SecurityProfileDetail',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {

            },
            error: function (msg) {
                alert(msg)
            }
        });
    });
    //alert('Update is completed')
    window.location.href = "../SecurityProfile/IndexSecurityProfile";
};
function Redirect() {
    window.location = "IndexSecurityProfile";
}

