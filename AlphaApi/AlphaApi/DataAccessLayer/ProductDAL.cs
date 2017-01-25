using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class ProductDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        public string InsertData(ProductModels PD)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SerialNo", PD.SerialNo);
                    cmd.Parameters.AddWithValue("@MachineNo", PD.MachineNo);
                    cmd.Parameters.AddWithValue("@ProductType", PD.ProductType);
                    cmd.Parameters.AddWithValue("@Brand", PD.Brand);
                    cmd.Parameters.AddWithValue("@Size", PD.Size);
                    cmd.Parameters.AddWithValue("@Model", PD.Model);
                    cmd.Parameters.AddWithValue("@Lifetime", PD.Lifetime);
                    cmd.Parameters.AddWithValue("@ReceiveDate", PD.ReceiveDate);
                    cmd.Parameters.AddWithValue("@Unit", PD.Unit);
                    cmd.Parameters.AddWithValue("@Balance", PD.Balance);
                    cmd.Parameters.AddWithValue("@Remain", PD.Remain);
                    cmd.Parameters.AddWithValue("@Lost", PD.Lost);
                    cmd.Parameters.AddWithValue("@Repair", PD.Repair);
                    cmd.Parameters.AddWithValue("@Break", PD.Break);
                    cmd.Parameters.AddWithValue("@img", PD.img);
                    cmd.Parameters.AddWithValue("@Remark", PD.Remark);
                    conObj.Open();
                    result = cmd.ExecuteScalar().ToString();

                    return result;

                }
                catch(Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }

        public int UpdateData(ProductModels PD)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", PD.ID);
                    cmd.Parameters.AddWithValue("@SerialNo", PD.SerialNo);
                    cmd.Parameters.AddWithValue("@MachineNo", PD.MachineNo);
                    cmd.Parameters.AddWithValue("@ProductType", PD.ProductType);
                    cmd.Parameters.AddWithValue("@Brand", PD.Brand);
                    cmd.Parameters.AddWithValue("@Size", PD.Size);
                    cmd.Parameters.AddWithValue("@Model", PD.Model);
                    cmd.Parameters.AddWithValue("@Lifetime", PD.Lifetime);
                    cmd.Parameters.AddWithValue("@ReceiveDate", PD.ReceiveDate);
                    cmd.Parameters.AddWithValue("@Unit", PD.Unit);
                    cmd.Parameters.AddWithValue("@Balance", PD.Balance);
                    cmd.Parameters.AddWithValue("@Remain", PD.Remain);
                    cmd.Parameters.AddWithValue("@Lost", PD.Lost);
                    cmd.Parameters.AddWithValue("@Repair", PD.Repair);
                    cmd.Parameters.AddWithValue("@Break", PD.Break);
                    cmd.Parameters.AddWithValue("@img", PD.img);
                    cmd.Parameters.AddWithValue("@Remark", PD.Remark);
                    conObj.Open();
                    result = cmd.ExecuteNonQuery();
                    return result;
                }
                catch(Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }

        public string DeleteData(ProductModels PD)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_IncomeMaster_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", PD.ID);
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

        public DataSet SelectDataByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Sel", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    return ds;
                }
                catch(Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }
        public DataSet SelectAllData()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_Product_Search", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);
                    return ds;
                }
                catch(Exception ex)
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