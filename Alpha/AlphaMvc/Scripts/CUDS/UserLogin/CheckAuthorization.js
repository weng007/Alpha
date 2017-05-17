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
                if (data.Table[i].MenuName == "Dashboard") {
                    
                    if (data.Table[i].Role == 0) {
                        $('#mnDashboard').attr("style", "display:none");
                    }
                }
                    if (data.Table[i].MenuName == "Administration") {
                        if (data.Table[i].Role == 7) {
                            $('#imgAdminCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            $('img.imgAdminUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            $('img.imgAdminDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('#imgAdminCreate').attr("style", "display:none");
                            $('img.imgAdminUpdate').attr("style", "display:none");
                            $('img.imgAdminView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#imgAdminCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgAdminUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgAdminUpdate').attr("style", "display:none");
                            $('#imgAdminCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#mnAdmin').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "Carlendar") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgCarlendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgCarlendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgCarlendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
               
                            $('img.imgCarlendarDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            
                            $('img.imgCarlendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgCarlendarUpdate').attr("style", "display:none");
                            //$('#carlendarcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#mnCarlendar').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "Technician") {
                        if (data.Table[i].Role == 7) {
                            
                            $('img.imgTechCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            
                            $('img.imgTechUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            
                            $('img.imgTechDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgTechCreate').attr("style", "display:none");
                            $('img.imgTechUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('img.imgTechCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgTechUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgTechUpdate').attr("style", "display:none");
                            $('img.imgTechCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#mnTechnician').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "Products") {
                        //Role7 CreateäÁèä´é
                        if (data.Table[i].Role == 7) {
                            $('#ProductsCreate').attr("style", "display:none");
                        }
                        //Role6 UpdateäÁèä´é
                        if (data.Table[i].Role == 6) {
                            $('img.imgProductsUpdate').attr("style", "display:none");
                        }
                        //Role5 DeleteäÁèä´é
                        if (data.Table[i].Role == 5) {
                            
                            $('img.imgProductsDelete').attr("style", "display:none");
                        }
                        //Role4 Create, UpdateäÁèä´é
                        if (data.Table[i].Role == 4) {
                            $('#ProductsCreate').attr("style", "display:none");
                            $('img.imgProductsUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#ProductsCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            
                            $('img.imgProductsUpdate').attr("style", "display:none");
                            $('img.imgProductsDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgProductsUpdate').attr("style", "display:none");
                            $('#ProductsCreate').attr("style", "display:none");
                        }
                        //Role0 à¢éÒàÁ¹ÙäÁèä´é
                        if (data.Table[i].Role == 0) {
                            $('#productsdisable').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "BDC") {
                        if (data.Table[i].Role == 7) {
                            $('#BDCCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            $('img.imgBDCUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            $('img.imgBDCDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            $('#BDCCreate').attr("style", "display:none");
                            $('img.imgBDCUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            $('#BDCCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgBDCUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgBDCUpdate').attr("style", "display:none");
                            $('img.createDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('#mnBDC').attr("style", "display:none");
                        }
                    }
                    if (data.Table[i].MenuName == "Payment") {
                        if (data.Table[i].Role == 7) {
                            $('#PaymentCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //alert("Role 6");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //alert("Role 5");
                            $('img.imgPaymentDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 4) {
                            //alert("Role 4");
                            //$('#PaymentCreate').attr("style", "display:none");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            //alert("Role 3");
                            $('img.imgPaymentDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            //alert("Role 2");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            //alert("Role 1");
                            $('img.imgPaymentUpdate').attr("style", "display:none");
                            //$('img.createDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            //alert("Role 0");
                            $('#imgPayment').attr("style", "display:none");
                        }
                    }
                }
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

