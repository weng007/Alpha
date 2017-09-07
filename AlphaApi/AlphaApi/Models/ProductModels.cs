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

        //public int ProductType { get; set; }

        public string ProductType { get; set; }

        public string SNGauge { get; set; }

        public string Description { get; set; }

        public string Brand { get; set; }

        public string Size { get; set; }

        public string Model { get; set; }

        public int Lifetime { get; set; }

        public DateTime ReceiveDate { get; set; }

        public int UnitWeight { get; set; }

        public double Balance { get; set; }

        public double Remain { get; set; }

        public double Lost { get; set; }

        public double Repair { get; set; }

        public double Break { get; set; }

        public string Img { get; set; }

        public string ImgData { get; set; }

        public string Remark { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}