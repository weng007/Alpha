using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaMvc.Models
{
    public class ExpenseMaster
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string Detail { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}