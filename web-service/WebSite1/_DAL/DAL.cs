﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace _DAL
{
    public static class Dal
    {
        private static readonly string _connectionStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
        private static readonly SqlConnection Con = new SqlConnection(_connectionStr);
        private static SqlDataAdapter _adtr;
        private static SqlCommand _cmd;

        public static DataTable Login(string userName, string password)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Login", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("userName", userName));
                _cmd.Parameters.Add(new SqlParameter("pass", password));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static DataTable GetUserSites(int userId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetSitesForUser", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@userID", userId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "UserSites");

                if (ds.Tables["UserSites"].Rows.Count != 0)
                    return ds.Tables["UserSites"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static DataTable GetAllRoomsInSite(int siteId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetAllRoomsInSite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "SiteRooms");

                if (ds.Tables["SiteRooms"].Rows.Count != 0)
                    return ds.Tables["SiteRooms"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static DataTable GetAllFaultsInRoom(int roomId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetAllFaultsInRoom", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@roomID", roomId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "RoomFaults");

                if (ds.Tables["RoomFaults"].Rows.Count != 0)
                    return ds.Tables["RoomFaults"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }


        public static DataTable GetStaticsOnSite(int siteId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"statics", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "statics");

                if (ds.Tables["statics"].Rows.Count != 0)
                    return ds.Tables["statics"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }



        public static DataTable GetUserInSite(int userId, int siteId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetUserInSite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@userID", userId));
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;


        }

        public static DataTable GetFaultPictures(int faultId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetFaultPicture", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@faultID", faultId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "FaultPictures");

                if (ds.Tables["FaultPictures"].Rows.Count != 0)
                    return ds.Tables["FaultPictures"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static DataTable Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Register", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("userName", userName));
                _cmd.Parameters.Add(new SqlParameter("pass", pass));
                _cmd.Parameters.Add(new SqlParameter("firstName", firstName));
                _cmd.Parameters.Add(new SqlParameter("lastName", lastName));
                _cmd.Parameters.Add(new SqlParameter("email", email));
                _cmd.Parameters.Add(new SqlParameter("tel", tel));
                _cmd.Parameters.Add(new SqlParameter("img", ""));

                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static void UpdateNotificationKey(string email, string Token)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Update TbUsers set Token = @token where email = @email", Con);
                _cmd.Parameters.Add(new SqlParameter("@token", Token));
                _cmd.Parameters.Add(new SqlParameter("@email", email));
                _cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        public static DataTable GetNotificationKeys(string email)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Select Token from TbUsers where email = @email", Con);
                _cmd.Parameters.Add(new SqlParameter("@email", email));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Columns.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }

            return null;

        }

        public static DataTable GetJobs()
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Select * from TbUsersType ", Con);
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "Jobs");

                if (ds.Tables["Jobs"].Rows.Count != 0)
                    return ds.Tables["Jobs"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }

            return null;

        }

        public static DataTable Invite(int siteId, int senderId, string reciver, int userType)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"SendInvaite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _cmd.Parameters.Add(new SqlParameter("@senderID", senderId));
                _cmd.Parameters.Add(new SqlParameter("@reciverName", reciver));
                _cmd.Parameters.Add(new SqlParameter("@userTypeID", userType));

                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static string GetSiteName(int siteId)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"select SiteName from TbBuildingSite where siteID = @siteid ", Con);
                _cmd.Parameters.Add(new SqlParameter("@siteid", siteId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "SiteName");

                if (ds.Tables["SiteName"].Rows.Count != 0)
                    return ds.Tables["SiteName"].Rows[0]["SiteName"].ToString();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }

            return null;

        }

        public static DataTable GetSentInvites(int userId)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetSendInvaite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("userID", userId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static DataTable GetRecivedInvites(int userId)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetReciveInvaite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("userID", userId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static void DeleteInvite(int siteId, int senderId, int reciverId)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"DeleteInvaite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _cmd.Parameters.Add(new SqlParameter("@senderID", senderId));
                _cmd.Parameters.Add(new SqlParameter("@reciverID", reciverId));
                _cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        public static DataTable RejectInvite(int siteId, int senderId, int reciverId)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"RejectInvaite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _cmd.Parameters.Add(new SqlParameter("@senderID", senderId));
                _cmd.Parameters.Add(new SqlParameter("@reciverID", reciverId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static DataTable AddNewSite(int userID, string siteName, string siteAddress, string imgRef)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"AddNewSite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@userID", userID));
                _cmd.Parameters.Add(new SqlParameter("@siteName", siteName));
                _cmd.Parameters.Add(new SqlParameter("@siteAddress", siteAddress));
                _cmd.Parameters.Add(new SqlParameter("@siteImage", imgRef));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "NewSite");

                if (ds.Tables["NewSite"].Rows.Count != 0)
                    return ds.Tables["NewSite"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static DataTable ConfirmInvite(int siteId, int senderId, int reciverId)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"ConfirmInvaite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _cmd.Parameters.Add(new SqlParameter("@senderID", senderId));
                _cmd.Parameters.Add(new SqlParameter("@reciverID", reciverId));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "Site");

                if (ds.Tables["Site"] != null)
                    return ds.Tables["Site"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }


        public static DataTable ChangeSiteStatus(int siteID,int statusID)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"ChangeSiteStatus", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteID));
                _cmd.Parameters.Add(new SqlParameter("@statusID", statusID));

                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "site");

                if (ds.Tables["site"].Rows.Count != 0)
                    return ds.Tables["site"];

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

    
        public static DataTable GetRoomsTypes()
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Select * from TbRoomsType ", Con);
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "RoomsType");

                if (ds.Tables["RoomsType"].Rows.Count != 0)
                    return ds.Tables["RoomsType"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static void uploadImg(string imgRef)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"UploadImg", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@imgRef", imgRef));
                _cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        public static void OutFromSite(int siteID, int userID)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"OutFromSite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteID));
                _cmd.Parameters.Add(new SqlParameter("@userID", userID));
                
                _cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        public static DataTable AddRoom(int siteId , int roomTypeId, string roomName, int floorNumber, string roomPicture)
        {
       

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"AddRoomInSite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", siteId));
                _cmd.Parameters.Add(new SqlParameter("@roomTypeID", roomTypeId));
                _cmd.Parameters.Add(new SqlParameter("@roomName", roomName));
                _cmd.Parameters.Add(new SqlParameter("@floorNumber", floorNumber));
                _cmd.Parameters.Add(new SqlParameter("@roomPicture", roomPicture));
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "NewRoom");



                if (ds.Tables["NewRoom"].Rows.Count != 0)
                    return ds.Tables["NewRoom"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static void UpdateRoomPicture(int roomId, string imageName)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Update TbRoomsInSite set roomPicture = @roomdPic where roomID = @roomdId", Con);
                _cmd.Parameters.Add(new SqlParameter("@roomdPic", imageName));
                _cmd.Parameters.Add(new SqlParameter("@roomdId", roomId));
                _cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }


        public static DataTable GetAllUserInSite(int SiteID)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"GetAllUserInSite", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@siteID", SiteID));
               

                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "user");

                if (ds.Tables["user"].Rows.Count != 0)
                    return ds.Tables["user"];

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }


        public static DataTable AddFault(int OwnerID, int WorkerID, int RoomID, int FaultType, string Info, string imgRef)
        {

            try
            {
                Con.Open();
                _cmd = new SqlCommand($"AddFault", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@ownerID", OwnerID));
                _cmd.Parameters.Add(new SqlParameter("@workerID", WorkerID));
                _cmd.Parameters.Add(new SqlParameter("@roomID", RoomID));
                _cmd.Parameters.Add(new SqlParameter("@faultType", FaultType));
                _cmd.Parameters.Add(new SqlParameter("@info", Info));
                _cmd.Parameters.Add(new SqlParameter("@faultPicture", imgRef));

                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "user");

                if (ds.Tables["user"].Rows.Count != 0)
                    return ds.Tables["user"];

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static DataTable GetFaultTypes()
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"Select * from TbFaultType ", Con);
                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "FaultType");

                if (ds.Tables["FaultType"].Rows.Count != 0)
                    return ds.Tables["FaultType"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;

        }

        public static void changeFaultStatus(int faultID, int status, string info)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"changeFaultStatus", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("@faultID", faultID));
                _cmd.Parameters.Add(new SqlParameter("@status", status));
                _cmd.Parameters.Add(new SqlParameter("@info", info));
                _cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        public static DataTable EditUserDetails(int UserID, string UserName, string FirstName, string LastName, string Email, string Tel, string Img)
        {
            try
            {
                Con.Open();
                _cmd = new SqlCommand($"EditUserDetails", Con);
                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.Parameters.Add(new SqlParameter("userID", UserID));
                _cmd.Parameters.Add(new SqlParameter("userName", UserName));
                _cmd.Parameters.Add(new SqlParameter("firstName", FirstName));
                _cmd.Parameters.Add(new SqlParameter("lastName", LastName));
                _cmd.Parameters.Add(new SqlParameter("email", Email));
                _cmd.Parameters.Add(new SqlParameter("tel", Tel));
                _cmd.Parameters.Add(new SqlParameter("img", Img));

                _adtr = new SqlDataAdapter(_cmd);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"] != null)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }
    }
}
