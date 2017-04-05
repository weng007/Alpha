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
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    DataSet ds = new DataSet();

                    SqlCommand cmd = new SqlCommand("SP_Mobile_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", jobID);
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    return ds;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }
    }
}