var path = require('path');

module.exports = function(){
  switch(process.env.NODE_ENV){
    case 'dev':
      return {
        DBUrl: 'mongodb://localhost:27017/kREL-DEV',
        port: 4043,
        ssl_directory: path.join(process.env.HOME, '.ssh')
      };

    case 'test':
      return {
        DBUrl: 'mongodb://localhost:27017/kREL-TEST',
        port: 4044,
        ssl_directory: path.join(process.env.HOME, '.ssh')
      };
    case 'prod':
      return {
        DBUrl: 'mongodb://localhost:27010/kREL',
        port: 4045,
        ssl_directory: path.join(process.env.HOME, '.ssh')
      };

  };
};
