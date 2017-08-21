<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RptJobPaymentViewer.aspx.cs" Inherits="AlphaMvc.Reports.FormReport.RptJobPaymentViewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
        <form id="form1" runat="server">
        <ul class="form-style-1">
                <li>
                    <label>Name<span class="required">*</span></label>
                </li>
                <li>
                    <input type="text" id="txtFullName" name="field1" class="field-divided text-size270"/>
                    <input type="hidden" id="hidID" />
                    <input type="hidden" id="hidJobID" />
                    <input type="hidden" id="hidTechnicianID" />

                    <input type="hidden" id="hidFromDate" />
                    <input type="hidden" id="hidToDate" />
                    <input type="hidden" id="hidEmpGroup" />
                </li>
                <li><label class="marginright-22">DateFrom<span class="required">*</span></label>&nbsp;<label class="label-small">DateTo</label></li>
                <li><asp:Calendar ID="dtDateFrom" runat="server"></asp:Calendar>
                    &nbsp;<asp:Calendar ID="dtDateTo" runat="server"></asp:Calendar>
                <%--<input type="text" id="dtDateTo" class="text-size120" placeholder="" />--%>
                    <%--<asp:Button ID="btnSearch" runat="server" Text="Search" OnClick="btnSearch_Click" />--%>
                </li>
                <br />
            </ul>
    <%--<div style="width: 709px; height: 606px">--%>
    <div style="width: 100%; height: 580px;">
        <rsweb:ReportViewer ID="RptViewer1" runat="server" Width="100%" Height="100%"></rsweb:ReportViewer>
        <asp:Button ID="btnPrint" runat="server" OnClick="btnPrint_Click" Text="Print" />
        <asp:ScriptManager ID="ScriptManager1" runat="server">
</asp:ScriptManager>
    </div>
    </form>
</body>
</html>
