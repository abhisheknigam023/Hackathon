
if (process.env.NODE_ENV !== 'production') {
    // require('dotenv').load();
    require('dotenv').config('./env');
}


const storage = require('azure-storage');
const blobService = storage.createBlobService();
var ffmpeg = require('fluent-ffmpeg');
var BlobUrl = 'https://storageaccount2ams.blob.core.windows.net/demo/';
var filename;


const listBlobs = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} blobs in '${containerName}'`, blobs: data.entries });
            }
        });
    });
};


    // "use strict"

module.exports.execute = async () => {

    const containerName = "demo";
    var oldBlob = 0;
    let response;

    console.log("Job:"); 

    console.log(`Blobs in "${containerName}" container:`);
    response = await listBlobs(containerName);

    response.blobs.forEach((blob) => 
        console.log(` - ${blob.name}`));
    
    // console.log('BlobResult ',response.blobs.length); // [0].name);
    // if(oldBlob < response.blobs.length) {

        // var dif = response.blobs.length - oldBlob ;

        // for (var j=(oldBlob - 1); j<response.blobs.length; j++) {
            // console.log('oldBlob: ', oldBlob);
            console.log('response.blobs.length: ', response.blobs.length);
            var name = response.blobs[response.blobs.length - 1].name;
            // if(name.split('.')[1]=== 'mp4') {
                console.log('name: ', name);

                // dif =dif -1;
                var n = name.split('.')[0];
                var input = BlobUrl + name;
                // var output = BlobUrl + n + '.wav';
                var output = '/home/abhishek/Desktop/video_store/' + n + '.wav';
                // filename = output;
module.exports.out = output;

console.log('ffmpeg: ');
                function convert(input, output, callback) {
                    console.log('Input: ',input,'Output: ',output);
                    ffmpeg(input)
                        .output(output)
                        .on('end', function() {                    
                            console.log('conversion ended');
                            const audio = require('./audio');
                            callback(null);
                            
                        }).on('error', function(err){
                            console.log('error: ', err, err.code, err.msg);
                            callback(err);
                        }).run();
                }

                    convert(input, output, function(err){
                    if(!err) {
                        console.log('conversion complete');
                        //...
                    } else {
                        console.log('Error: ', err);
                    }
                    });
                    // oldBlob = oldBlob + 1;
            // } else {
            //     oldBlob = oldBlob +dif;
            // }
        // }
    // }
}

