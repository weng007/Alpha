using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class JobOrderBorrowDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(JobOrderBorrowModels jobOrderBorrow)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RefID", jobOrderBorrow.RefID);
                    cmd.Parameters.AddWithValue("@Brand", jobOrderBorrow.Brand);
                    cmd.Parameters.AddWithValue("@Serial", jobOrderBorrow.Serial);
                    cmd.Parameters.AddWithValue("@Model", jobOrderBorrow.Model);
                    cmd.Parameters.AddWithValue("@Size", jobOrderBorrow.Size);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderBorrow.Amount);
                    cmd.Parameters.AddWithValue("@ReturnGood", jobOrderBorrow.ReturnGood);
                    cmd.Parameters.AddWithValue("@ReturnLost", jobOrderBorrow.ReturnLost);
                    cmd.Parameters.AddWithValue("@ReturnRepair", jobOrderBorrow.ReturnRepair);
                    cmd.Parameters.AddWithValue("@ReturnBad", jobOrderBorrow.ReturnBad);
                    cmd.Parameters.AddWithValue("@Remark", jobOrderBorrow.Remark);
                    //cmd.Parameters.AddWithValue("@ReturnGood", BDC.Remark != null ? BDC.Remark : "");
                    conObj.Open();
                    result = Convert.ToInt32(cmd.ExecuteScalar().ToString());
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

        public int UpdateData(JobOrderBorrowModels jobOrderBorrow)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderBorrow.ID);
                    cmd.Parameters.AddWithValue("@Brand", jobOrderBorrow.Brand);
                    cmd.Parameters.AddWithValue("@Serial", jobOrderBorrow.Serial);
                    cmd.Parameters.AddWithValue("@Model", jobOrderBorrow.Model);
                    cmd.Parameters.AddWithValue("@Size", jobOrderBorrow.Size);
                    cmd.Parameters.AddWithValue("@Amount", jobOrderBorrow.Amount);
                    cmd.Parameters.AddWithValue("@ReturnGood", jobOrderBorrow.ReturnGood);
                    cmd.Parameters.AddWithValue("@ReturnLost", jobOrderBorrow.ReturnLost);
                    cmd.Parameters.AddWithValue("@ReturnRepair", jobOrderBorrow.ReturnRepair);
                    cmd.Parameters.AddWithValue("@Remark", jobOrderBorrow.Remark);
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

        public string DeleteData(JobOrderBorrowModels jobOrderBorrow)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderBorrow.ID);
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
                    SqlCommand cmd = new SqlCommand("SP_Borrow_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id); // i will pass zero to MobileID beacause its Primary .
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
        public DataSet SelectByRefID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow_SelByJobID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", id);
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