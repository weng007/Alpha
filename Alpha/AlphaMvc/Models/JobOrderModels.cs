using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaMvc.Models
{
    public class JobOrderModels
    {
        public int ID { get; set; }

        public int JobRef { get; set; }

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

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}