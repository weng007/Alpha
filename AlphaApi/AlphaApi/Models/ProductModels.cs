using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class ProductModels
    {
        public int ID { get; set; }

        public string SerialNo { get; set; }

        public string MachineNo { get; set; }

        public int ProductType { get; set; }

        public int Brand { get; set; }

        public string Size { get; set; }

        public string Model { get; set; }

        public int Lifetime { get; set; }

        public DateTime ReceiveDate { get; set; }

        public int Unit { get; set; }

        public double Balance { get; set; }

        public double Remain { get; set; }

        public double Lost { get; set; }

        public double Repair { get; set; }

        public double Break { get; set; }

        //public byte img { get; set; }

        public string Remark { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}