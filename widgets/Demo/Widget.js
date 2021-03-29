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
define(['dojo/_base/declare', 'jimu/BaseWidget',
"esri/dijit/editing/Editor",
"esri/dijit/editing/TemplatePicker",
"esri/layers/FeatureLayer",
'dojo/_base/html',
"esri/toolbars/draw",
"esri/graphic",
"esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", 'jimu/MapManager','esri/toolbars/edit',"dojo/_base/event","esri/InfoTemplate",

],
function(declare, BaseWidget,Editor,TemplatePicker,FeatureLayer,html,Draw,Graphic,SimpleMarkerSymbol,SimpleLineSymbol,Color, MapManager,Edit,event,InfoTemplate
  ) {
  //To create a widget, you need to derive from BaseWidget.
  listfeatureLayers=[];
  feature=null;
  newGraphic=null;


  return declare([BaseWidget,MapManager], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',

    postCreate: function() {
      this.inherited(arguments);
      var _this = this;

      
      console.log('this.config>>',this.config);
      this.listfeatureLayers  = this.config.listfeatureLayers;
      var template = new InfoTemplate();

      this.listfeatureLayers.map((l)=>{
         l.featureLayer = new FeatureLayer(l.url,
          
          {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ['*'],
            infoTemplate: template
          }
          );

          this.map.addLayers( [l.featureLayer] );

      });

      this.drawToolbar = new Draw(this.map);

     


      /*
      
      this.map.on("layers-add-result", function(evt){
        var templateLayers =evt.layers.map(l=>{return l.layer});

        console.log('templateLayers>>',templateLayers);
        var templatePicker = new TemplatePicker({
          featureLayers: templateLayers,
          grouping: true,
          rows: "auto",
          columns: "auto",
          style: "height: 100%; width: 900px;"
        },html.create("div", {}, this.domNode));
  
  
        templatePicker.startup();

      });
*/
      
      /*var templateLayers =evt.layers.map(l=>{return l.layer});*/
     /* var templateLayers =this.listfeatureLayers.map(l=>{return l.featureLayer});
      console.log('templateLayers>>',templateLayers);
   
      console.log('templatePicker>>>',templatePicker);*/

      /*var responsePoints = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0", {
          mode: FeatureLayer.MODE_ONDEMAND,
          outFields: ['*']
        });
        */


    
       var templateLayers =this.listfeatureLayers.map(l=>{return l.featureLayer;});

       /*console.log('templateLayers>>',templateLayers);*/
       var templatePicker = new TemplatePicker({
         featureLayers: templateLayers,
         grouping: true,
         rows: "auto",
         columns: "auto",
         style: "height: 100%; width: 100%;"
       },
       
       html.create("div", {}, this.domNode)
       
       );
 
 
       templatePicker.startup();

       var selectedTemplate;
       templatePicker.on("selection-change", function() {
          
          if( templatePicker.getSelected() ) {
            selectedTemplate = templatePicker.getSelected();
          }
          switch (selectedTemplate.featureLayer.geometryType) {
            case "esriGeometryPoint":
              _this.drawToolbar.activate(Draw.POINT);
              break;
            case "esriGeometryPolyline":
              _this.drawToolbar.activate(Draw.POLYLINE);
              break;
            case "esriGeometryPolygon":
              _this.drawToolbar.activate(Draw.POLYGON);
              break;
          }

    
          
        });




        var widgets = this.appConfig.getConfigElementsByName('Form');


       const simpleMarkerSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,15,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color([36,204,199,1]), 2),
        new Color([36,204,199,0.2]));

        
        

        this.drawToolbar.on("draw-end", function(evt) {
            _this.map.graphics.clear();

            _this.newGraphic = new Graphic(evt.geometry, simpleMarkerSymbol, null);

            _this.map.graphics.add(_this.newGraphic);

            if(widgets.length>0){
                var widgetId = widgets[0].id;
        
              _this.openWidgetById(widgetId).then((widget)=>{
                _this.feature=selectedTemplate.featureLayer;
                _this.publishData({});
              
              });
            }


            templatePicker.clearSelection();
            
            _this.drawToolbar.deactivate();

            _this.createToolbar();


        });



        

    },

    createToolbar:function() {
      const _this= this;

      this.editToolbar = new Edit(this.map);
      
      
      this.map.graphics.on("click", (evt)=> {
        event.stop(evt);
        _this.activateToolbar(evt.graphic,_this.editToolbar);
      });
      
      
      this.map.on("click", (evt)=>{
        _this.editToolbar.deactivate();

      });
    },


    activateToolbar : function(graphic,editToolbar){
      let tool=0;
      tool = tool | Edit.MOVE; 
      editToolbar.activate(tool, graphic);
    }, 



    popupInit : function(){
      
      this.popup = new Popup({
        
        content:'',
        titleLabel:'Guardar',
        buttons:[
          {label:'Aceptar',
            onClick: 
            function () {
             
            }
            
            },
          {label:'Cancelar',
          },
    
        ],
    
      });

    },

    initEditor : function(evt){



    },

    startup: function() {
      this.inherited(arguments);
      /*this.mapIdNode.innerHTML = 'map id:' + this.map.id;*/
      console.log('startup');
    },

    onOpen: function(){
      console.log('onOpen');
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
     /* this.vertexCount.innerHTML = 'The vertex count is: ' + count;*/
    },

    sleep:function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    onReceiveData:  function(name, widgetId, data, historyData) {
      var _this= this;
      if(name == 'Form'){
        if(data.event=='close'){
          this.map.graphics.clear();

        }
        else if(data.event=='guardar'){

          
          const dataForm = JSON.parse(data.datos);
  
          if(this.newGraphic && this.feature){
           
            this.newGraphic.setAttributes(dataForm);
            this.feature.applyEdits ( [this.newGraphic] ,null,null,async (res)=>{
              await _this.sleep(1000);
              const zoom = _this.map.getZoom();
              const maxZoom = _this.map.getMaxZoom();
              
              if(zoom<maxZoom){
                _this.map.centerAndZoom(_this.newGraphic.geometry, zoom + 1);
              }
              
              else{
                _this.map.centerAndZoom(_this.newGraphic.geometry, zoom -1);
              }
              _this.map.graphics.remove(_this.newGraphic);
              
            },(error)=>{
              console.log(error);
            } );
           
         
          }

        
        }

      }

      else{
          return;    
      }



      
    },
  });
});