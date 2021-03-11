const loginForm = document.getElementById('login-form');
const register = document.getElementById('register');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginUserName = loginForm['login-email'].value;
    const loginPassword = loginForm['login-password'].value;
    console.log(loginUserName, loginPassword);
    const data={
      username:loginUserName,
       password:loginPassword
  }


   
    /*fetch( "https://siu.imp.gob.pe/node/usuarios/usuarios-app/api/auth/login",{*/
    fetch( `${apiUrlAuth}/auth/login` ,{
        method: 'POST',
       
        headers:{
           
          "content-type": "application/json",
          "cache-control": "no-cache"
          },

        body:JSON.stringify(data)
       }
       ).then(async (res)=>{

        const response=await res.json();

        if(response){
            console.log(response);
            const user =response.result.user;
            const token = response.result.token;
            const refreshToken = response.result.refreshToken;

            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token',token);
            localStorage.setItem('refreshToken',refreshToken);
          

            const the_url = window.location.href;

            var the_arr = the_url.split('/');
            the_arr.pop();

            const final_url=the_arr.join('/');
            location = `${apiUrlAuth}/auth/generate-token-arcgis?url=${final_url}`


        }

    }).catch(err => {

        const loginError = document.getElementById("loginError");
        loginError.innerText = err.message;
    });




    /*
    var data = JSON.stringify({
        "username": "franksoto2",
        "password": "1234562"
      });
      
      var xhr = new XMLHttpRequest();
     
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "https://siu.imp.gob.pe/node/usuarios/usuarios-app/api/auth/login");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
    
      
      xhr.send(data);

*/

    
    /*auth.signInWithEmailAndPassword(loginEmail, loginPassword).then((result) => {
           
        if(result){
            const user = result.user;
            localStorage.setItem('user',JSON.stringify(user));
            location = "index.html";
          }
    
    }).catch(err => {
        const loginError = document.getElementById("loginError");
        loginError.innerText = err.message;
    })*/
});


register.addEventListener('click', e => {
    e.preventDefault();
    location = "http://imp.gob.pe/solicitud-de-acceso-geoimpacto/";
});
