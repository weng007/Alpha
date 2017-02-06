$(document).ready(function () {

    var dataObject = { typeID: '003' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
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
        url: 'http://localhost:13131/api/MasterService',
        type: 'GET',
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

    $("#dtReceiveDate").datepicker();
});

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

function GetData(val) {
    var dataObject = { ID: val}
        //{ ID : @Request.Params["id"]};
    $.ajax(
   {
       url: 'http://localhost:13131/api/Product',
       type: 'GET',
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtSerialNo").val(data.Table[0].SerialNo),$("#txtMachineNo").val(data.Table[0].MachineNo), $("#cmbProductType").val(data.Table[0].ProductType),
           $("#txtBrand").val(data.Table[0].Brand),$("#txtSize").val(data.Table[0].Size),$("#txtModel").val(data.Table[0].Model),$("#txtLifetime").val(data.Table[0].Lifetime),
           $("#dtReceiveDate").val(data.Table[0].ReceiveDate),$("#cmbUnitWeight").val(data.Table[0].UnitWeight),$("#txtBalance").val(data.Table[0].Balance),$("#txtRemain").val(data.Table[0].Remain),$("#txtLost").val(data.Table[0].Lost),$("#txtRepair").val(data.Table[0].Repair),$("#txtBreak").val(data.Table[0].Break),$("#txtRemark").val(data.Table[0].Remark);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}

function Update(val) {
    var imgElem = document.getElementById('imgPreview');
    var photo = document.getElementById("photo");
    var file = photo.files[0];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getYear();
    var str = y.toString();
    var res = str.substring(1, 3);
    var date2 = d + "_" + m + "_" + res;
    FileName = date2 + file.name;
    alert(FileName);
    var imgData = getBase64Image(imgElem);
    var imgPath = ("../Picture/" + FileName);
    var dataObject = {ID: val, SerialNo: $("#txtSerialNo").val(), MachineNo: $("#txtMachineNo").val(), ProductType: $("#cmbProductType").find(":selected").val(), Brand: $("#txtBrand").val(),
        Size: $("#txtSize").val(), Model: $("#txtModel").val(), Lifetime: $("#txtLifetime").val(), ReceiveDate: $("#dtReceiveDate").val(),
        UnitWeight: $("#cmbUnitWeight").find(":selected").val(), Balance: $("#txtBalance").val(), Remain: $("#txtRemain").val(), Lost: $("#txtLost").val(), Repair: $("#txtRepair").val(),
        Break: $("#txtBreak").val(), Img: imgPath, ImgData: imgData, Remark: $("#txtRemark").val()
    };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/Product',
        type: 'PUT',
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            alert('Update is completed');
            top.location.href = "/Products/IndexProducts";
        }
        ,
        error: function (msg) {
            //alert(msg);
            alert("test3");
        }
    });
}