using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class TechnicianCardDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_TechnicianCard_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id); // i will pass zero to MobileID beacause its Primary .
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    return ds;
                }
                catch
                {
                    return ds;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }
    }
}