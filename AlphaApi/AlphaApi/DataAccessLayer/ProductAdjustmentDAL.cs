using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace AlphaApi.DataAccessLayer
{
    public class ProductAdjustmentDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public string InsertData(ProductAdjustmentModels AdjustmentModel)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductAdjustment_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProductID", AdjustmentModel.ProductID);
                    cmd.Parameters.AddWithValue("@DocRef", AdjustmentModel.DocRef);
                    cmd.Parameters.AddWithValue("@Added", AdjustmentModel.Added);
                    cmd.Parameters.AddWithValue("@Lost", AdjustmentModel.Lost);
                    cmd.Parameters.AddWithValue("@Repair", AdjustmentModel.Repair);
                    cmd.Parameters.AddWithValue("@Break", AdjustmentModel.Break);
                    cmd.Parameters.AddWithValue("@CreateBy", AdjustmentModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", AdjustmentModel.EditBy);
                    conObj.Open();
                    result = cmd.ExecuteScalar().ToString();

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

        public int UpdateData(ProductAdjustmentModels AdjustmentModel)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductAdjustment_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", AdjustmentModel.ID);
                    cmd.Parameters.AddWithValue("@ProductID", AdjustmentModel.ProductID);
                    cmd.Parameters.AddWithValue("@DocRef", AdjustmentModel.DocRef);
                    cmd.Parameters.AddWithValue("@Added", AdjustmentModel.Added);
                    cmd.Parameters.AddWithValue("@Lost", AdjustmentModel.Lost);
                    cmd.Parameters.AddWithValue("@Repair", AdjustmentModel.Repair);
                    cmd.Parameters.AddWithValue("@Break", AdjustmentModel.Break);
                    cmd.Parameters.AddWithValue("@CreateBy", AdjustmentModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", AdjustmentModel.EditBy);
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

        public int DeleteData(ProductAdjustmentModels AdjustmentModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductAdjustment_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", AdjustmentModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", AdjustmentModel.EditBy);
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

        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductAdjustment_SelByID", conObj);
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

        //public DataSet SelectByProductID(string productID)
        //{
        //    DataSet ds = null;
        //    using (SqlConnection conObj = new SqlConnection(conStr))
        //    {
        //        try
        //        {
        //            SqlCommand cmd = new SqlCommand("SP_GetBorrowAmount", conObj);
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@ProductID", productID);
        //            conObj.Open();
        //            SqlDataAdapter da = new SqlDataAdapter();
        //            da.SelectCommand = cmd;
        //            ds = new DataSet();
        //            da.Fill(ds);

        //            return ds;
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //        finally
        //        {
        //            conObj.Close();
        //        }
        //    }
        //}
        public DataSet SelectData()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_ProductAdjustment_Sel", conObj);
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