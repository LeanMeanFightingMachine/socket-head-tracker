# Socket.io Head Tracker #


## Deployment ##
-	**app.js**  
This is the node app.  
Run from the command line with: $ node app.js


-	**http://localhost:8080/desktop/**  
Open this on the machine you're running the node app.  


-	**http://localhost:8080/mobile/**  
Change this line in /mobile/js/main.js:  
**this.socket = io.connect("http://192.168.43.148:8080");**  
to point to the address of the machine running the node app. Then open http://localhost:8080/mobile/.



You may have to fiddle with Node dependencies to get it to run, but that's out of my hands now.



