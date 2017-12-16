/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// ---------------------------------------------------------------------------


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){  
    var filePath;
    var ofileEntry;

    function returnCodAlun(){
        var iduser = +localStorage.getItem('scbabyc_12_user');
        var ls = JSON.parse(localStorage.getItem('scbabyc_childs'));
        return +ls[iduser].codAlun;
    };

    function setOptions( srcType ){
        var options = {
            sourceType: srcType,
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true 
        }
        filePath = options.destinationType;
        return options;
    };

    function onErrorResolveUrl( e ){
        console.error('onErrorResolveUrl');
    };

    function onErrorCreateFile( e ){
        console.error('onErrorCreateFile');
    };

    function createNewFileEntry( imgUri ){
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function success( dirEntry ){
            dirEntry.getFile('tempFile.jpg',{create: true, exclusive: false },function( fileEntry ){
                ofileEntry = fileEntry;
                writeFile(fileEntry);
            }, onErrorCreateFile);
        }, onErrorResolveUrl);
    };

    function writeFile( fileEntry, dataObj ){
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function( fileWriter){

            fileWriter.onwriteend = function(){
                readFile(fileEntry);
            };

            fileWriter.onerror = function( e ){
                console.log("Failed file write: " + e.toString());
                alert("Failed file write: " + e.toString())
            };

            if( !dataObj )
                dataObj = new Blob(['some file data'], { type: 'text/plain' });

            fileWriter.write(dataObj);

        });
    }

    //pegar foto dos álbuns
    function openFilePicker(){
        var options = setOptions(Camera.PictureSourceType.PHOTOLIBRARY);
        navigator.camera.getPicture(function cameraSuccess( imageUri ){
            displayImage(imageUri);
            createNewFileEntry(imageUri);
        },function cameraError( error ){
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    };

    //tirar foto com a câmerda
    function openCamera(){
        var options = setOptions(Camera.PictureSourceType.CAMERA);
        navigator.camera.getPicture(function cameraSuccess( imageUri ){            
            displayImage(imageUri);
            createNewFileEntry(imageUri);
        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    };

    //
    function uploadPhoto(){

        var serviceURL = encodeURI('minhaurl/upload.php');        
        var fileURL = ofileEntry.nativeURL;

        var options = new FileUploadOptions();
            options.fileKey = 'file';
            options.fileName = 'receita'+ Math.floor(new Date/1000);
            options.mimeType = 'image/jpg';
            options.chunkedMode = false;
            options.headers = {
                Authorization : smbaby_token,
            };
        var params = new Object();
            params.co00Apme = "2";
            params.codAlun = returnCodAlun();
            options.params = params;

        var ft = new FileTransfer();
            ft.upload(fileURL,serviceURL,function( result ){
                alert(JSON.stringify(result));
                //$(document).trigger('submitRecipe-done',[true]);
            }, function(error){
                alert(JSON.stringify(error));
                //$(document).trigger('submitRecipe-done',[false]);
            }, options, true);
    }

    //mostra o preview
    function displayImage( imgUri ) {
        alert( imgUri );        
        $('#js-previewFile').attr('src',imgUri).parent().addClass('is-visible'); 
    }

    $(document).on('submitRecipe',function(){
        uploadPhoto();
    });

    $('#js-openFilePicker').on('click',function(){
        openFilePicker();
    });

    $('#js-openCamera').on('click',function(){
        openCamera();
    });

}