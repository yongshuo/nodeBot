This example require install nodejs, socket.io

1. Install the nodejs under linux 12.04
  1. check dependencies
    1. sudo apt-get install g++ curl libssl-dev apache2-utils
    2. sudo apt-get install git-core
  2. download and install nodejs
    1. git clone git://github.com/ry/node.git
    2. cd node
    3. ./configure
    4. make
    5. sudo make install
2. Install the socket.io
  1. sudo npm install socket.io
3. download the client and server to the folder contains node_module (socket.io module folder)
4. make a link of node to server folder using sudo ln -s [nodePath/node] node
5. run node server.js
6. open browser type localhost , then should be works :)

  
