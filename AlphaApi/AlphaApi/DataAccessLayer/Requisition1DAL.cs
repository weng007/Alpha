using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class Requisition1DAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;

        public int InsertData(Requisition1Models Requisition1Model)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_Borrow1_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RequisitionID", Requisition1Model.RequisitionID);
                    cmd.Parameters.AddWithValue("@Description", Requisition1Model.Description);
                    cmd.Parameters.AddWithValue("@UnitWeight", Requisition1Model.UnitWeight);
                    cmd.Parameters.AddWithValue("@Amount", Requisition1Model.Amount);
                    cmd.Parameters.AddWithValue("@ReturnGood", Requisition1Model.ReturnGood);
                    cmd.Parameters.AddWithValue("@ReturnLost", Requisition1Model.ReturnLost);
                    cmd.Parameters.AddWithValue("@ReturnRepair", Requisition1Model.ReturnRepair);
                    cmd.Parameters.AddWithValue("@ReturnBad", Requisition1Model.ReturnBad);
                    cmd.Parameters.AddWithValue("@Remark", Requisition1Model.Remark != null ? Requisition1Model.Remark : "");
                    cmd.Parameters.AddWithValue("@CreateBy", Requisition1Model.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", Requisition1Model.EditBy);
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
        public int UpdateData(Requisition1Models Requisition1Model)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow1_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", Requisition1Model.ID);
                    cmd.Parameters.AddWithValue("@Description", Requisition1Model.Description);
                    cmd.Parameters.AddWithValue("@UnitWeight", Requisition1Model.UnitWeight);
                    cmd.Parameters.AddWithValue("@Amount", Requisition1Model.Amount);
                    cmd.Parameters.AddWithValue("@ReturnGood", Requisition1Model.ReturnGood);
                    cmd.Parameters.AddWithValue("@ReturnLost", Requisition1Model.ReturnLost);
                    cmd.Parameters.AddWithValue("@ReturnRepair", Requisition1Model.ReturnRepair);
                    cmd.Parameters.AddWithValue("@ReturnBad", Requisition1Model.ReturnBad);
                    cmd.Parameters.AddWithValue("@Remark", Requisition1Model.Remark != null ? Requisition1Model.Remark : "");
                    cmd.Parameters.AddWithValue("@EditBy", Requisition1Model.EditBy);
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

        public string DeleteData(Requisition1Models Requisition1Model)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow1_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", Requisition1Model.ID);
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

        public DataSet SelectData()
        {
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow1_Sel", conObj);
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

        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Borrow1_SelByID", conObj);
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
    }
}