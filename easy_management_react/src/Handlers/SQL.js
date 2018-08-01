
const URL = 'http://localhost:61559/WebService.asmx';
export default class SQL {

    static Login(userName, password){
        return new Promise( async (resolve , reject)=>{
            try {
                let res = await fetch(`${URL}/Login` ,{
                    body: JSON.stringify({
                        userName,
                        password
                      }),
                      headers: {
                        'content-type': 'application/json; charset=UTF-8'
                      },
                      method: 'POST'
                })
                let json = await res.json();
                resolve(JSON.parse(json.d));
            } catch (error) {
                reject(error);
            }
        })
    }




    static Register(userName,
                    pass,
                    firstName,
                    lastName,
                    email,
                    tel){
        return new Promise( async (resolve , reject)=>{
            try {
                let res = await fetch(`${URL}/Register` ,{
                    body: JSON.stringify({
                        userName,
                        pass,
                        firstName,
                        lastName,
                        email,
                        tel
                      }),
                      headers: {
                        'content-type': 'application/json; charset=UTF-8'
                      },
                      method: 'POST'
                })
                let json = await res.json();
                resolve(JSON.parse(json.d));
            } catch (error) {
                reject(error);
            }
        })
    }
}