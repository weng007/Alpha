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
using System.Web.UI.WebControls;

namespace AlphaMvc.Reports.FormReport
{
    public partial class RptWageTechnicianViewer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                RenderReport();
            }
        }
        private void RenderReport()
        {
            DataSet ds = new DataSet();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:13131/");

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync("api/RptJobOrder?id="+18).Result;
            //var yourcustomobjects = response.Content.ReadAsAsync<IEnumerable<YourCustomObject>>().Result;
            //foreach (var x in yourcustomobjects)
            //{
            //    //Call your store method and pass in your own object
            //    SaveCustomObjectToDB(x);
            //}

            if (response.IsSuccessStatusCode)
            {

                RptWageTechnician.Reset();
                RptWageTechnician.LocalReport.EnableExternalImages = true;
                RptWageTechnician.LocalReport.ReportPath = Server.MapPath("~/Report/RptJobOrder.rdlc");
                //DataTable dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));

                //RptViewer1.localReport.Datasource.Add(new Microsoft.Reporting.WebForms.ReportDataSource("dsJobOrder", new Object()));
                //ReportDataSource datasource = new ReportDataSource("dsJobOrder", ds.Tables[1]);
                //RptViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
    }
}