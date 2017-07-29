using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class RequisitionModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int Giver { get; set; }

        public int Taker { get; set; }

        public int Approver { get; set; }

        public string IsApprove { get; set; }

        public string IsReturn { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}