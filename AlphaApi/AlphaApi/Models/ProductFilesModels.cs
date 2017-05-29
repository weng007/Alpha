using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class ProductFilesModels
    {
        public int ID { get; set; }

        public int ProductID { get; set; }

        public string FileAttached { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}