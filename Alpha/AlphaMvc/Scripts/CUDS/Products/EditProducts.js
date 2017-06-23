$(document).ready(function () {
    CheckAuthorization();
    var dataObject = { typeID: '003' };
    $.ajax({
        url: 'http://alphagroup.co.th:8082/api/MasterService',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbProductType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbProductType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '004' };
    $.ajax({
        url: 'http://alphagroup.co.th:8082/api/MasterService',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbUnitWeight').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbUnitWeight').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
    $("#dtReceiveDate").datepicker({
        inline: true,
        showOtherMonths: true
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');
    $("#dtReceiveDate").datepicker({ dateFormat: "mm/dd/yy" }).val()
});
function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("txtSerialNo").disabled = true;
        document.getElementById("txtMachineNo").disabled = true;
        document.getElementById("cmbProductType").disabled = true;
        document.getElementById("txtBrand").disabled = true;
        document.getElementById("txtSize").disabled = true;
        document.getElementById("txtModel").disabled = true;
        document.getElementById("txtLifetime").disabled = true;
        document.getElementById("dtReceiveDate").disabled = true;
        document.getElementById("cmbUnitWeight").disabled = true;
        document.getElementById("txtBalance").disabled = true;
        document.getElementById("txtRemain").disabled = true;
        document.getElementById("txtLost").disabled = true;
        document.getElementById("txtRepair").disabled = true;
        document.getElementById("txtBreak").disabled = true;
        document.getElementById("txtRemark").disabled = true;
        document.getElementById("btnSave").disabled = true;
        document.getElementById("photo").disabled = true;
    }
}
function GetData(val) {
    //alert("TestGetData")
    var dataObject = { ID: val }
    $.ajax(
   {
       url: 'http://alphagroup.co.th:8082/api/Product',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           var ReceiveDate = ChangeformatDate(data.Table[0].ReceiveDate, 0);
           //var ReceiveDate = new Date(data.Table[0].ReceiveDate);
           //ReceiveDate = (ReceiveDate.getDate() + '/' + (ReceiveDate.getMonth() + 1) + '/' + ReceiveDate.getFullYear());
           var baseStr64 = data.Table[0].ImgBase;
           if (baseStr64 != '')
           {
                imgPreview.setAttribute('src', "data:image/jpg;base64," + baseStr64);
           }
           var str = data.Table[0].Img;
           var res = str.replace("../Attach/Product/", "");
           $("#txtSerialNo").val(data.Table[0].SerialNo), $("#txtMachineNo").val(data.Table[0].MachineNo), $("#cmbProductType").val(data.Table[0].ProductType),
           $("#txtDiscription").val(data.Table[0].Description), $("#txtBrand").val(data.Table[0].Brand), $("#txtSize").val(data.Table[0].Size), $("#txtModel").val(data.Table[0].Model), $("#txtLifetime").val(data.Table[0].Lifetime),
           $("#dtReceiveDate").val(ReceiveDate), $("#cmbUnitWeight").val(data.Table[0].UnitWeight), $("#txtBalance").val(data.Table[0].Balance),
           $("#txtLost").val(data.Table[0].Lost), $("#txtRepair").val(data.Table[0].Repair),
           $("#txtBreak").val(data.Table[0].Break), $("#txtRemark").val(data.Table[0].Remark), $('#hidFilePath').val(data.Table[0].Img);
           GetDetail(val);
           GetRemain(val);
       },
       error: function (msg) {
           alert(msg);
       }

   });

    //alert("refID " + val);
    var dataObject = { refID: val }
    $.ajax(
    {
        url: 'http://alphagroup.co.th:8082/api/ProductFiles',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            //alert("Attah " + data.Table.length);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                var AttName = data.Table[i].AttachName;
                var res = AttName.split("_");
                str = res[3];
                str = str.toString();
                $("#hidProductFileID").val(data.Table[i].RefID);
                $("#hidAttachPath").val(data.Table[i].AttachPath);
                html += '<tr>';
                html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                html += '<td class="hidecolumn nopointer">' + data.Table[i].ID + '</td>';
                html += '<td class="hidecolumn">' + data.Table[i].RefID + '</td>';
                html += '<td class="nopointer"><a href="http://alphagroup.co.th:8082/Attach/Product/' + data.Table[i].AttachName + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + str + '</a></td>';
                html += '<td class="hidecolumn">' + data.Table[i].AttachPath + '</td>';
                html += '<td class="nopointer">';
                html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ProductFile'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgAdminDelete"/></a>';
                html += '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
            CheckAuthorization();
            //$('#tblIncomeMaster').paging({
            //    limit: 30,
            //    rowDisplayStyle: 'block',
            //    activePage: 0,
            //    rows: []
            //});
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'], AttachPath: $("#hidAttachPath").val() };
    $.ajax(
        {
            url: 'http://alphagroup.co.th:8082/api/ProductFiles',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed');
                window.location.href = "../Products/EditProducts?id=" + $("#hidProductFileID").val();
            }
            ,
            error: function (msg) {
                alert(msg)
            }

        });
}

function GetDetail(val) {
    var dataObject = { ProductID: val };
    $.ajax(
           {
               url: 'http://alphagroup.co.th:8082/api/Product',
               type: 'GET',
               datatype: 'json',
               data: dataObject,
               success: function (data) {
                   data = JSON.parse(data);
                   $("#txtLost").val(data.Table[0].ReturnLost);
                   $("#txtRepair").val(data.Table[0].ReturnRepair);
                   $("#txtBreak").val(data.Table[0].ReturnBad);
               },
               error: function (msg) {
                   alert(msg)
               }
           });
}
function GetRemain(val) {
    var dataObject = { ProductID: val };
    $.ajax(
       {
           url: 'http://alphagroup.co.th:8082/api/JobOrderBorrow',
           type: 'GET',
           async: false,
           data: dataObject,
           datatype: 'json',
           success: function (data) {
               data = JSON.parse(data);
               //alert(remain)
               $('#txtRemain').val(data.Table[0].Amount);
           },
           error: function (msg) {
               alert(msg);
           }

       });
}
function Update(val) {
    var ProductID;
    var imgElem = document.getElementById('imgPreview');
    var photo = document.getElementById("photo");
    var photoname = photo.value;
    if (photoname != '')
    {
        var file = photo.files[0];
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getYear();
        var str = y.toString();
        var res = str.substring(1, 3);
        var date2 = d + "_" + m + "_" + res+"_";
        FileName = date2 + file.name;
        var imgData = getBase64Image(imgElem);
        //var imgPath = ("./Attach/Product/" + FileName);
        var imgPath = ("../Attach/Product/" + FileName);
        //alert(imgPath)
        $('#hidFilePath').val(imgPath); 
    }
    var ReceiveDate = ChangeformatDate($("#dtReceiveDate").val(), 1);

    var dataObject = {
        ID: val, SerialNo: $("#txtSerialNo").val(), MachineNo: $("#txtMachineNo").val(), ProductType: $("#cmbProductType").find(":selected").val(),
        Description: $("#txtDiscription").val(), Brand: $("#txtBrand").val(),
        Size: $("#txtSize").val(), Model: $("#txtModel").val(), Lifetime: $("#txtLifetime").val(), ReceiveDate: ReceiveDate,
        UnitWeight: $("#cmbUnitWeight").find(":selected").val(), Balance: $("#txtBalance").val(),
        Remain: $("#txtRemain").val(), Remark: $("#txtRemark").val(), EditBy: localStorage['UserID'],
        Img: $('#hidFilePath').val(), ImgData: imgData
        
    };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://alphagroup.co.th:8082/api/Product',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            //alert('Update is completed');
            //window.location.href = "../Products/IndexProducts";
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });

    if (val > 0) {
        if (window.FormData !== undefined) {
            var fileUpload = document.getElementById('FileUpload1').files;
            //alert('fileUpload' + fileUpload.length);
            for (var i = 0; i < fileUpload.length; i++) {
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getYear();
                var str = y.toString();
                var res = str.substring(1, 3);
                var date2 = d + "_" + m + "_" + res + "_";
                var AttachFileName = date2 + fileUpload[i].name;
                var AttachPath = ("../Attach/Product/" + AttachFileName);
                var readresult;
                var str;

                var reader = new FileReader();
                reader.readAsDataURL(fileUpload[i]);
                reader.onload = function () {
                    readresult = reader.result;
                    var res = readresult.split(",");
                    str = res[1];
                    str = str.toString();
                    var dataObject = { RefID: val, AttachName: AttachFileName, AttachPath: AttachPath, AttachData: str, CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
                    //alert("Test Insert");
                    //console.log(dataObject);
                    $.ajax(
                    {
                        url: 'http://alphagroup.co.th:8082/api/ProductFiles',
                        type: 'POST',
                        async: false,
                        data: dataObject,
                        datatype: 'json',

                        success: function (data) {
                            //alert('Update is completed');
                        }
                        ,
                        error: function (msg) {
                            alert(msg);
                        }
                    });

                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }
        } else {
            alert("FormData is not supported.");
        }
    }
        window.location.href = "../Products/IndexProducts";

}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPreview')
                .attr('src', e.target.result)
                .width(100)
                .height(120);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function getBase64Image(imgElem) {
    // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
function DateWorking() {
    if ($("#dtSWorking").val() > $("#dtEWorking").val()) {

        $("#dtEWorking").val("")
        alert("Please Input Endworking more than Startworking");
    }
}
function Redirect() {
    window.location.href = "../Products/IndexProducts";
}