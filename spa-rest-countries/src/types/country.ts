export interface Country {
    //nombre del pais, es un objeto que contiene el nombre comun y el nombre oficial del pais
    name: {
        common: string; //ejemplo: "España"
        official: string; //ejemplo: "Reino de España"
    };
    cca3: string; //codigo de tres letras del pais, ejemplo: "ESP"
    flags: {
        png: string;
        svg: string;
    };
    region: string; //region geografica del pais, ejemplo: "Europe"
    languages?: {
        [key: string]: string; //idiomas oficiales del pais, ejemplo: {spa: "Spanish"} es un array de objetos donde la clave es el codigo del idioma y el valor es el nombre del idioma
    };
    currencies?: { //monedas oficiales
        [key: string]: { //es un array de objetos donde la clave es el codigo de la moneda y el valor es un objeto que contiene el nombre y el simbolo de la moneda
            name: string; //nombre de la moneda, ejemplo: "Euro"
            symbol: string; //simbolo de la moneda, ejemplo: "€"
        };
    };
    population: number;
    capital?: string[]; //es opcional
}