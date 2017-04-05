<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RptReportViewer.aspx.cs" Inherits="AlphaMvc.Reports.FormReport.RptReportViewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div style="width: 709px; height: 723px">
        <rsweb:ReportViewer ID="RptViewer1" runat="server" Height="694px" Width="703px"></rsweb:ReportViewer>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
</asp:ScriptManager>
    </div>
    </form>
</body>
</html>
