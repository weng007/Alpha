function CheckAuthorization() {
    //alert('test');
    var dataObject = { ID: localStorage['UserID'] };
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13131/api/CheckAuthorization',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            //alert(data.Table.length);
            for (var i = 0; i < data.Table.length; i++) {
                    if (data.Table[i].MenuName == "Administration") {
                        if (data.Table[i].Role == 7) {
                            $('#admincreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            $('img.adminupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            $('.admindeleteDisable').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('#admincreateDisable').attr("style", "display:none");
                            $('img.adminupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#admincreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.adminupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.adminupdateDisable').attr("style", "display:none");
                            $('#admincreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#admindisable').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "Technician") {
                        if (data.Table[0].Role == 7) {
                            $('img.TechcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 6) {
                            $('img.TechupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 5) {
                            $('img.TechdeleteDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 4) {
                            $('img.TechcreateDisable').attr("style", "display:none");
                            $('img.TechupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 3) {
                            $('img.TechcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 2) {
                            $('img.TechupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 1) {
                            $('img.TechupdateDisable').attr("style", "display:none");
                            $('img.TechcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 0) {
                            $('#techniciandisable').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "Products") {
                        if (data.Table[0].Role == 7) {
                            $('#productscreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 6) {
                            $('img.productsupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 5) {
                            $('img.productsdeleteDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 4) {
                            $('#productscreateDisable').attr("style", "display:none");
                            $('img.productsupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 3) {
                            $('#productscreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 2) {
                            $('img.productsupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 1) {
                            $('img.productsupdateDisable').attr("style", "display:none");
                            $('#productscreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 0) {
                            $('#productsdisable').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "BDC") {
                        if (data.Table[0].Role == 7) {
                            $('#BDCcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 6) {
                            $('img.BDCupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 5) {
                            $('img.BDCdeleteDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 4) {
                            $('#BDCcreateDisable').attr("style", "display:none");
                            $('img.BDCupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 3) {
                            $('#BDCcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 2) {
                            $('img.BDCupdateDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 1) {
                            $('img.BDCupdateDisable').attr("style", "display:none");
                            $('img.createDisable').attr("style", "display:none");
                        }
                        if (data.Table[0].Role == 0) {
                            $('#BDCdisable').attr("style", "display:none");
                        }
                    }
                }
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

