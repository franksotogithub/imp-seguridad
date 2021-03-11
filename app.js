/*var firebaseConfig = {
  apiKey: "AIzaSyCTWb-vdr_UK31Vrr5u5uxEKjAChEq1-A0",
  authDomain: "imp-dev-c39ee.firebaseapp.com",
  projectId: "imp-dev-c39ee",
  storageBucket: "imp-dev-c39ee.appspot.com",
  messagingSenderId: "374394824095",
  appId: "1:374394824095:web:bb7d2ffbd847ee816c89aa",
  measurementId: "G-EJ4VMW1QXC"
};
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const db = firebase.firestore();

*/


var refresToken = function(widget,cb,errorCb){
  
  const user= JSON.parse(localStorage.getItem('user'));
  const refreshToken = localStorage.getItem('refreshToken');

  const body = {
    username : user.username,
    refreshToken : refreshToken

  };


  fetch(`${apiUrlAuth}/auth/token`,{
    method: 'POST',

    headers:{
     
      "content-type": "application/json",
     
    },
    
    body:JSON.stringify(body)

  }).then(async (res)=>{

    const response=await res.json();
   
    if(response && response.result.token){
     
      localStorage.setItem('token', response.result.token);
      localStorage.setItem('refreshToken', response.result.refreshToken); 
      
      return cb(widget);

    }

    else{
      console.log('response>>>',response);
      
      return location="login.html";  
    }
    
  }).catch(err => {
    console.log('err>>>',err);
    return location="login.html";  
  });




}


/*


(function () {
  const originalFetch = fetch;
  fetch = function () {
     console.log('arguments>>>',arguments);

    return originalFetch.apply(this, arguments).then(function (data) {
      if (data.status === 200) 
      {  
        
      
        
        return data;
       
      
      }
      if (data.status === 401) {


          console.log("========== 401 Not Authorin.=============");
          
          const user= JSON.parse(localStorage.getItem('user'));
          const refreshToken = localStorage.getItem('refreshToken');



          const body = {
            username : user.username,
            refreshToken : refreshToken

          };


          
          fetch(`${apiUrlAuth}/auth/token`,{
            method: 'POST',
    
            headers:{
             
              "content-type": "application/json",
             
            },
            
              body:JSON.stringify(body)

          }).then(async (res)=>{

            const response=await res.json();
            console.log('response>>>',response);
            if(response && response.result.token){
             
              localStorage.setItem('token', response.result.token);
              localStorage.setItem('refreshToken', response.result.refreshToken); 
              
              return originalFetch.apply(this, arguments);

            }

            else{

              
            }
          
        }).catch(err => {
          console.log('err>>>',err);
        });

        
      } else {
        return data;
      }
    });
  };
})();*/