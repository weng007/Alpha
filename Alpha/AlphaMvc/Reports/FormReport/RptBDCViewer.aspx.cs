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
    public partial class RptBDCViewer : System.Web.UI.Page
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

            ds = dal.GetRptBDC(Request.QueryString["id"].ToString());

            ReportDataSource datasource = new ReportDataSource("dsBDC", ds.Tables[0]);
            ReportDataSource datasource1 = new ReportDataSource("dsBDCIncome", ds.Tables[1]);
            ReportDataSource datasource2 = new ReportDataSource("dsBDCExpense", ds.Tables[2]);
            this.RptViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/RptBDC.rdlc");
            this.RptViewer1.LocalReport.DataSources.Add(datasource);
            this.RptViewer1.LocalReport.DataSources.Add(datasource1);
            this.RptViewer1.LocalReport.DataSources.Add(datasource2);
        }

    }
}