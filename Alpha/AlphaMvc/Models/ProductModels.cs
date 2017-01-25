using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaMvc.Models
{
    public class Product
    {
        public int ID { get; set; }

        [Display(Name = "SerialNo")]
        public string SerialNo { get; set; }

        [Display(Name = "MachineNo")]
        public string MachineNo { get; set; }

        [Display(Name = "ProductType")]
        public int ProductType { get; set; }

        [Display(Name = "Brand")]
        public int Brand { get; set; }

        [Display(Name = "Size")]
        public string Size { get; set; }

        [Display(Name = "Model")]
        public string Model { get; set; }

        [Display(Name = "Lifetime")]
        public int Lifetime { get; set; }

        [Display(Name = "ReceiveDate")]
        public DateTime ReceiveDate { get; set; }

        [Display(Name = "Unit")]
        public int Unit { get; set; }

        [Display(Name = "Balance")]
        public double Balance { get; set; }

        [Display(Name = "Remain")]
        public double Remain { get; set; }

        [Display(Name = "Lost")]
        public double Lost { get; set; }

        [Display(Name = "Repair")]
        public double Repair { get; set; }

        [Display(Name = "Break")]
        public double Break { get; set; }

        //[Display(Name = "img")]
        //public byte img { get; set; }

        [Display(Name = "Remark")]
        public string Remark { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}