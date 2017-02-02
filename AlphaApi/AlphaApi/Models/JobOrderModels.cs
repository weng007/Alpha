﻿using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;


namespace AlphaApi.Models
{
    public class JobOrderModels
    {
        public int ID { get; set; }

        public string JobReference { get; set; }

        public string JobNo { get; set; }

        public DateTime JobDate { get; set; }

        public string Car { get; set; }

        public DateTime SWorking { get; set; }

        public DateTime EWorking { get; set; }

        public string JobBy { get; set; }

        public string IssuedBy { get; set; }

        public int TypeWorking { get; set; }

        public int JobStatus { get; set; }

        public string Detail { get; set; }

        public int Customer { get; set; }

        public string Remark { get; set; }

        public double Discount { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}