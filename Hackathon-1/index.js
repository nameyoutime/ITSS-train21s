let chonNV = document.getElementById("chonNv");
let hinhNv = [{hinh: "./Nv/1.gif"},
{hinh:"./Nv/3.gif"},{hinh:"./Nv/2.gif"},{hinh:"./Nv/4.png"}];
let temp;
let checkFrame=false;

for(let i of hinhNv){

  let div = document.createElement("div");
  let btnImg=document.createElement("img");
  btnImg.id="nhanVat";

  btnImg.src=i.hinh;
  btnImg.width="200px";
  btnImg.onclick=()=>{
    temp=i.hinh;
    if(checkFrame==false){
      runRobotAnimation(VillageState.random(), lazyRobot, []);
      checkFrame=true;
    }
    else{
      document.getElementById("hinh").remove();
      runRobotAnimation(VillageState.random(), lazyRobot, []);
      checkFrame=true;

    }
  }
  div.appendChild(btnImg);
  chonNV.appendChild(div);
}

(function() {
    "use strict"
  
    let active = null
  
    const places = {
        //279 100

        //11 dia diem
        //A
      "A": {x: 370, y: 192},
      //B
      "B": {x: 280, y: 203},
      //C
      "C": {x: 172, y: 207},
      //D
      "D": {x: 215, y: 99},
      //E
      "E": {x: 142, y: 117},
      //F
      "F": {x: 60, y: 140},
      //G
      "G": {x: 91, y: 103},
      //h
      "H": {x: 22, y: 226},
      //I
      "I": {x: 393, y: 228},
      //j
      "J": {x: 92, y: 100},
      //K
      "K": {x: 275, y: 99}
    }
    const placeKeys = Object.keys(places)
  
    const speed = 2
  
    class Animation {
      constructor(worldState, robot, robotState) {
        this.worldState = worldState
        this.robot = robot
        this.robotState = robotState
        this.turn = 0
  
        let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument
        this.node = outer.appendChild(doc.createElement("div"))
        this.node.id="hinh"
        this.node.style.cssText = "position: relative; line-height: 0.1; margin-left: 10px; transform:scale(2.5); margin-top:100px"
      


        this.map = this.node.appendChild(doc.createElement("img"))
        this.map.src = "./village2x.png"
        this.map.className="map"


        this.map.style.cssText = "vertical-align: -8px"
        this.robotElt = this.node.appendChild(doc.createElement("div"))
        this.robotElt.className= "div2"


        this.robotElt.style.cssText = `position: absolute; transition: left ${0.8 / speed}s, top ${0.8 / speed}s;`
        let robotPic = this.robotElt.appendChild(doc.createElement("img"))
        

        this.robotElt.className = "divNho"
        //robot moving
        
        robotPic.src = temp;
        robotPic.style.width="60px"
        this.parcels = []
  
        this.text = this.node.appendChild(doc.createElement("span"))
        this.text.className="text"


        this.button = this.node.appendChild(doc.createElement("button"))
        this.button.style.cssText = "color: white; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1; font-family: sans-serif; font-size: 80%"
        this.button.textContent = "Stop"
  
        this.button.addEventListener("click", () => this.clicked())
        this.schedule()
  
        this.updateView()
        this.updateParcels()
  
        this.robotElt.addEventListener("transitionend", () => this.updateParcels())
      }
  
  
      updateView() {
        let pos = places[this.worldState.place]
        this.robotElt.style.top = (pos.y - 38) + "px"
        this.robotElt.style.left = (pos.x - 16) + "px"
  
        this.text.textContent = ` Turn ${this.turn} `
      }
  
      updateParcels() {
        while (this.parcels.length) this.parcels.pop().remove()
        let heights = {}
        for (let {place, address} of this.worldState.parcels) {
          let height = heights[place] || (heights[place] = 0)
          heights[place] += 14
          let node = document.createElement("div")
          let offset = placeKeys.indexOf(address) * 16

          node.className = "parcel"
          node.style.cssText = "position: absolute; height: 16px; width: 16px; background-image: url(./parcel2x.png); background-position: 0 -" + offset + "px";
          if (place == this.worldState.place) {
            node.style.left = "25px"
            node.style.bottom = (20 + height) + "px"
            this.robotElt.appendChild(node)
          } else {
            let pos = places[place]
            node.style.left = (pos.x - 5) + "px"
            node.style.top = (pos.y - 10 - height) + "px"
            this.node.appendChild(node)
          }
          this.parcels.push(node)
        }
      }
  
      tick() {
        let {direction, memory} = this.robot(this.worldState, this.robotState)
        this.worldState = this.worldState.move(direction)
        this.robotState = memory
        this.turn++
        this.updateView()
        if (this.worldState.parcels.length == 0) {
          this.button.remove()
          this.text.textContent = ` Finished after ${this.turn} turns`
          
          //robot stop
          this.robotElt.firstChild.src = temp
        } else {
          this.schedule()
        }
      }
  
      schedule() {
        this.timeout = setTimeout(() => this.tick(), 1000 / speed)
      }
  
      clicked() {
        if (this.timeout == null) {
          this.schedule()
          this.button.textContent = "Stop"
          this.robotElt.firstChild.src = "./robot_moving2x.gif"
        } else {
          clearTimeout(this.timeout)
          this.timeout = null
          this.button.textContent = "Start"
          this.robotElt.firstChild.src = "./robot_idle2x.png"
        }
      }
    }
  
    window.runRobotAnimation = function(worldState, robot, robotState) {
      if (active && active.timeout != null)
        clearTimeout(active.timeout)
      active = new Animation(worldState, robot, robotState)
    }
  })()
  var roads = [
      "A-B",   "A-G",
      "A-I",
      
      
      "B-I",
      "B-C","B-G",
      
      "C-H","C-D",
      "C-E","C-F","C-J",

      "D-E",

      "E-J"
      , "E-F",

      "J-F",

      "K-G"
      
    ];
    
    function buildGraph(edges) {
      let graph = Object.create(null);
      function addEdge(from, to) {
        if (graph[from] == null) {
          graph[from] = [to];
        } else {
          graph[from].push(to);
        }
      }
      for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
      }
      return graph;
    }
    
    var roadGraph = buildGraph(roads);
    
    var VillageState = class VillageState {
      constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
      }
    
      move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
          return this;
        } else {
          let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
            return {place: destination, address: p.address};
          }).filter(p => p.place != p.address);
          return new VillageState(destination, parcels);
        }
      }
    }
    
    function runRobot(state, robot, memory) {
      for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
          console.log(`Done in ${turn} turns`);
          break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
      }
    }
    
    function randomPick(array) {
      let choice = Math.floor(Math.random() * array.length);
      return array[choice];
    }
    
    function randomRobot(state) {
      return {direction: randomPick(roadGraph[state.place])};
    }
    
    VillageState.random = function(parcelCount = 5) {
      let parcels = [];
      for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
          place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
      }
      return new VillageState("I", parcels);
    };
    
    var mailRoute = [
      "A", "C", "A", "B",
      "K", "D", "E",
      "G", "J", "G", "F",
      "H", "I"
    ];
    
    function routeRobot(state, memory) {
      if (memory.length == 0) {
        memory = mailRoute;
      }
      return {direction: memory[0], memory: memory.slice(1)};
    }
    
    function findRoute(graph, from, to) {
      let work = [{at: from, route: []}];
      for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
          if (place == to) return route.concat(place);
          if (!work.some(w => w.at == place)) {
            work.push({at: place, route: route.concat(place)});
          }
        }
      }
    }
    
    function goalOrientedRobot({place, parcels}, route) {
      if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
          route = findRoute(roadGraph, place, parcel.place);
        } else {
          route = findRoute(roadGraph, place, parcel.address);
        }
      }
      return {direction: route[0], memory: route.slice(1)};
    }
  
    function lazyRobot({place, parcels}, route) {
      if (route.length == 0) {
        // Describe a route for every parcel
        let routes = parcels.map(parcel => {
          if (parcel.place != place) {
            return {route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true};
          } else {
            return {route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false};
          }
        });
    
        // This determines the precedence a route gets when choosing.
        // Route length counts negatively, routes that pick up a package
        // get a small bonus.
        function score({route, pickUp}) {
          return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
      }
    
      return {direction: route[0], memory: route.slice(1)};
    }
    
