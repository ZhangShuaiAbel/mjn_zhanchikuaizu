
module.exports = {
    isEnv: process.env.NODE_ENV === 'dev' ? true : false,
    env: process.env.NODE_ENV,
    //envBaseUrl: 'http://59.110.240.175:18088',
    envBaseUrl: 'http://beta-zhanchikuaizu.91naxia.com/api',
    betaBaseUrl: 'http://beta-zhanchikuaizu.91naxia.com/api',
    testBaseUrl: 'http://test-zhanchikuaizu.91naxia.com/api',
    prodBaseUrl: 'https://zhanchikuaizu.91naxia.com/api'
}  
