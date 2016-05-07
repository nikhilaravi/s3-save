'use strict';
const AWS = require('aws-sdk');
var Promise = require('promise');
AWS.config.region = 'eu-west-1';
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
  const id = new Date().getTime();
  const data = Object.assign({}, event.data, {id});
  const p = {
    Bucket: event.bucket,
    Key: `${id}.json`,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  s3Promise(p, 'upload')
    .then(data => {
      console.log('id', data, { id: id.toString() });
      return callback(null, { id: id.toString() });
    }).catch(err => {
      console.log('error in s3 upload', err);
      return callback(err);
    });
};

function s3Promise (params, method) {
  return new Promise(function (resolve, reject) {
    s3[method](params, function (err, data) {
      console.log('err in s3', method, err);
      if (err) return reject(err);
      console.info('incoming data:', data);
      resolve(data);
    });
  });
}
