using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;
using System.DirectoryServices;
using AlphaApi.Dataset;

namespace AlphaApi.DataAccessLayer
{
    public class UserLoginDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(UserLoginModels userLoginModels)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", userLoginModels.UserName);
                    cmd.Parameters.AddWithValue("@Password", userLoginModels.Password);
                    cmd.Parameters.AddWithValue("@FirstName", userLoginModels.FirstName != null && userLoginModels.FirstName != "" ? userLoginModels.FirstName : "");
                    cmd.Parameters.AddWithValue("@LastName", userLoginModels.LastName != null && userLoginModels.LastName != "" ? userLoginModels.LastName : "");
                    cmd.Parameters.AddWithValue("@Email", userLoginModels.Email != null && userLoginModels.Email != "" ? userLoginModels.Email : "");
                    cmd.Parameters.AddWithValue("@SecurityID", userLoginModels.SecurityID);
                    cmd.Parameters.AddWithValue("@CreateBy", userLoginModels.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", userLoginModels.EditBy);
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
        public dsUser GetInfoByUserName2(string userName, string LoginUser, string LoginPassword)
        {
            //ทำตอนกดปุ่ม CheckUser (หน้า Create)
            //ดึงข้อมูลจาก AD เพื่อ Bind ค่าใน Control
            dsUser userDS = new dsUser();
            string domainName = string.Empty;
            string ADPath = string.Empty;
            string strError = string.Empty;
            string domainAndUser;
            string Errmsg = "";

            try
            {
                ADPath = ConfigurationManager.AppSettings["DirectoryPath"];
                domainName = ConfigurationManager.AppSettings["DirectoryDomain"];
                if (!String.IsNullOrEmpty(ADPath) && !String.IsNullOrEmpty(domainName))
                {
                    domainAndUser = domainName + @"\" + LoginUser;
                    //DirectoryEntry entry = new DirectoryEntry(ADPath);
                    DirectoryEntry entry = new DirectoryEntry("LDAP://alphagroup.local/OU=DEPARTMENT,OU=Users,OU=AGC,DC=alphagroup,DC=local", "Administrator", "F.Lampard8");
                    //DirectoryEntry entry = new DirectoryEntry("LDAP://alphagroup.local/OU=DEPARTMENT,OU=Users,OU=AGC,DC=alphagroup,DC=local", "MLP", "ultracrown17");
                    try
                    {
                        object obj = entry.NativeObject;
                        DirectorySearcher search = new DirectorySearcher(entry);
                        search.SearchScope = SearchScope.Subtree;
                        search.Filter = "(SAMAccountName=" + userName + ")";
                        search.PropertiesToLoad.Add("givenname");
                        search.PropertiesToLoad.Add("sn");
                        search.PropertiesToLoad.Add("mail");
                        search.PropertiesToLoad.Add("department");
                        search.PropertiesToLoad.Add("company");
                        search.PropertiesToLoad.Add("title");
                        SearchResult result = search.FindOne();
                        if (result != null)
                        {
                            dsUser.ADUserRow dr = userDS.ADUser.NewADUserRow();
                            dr["FirstName"] = result.Properties["givenname"].Count > 0 ? (String)result.Properties["givenname"][0] : "";
                            dr["LastName"] = result.Properties["sn"].Count > 0 ? (String)result.Properties["sn"][0] : "";
                            dr["Email"] = result.Properties["mail"].Count > 0 ? (String)result.Properties["mail"][0] : "";
                            dr["Department"] = result.Properties["department"].Count > 0 ? (String)result.Properties["department"][0] : "";
                            dr["Company"] = result.Properties["company"].Count > 0 ? (String)result.Properties["company"][0] : "";
                            dr["Title"] = result.Properties["title"].Count > 0 ? (String)result.Properties["title"][0] : "";
                            userDS.ADUser.AddADUserRow(dr);
                        }
                        //LdapPath = result.Path;
                        
                    }
                    catch (Exception ex)
                    {
                        Errmsg = ex.Message;
                        throw(ex);
                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //conObj.Close();
            }
            return userDS;
        }

        public DataSet GetInfoByUserName1(int id, string LoginUser, string LoginPassword)
        {
            //ดึงข้อมูลจาก AD เพื่อ Bind ค่าใน Control (page_load หน้า Update)
            dsUser userDS = new dsUser();
            string domainName = string.Empty;
            string ADPath = string.Empty;
            string strError = string.Empty;
            string domainAndUser;
            string Errmsg = "";
            string userName;
            string Password;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    //ดึงข้อมูล userName, seurityID จาก TB User
                    SqlCommand cmd = new SqlCommand("SP_User_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id); // i will pass zero to MobileID beacause its Primary .
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    da.Fill(userDS.ADUser);
                    userName = userDS.ADUser.Rows[0]["UserName"].ToString();
                    Password = userDS.ADUser.Rows[0]["Password"].ToString();
                    //seurityID = Convert.ToInt32(ds.Tables[0].Rows[0]["SecurityID"]) 


                    //ดึงข้อมูลจาก AD 
                    ADPath = ConfigurationManager.AppSettings["DirectoryPath"];
                    domainName = ConfigurationManager.AppSettings["DirectoryDomain"];
                    if (!String.IsNullOrEmpty(ADPath) && !String.IsNullOrEmpty(domainName))
                    {
                        domainAndUser = domainName + @"\" + LoginUser;
                        //DirectoryEntry entry = new DirectoryEntry("LDAP://alphagroup.local/OU=DEPARTMENT,OU=Users,OU=AGC,DC=alphagroup,DC=local", "JPS", "fastpink46");
                        DirectoryEntry entry = new DirectoryEntry("LDAP://alphagroup.local/OU=DEPARTMENT,OU=Users,OU=AGC,DC=alphagroup,DC=local", "Administrator", "F.Lampard8");
                        //DirectoryEntry entry = new DirectoryEntry("LDAP://alphagroup.local/OU=DEPARTMENT,OU=Users,OU=AGC,DC=alphagroup,DC=local", "MLP", "ultracrown17");
                        try
                        {
                            object obj = entry.NativeObject;
                            DirectorySearcher search = new DirectorySearcher(entry);
                            search.Filter = "(SAMAccountName=" + userName + ")";
                            search.PropertiesToLoad.Add("givenname");
                            search.PropertiesToLoad.Add("sn");
                            search.PropertiesToLoad.Add("mail");
                            search.PropertiesToLoad.Add("department");
                            search.PropertiesToLoad.Add("company");
                            search.PropertiesToLoad.Add("title");
                            SearchResult result = search.FindOne();
                            if (result != null)
                            {
                                userDS.ADUser.Rows[0]["FirstName"] = result.Properties["givenname"].Count > 0 ? (String)result.Properties["givenname"][0] : "";
                                userDS.ADUser.Rows[0]["LastName"] = result.Properties["sn"].Count > 0 ? (String)result.Properties["sn"][0] : "";
                                userDS.ADUser.Rows[0]["Email"] = result.Properties["mail"].Count > 0 ? (String)result.Properties["mail"][0] : "";
                                userDS.ADUser.Rows[0]["Department"] = result.Properties["department"].Count > 0 ? (String)result.Properties["department"][0] : "";
                                userDS.ADUser.Rows[0]["Company"] = result.Properties["company"].Count > 0 ? (String)result.Properties["company"][0] : "";
                                userDS.ADUser.Rows[0]["Title"] = result.Properties["title"].Count > 0 ? (String)result.Properties["title"][0] : "";
                            }
                            //LdapPath = result.Path;
                            
                        }
                        catch (Exception ex)
                        {
                            Errmsg = ex.Message;
                            throw (ex);
                        }
                    }
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
            return userDS;
        }
        public DataSet SelectData()
        {
            DataSet ds = null;

            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Sel", conObj);
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
        public DataSet SelectByCondition()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_SelByCondition", conObj);
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
        public DataSet Authenticate(string userName, string password)
        {
            //DataSet ds = null;
            dsUser userDS = new dsUser();
            string domainName = string.Empty;
            string ADPath = string.Empty;
            string strError = string.Empty;
            string domainAndUser;
            string Errmsg = "";
            string LdapPath;
            bool isAuthen = false;
            try
            {
                //if (userName == "Administrator")
                //{
                //    ADPath = ConfigurationManager.AppSettings["DirectoryPath"];
                //}
                //else
                //{
                //    ADPath = "LDAP://alphagroup.local/OU=DEPARTMENT,OU=Users,OU=AGC,DC=alphagroup,DC=local";
                //}
                //domainName = ConfigurationManager.AppSettings["DirectoryDomain"];
                //if(!String.IsNullOrEmpty(ADPath) && !String.IsNullOrEmpty(domainName))
                //{
                    //domainAndUser = domainName + @"\" + userName;
                    //DirectoryEntry entry = new DirectoryEntry(ADPath, domainAndUser, password);
                    //try
                    //{
                    //    //Check ว่า User ที่จะ login เข้ามามีอยู่ใน AD หรือไม่ 
                    //    object obj = entry.NativeObject;
                    //    DirectorySearcher search = new DirectorySearcher(entry);
                    //    search.Filter = "(SAMAccountName=" + userName + ")";
                    //    search.PropertiesToLoad.Add("givenname");
                    //    search.PropertiesToLoad.Add("sn");
                    //    SearchResult result = search.FindOne();
                    //    if (result != null)
                    //    {
                    //        dsUser.ADUserRow dr = userDS.ADUser.NewADUserRow();
                    //        dr["FirstName"] = result.Properties["givenname"].Count > 0 ? (String)result.Properties["givenname"][0] : "";
                    //        dr["LastName"] = result.Properties["sn"].Count > 0 ? (String)result.Properties["sn"][0] : "";
                    //        userDS.ADUser.AddADUserRow(dr);
                    //        isAuthen = true;
                    //    }
                    //    else
                    //    {
                    //        isAuthen = false;
                    //    }
                        
                    //}
                    //catch(Exception ex)
                    //{
                    //    Errmsg = ex.Message;
                    //    isAuthen = false;                  
                    //}

                    //ถ้า มี User ใน AD ให้ Check ต่อว่ามี User ใน Table User หรือไม่ (ถ้ามีก็จะ login ผ่าน และเก็บ UserID, UserName ไว้ใน Session)
                    //if(isAuthen)
                    if (true)
                    {
                        using (SqlConnection conObj = new SqlConnection(conStr))
                        {
                            try
                            {
                                //SqlCommand cmd = new SqlCommand("SP_UserLogin", conObj);
                                //cmd.CommandType = CommandType.StoredProcedure;
                                //cmd.Parameters.AddWithValue("@UserName", userName);
                                //conObj.Open();
                                //SqlDataAdapter da = new SqlDataAdapter();
                                //da.SelectCommand = cmd;
                                //da.Fill(userDS.ADUser);
                                //userName = userDS.ADUser.Rows[0]["UserName"].ToString();

                                SqlCommand cmd = new SqlCommand("SP_UserLogin", conObj);
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@UserName", userName);
                                cmd.Parameters.AddWithValue("@Password", password);
                                conObj.Open();
                                SqlDataAdapter da = new SqlDataAdapter();
                                da.SelectCommand = cmd;
                                da.Fill(userDS.ADUser);
                                userName = userDS.ADUser.Rows[0]["UserName"].ToString();
                                password = userDS.ADUser.Rows[0]["Password"].ToString();
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

                //}
                //domainName = string.Empty;
                //ADPath = string.Empty;

                return userDS;

            }
            catch (Exception ex)
            {
                //throw ex;
            }
            finally
            {
                //conObj.Close();
            }
            return userDS;
        }
        public int UpdateData(UserLoginModels userLoginModels)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", userLoginModels.ID);
                    cmd.Parameters.AddWithValue("@UserName", userLoginModels.UserName);
                    cmd.Parameters.AddWithValue("@Password", userLoginModels.Password);
                    cmd.Parameters.AddWithValue("@FirstName", userLoginModels.FirstName != null && userLoginModels.FirstName != "" ? userLoginModels.FirstName : "");
                    cmd.Parameters.AddWithValue("@LastName", userLoginModels.LastName != null && userLoginModels.LastName != "" ? userLoginModels.LastName : "");
                    cmd.Parameters.AddWithValue("@Email", userLoginModels.Email != null && userLoginModels.Email != "" ? userLoginModels.Email : "");
                    cmd.Parameters.AddWithValue("@SecurityID", userLoginModels.SecurityID);
                    cmd.Parameters.AddWithValue("@EditBy", userLoginModels.EditBy);
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
        public int DeleteData(UserLoginModels userLoginModels)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", userLoginModels.ID);
                    cmd.Parameters.AddWithValue("@EditBy", userLoginModels.EditBy);
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
    }
}