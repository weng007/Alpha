using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;


namespace AlphaMvc.Models
{
    public class BDCModels
    {
        public int ID { get; set; }

        [Display(Name = "Doc Ver")]
        public int Docver { get; set; }

        [Display(Name = "QuotationNo")]
        public string QuotationNo { get; set; }

        [Display(Name = "Price")]
        public double Price { get; set; }

        [Display(Name = "Cost")]
        public double Cost { get; set; }

        [Display(Name = "Profit")]
        public double Profit { get; set; }

        [Display(Name = "Remark")]
        public string Remark { get; set; }
        public DataSet StoreAllData { get; set; }
    }
}