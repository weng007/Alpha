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

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string SerialNo { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string MachineNo { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public int ProductType { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public int Brand { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string Size { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string Model { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public int Lifetime { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public DateTime ReceiveDate { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public int Unit { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Balance { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Remain { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Lost { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Repair { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public double Break { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public byte img { get; set; }

        [Required(ErrorMessage = "Please Enter Detail")]
        [Display(Name = "Enter Detail")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Detail must be between 3 and 50 characters!")]
        public string Remark { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}