<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RptBorrowViewer.aspx.cs" Inherits="AlphaMvc.Reports.FormReport.RptBorrowViewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <%--<div style="width: 709px; height: 606px">--%>
    <div style="width: 100%; height: 580px;">
        <rsweb:ReportViewer ID="RptViewer1" runat="server" Width="100%" Height="100%"></rsweb:ReportViewer>
        <%--<asp:Button ID="btnPrint" runat="server" Text="Print" />--%>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
</asp:ScriptManager>
    </div>
    </form>
</body>
</html>
