using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using _BAL;
using System.Net;
using System.Text;
using System.IO;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }



    [WebMethod]
    public string Login(string userName, string password)
    {
        return BAL.Login(userName, password);
    }

    [WebMethod]
    public void UpdateNotification(string email, string token)
    {
        BAL.AddNotification(email, token);
    }

    [WebMethod]
    public string Register(string userName, string pass, string firstName, string lastName, string email,  string tel)
    {
        return BAL.Register(userName, pass, firstName, lastName, email, tel);
    }

    [WebMethod]
    public string GetKey()
    {
        return BAL.GetKey();
    }

    [WebMethod]
    public string AddNewSite(int userID, string siteName, string siteAddress)
    {
        return BAL.AddNewSite(userID, siteName, siteAddress);
    }


}
