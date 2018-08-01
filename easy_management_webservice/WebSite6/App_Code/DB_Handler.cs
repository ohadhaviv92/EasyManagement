using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for DB_Hanlder
/// </summary>
static public class DB_Handler
{
    private static string connectionStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
    private static SqlConnection con = new SqlConnection(connectionStr);
    private static SqlDataAdapter adtr = null;
    private static SqlCommand cmd = null;
    private static SqlDataReader reader = null;



    static public User Login(string userName, string password)
    {
        User login_user = null;
        try
        {
            con.Open();
            cmd = new SqlCommand($"Login", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("userName", userName));
            cmd.Parameters.Add(new SqlParameter("password", password));
            reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                login_user = new User(
                                      int.Parse(reader["userID"].ToString()),
                                      reader["userName"].ToString(),
                                      reader["password"].ToString(),
                                      reader["firstName"].ToString(),
                                      reader["lastName"].ToString(),
                                      reader["email"].ToString(),
                                      reader["tel"].ToString()
                                     );
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
        finally
        {
            if(con != null && con.State == ConnectionState.Open)
            {
                con.Close();
            }

            if (reader != null && !reader.IsClosed)
            {
                reader.Close();
            }
           
        }
        return login_user;


    }



    static public User Register(string userName, string pass, string firstName, string lastName, string email,  string tel)
    {
       
        

        User login_user = null;
        try
        {
            con.Open();
            cmd = new SqlCommand($"Register", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("userName", userName));
            cmd.Parameters.Add(new SqlParameter("pass", pass));
            cmd.Parameters.Add(new SqlParameter("firstName", firstName));
            cmd.Parameters.Add(new SqlParameter("lastName", lastName));
            cmd.Parameters.Add(new SqlParameter("email", email));
            cmd.Parameters.Add(new SqlParameter("tel", tel));

            reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                login_user = new User(
                                      int.Parse(reader["userID"].ToString()),
                                      reader["userName"].ToString(),
                                      reader["pass"].ToString(),
                                      reader["firstName"].ToString(),
                                      reader["lastName"].ToString(),
                                      reader["email"].ToString(),
                                      reader["tel"].ToString()
                                     );
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
        finally
        {
            if (con != null && con.State == ConnectionState.Open)
            {
                con.Close();
            }

            if (reader != null && !reader.IsClosed)
            {
                reader.Close();
            }

        }
        return login_user;
    }


}