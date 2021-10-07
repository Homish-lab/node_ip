const http = require('http')
const port = 8080
const hostname = '0.0.0.0'
var LAN
var WLAN

console.clear()
// All network cards
var os = require('os');
var ifaces = os.networkInterfaces();
console.log('All network cards:')
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

console.log('\nIPv4:')

// WLAN
var address,
    ifaces = require('os').networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
}
console.log('Address WLAN: ' + address);
WLAN = address

// LAN
require('dns').lookup(require('os').hostname(), function (err, address, fam) {
  console.log('Address LAN: ' + address)
  LAN = address
})

// Timeout
setTimeout(() => {
	
// Server
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Welcome to my website\n' + 'LAN: ' + LAN + '\nWLAN: ' + WLAN + '\nPort:'+ port + '\n\r	Homer Simpson')
})
server.listen(port, hostname, () => {
  console.log(`\nServer Status:\n` + `Server running at localhost: http://127.0.0.1:${port}/` + `\nServer running at LAN: http://${LAN}:${port}/` + `\nServer running at WLAN: http://${WLAN}:${port}/` + `\nPort: ${port}`)
  
})}, 4)
