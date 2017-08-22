$(document).ready(function () {


    //$('#btnUpload').click(function () {
    //    // Checking whether FormData is available in browser  
    //    if (window.FormData !== undefined) {

    //        var fileUpload = $("#FileUpload1").get(0);
    //        var files = fileUpload.files;

    //        // Create FormData object  
    //        var fileData = new FormData();

    //        // Looping over all files and add it to FormData object  
    //        for (var i = 0; i < files.length; i++) {
    //            fileData.append(files[i].name, files[i]);
    //        }

    //        // Adding one more key to FormData object  
    //        //fileData.append('username', 'Manas');
    //        //alert(fileData);
    //        $.ajax({
    //            url: 'http://localhost:13131/api/ProductFiles/UploadFiles',
    //            type: "POST",
    //            contentType: false, // Not to set any content header  
    //            processData: false, // Not to process data  
    //            data: fileData,
    //            success: function (result) {
    //                alert(result);
    //                alert('test');
    //            },
    //            error: function (err) {
    //                alert(err.statusText);
    //                alert('test1');
    //            }
    //        });
    //    } else {
    //        alert("FormData is not supported.");
    //    }
    //});



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
        showOtherMonths: true,
        dateFormat: "dd/mm/yy"
    })
    .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');
    $("#dtReceiveDate").datepicker({ dateFormat: "dd/mm/yy" }).val()
    $('#dtReceiveDate').datepicker().datepicker('setDate', 'today');
});
function GetRemain()
{
    var balance = $("#txtBalance").val();
    $("#txtRemain").val(balance);
}
function getBase64(file) {
    var readresult;
    var str;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
        readresult = reader.result;
        var res = readresult.split(",");
        str = res[1];
        str = str.toString();
        //alert(str);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    return str;
}

function CreateData() {
    var ProductID;
    var imgElem = document.getElementById('imgPreview');
    var photo = document.getElementById("photo");
    var photoname = photo.value;
    if (photoname != '') {
        var file = photo.files[0];
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getYear();
        var str = y.toString();
        var res = str.substring(1, 3);
        var date2 = d + "_" + m + "_" + res + "_";
        FileName = date2 + file.name;
        var imgData = getBase64Image(imgElem);
        //alert(imgData);
        var imgPath = ("../Attach/Product/" + FileName);
    }
    var RDate = ChangeformatDate($("#dtReceiveDate").val(), 1);
    var dataObject = {
        SerialNo: $("#txtSerialNo").val(), MachineNo: $("#txtMachineNo").val(), ProductType: $("#cmbProductType").find(":selected").val(),
        Description: $("#txtDiscription").val(), Brand: $("#txtBrand").val(),
        Size: $("#txtSize").val(), Model: $("#txtModel").val(), Lifetime: $("#txtLifetime").val(), ReceiveDate: RDate,
        UnitWeight: $("#cmbUnitWeight").find(":selected").val(), Balance: $("#txtBalance").val(), Remain: $("#txtRemain").val(),Remark: $("#txtRemark").val(), CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'],
        Img: imgPath, ImgData: imgData,
        
    };
    $.ajax(
    {
        url: 'http://localhost:13131/api/Product',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            ProductID = data;
            //alert(ProductID);
        },
        error: function (msg) {
            alert(msg);
        }
    });
        if (ProductID > 0) {
            if (window.FormData !== undefined) {
                var fileUpload = document.getElementById('FileUpload1').files;
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
                    var dataObject = { RefID: ProductID, AttachName: AttachFileName, AttachPath: AttachPath, AttachData: str, CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
                    
                        $.ajax(
                        {
                            url: 'http://localhost:13131/api/ProductFiles',
                            type: 'POST',
                            data: dataObject,
                            datatype: 'json',
                            async:false,
                            success: function (data) {
                                //alert('Update is completed');
                            }
                            ,
                            error: function (msg) {
                                //alert(msg);
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
    
        window.location.href = "../Products/EditProducts?id=" + ProductID;
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPreview')
                .attr('src', e.target.result)
                //.width(245)
                //.height(168);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function getBase64Image(imgElem) {
    var canvas = document.createElement("canvas");
    //canvas.width = imgElem.clientWidth;
    //canvas.height = imgElem.clientHeight;
    canvas.width = 750;
    canvas.height = 750;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
function Redirect() {
    window.location.href = "../Products/IndexProducts";
}






