
using _DAL;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using WebPush;

namespace _BAL
{
    public static class BAL
    {
        static VapidDetails Keys = null;

        static public string Login(string userName, string password)
        {
            DataTable results = DAL.Login(userName, password);
            if (results == null)
                return null;
            User user = new User(
                                         int.Parse(results.Rows[0]["userID"].ToString()),
                                         results.Rows[0]["userName"].ToString(),
                                         results.Rows[0]["pass"].ToString(),
                                         results.Rows[0]["firstName"].ToString(),
                                         results.Rows[0]["lastName"].ToString(),
                                         results.Rows[0]["email"].ToString(),
                                         results.Rows[0]["tel"].ToString()
                                        );
            return new JavaScriptSerializer().Serialize(user);
        }

        static public string Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
            DataTable results = DAL.Register(userName, pass, firstName, lastName, email, tel);
            if (results == null)
                return null;

            if (results.Columns.Count > 1)
            {
                User user = new User(
                                     int.Parse(results.Rows[0]["userID"].ToString()),
                                     results.Rows[0]["userName"].ToString(),
                                     results.Rows[0]["pass"].ToString(),
                                     results.Rows[0]["firstName"].ToString(),
                                     results.Rows[0]["lastName"].ToString(),
                                     results.Rows[0]["email"].ToString(),
                                     results.Rows[0]["tel"].ToString()
                                     );
                return new JavaScriptSerializer().Serialize(user);
            }
            return new JavaScriptSerializer().Serialize(results.Rows[0][0].ToString());

        }

        static public string AddNewSite(int userID, string siteName, string siteAddress)
        {

            DataTable results = DAL.AddNewSite(userID, siteName, siteAddress);
            if (results == null)
                return null;
            BuildingSite site = new BuildingSite(
                                     int.Parse(results.Rows[0]["siteID"].ToString()),
                                     results.Rows[0]["siteName"].ToString(),
                                     results.Rows[0]["siteAddress"].ToString(),
                                     true
                                    );
            return new JavaScriptSerializer().Serialize(site);

        }

        static public string GetKey()
        {
            if(Keys == null)
            {
                Keys = VapidHelper.GenerateVapidKeys();
            }
            return Keys.PublicKey;
        }

        static public void AddNotification(string email, string token)
        {
            Dictionary<string, object> userDetails = new JavaScriptSerializer().DeserializeObject(token) as Dictionary<string, object>;
            Dictionary<string, object> userKeys = userDetails["keys"] as Dictionary<string, object>;
            DAL.UpdateNotificationKey(email,userDetails["endpoint"].ToString(), userKeys["p256dh"].ToString(), userKeys["auth"].ToString());

            Notify(email, "test", "test of this notification");
        }

        static private void Notify(string email, string title, string message)
        {

            DataTable details = DAL.GetNotificationKeys(email);
            if (details == null)
                return;


            var pushSubscription = new PushSubscription(details.Rows[0]["_endpoint"].ToString(), details.Rows[0]["p256dh"].ToString(), details.Rows[0]["auth"].ToString());
            var vapidDetails = new VapidDetails("mailto:example@example.com", Keys.PublicKey, Keys.PrivateKey);

            string payload = new JavaScriptSerializer().Serialize(new {title = title, msg = message });
            var webPushClient = new WebPushClient();
            try
            {
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }


            //var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:5001/notify");
            //httpWebRequest.ContentType = "application/json";
            //httpWebRequest.Method = "POST";

            //using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            //{
            //    string json = new JavaScriptSerializer().Serialize(new
            //    {
            //        token = Notifications[email],
            //        title = title,
            //        msg = message
            //    });

            //    streamWriter.Write(json);
            //}

            //httpWebRequest.GetResponse();



        }

    }
}
