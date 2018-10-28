'use strict';

const request = require('request');
const protobuf = require('protobufjs');

module.exports.gtfs = (event, context, callback) => {

  protobuf.load('gtfs-realtime.proto')
      .then(function(root) {
         let message = root.lookupType("transit_realtime.FeedMessage");

         return new Promise((resolve, reject) => {

           var requestSettings = {
              method: 'GET',
              url: 'https://cdn.mbta.com/realtime/VehiclePositions.pb',
              encoding: null
            };
            request(requestSettings, function (err, response, body) {

              let gtfs_realtime = message.decode(body)

              if (err) {
                  console.log(`Got error`, err);

                  callback(err);

                  reject(err);

                  return;
              }

              const output = {
                  statusCode: 200,
                  headers: {
                      "Access-Control-Allow-Origin" : "*",
                      "Access-Control-Allow-Credentials" : true,
                      "content-type": 'application/json'
                  },
                  body: JSON.stringify(gtfs_realtime.entity)
              };

              callback(null, output);

            });

         });


      });



}
