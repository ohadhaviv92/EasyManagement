const URL = "http://localhost:61559/WebService.asmx";
export default class SQL {
  static Login(userName, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Login`, {
          body: JSON.stringify({
            userName,
            password
          }),
          headers: {
            "content-type": "application/json; charset=UTF-8"
          },
          method: "POST"
        });

        const json = await res.json();
        const data = JSON.parse(json.d);
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
            "content-type": "application/json; charset=UTF-8"
          },
          method: "POST"
        });
        const json = await res.json();
        const data = JSON.parse(json.d);

        if (typeof data === "string")
          // if a JSON was not returned from SQL, its a custom error message
          reject(data);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static GetKey() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          "http://localhost:61559/WebService.asmx/GetKey",
          {
            headers: {
              "content-type": "application/json; charset=UTF-8"
            },
            method: "POST"
          }
        );

        const data = await res.json();
        if (data.d.length > 0) {
          resolve(data.d);
        }
        reject("No Key was fetched");
      } catch (error) {
        reject(error);
      }
    });
  }

  static UpdateNotification(email, subscription) {
    fetch(`${URL}/UpdateNotification`, {
      body: JSON.stringify({
        email,
        token: JSON.stringify(subscription)
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      method: "POST"
    });
  }
}
