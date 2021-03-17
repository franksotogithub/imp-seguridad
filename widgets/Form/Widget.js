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
define(['dojo/_base/declare', 'jimu/BaseWidget','jimu/PanelManager','./external/vue','./external/vuelidate','./external/validators'],
function(declare, BaseWidget,PanelManager,Vue,Vuelidate,Validators) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,
    feature:null,
    graphic:null,
    baseClass: 'jimu-widget-demo',

    formOptions:[],

    createVueApp: function(){
      Vue.use(Vuelidate.default);
            
            
      const widget = this;


      /*this.formOptions=[{
        attribute:'unidad', typeForm :'select', optionSelect: [ ''] 


      }];*/



      this.vue_app = new Vue({
          el: this.domNode.querySelector('[data-id="form"]'),
          data: {

            step:1,
            totalsteps:2,
            form:{
              unidad:null,
              tipo_inc:null,
              sub_tipo_inc:null,   
              turno: null,             
              zona: null,
              distrito:null,
              nivel_incidencia:null,
              fuente: null,
              contacto:null,
              telefeno:null,
              cargo:null,
              institucion:null,
              usuario: null,
            },
           
        },

      validations:{
        form:{
          unidad:{
            required:Validators.required
          },
        
          tipo_inc:{
            required:Validators.required
          },
        
          sub_tipo_inc:{
            required:Validators.required
          },
        
          turno:{
            required:Validators.required
          },
        
          zona:{
            required:Validators.required
          },


        }
        
      },


          watch: {

          },



          methods: {
              
              submitForm(evt){


                if(!widget.vue_app.$v.form.$invalid){
                  widget.guardarData(evt);
                }
              },

              getOptions(attribute){
                return  widget.getOptions(attribute);
              },
              nextStep(){

                this.step++ ;
              },

              previousStep(){

                this.step--;
              }

          },




          filters: {

              dateToString: function (value) {
                  return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }


          }

         
      });
  },

  getOptions(attribute){

  var options=[
    {
      label:'01 SEGURIDAD CIUDADANA',value:'01 SEGURIDAD CIUDADANA',attribute:'unidad'
    },

    {
      label:'02 FISCALIZACIÓN',value:'02 FISCALIZACIÓN',attribute:'unidad'
    },

    {
      label:'01 ACCIDENTES DE TRÁNSITO',value:'01 ACCIDENTES DE TRÁNSITO',attribute:'tipo_inc'
    },

    {
      label:'02 HECHOS CONTRA EL PATRIMONIO',value:'02 HECHOS CONTRA EL PATRIMONIO',attribute:'tipo_inc'
    },

    {
      label:'001 ATROPELLO',value:'A',attribute:'sub_tipo_inc'
    },

    {
      label:'002 CHOQUE',value:'002 CHOQUE',attribute:'sub_tipo_inc'
    },

    {
      label:'Lima Centro 1',value:'Lima Centro 1',attribute:'zona'
    },

    {
      label:'Lima Centro 2',value:'Lima Centro 2',attribute:'zona'
    },


    {
      label:'Mañana',value:'Mañana',attribute:'turno'
    },

    {
      label:'Noche',value:'Noche',attribute:'turno'
    },
    {
      label:'Tarde',value:'Tarde',attribute:'turno'
    },

    {
      label:'No pertinente',value:'No pertinente',attribute:'nivel_incidencia'
    },
    {
      label:'Leve',value:'Leve',attribute:'nivel_incidencia'
    },
    {
      label:'Grave',value:'Grave',attribute:'nivel_incidencia'
    },
    {
      label:'Muy grave',value:'Muy grave',attribute:'nivel_incidencia'
    },

    {
      label:'Twitter',value:'Twitter',attribute:'fuente'
    },
    {
      label:'Whatsapp',value:'Whatsapp',attribute:'fuente'
    },
    
  ]


  return options.filter(o=>{return o.attribute ===attribute});


  },
  
  guardarData:function(evt){

    console.log('this.vue_app.formZ>>>',this.vue_app.form);

    console.log(this.feature);
    
    if(this.graphic && this.feature){
      this.graphic.setAttributes(this.vue_app.form);
      this.feature.applyEdits ( [this.graphic] );

    }
  },


/*

  saveConsultaService(widget){
    const token  = localStorage.getItem('token');
    fetch( `${apiUrlAuth}/historial` ,{
      method: 'POST',
    
      headers:{
        'Authorization': `Bearer ${token}` ,
        "content-type": "application/json",
       
        },
      
        body:JSON.stringify(widget.data)
     
    }
    ).then(async (res)=>{

      const response=await res.json();

      if(response){
        if(response.status===200){
          
          console.log('response>>>',response);

          const widgetsElement = widget.appConfig.getConfigElementsByName('Historial');
          console.log('widgets>>',widgetsElement);
          if(widgetsElement.length>0){
            const widgetId = widgetsElement[0].id;

            widget.openWidgetById(widgetId).then((e)=>{
              
              widget.publishData({mensaje:'actualizado'});

            });
          }
          
        }  
        

        else if(response.status===401){
          refresToken(widget,widget.saveConsultaService,function(err){
          });

        }
      }

  }).catch(err => {

      console.log('err>>>',err);
  });


  },
*/





    postCreate: function() {


      this.inherited(arguments);
      this.createVueApp();



      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    },

    startup: function() {
      this.inherited(arguments);
   
      console.log('startup');
      /*console.log('this.widgetManager>>>',this.widgetManager);*/
    },


    onOpen: function(){
     this.vue_app.form={
      unidad:null,
      tipo_inc:null,
      sub_tipo_inc:null,   
      turno: null,             
      zona: null,
      distrito:null,
      nivel_incidencia:null,
      fuente: null,
      contacto:null,
      telefeno:null,
      cargo:null,
      institucion:null,
      usuario: null,
     };

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

      if(name == 'Demo'){
        this.feature = data.feature;
        this.graphic = data.graphic;
        this.vue_app.form={
          unidad:null,
          tipo_inc:null,
          sub_tipo_inc:null,   
          turno: null,             
          zona: null,
          distrito:null,
          nivel_incidencia:null,
          fuente: null,
          contacto:null,
          telefeno:null,
          cargo:null,
          institucion:null,
          usuario: null,
         };
       

      }

      else{
          return;    
      }


/*
      if(name == 'Estadisticas_Imp'){
        console.log('data>>>',data);
     
        this.vue_app.datoConsulta =data;
        this.vue_app.form.distritos = data.distritos;
        this.vue_app.form.titulo = null;
        this.vue_app.form.descripcion = null;

      }

      else{
          return;    
      }
*/
      
    },

  });
});