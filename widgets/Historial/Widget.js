///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/_base/declare', 
'jimu/BaseWidget',
'./external/vue',
'jimu/dijit/Message',
'jimu/dijit/Popup',
,'jimu/PanelManager',
'dojo/_base/lang',
],
function(declare, BaseWidget,Vue,Message,Popup,PanelManager,lang) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',

    postCreate: function() {
      this.inherited(arguments);
      this.createVueApp();
      this.vue_app.user= JSON.parse(localStorage.getItem('user'));
      const widget=this;
      if(this.vue_app.user){
          this.getConsultas(widget);
      }

      /*
      console.log('postCreate');*/
    },

    startup: function() {
      this.inherited(arguments);
    
      console.log('startup');


      
    },

    createVueApp: function(){

            
            
      const widget = this;
      this.vue_app = new Vue({
          el: this.domNode.querySelector('[data-id="historial-app"]'),
          data: {
              gisMap: this.map,
              processing: false,
              downloading: false,
              statistics: null,
              filterValues: null,                    
              filteredValue: "",
              currentSelectionShape: "",
              consultas:[],
              user:null,
              db: null,
              processing:false,
          },
  
          methods: {
              formatDate(value){
                  return moment(value).format('YYYY-MM-DD hh:mm:ss')
              },

              busqueda(consulta){ 

                widget.publishData(consulta);
               
                
              },
             
              eliminarConsulta(idConsulta){
                
                widget.eliminarConsulta(idConsulta);
              }


          },

          filters: {

              dateToString: function (value) {
                  return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }

          }

         
      });
  },


  getConsultas : function(widget){


    widget.vue_app.consultas=[];
    widget.vue_app.processing = true;
    
    const token = localStorage.getItem('token');

      fetch( `${apiUrlAuth}/historial` ,{
            method: 'GET',
          
            headers:{
              'Authorization': `Bearer ${token}` ,
              "content-type": "application/json",
             
              },

           
          }
          ).then(async (res)=>{

            const response=await res.json();
            
            if(response){
              if(response.status===200){
                const data =  !(response.result)?[]:response.result;
                widget.vue_app.consultas=data;

                widget.vue_app.consultas=widget.vue_app.consultas.sort(function(a,b){
                  return new Date(b.createdAt) - new Date(a.createdAt);
                });
              }  
              

              else if(response.status===401){
                refresToken(widget,widget.getConsultas,function(err){
                 
                });

              }
                
            }

            widget.vue_app.processing = false;

           

        }).catch(err => {

            widget.vue_app.processing = false;
          
        });



    /*
    this.vue_app.db = firebase.firestore();
    const docRef = this.vue_app.db.collection('consultas').where("uid", "==", uid).get();

    
    docRef.then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{

          const id = doc.id;
          const data =doc.data();

          
           this.vue_app.consultas.push({id,...data});
                  
        })

        this.vue_app.consultas=this.vue_app.consultas.sort(function(a,b){
          return new Date(b.fecha) - new Date(a.fecha);
        });

        this.vue_app.processing = false;

    }); */

    
},

eliminarConsulta: function(id){

  const widget = this;


  this.popup = new Popup({
    maxHeight:150,
    maxWidth: 300,

    content:'Desea eliminar la consulta?',
    titleLabel:'Confirmar',
    buttons:[
      {label:'Aceptar',
        onClick: 
        function () {
          widget.idDelete = id;
          widget.deleteConsultaService(widget);
         /* const docRef = widget.vue_app.db.collection('consultas').doc(id);*/

          /*
          docRef.delete().then(()=>{
            
            widget.popup.close();
            widget.getConsultas(widget);
        
          }).catch((error)=>{
            console.log('error');
          });
*/




          
        }
        
        },
      {label:'Cancelar',
      },


      
    ],

  })

},


deleteConsultaService:function(widget){

  const token = localStorage.getItem('token');
  const id = widget.idDelete;

  fetch( `${apiUrlAuth}/historial/delete/${id}` ,{
        method: 'POST',
      
        headers:{
          'Authorization': `Bearer ${token}` ,
          "content-type": "application/json",
         
          },
  
       
      }
      ).then(async (res)=>{
  
        const response=await res.json();
        
        if(response){
          if(response.status===200){
            widget.popup.close();
            widget.getConsultas(widget);

          }  
          
  
          else if(response.status===401){
            refresToken(widget,widget.deleteConsultaService,function(err){
            });
  
          }
            
        }
  
  
    }).catch(err => {
  
      console.log('err>>>',err);
      
    });
  

},


    onOpen: function(){
      
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    },

    showVertexCount: function(count){
      this.vertexCount.innerHTML = 'The vertex count is: ' + count;
    },


    onReceiveData: function(name, widgetId, data, historyData) {
    
      if(name == 'FormHistorial'){
        const widget = this;
        
        widget.getConsultas(widget);
      }

      else{
          return;    
      }

      
    },


  });
});