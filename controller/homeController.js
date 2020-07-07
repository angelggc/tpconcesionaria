const fs = require("fs");
const bd = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8")) 
const homeController = {
    index: (req, res) => {
        res.set({ 'content-type': 'text/plain; charset=utf-8' });
        res.write("Bienvenido a nuestro sitio.\n\n");
        res.write("Estas son nuestras concesionarias:\n");
        bd.forEach(element => {
            res.write(element.sucursal + "\n")
        });
        res.end()
    }
}
module.exports = homeController