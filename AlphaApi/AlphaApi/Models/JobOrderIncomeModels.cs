﻿using System;
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
    public class JobOrderIncomeModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int IncomeType { get; set; }

        public string Detail { get; set; }

        public string UnitWeight { get; set; }

        public double Qty { get; set; }

        public double PriceList { get; set; }

        public double UnitPrice { get; set; }

        public double Amount { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }

    [Serializable]
    public class JobOrderIncomeModelsList
    {
        public List<JobOrderIncomeModels> jobOrderIncomeModelsList { get; set; }
    }
}