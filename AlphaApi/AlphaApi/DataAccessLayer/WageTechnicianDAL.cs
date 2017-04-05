using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class WageTechnicianDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;

        public int InsertData(WageTechnicianModels wageTechnician)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    DataSet ds = new DataSet();

                    SqlCommand cmd = new SqlCommand("SP_WageTechnician_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", wageTechnician.JobID);
                    cmd.Parameters.AddWithValue("@TechnicianID", wageTechnician.TechnicianID);
                    cmd.Parameters.AddWithValue("@Additionnal", wageTechnician.Additionnal);
                    cmd.Parameters.AddWithValue("@Deduction", wageTechnician.Deduction);
                    cmd.Parameters.AddWithValue("@CreateBy", wageTechnician.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", wageTechnician.EditBy);
                    conObj.Open();
                    SqlDataAdapter adap = new SqlDataAdapter(cmd);
                    adap.Fill(ds);
                    conObj.Close();
                    cmd.Parameters.Clear();
                    return Convert.ToInt32(ds.Tables[1].Rows[0][0]);
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

        public int UpdateData(WageTechnicianModels wageTechnician)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WageTechnician_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", wageTechnician.ID);
                    cmd.Parameters.AddWithValue("@JobID", wageTechnician.JobID);
                    cmd.Parameters.AddWithValue("@TechnicianID", wageTechnician.TechnicianID);
                    cmd.Parameters.AddWithValue("@Additionnal", wageTechnician.Additionnal);
                    cmd.Parameters.AddWithValue("@Deduction", wageTechnician.Deduction);
                    cmd.Parameters.AddWithValue("@CreateBy", wageTechnician.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", wageTechnician.EditBy);
                    conObj.Open();
                    object obj = cmd.ExecuteScalar();
                    result = Convert.ToInt32(obj);
                    return result;
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

        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WageTechnician_Sel", conObj);
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