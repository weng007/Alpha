using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class JobOrderReceiptDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(JobOrderReceiptModels jobOrderReceipt)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderReceipt_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", jobOrderReceipt.JobID);
                    cmd.Parameters.AddWithValue("@ReceiptNo", jobOrderReceipt.ReceiptNo);
                    cmd.Parameters.AddWithValue("@InvoiceNo", jobOrderReceipt.InvoiceNo);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderReceipt.Amount);
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

        public int UpdateData(JobOrderReceiptModels jobOrderReceipt)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderReceipt_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderReceipt.ID);
                    cmd.Parameters.AddWithValue("@JobID", jobOrderReceipt.JobID);
                    cmd.Parameters.AddWithValue("@ReceiptNo", jobOrderReceipt.ReceiptNo);
                    cmd.Parameters.AddWithValue("@InvoiceNo", jobOrderReceipt.InvoiceNo);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderReceipt.Amount);
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

        public string DeleteData(JobOrderReceiptModels jobOrderReceipt)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderReceipt_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderReceipt.ID);
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