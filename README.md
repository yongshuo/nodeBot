This example require install nodejs, socket.io

1. Install the nodejs under linux 12.04
  . check dependencies
    > sudo apt-get install g++ curl libssl-dev apache2-utils
    > sudo apt-get install git-core
  . download and install nodejs
    > git clone git://github.com/ry/node.git
    > cd node
    > ./configure
    > make
    > sudo make install
2. Install the socket.io
    > sudo npm install socket.io
3. download the client and server to the folder contains node_module (socket.io module folder)
4. make a link of node to server folder using sudo ln -s [nodePath/node] node
5. run node server.js
6. open browser type localhost , then should be works :)

  
