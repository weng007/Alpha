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
        public string InsertData(ProductModels Product)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SerialNo", Product.SerialNo);
                    cmd.Parameters.AddWithValue("@MachineNo", Product.MachineNo);
                    cmd.Parameters.AddWithValue("@ProductType", Product.ProductType);
                    cmd.Parameters.AddWithValue("@Brand", Product.Brand);
                    cmd.Parameters.AddWithValue("@Size", Product.Size);
                    cmd.Parameters.AddWithValue("@Model", Product.Model);
                    cmd.Parameters.AddWithValue("@Lifetime", Product.Lifetime);
                    cmd.Parameters.AddWithValue("@ReceiveDate", Product.ReceiveDate);
                    cmd.Parameters.AddWithValue("@Unit", Product.Unit);
                    cmd.Parameters.AddWithValue("@Balance", Product.Balance);
                    cmd.Parameters.AddWithValue("@Remain", Product.Remain);
                    cmd.Parameters.AddWithValue("@Lost", Product.Lost);
                    cmd.Parameters.AddWithValue("@Repair", Product.Repair);
                    cmd.Parameters.AddWithValue("@Break", Product.Break);
                    //cmd.Parameters.AddWithValue("@img", Product.img);
                    cmd.Parameters.AddWithValue("@Remark", Product.Remark);
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

        public int UpdateData(ProductModels Product)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", Product.ID);
                    cmd.Parameters.AddWithValue("@SerialNo", Product.SerialNo);
                    cmd.Parameters.AddWithValue("@MachineNo", Product.MachineNo);
                    cmd.Parameters.AddWithValue("@ProductType", Product.ProductType);
                    cmd.Parameters.AddWithValue("@Brand", Product.Brand);
                    cmd.Parameters.AddWithValue("@Size", Product.Size);
                    cmd.Parameters.AddWithValue("@Model", Product.Model);
                    cmd.Parameters.AddWithValue("@Lifetime", Product.Lifetime);
                    cmd.Parameters.AddWithValue("@ReceiveDate", Product.ReceiveDate);
                    cmd.Parameters.AddWithValue("@Unit", Product.Unit);
                    cmd.Parameters.AddWithValue("@Balance", Product.Balance);
                    cmd.Parameters.AddWithValue("@Remain", Product.Remain);
                    cmd.Parameters.AddWithValue("@Lost", Product.Lost);
                    cmd.Parameters.AddWithValue("@Repair", Product.Repair);
                    cmd.Parameters.AddWithValue("@Break", Product.Break);
                    //cmd.Parameters.AddWithValue("@img", Product.img);
                    cmd.Parameters.AddWithValue("@Remark", Product.Remark);
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

        public string DeleteData(ProductModels Product)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", Product.ID);
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