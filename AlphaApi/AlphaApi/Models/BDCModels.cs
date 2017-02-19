using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class BDCModels
    {
        public int ID { get; set; }

        public int Docver { get; set; }

        public string QuotationNo { get; set; }

        public double Price { get; set; }

        public double Cost { get; set; }

        public double Profit { get; set; }

        public string Remark { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}