using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaMvc.Models
{
    public class TechnicianCardModels
    {
        public int ID { get; set; }
        public DataSet StoreAllData { get; set; }
    }
}