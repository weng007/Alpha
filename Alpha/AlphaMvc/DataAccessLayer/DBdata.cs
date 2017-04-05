using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
//using AlphaMVC.Models;

namespace AlphaMVC.DataAccessLayer
{
    public class DBdata
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        public DataSet GetRptJobOrder(string jobID)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Mobile_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", jobID);
                    conObj.Open();
                    result = cmd.ExecuteScalar().ToString();

                    return result;

                }
                catch
                {
                    return result = "";
                }
                finally
                {
                    conObj.Close();
                }
            }
        }
    }
}