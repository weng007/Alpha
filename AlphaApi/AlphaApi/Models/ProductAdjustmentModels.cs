using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class ProductAdjustmentModels
    {
        public int ID { get; set; }

        public int ProductID { get; set; }

        public string DocRef { get; set; }

        public double Added { get; set; }

        public double Lost { get; set; }

        public double Repair { get; set; }

        public double Break { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}