using _DAL;
using Newtonsoft.Json;
using System;
using System.Data;
using WebPush;

namespace _BAL
{
    public sealed class BAL
    {
        static VapidDetails Keys = null;

        private static BAL instance = null;
        private static readonly object padlock = new object();

        public static BAL Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                        instance = new BAL();
                    return instance;
                }
            }
        }

        private BAL()
        {
            Keys = VapidHelper.GenerateVapidKeys();
        }

         public string GetKey()
        {
            if (Keys == null)
            {
                Keys = VapidHelper.GenerateVapidKeys();
            }
            return Keys.PublicKey;
        }

         public User Login(string userName, string password)
        {
            DataTable results = DAL.Login(userName, password);
            if (results == null)
                return null;
            User _user = new User
            {
                userID = int.Parse(results.Rows[0]["userID"].ToString()),
                userName = results.Rows[0]["userName"].ToString(),
                pass = results.Rows[0]["pass"].ToString(),
                firstName = results.Rows[0]["firstName"].ToString(),
                lastName = results.Rows[0]["lastName"].ToString(),
                email = results.Rows[0]["email"].ToString(),
                tel = results.Rows[0]["tel"].ToString()
            };

            return _user;
        }

         public object Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
            DataTable results = DAL.Register(userName, pass, firstName, lastName, email, tel);
            if (results == null)
                return null;

            if (results.Columns.Count > 1)
            {
                User _user = new User
                {
                    userID = int.Parse(results.Rows[0]["userID"].ToString()),
                    userName = results.Rows[0]["userName"].ToString(),
                    pass = results.Rows[0]["pass"].ToString(),
                    firstName = results.Rows[0]["firstName"].ToString(),
                    lastName = results.Rows[0]["lastName"].ToString(),
                    email = results.Rows[0]["email"].ToString(),
                    tel = results.Rows[0]["tel"].ToString()
                };

                return _user;
            }
            var error = new { Error = results.Rows[0][0].ToString() };
            return error;

        }

         public void AddNotification(string email, Token token)
        {
            DAL.UpdateNotificationKey(email, token.endpoint, token.p256dh, token.auth);

            Notify(email, "test", "test of this notification");
        }

         private void Notify(string email, string title, string message)
        {

            DataTable details = DAL.GetNotificationKeys(email);
            if (details == null)
                return;


            var pushSubscription = new PushSubscription(details.Rows[0]["_endpoint"].ToString(), details.Rows[0]["p256dh"].ToString(), details.Rows[0]["auth"].ToString());
            var vapidDetails = new VapidDetails("mailto:example@example.com", Keys.PublicKey, Keys.PrivateKey);

            string payload =  JsonConvert.SerializeObject(new { title = title, msg = message });
            var webPushClient = new WebPushClient();
            try
            {
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }


        }

    }
}
