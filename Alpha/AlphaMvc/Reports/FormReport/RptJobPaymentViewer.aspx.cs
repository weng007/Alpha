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
    public partial class RptJobPaymentViewer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //RenderReport();
            }
        }
        private void RenderReport()
        {
            DataSet ds = new DataSet();
            DBdata dal = new DBdata();
            //DateTime FromDate = new DateTime();

            string result = Request.QueryString["id"].ToString();
            //string[] str = result.Split('|');
            //string[] FDate = str[1].Split('/');
            //int FYear = Convert.ToInt32(FDate[0]);
            //int FMonth = Convert.ToInt32(FDate[1]);
            //int FDay = Convert.ToInt32(FDate[2]);
            //DateTime FromDate = new DateTime(FYear, FMonth, FDay);

            //string[] TDate = str[2].Split('/');
            //int TYear = Convert.ToInt32(TDate[0]);
            //int TMonth = Convert.ToInt32(TDate[1]);
            //int TDay = Convert.ToInt32(TDate[2]);
            //DateTime ToDate = new DateTime(TYear, TMonth, TDay);

            ds = dal.GetRptJobPayment(result,dtDateFrom.SelectedDate,dtDateTo.SelectedDate);

            ReportDataSource datasource = new ReportDataSource("dsJobPayment", ds.Tables[0]);
            ReportDataSource datasource1 = new ReportDataSource("dsJobPaymentDetail", ds.Tables[1]);
            this.RptViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/RptJobPayment.rdlc");
            this.RptViewer1.LocalReport.DataSources.Add(datasource);
            this.RptViewer1.LocalReport.DataSources.Add(datasource1);
        }

        protected void btnPrint_Click(object sender, EventArgs e)
        {
            RptViewer1.ShowPrintButton = true;
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            RenderReport();
        }
    }
}