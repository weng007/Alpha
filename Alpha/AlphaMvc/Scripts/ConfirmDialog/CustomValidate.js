function Isvalidate(pageName) {
    //if (pageName == "IncomeMaster") {
    //    if($("#txtDetail").val() == '')
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
        html += '<button type="button" class="btn btn-primary" onclick="RowDelete('+id+')">Yes</button>';
        html += '<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
        html += '</div></div></div>';
        document.getElementById("ShowDialog").innerHTML = html;
    }

}