using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class JobOrderSaleOrderDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(JobOrderSaleOrderModels jobOrderSaleOrder)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    DataSet ds = new DataSet();

                    SqlCommand cmd = new SqlCommand("SP_JobOrderSaleOrder_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", jobOrderSaleOrder.JobID);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderSaleOrder.Amount);
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

        public int UpdateData(JobOrderSaleOrderModels jobOrderSaleOrder)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderSaleOrder_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderSaleOrder.ID);
                    cmd.Parameters.AddWithValue("@JobID", jobOrderSaleOrder.JobID);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderSaleOrder.Amount);
                    conObj.Open();
                    result = cmd.ExecuteNonQuery();
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

        public string DeleteData(JobOrderSaleOrderModels jobOrderSaleOrder)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderSaleOrder_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderSaleOrder.ID);
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