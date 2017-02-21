using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class JobOrderExpenseDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(JobOrderExpenseModels jobOrderExpense)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderExpense_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", jobOrderExpense.JobID);
                    cmd.Parameters.AddWithValue("@ExpenseType", jobOrderExpense.ExpenseType);
                    cmd.Parameters.AddWithValue("@UnitWeight", jobOrderExpense.UnitWeight);
                    cmd.Parameters.AddWithValue("@Qty", jobOrderExpense.Qty);
                    cmd.Parameters.AddWithValue("@UnitPrice", jobOrderExpense.UnitPrice);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderExpense.Amount);
                    cmd.Parameters.AddWithValue("@CreateBy", jobOrderExpense.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", jobOrderExpense.EditBy);
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

        public int UpdateData(JobOrderExpenseModels jobOrderExpense)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderExpense_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderExpense.ID);
                    cmd.Parameters.AddWithValue("@JobID", jobOrderExpense.JobID);
                    cmd.Parameters.AddWithValue("@ExpenseType", jobOrderExpense.ExpenseType);
                    cmd.Parameters.AddWithValue("@UnitWeight", jobOrderExpense.UnitWeight);
                    cmd.Parameters.AddWithValue("@Qty", jobOrderExpense.Qty);
                    cmd.Parameters.AddWithValue("@UnitPrice", jobOrderExpense.UnitPrice);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderExpense.Amount);
                    cmd.Parameters.AddWithValue("@EditBy", jobOrderExpense.EditBy);
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

        public string DeleteData(JobOrderExpenseModels jobOrderExpense)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderExpense_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderExpense.ID);
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

        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderExpense_SelByID", conObj);
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
        public DataSet SelectData()
        {
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderExpense_Sel", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
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