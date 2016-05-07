# s3-save

An AWS lambda function that saves a object to an s3 bucket.

The incoming `event` object expects the following keys:

- data: an Object to be saved in json format
- bucket: the name of the s3 bucket to save the file in

The object will be saved as a json file with the filename being a timestamp.

The lambda function will return an object of the form :

```
{ id: '123445677' };
```

Where the id is the timestamp.
