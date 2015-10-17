module.exports = function(){
  switch(process.env.NODE_ENV){
    case 'dev':
      return {
        DBUrl: 'mongodb://localhost:27017/kREL-DEV',
        port: 8081
      };

    case 'test':
      return {
        DBUrl: 'mongodb://localhost:27017/kREL-TEST',
        port: 8082
      }
    case 'prod':
      return {
        DBUrl: 'mongodb://localhost:27010/kREL',
        port: 8080
      }

  };
}
