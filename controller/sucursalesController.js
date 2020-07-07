const fs = require("fs");
const bd = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8")) 
const sucursalesController = {
    index: (req, res) => {
        res.set({ 'content-type': 'text/plain; charset=utf-8' });
        if(req.params.sucursal == undefined) {
            bd.forEach(element => {
                res.write("Sucursal: " + element.sucursal + "\n")
                res.write("Direccion: " + element.direccion + "\n")
                res.write("Telefono: " + element.telefono + "\n\n")
            });
            res.end()
        }else{
            function listado(a){
                res.write("Sucursal: " + bd[a].sucursal + "\n")
                res.write("Direccion: " + bd[a].direccion + "\n")
                res.write("Telefono: " + bd[a].telefono + "\n")
                res.write("Autos: \n")
                bd[a].autos.forEach(element => {
                    res.write("       Marca: " + element.marca + "\n")
                    res.write("       Modelo: " + element.modelo + "\n")
                    res.write("       Año: " + element.anio + "\n")
                    res.write("       Color: " + element.color + "\n\n")
                })
                res.end()
            }
            switch (req.params.sucursal) {
                case "3-de-febrero":
                    listado(0)
                    break;
    
                case "pilar":
                    listado(1)
                    break;
                
                case "lanus":
                    listado(2)
                    break;
    
                case "quilmes":
                    listado(3)
                    break;
    
                case "san-miguel":
                    listado(4)
                    break;
                
                default:
                    res.end("Lo sentimos, esa sucursal no existe.")
                    break;
            }
        }
    }
}
module.exports = sucursalesController