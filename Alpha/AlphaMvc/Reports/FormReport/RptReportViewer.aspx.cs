using AlphaMvc.Reports.FormReport;
using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.UI;
using AlphaMVC.DataAccessLayer;
using System.Web.UI.WebControls;

namespace AlphaMvc.Reports.FormReport
{
    public partial class RptReportViewer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RenderReport();
        }
        private void RenderReport()
        {
            DataSet ds = new DataSet();
            DBdata dal = new DBdata();

            ds = dal.GetRptJobOrder(Request.QueryString["id"].ToString());

            ReportDataSource datasource = new ReportDataSource("SP_Rpt_Delivery_Inventory", ds.Tables[1]);
            ReportDataSource datasource1 = new ReportDataSource("Detail", ds.Tables[0]);
            this.RptViewer1.LocalReport.ReportPath = "..\\Report\\DeliverOrderInventory.rdlc";

            this.RptViewer1.LocalReport.DataSources.Add(datasource);
            this.RptViewer1.LocalReport.DataSources.Add(datasource1);
        }
    }
}