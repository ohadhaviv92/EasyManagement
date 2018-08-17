using System;
using System.Data;
using System.Data.SqlClient;

namespace _DAL
{
    public static class DAL
    {
        private static string connectionStr = @"Data Source=DESKTOP-OA12SFD\SQLEXPRESS;Initial Catalog=EasyManagement;Integrated Security=True";
        private static SqlConnection con = new SqlConnection(connectionStr);
        private static SqlDataAdapter adtr = null;
        private static SqlCommand cmd = null;
        private static SqlDataReader reader = null;


        static public DataTable Login(string userName, string password)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"Login", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("userName", userName));
                cmd.Parameters.Add(new SqlParameter("pass", password));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;

        }
        
        static public DataTable GetUserSites(int userID)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"GetSitesForUser", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@userID", userID));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "UserSites");

                if (ds.Tables["UserSites"].Rows.Count != 0)
                    return ds.Tables["UserSites"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;

        }

        static public DataTable GetAllRoomsInSite(int siteID)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"GetAllRoomsInSite", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@siteID", siteID));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "SiteRooms");

                if (ds.Tables["SiteRooms"].Rows.Count != 0)
                    return ds.Tables["SiteRooms"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;

        }

        static public DataTable GetAllFaultsInRoom(int roomID)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"GetAllFaultsInRoom", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@roomID", roomID));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "RoomFaults");

                if (ds.Tables["RoomFaults"].Rows.Count != 0)
                    return ds.Tables["RoomFaults"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;

        }

        static public DataTable GetUserInSite(int userID, int siteID)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"GetUserInSite", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@userID", userID));
                cmd.Parameters.Add(new SqlParameter("@siteID", siteID));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;


        }
        static public DataTable GetFaultPictures(int faultID)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"GetFaultPicture", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@faultID", faultID));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "FaultPictures");

                if (ds.Tables["FaultPictures"].Rows.Count != 0)
                    return ds.Tables["FaultPictures"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;

        }

        static public DataTable Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
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

                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;
        }

        static public void UpdateNotificationKey(string email, string endpoint, string p256dh, string auth)
        {

            try
            {
                con.Open();
                cmd = new SqlCommand($"Update TbUsers set _endpoint = @endpoint, p256dh = @p256dh, auth = @auth where email = @email", con);
                cmd.Parameters.Add(new SqlParameter("@endpoint", endpoint));
                cmd.Parameters.Add(new SqlParameter("@p256dh", p256dh));
                cmd.Parameters.Add(new SqlParameter("@auth", auth));
                cmd.Parameters.Add(new SqlParameter("@email", email));
                cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        }

        static public DataTable GetNotificationKeys(string email)
        {
            try
            {
                con.Open();
                cmd = new SqlCommand($"Select _endpoint , p256dh , auth from TbUsers where email = @email", con);
                cmd.Parameters.Add(new SqlParameter("@email", email));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"].Columns.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }

            return null;

        }

    }
}
