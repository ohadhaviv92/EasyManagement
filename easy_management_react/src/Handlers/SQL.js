const URL = "http://localhost:51950";
export default class SQL {
  static Login(userName, pass) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Login`, {
          body: JSON.stringify({
            userName,
            pass
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

  static Register(userName, pass, firstName, lastName, email, tel) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Register`, {
          body: JSON.stringify({
            userName,
            pass,
            firstName,
            lastName,
            email,
            tel
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

  static UpdateNotification(email, subscription) {

    fetch(`${URL}/notify`, {
      body: JSON.stringify({
        user:{
          email
        },
        token:{
          endpoint: subscription.toJSON().endpoint,
          p256dh: subscription.toJSON().keys.p256dh,
          auth: subscription.toJSON().keys.auth
        }
        }),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
  }
}
