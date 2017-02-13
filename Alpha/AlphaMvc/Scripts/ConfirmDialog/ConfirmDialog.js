function ConfirmDialog(val, topic,id) {
    if (val == "Create") {
        $('#customerDialog').modal('show');
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
        document.getElementById("customerDialog").innerHTML = html;
    }
    else if (val == "Update") {
        $('#customerDialog').modal('show');
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
        document.getElementById("customerDialog").innerHTML = html;
    }
    else if (val == "Delete") {
        $('#customerDialog').modal('show');
        var html = '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '<h4 class="modal-title">' + topic + '</h4>';
        html += '</div>';
        html += '<div class="modal-body">Do you want to Delete?</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-primary" onclick="RowDelete('+id+')">Yes</button>';
        html += '<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
        html += '</div></div></div>';
        document.getElementById("customerDialog").innerHTML = html;
    }

}