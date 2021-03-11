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

],
function(declare, BaseWidget,Editor,TemplatePicker,FeatureLayer,html) {
  //To create a widget, you need to derive from BaseWidget.
  listfeatureLayers:null;



  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',

    postCreate: function() {
      this.inherited(arguments);
      
      console.log('this.config>>',this.config);
      this.listfeatureLayers  = this.config.listfeatureLayers;
      this.listfeatureLayers.map((l)=>{
         l.featureLayer = new FeatureLayer(l.url,
          
          {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ['*']
          }
          );

          this.map.addLayers( [l.featureLayer] );
      });

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




       var templateLayers =this.listfeatureLayers.map(l=>{return l.featureLayer});

       console.log('templateLayers>>',templateLayers);
       var templatePicker = new TemplatePicker({
         featureLayers: templateLayers,
         grouping: true,
         rows: "auto",
         columns: "auto",
         style: "height: 100%; width: 900px;"
       },html.create("div", {}, this.domNode));
 
 
       templatePicker.startup();

        

    },

    initEditor : function(evt){

      console.log('evt.layers>>>',evt.layers);
      const templateLayers =evt.layers.map(l=>{return l.layer});


      /*const templateLayers =this.listfeatureLayers.map(l=>{return l.featureLayer});*/


      
      /*
      const templateLayers = arrayUtils.map(evt.layers, function(result){
        return result.layer;
      });*/

      console.log('templateLayers>>',templateLayers);
      
      var templatePicker = new TemplatePicker({
        featureLayers: templateLayers,
        grouping: false,
        rows: "auto",
        columns: 2
      }, "templateDiv");


      templatePicker.startup();

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
    }
  });
});