const env = process.env.NODE_ENV || 'development'; //node environment variable used for path db con etc..

if(env === 'development' || env === 'test'){
    const config = require('./config.json');
    let envConfig = config[env];

    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    }); 
}

