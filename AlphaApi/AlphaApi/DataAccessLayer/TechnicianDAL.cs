using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class TechnicianDAL
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
                    SqlCommand cmd = new SqlCommand("SP_Technician_SelByID", conObj);
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

        public DataSet SelectByName(string name)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Technician_SelByName", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", name); // i will pass zero to MobileID beacause its Primary .
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

        public DataSet SelectData()
        {
            SqlConnection con = null;
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_Technician_Sel", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
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