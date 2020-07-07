const fs = require("fs");
const bd = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8")) 

const autosController = {
    index: (req, res) => {
        res.set({ 'content-type': 'text/plain; charset=utf-8' });

        function borrarColorAño(array){
            array.forEach(element => {
                delete element.color
                delete element.anio
            })
        }

        function quitarRepetidos(array){
            array = array.filter((valorActual, indiceActual, arreglo) => {
                return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
            })
            return array
        }

        function escribirMarcaModelo(array){
            array.forEach(element => {
                res.write("Marca: " + element.marca + "\n")
                res.write("Modelo: " + element.modelo + "\n\n")
            })
        }

        function filtroMarcas(array){
            array = array.filter(filtro => filtro.marca === req.params.marca)
            return array
        }

        function escribirConFiltro(array){
            if(array == ""){
                res.write("Esta concesionaria no dispone de esta marca.\n\n")
            }else{
                array.forEach(element => {
                    res.write("Marca: " + element.marca + "\n")
                    res.write("Modelo: " + element.modelo + "\n\n")
                })
            }
        }

        let autos3febrero = bd[0].autos
        let autosPilar = bd[1].autos
        let autosLanus = bd[2].autos
        let autosQuilmes = bd[3].autos
        let autosSanMiguel = bd[4].autos

        borrarColorAño(autos3febrero)
        borrarColorAño(autosPilar)
        borrarColorAño(autosLanus)
        borrarColorAño(autosQuilmes)
        borrarColorAño(autosSanMiguel)

        let autos3febreroLimpio = quitarRepetidos(autos3febrero)
        let autosPilarLimpio = quitarRepetidos(autosPilar)
        let autosLanusLimpio = quitarRepetidos(autosLanus)
        let autosQuilmesLimpio = quitarRepetidos(autosQuilmes)
        let autosSanMiguelLimpio = quitarRepetidos(autosSanMiguel)

        let autos3febreroConFiltro = filtroMarcas(autos3febreroLimpio)
        let autosPilarConFiltro = filtroMarcas(autosPilarLimpio)
        let autosLanusConFiltro = filtroMarcas(autosLanusLimpio)
        let autosQuilmesConFiltro = filtroMarcas(autosQuilmesLimpio)
        let autosSanMiguelConFiltro = filtroMarcas(autosSanMiguelLimpio)

        if(req.params.marca == undefined){

            res.write("Estos son todos los autos de nuestras concesionarias\n\n")

            res.write("---Sucursal 3 de Febrero---\n")
            escribirMarcaModelo(autos3febreroLimpio)

            res.write("---Sucursal Pilar---\n")
            escribirMarcaModelo(autosPilarLimpio)

            res.write("---Sucursal Lanus---\n")
            escribirMarcaModelo(autosLanusLimpio)

            res.write("---Sucursal Quilmes---\n")
            escribirMarcaModelo(autosQuilmesLimpio)
        
            res.write("---Sucursal San Miguel---\n")
            escribirMarcaModelo(autosSanMiguelLimpio)

        }else{

            res.write("---Sucursal 3 de Febrero---\n")
            escribirConFiltro(autos3febreroConFiltro)

            res.write("---Sucursal Pilar---\n")
            escribirConFiltro(autosPilarConFiltro)

            res.write("---Sucursal Lanus---\n")
            escribirConFiltro(autosLanusConFiltro)

            res.write("---Sucursal Quilmes---\n")
            escribirConFiltro(autosQuilmesConFiltro)
        
            res.write("---Sucursal San Miguel---\n")
            escribirConFiltro(autosSanMiguelConFiltro)

        }
        res.end()
    }
}
module.exports = autosController

//Intente hacer el /:datos pero no me salio :(