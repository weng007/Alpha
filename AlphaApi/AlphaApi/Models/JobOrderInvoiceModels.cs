using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System.Collections;
using System.Collections.Generic;

namespace AlphaApi.Models
{
    [Serializable]
    public class JobOrderInvoiceModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int SaleOrderNo { get; set; }

        public string InvoiceNo { get; set; }

        public double Amount { get; set; }
    }

    [Serializable]
    public class JobOrderInvoiceModelsList
    {
        public List<JobOrderInvoiceModels> jobOrderInvoiceModelsList { get; set; }
    }
}