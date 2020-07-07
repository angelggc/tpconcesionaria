const fs = require("fs");
const bd = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8")) 
const marcasController ={
    index: (req, res) => {
        res.set({ 'content-type': 'text/plain; charset=utf-8' });
        if(req.params.marca == undefined){
            let listaMarcas = []
            bd.forEach(element => {
                element.autos.forEach(auto => {
                    listaMarcas.push(auto.marca)
                })
            });
            let marcasSinRepetir = [...new Set(listaMarcas)]
            res.write("Estas son las marcas que se encuentran en nuestras concesionarias: \n" )
            marcasSinRepetir.forEach(element => res.write(element + "\n"))
            res.end()
        }else{
            let listaMarcaEspecifica = []
            bd.forEach(element => {
                element.autos.forEach(auto => {
                    if(auto.marca == req.params.marca){
                        listaMarcaEspecifica.push(auto)
                    }
                })
            })

            listaMarcaEspecifica.forEach(element => delete element.color)

            listaMarcaEspecifica = listaMarcaEspecifica.filter((valorActual, indiceActual, arreglo) => {
                return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
            })

            if(req.params.marca == "volkswagen" || req.params.marca == "peugeot" || req.params.marca == "chevrolet" || req.params.marca == "nissan" || req.params.marca == "renault" || req.params.marca == "audi" || req.params.marca == "fiat" || req.params.marca == "ford" || req.params.marca == "toyota" || req.params.marca == "citroen" || req.params.marca == "chery" || req.params.marca == "honda"){
                res.write("Estos son todos nuestros autos de la marca " + listaMarcaEspecifica[0].marca + "\n\n")
                listaMarcaEspecifica.forEach(element => {
                    res.write("Marca: " + element.marca + "\n")
                    res.write("Modelo: " + element.modelo + "\n")
                    res.write("Año: " + element.anio + "\n\n")
                })
            }else{
                res.end("Por favor busque una marca del listado de /marcas.")
            }
        }
        res.end()
    }
}

module.exports = marcasController