using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class AuthorizationDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(AuthorizationModels authorizationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Authorization_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", authorizationModel.UserID);
                    cmd.Parameters.AddWithValue("@RoleID", authorizationModel.RoleID);
                    cmd.Parameters.AddWithValue("@CreateBy", authorizationModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", authorizationModel.EditBy);
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
        public int UpdateData(AuthorizationModels authorizationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Authorization_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", authorizationModel.ID);
                    cmd.Parameters.AddWithValue("@UserID", authorizationModel.UserID);
                    cmd.Parameters.AddWithValue("@RoleID", authorizationModel.RoleID);
                    cmd.Parameters.AddWithValue("@EditBy", authorizationModel.EditBy);
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
        public string DeleteData(AuthorizationModels authorizationModel)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Authorization_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", authorizationModel.ID);
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
                    SqlCommand cmd = new SqlCommand("SP_Authorization_SelByID", conObj);
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
            SqlConnection con = null;
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_Authorization_Sel", conObj);
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