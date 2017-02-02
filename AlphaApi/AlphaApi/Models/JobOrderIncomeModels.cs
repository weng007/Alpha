using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.Models
{
    public class JobOrderIncomeModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int IncomeType { get; set; }

        public string UnitWeight { get; set; }

        public double Qty { get; set; }

        public double UnitPrice { get; set; }

        public double Amount { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}