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
    public class JobOrderReceiptModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int InvoiceID { get; set; }

        public string ReceiptNo { get; set; }

        public double Amount { get; set; }
    }

    [Serializable]
    public class JobOrderReceiptModelsList
    {
        public List<JobOrderReceiptModels> jobOrderReceiptModelsList { get; set; }
    }
}