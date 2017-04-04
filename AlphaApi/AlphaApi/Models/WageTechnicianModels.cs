using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;


namespace AlphaApi.Models
{
    public class WageTechnicianModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int TechnicianID { get; set; }

        public double Additionnal { get; set; }

        public double Deduction { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}