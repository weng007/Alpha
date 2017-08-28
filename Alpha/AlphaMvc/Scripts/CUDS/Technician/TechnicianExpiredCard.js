$(document).ready(function () {
    if (localStorage['UserID'] != undefined) {
            CheckAuthorization();
            //$('#tableData').paging({ limit: 5 });
            //------------------------- Sorting ------------------------
            $('th').click(function () {
                var table = $(this).parents('table').eq(0)
                var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
                this.asc = !this.asc
                if (!this.asc) { rows = rows.reverse() }
                for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
            })
            function comparer(index) {
                return function (a, b) {
                    var valA = getCellValue(a, index), valB = getCellValue(b, index)
                    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
                }
            }
            function getCellValue(row, index) { return $(row).children('td').eq(index).html() }
            //------------------------- Sorting ------------------------
            //-------------------------filter------------------------
            $("#searchInput").keyup(function () {
                //hide all the rows
                $("#ExpiredCard").find("tr").hide();

                //split the current value of searchInput
                var data = this.value.split(" ");
                //create a jquery object of the rows
                var jo = $("#ExpiredCard").find("tr");

                //Recusively filter the jquery object to get results.
                $.each(data, function (i, v) {
                    //jo = jo.filter("*:contains('" + v + "')");
                    jo = jo.filter(function () {
                        return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;

                    });
                });
                //show the rows that match.
                jo.show();
                //Removes the placeholder text

            }).focus(function () {
                this.value = "";
                $(this).css({ "color": "black" });
                $(this).unbind('focus');
            }).css({ "color": "#C0C0C0" });
            //-------------------------filter------------------------
            //GetDataCard();
            $.ajax(
        {
            url: 'http://localhost:13131/api/TechnicianExpiredCard',
            type: 'GET',
            async: false,
            //data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                var html = '<tbody>';
                for (var i = 0; i < data.Table.length; i++) {
                    if (data.Table[i].Color == 'red') {
                        html += '<tr>';
                        html += '<td class="nopointer tdredColor">' + data.Table[i].RowNum + '</td>';
                        html += '<td class="hidecolumn nopointer tdredColor">' + data.Table[i].TechnicianID + '</td>';
                        html += '<td class="nopointer tdredColor">' + data.Table[i].FullName + '</td>';
                        //html += '<td class="hideANDseek nopointer tdredColor">' + data.Table[i].PositionName + '</td>';
                        html += '<td class="nopointer tdredColor">' + data.Table[i].PositionName + '</td>';
                        html += '<td class="nopointer tdredColor">' + data.Table[i].EmpGroup + '</td>';
                        html += '<td class="nopointer tdredColor">' + data.Table[i].CerNo + '</td>';
                        //html += '<td class="hideANDseek nopointer tdredColor">' + data.Table[i].CerNo + '</td>';
                        var ExpiryDate = new Date(data.Table[i].ExpiryDate);
                        html += '<td class="nopointer tdredColor">' + ExpiryDate.getDate() + '/' + (ExpiryDate.getMonth() + 1) + '/' + ExpiryDate.getFullYear() + '</td>';
                        html += '<td class="hidecolumn nopointer tdredColor">' + data.Table[i].CardType + '</td>';
                        html += '<td class="nopointer tdredColor">' + data.Table[i].CompanyName + '</td>';
                        html += '</tr>';
                    }
                    else {
                        html += '<tr>';
                        html += '<td class="nopointer">' + data.Table[i].RowNum + '</td>';
                        html += '<td class="hidecolumn nopointer">' + data.Table[i].TechnicianID + '</td>';
                        html += '<td class="nopointer">' + data.Table[i].FullName + '</td>';
                        //html += '<td class="hideANDseek nopointer">' + data.Table[i].PositionName + '</td>';
                        html += '<td class="nopointer">' + data.Table[i].PositionName + '</td>';
                        html += '<td class="nopointer">' + data.Table[i].EmpGroup + '</td>';
                        //html += '<td class="hideANDseek nopointer">' + data.Table[i].CerNo + '</td>';
                        html += '<td class="nopointer">' + data.Table[i].CerNo + '</td>';
                        var ExpiryDate = new Date(data.Table[i].ExpiryDate);
                        html += '<td class="nopointer">' + ExpiryDate.getDate() + '/' + (ExpiryDate.getMonth() + 1) + '/' + ExpiryDate.getFullYear() + '</td>';
                        html += '<td class="hidecolumn nopointer">' + data.Table[i].CardType + '</td>';
                        html += '<td class="nopointer">' + data.Table[i].CompanyName + '</td>';
                        html += '</tr>';
                    }
                }
                html += '</tbody>';
                document.getElementById("ExpiredCard").innerHTML = html;
                //CheckAuthorization();
                $('#tblExpiredTechnician').paging({
                    limit: 16,
                    rowDisplayStyle: 'block',
                    activePage: 0,
                    rows: []
                });
            },
            error: function (msg) {
                alert(msg)
            }
        });
    }
    else {
        location = "../Login/IndexLogin";
    }
});

//function GetDataCard() {
//    //var dataObject = { ID: val }

//}