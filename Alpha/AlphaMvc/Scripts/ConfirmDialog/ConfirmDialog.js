function Isvalidate(val, topic, id) {
    if (topic == "IncomeMaster") {
        if ($("#txtDetail").val() == '') {
            //document.getElementById("ShowValidate").innerHTML = '*';
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input Detail.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else {
            ConfirmDialog(val, topic, id);
        }
    }
    if (topic == "ExpenseMaster") {
        if ($("#txtDetail").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input Detail.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else {
            ConfirmDialog(val, topic, id);
        }
    }
    if (topic == "Products") {
        if ($("#txtSerialNo").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input SerialNo.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#txtMachineNo").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input MachineNo.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#cmbProductType").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input ประเภทสินค้า.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#dtReceiveDate").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input วันที่รับเข้า.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#txtBalance").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input ยกมา.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#txtRemain").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input คงเหลือ.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else {
            ConfirmDialog(val, topic, id);
        }
    }
    if (topic == "BDC") {
        if ($("#hidQuoID").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input QuotationNo.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else {
            ConfirmDialog(val, topic, id);
        }
    }
    if (topic == "JobOrder") {
        if ($("#dtJobDate").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input วันที่.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#dtSWorking").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input วันเริ่มทำงาน.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#dtEWorking").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input วันจบงาน.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#txtJobBy").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input รับงานโดย.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#txtIssuedBy").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input ออกโดย.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else if ($("#hidCustID").val() == '') {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Please input ลูกค้า.</div>';
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
        }
        else {
            ConfirmDialog(val, topic, id);
        }
    }

}
function ConfirmDialog(val, topic, id) {
    if (val == "Create") {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Do you want to Save?</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-primary" onclick="CreateData()">Yes</button>';
            html += '<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
            html += '</div></div></div>';
            document.getElementById("ShowDialog").innerHTML = html;

    }
    else if (val == "Update") {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Do you want to Update?</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-primary" onclick="Update(' + id + ')" onblur="Redirect()">Yes</button>';
            html += '<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
            html += '</div></div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
    }
    else if (val == "Delete") {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">Do you want to Delete?</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-primary" onclick="RowDelete(' + id + ')">Yes</button>';
            html += '<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
            html += '</div></div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
    }

}