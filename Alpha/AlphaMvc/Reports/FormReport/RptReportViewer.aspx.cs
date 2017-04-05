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
using Microsoft.Reporting;

namespace AlphaMvc.Reports.FormReport
{
    public partial class RptReportViewer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                RenderReport();
            }
        }
        private void RenderReport()
        {
            DataSet ds = new DataSet();
            DBdata dal = new DBdata();

            ds = dal.GetRptJobOrder(Request.QueryString["id"].ToString());

            ReportDataSource datasource = new ReportDataSource("dsJobOrder", ds.Tables[0]);
            this.RptViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/RptJobOrder.rdlc");
            this.RptViewer1.LocalReport.DataSources.Add(datasource);
        }

        protected void btnPrint_Click(object sender, EventArgs e)
        {
            RptViewer1.ShowPrintButton = true;
        }
    }
}