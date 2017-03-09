$(document).ready(function () {

    var dataObject = { typeID: '003' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
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

            //ProductTypeVal = $("#cmbProductType").find(":selected").val();

        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '004' };
    $.ajax({
        url: 'http://localhost:13131/api/MasterService',
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

            //UnitWeightVal = $("#cmbUnitWeight").find(":selected").val();
            //console.log(UnitWeightVal);
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
    $('#dtReceiveDate').datepicker().datepicker('setDate', 'today');
});
function CreateData() {
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
    var imgData = getBase64Image(imgElem);
    var imgPath = ("../Picture/" + FileName);
    var dataObject = {
        SerialNo: $("#txtSerialNo").val(), MachineNo: $("#txtMachineNo").val(), ProductType: $("#cmbProductType").find(":selected").val(), Brand: $("#txtBrand").val(),
        Size: $("#txtSize").val(), Model: $("#txtModel").val(), Lifetime: $("#txtLifetime").val(), ReceiveDate: $("#dtReceiveDate").val(),
        UnitWeight: $("#cmbUnitWeight").find(":selected").val(), Balance: $("#txtBalance").val(), Remain: $("#txtRemain").val(),Remark: $("#txtRemark").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'],
        Img: imgPath, ImgData: imgData,
        
    };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/Product',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            alert('Created Successfully');
            window.location.href = "../Products/IndexProducts";
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPreview')
                .attr('src', e.target.result)
                .width(245)
                .height(168);
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





