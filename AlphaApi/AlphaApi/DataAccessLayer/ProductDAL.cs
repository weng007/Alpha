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
    public class ProductDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
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
                    cmd.Parameters.AddWithValue("@Size", Product.Size != null ? Product.Size : "");
                    cmd.Parameters.AddWithValue("@Model", Product.Model != null? Product.Model : "");
                    cmd.Parameters.AddWithValue("@Lifetime", Product.Lifetime);
                    cmd.Parameters.AddWithValue("@ReceiveDate", Product.ReceiveDate);
                    cmd.Parameters.AddWithValue("@UnitWeight", Product.UnitWeight);
                    cmd.Parameters.AddWithValue("@Balance", Product.Balance);
                    cmd.Parameters.AddWithValue("@Remain", Product.Remain);
                    cmd.Parameters.AddWithValue("@Img", Product.Img != null ? Product.Img : "");
                    cmd.Parameters.AddWithValue("@Remark", Product.Remark != null ? Product.Remark : "");
                    cmd.Parameters.AddWithValue("@CreateBy", Product.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", Product.EditBy);
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
                    cmd.Parameters.AddWithValue("@Size", Product.Size != null ? Product.Size : "");
                    cmd.Parameters.AddWithValue("@Model", Product.Model != null ? Product.Model : "");
                    cmd.Parameters.AddWithValue("@Lifetime", Product.Lifetime);
                    cmd.Parameters.AddWithValue("@ReceiveDate", Product.ReceiveDate);
                    cmd.Parameters.AddWithValue("@UnitWeight", Product.UnitWeight);
                    cmd.Parameters.AddWithValue("@Balance", Product.Balance);
                    cmd.Parameters.AddWithValue("@Remain", Product.Remain);
                    cmd.Parameters.AddWithValue("@Img", Product.Img != null ? Product.Img : "");
                    cmd.Parameters.AddWithValue("@Remark", Product.Remark != null ? Product.Remark : "");
                    cmd.Parameters.AddWithValue("@EditBy", Product.EditBy);
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

        public int DeleteData(ProductModels Product)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", Product.ID);
                    cmd.Parameters.AddWithValue("@EditBy", Product.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_Product_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    string path;
                    string ImgName;
                    Image image;
                    string base64String ="";
                    ImgName = ds.Tables[0].Rows[0]["Img"].ToString();
                    if (ImgName != "")
                    {
                        //string[] str = ImgName.Split('/');
                        path = System.Web.HttpContext.Current.Server.MapPath(ImgName);
                        image = Image.FromFile(path);
                        using (MemoryStream ms = new MemoryStream())
                        {
                            image.Save(ms, image.RawFormat);
                            byte[] imageBytes = ms.ToArray();
                            base64String = Convert.ToBase64String(imageBytes);
                        }
                    }
                    ds.Tables[0].Columns.Add("ImgBase");
                    ds.Tables[0].Rows[0]["ImgBase"] = base64String != "" ? base64String : "";

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

        public DataSet SelectByProductID(string productID)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_GetBorrowAmount", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProductID", productID);
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
        public DataSet SelectData()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Sel", conObj);
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