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
        console.log(data);
        
        if (data.error !== undefined)
          // if a JSON was not returned from SQL, its a custom error message
          reject(data.error);

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




}
