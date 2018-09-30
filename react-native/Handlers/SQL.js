const URL = "http://ruppinmobile.tempdomain.co.il/site04/api/service"; // http://ruppinmobile.tempdomain.co.il/site04/api/service
export default class SQL {
  static Login(UserName, Pass) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Login`, {
          body: JSON.stringify({
            UserName,
            Pass
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });

        const data = await res.json();

        if (data === null) reject("invalid email or password");

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static Register(UserName, Pass, FirstName, LastName, Email, Tel) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Register`, {
          body: JSON.stringify({
            UserName,
            Pass,
            FirstName,
            LastName,
            Email,
            Tel
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });

        const data = await res.json();

        if (data.Error !== undefined) {
          // if a JSON was not returned from SQL, its a custom error message
          reject(data.Error);
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static GetKey() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetKey`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "GET"
          }
        );


        const data = await res.json();

        if (data.length > 0) {
          resolve(data);
        }
        reject("No Key was fetched");
      } catch (error) {
        reject(error);
      }
    });
  }

  static async UpdateNotification(Email, Token) {

    try {
      await fetch(`${URL}/Notify`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email,
          Token
        }),
      });
    } catch (error) {
      console.log(error);

    }

  }



  static GetJobs() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/jobsDetails`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "GET"
          }
        );


        const data = await res.json();

        if (data !== null) {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  static async GetSentInvites(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/getSentInvites`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId }),
        });

        const data = await res.json();

        if (data !== null) {
          resolve(data);
        }
        reject("No sent invites");

      } catch (error) {
        console.log(error);

      }
    });

  }



  static async GetRecivedInvites(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/getRecivedInvites`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId }),
        });

        const data = await res.json();

        if (data !== null) {
          resolve(data);
        }
        reject("No recived invites");

      } catch (error) {
        console.log(error);

      }
    });

  }

  static async SendInvite(SiteId, UserType, SenderId, Reciver) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/sendInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SiteId,
            UserType,
            SenderId,
            Reciver
          }),
        });

        const data = await res.json();
        console.log(data);

        if (data !== null) {
          if (data.Error)
            reject(data);

          resolve(data);
        }
        reject("No recived invites");

      } catch (error) {
        console.log(error);

      }
    });

  }



  static async DeleteInvite(siteId, senderId, reciverId) {
    console.log(siteId, senderId, reciverId);

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/DeleteInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "siteId": siteId,
            "senderId": senderId,
            "reciverId": reciverId
          }),
        });
        console.log(res);

        resolve(true);
      } catch (error) {
        console.log(errorr);
        reject(error);
      }

    });
  }


  static async RejectInvite(siteId, senderId, reciverId) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/RejectInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "siteId": siteId,
            "senderId": senderId,
            "reciverId": reciverId
          }),
        });
     
        resolve(true)
      } catch (error) {
        reject(error);
      }

    });
  }

  static AddNewSite(userID, siteName, siteAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/AddNewSite`, {
          body: JSON.stringify({
            userID,
            siteName,
            siteAddress

          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });

        const data = await res.json();

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }


  static async ConfirmInvite(siteId, senderId, reciverId) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/ConfirmInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "siteId": siteId,
            "senderId": senderId,
            "reciverId": reciverId
          }),
        });
        const data = await res.json();
  
        resolve(data)
      } catch (error) {
        reject(error);
      }

    });
  }

  static ChangeSiteStatus(siteID, statusID) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/ChangeSiteStatus`, {
          body: JSON.stringify({
            siteID,
            statusID

          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });

        const data = await res.json();

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }




  static GetRoomsType() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/roomsType`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "GET"
          }
        );


        const data = await res.json();

        if (data !== null) {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  static async OutFromSite(siteID, userID) {
    
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/OutFromSite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            siteID,
            userID
          }),
        });
        console.log(res);

        resolve(true);
      } catch (error) {
        console.log(errorr);
        reject(error);
      }

    });

  }
    static async UploadImg(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(`${URL}/UploadImg`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64:data.base64,
              imgName:new Date(),
              imgRef:data.uri
            }),
          });
          console.log(res);
  
          resolve(true);
        } catch (error) {
          console.log(errorr);
          reject(error);
        }
  
      });

  }


  static async AddRoom(siteId , roomTypeId, roomName, floorNumber, base64image = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/UploadImg`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ siteId, roomTypeId, roomName, floorNumber, base64image}),
        });
   
        const data = await res.json();

        if (data === null)
           reject("couldnt add room");

      } catch (error) {
        reject(error);
      }

    });

}

}
