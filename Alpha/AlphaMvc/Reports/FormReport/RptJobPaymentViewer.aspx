<%@ Page Language="C#" EnableSessionState="True" AutoEventWireup="true" CodeBehind="RptJobPaymentViewer.aspx.cs" Inherits="AlphaMvc.Reports.FormReport.RptJobPaymentViewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <!-- javascripts --> 
    <link href="../../Content/RptDateStyle/jquery-ui.css" rel="stylesheet" />
  <%--<link rel="stylesheet" href="/resources/demos/style.css"/>--%>
    <link href="../../Content/datepicker/santiago.datepicker.css")" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.12.4.js"></script>
    <script src="../../Scripts/RptDate/jquery-ui.js"></script>
    <script type="text/javascript">
    $(document).ready(function () {
        $("#dtFromDate").datepicker({
            inline: true,
            showOtherMonths: true,
            dateFormat: "dd/mm/yy"
        })
        .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

        $("#dtToDate").datepicker({
            inline: true,
            showOtherMonths: true,
            dateFormat: "dd/mm/yy"
        })
        .datepicker('widget').wrap('<div class="ll-skin-santiago"/>');
    });
</script>
</head>
<body  class="bodymrg">
        <form id="form1" runat="server">
            <div class="rptcontent">
                <label>Date From</label>
                <input type="text" id="dtFromDate" class="field-divided txt" placeholder="" runat="server"/>
                <label>To</label>
                <input type="text" id="dtToDate" class="field-divided txt" placeholder="" runat="server"/>
                <asp:Button ID="btnSearch" runat="server" Text="Seach" onclick="btnSearch_Click" CssClass="btn" />
            </div>
            
    <div style="width: 100%; height: 580px;">
        <rsweb:ReportViewer ID="RptViewer1" runat="server" Width="100%" Height="100%"></rsweb:ReportViewer>
        <asp:Button ID="btnPrint" runat="server" OnClick="btnPrint_Click" Text="Print" />
        <asp:ScriptManager ID="ScriptManager1" runat="server">
</asp:ScriptManager>
    </div>
    </form>
</body>
</html>
