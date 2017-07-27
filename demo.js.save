class Singleton {

   static getInstance() {
       if(!Singleton.instance) {
           Singleton.instance = new Singleton();
       }

       return Singleton.instace;
   }
}



let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();

console.log(instance1 === instance2);
