using _BAL;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;

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
    public List<JobDetails> GetJobsDetails()
    {
        return Bal.Instance.GetJobs();
    }

    [WebMethod]
    public UserInSites Login(string UserName, string Pass)
    {
        return Bal.Instance.Login(UserName, Pass);
    }

    [WebMethod]
    public object Register(string UserName, string Pass, string FirstName, string LastName, string Email ,string Tel)
    {
        var res = Bal.Instance.Register(UserName, Pass, FirstName, LastName, Email, Tel);
        return res;
    }


    [WebMethod]
    public void Notify(string Email , string Token)
    {
        Bal.Instance.AddNotification(Email, Token);
    }


    [WebMethod]
    public object SendInvite(int SiteId, int SenderId, string ReciverName, int UserType)
    {
        return Bal.Instance.SendInvite(SiteId, SenderId, ReciverName, UserType);
    }


    [WebMethod]
    public List<UserInSite> SentInvites(int UserId)
    {
        return Bal.Instance.GetSentInvites(UserId);
    }


    [WebMethod]
    public List<UserInSite> GetRecivedInvites(int UserId)
    {
        return Bal.Instance.GetRecivedInvites(UserId);
    }


    [WebMethod]
    public void DeleteInvite(int SiteId, int SenderId, int ReciverId)
    {
        Bal.Instance.DeleteInvite(SiteId, SenderId, ReciverId);
    }


    [WebMethod]
    public void RejectInvite(int SiteId , int SenderId, int ReciverId)
    {
        Bal.Instance.RejectInvite(SiteId , SenderId, ReciverId);
    }


    [WebMethod]
    public UserInSite ConfirmInvite(int SiteId, int SenderId , int ReciverId)
    {
        return Bal.Instance.ConfirmInvite(SiteId, SenderId, ReciverId);
    }

    [WebMethod]
    public BuildingSite AddNewSite(int UserId, string SiteName , string SiteAddress, string base64)
    {
        return Bal.Instance.AddNewSite(UserId, SiteName, SiteAddress, base64);
    }


    [WebMethod]
    public BuildingSite ChangeSiteStatus(int SiteId, int StatusId)
    {
        return Bal.Instance.ChangeSiteStatus(SiteId, StatusId);
    }


    [WebMethod]
    public List<RoomType> GetRoomsType()
    {
        return Bal.Instance.GetRoomTypes();
    }



    [WebMethod]
    public void UploadImg(string base64, string imgName, string imgRef)
    {

        Bal.Instance.uploadImg(base64, imgName, imgRef);
    }


    [WebMethod]
    public void OutFromSite(int SiteId , int UserId) 
    {

        Bal.Instance.OutFromSite(SiteId , UserId);
    }



    [WebMethod]
    public Room AddRoom(int SiteId , int RoomTypeId, string RoomName, int FloorNumber, string base64image = "")
    {
        return Bal.Instance.AddRoom(SiteId, RoomTypeId, RoomName, FloorNumber, base64image);
    }

    
    [WebMethod]
    public List<User> GetAllUserInSite(int SiteId)
    {
        return Bal.Instance.GetAllUserInSite(SiteId);
    }

    [WebMethod]
    public Fault AddFault(int OwnerID, int WorkerID,int RoomID, int FaultType,string Info, string base64 = "")
    {
        return Bal.Instance.AddFault(OwnerID, WorkerID, RoomID, FaultType, Info);
    }

    [WebMethod]
    public List <FaultType> GetFaultTypes()
    {
        return Bal.Instance.GetFaultTypes();
    }

    [WebMethod]
    public void changeFaultStatus(int faultID, int status, string info)
    {
         Bal.Instance.changeFaultStatus( faultID,  status,  info);
    }

    [WebMethod]
    public object EditUserDetails(int UserID , string UserName, string FirstName, string LastName, string Email, string Tel ,string Img)
    {
        var res = Bal.Instance.EditUserDetails(UserID, UserName, FirstName, LastName, Email, Tel, Img);
        return res;
    }

}
