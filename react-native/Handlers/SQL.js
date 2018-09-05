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
        reject("No Key was fetched");
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
        const res = await fetch(`${URL}/getRecivedInvites`, {
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
          if(data.Error)
            reject(data);
            
          resolve(data);
        }
        reject("No recived invites");

      } catch (error) {
        console.log(error);

      }
    });

  }


  
  static async DeleteInvite(siteId, senderId ,reciverId) {
    return new Promise(async (resolve, reject) => {
      try {
        await fetch(`${URL}/DeleteInvite`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ siteId, senderId ,reciverId }),
        });

      } catch (error) {
        reject(error);
      }

    });
  }


  static async RejectInvite(siteId, senderId ,reciverId) {
    return new Promise(async (resolve, reject) => {
      try {
        await fetch(`${URL}/RejectInvite`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ siteId, senderId ,reciverId }),
        });

      } catch (error) {
        reject(error);
      }

    });
  }

}
