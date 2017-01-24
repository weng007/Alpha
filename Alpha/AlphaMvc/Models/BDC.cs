﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;


namespace AlphaMvc.Models
{
    public class BDC
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Doc Ver")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public int Docver { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "ใบเสนอราคา")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string QuotationNo { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "ราคาขาย")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "ราคาทุน")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Cost { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "กำไร")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Profit { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "หมายเหตุ")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string Remark { get; set; }
        public DataSet StoreAllData { get; set; }
    }
}