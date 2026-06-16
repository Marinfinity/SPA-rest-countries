export interface Country {
    //nombre del pais, es un objeto que contiene el nombre comun y el nombre oficial del pais
    names: {
        common: string; //ejemplo: "España"
        official: string; //ejemplo: "Reino de España"
    };
    codes: {
        ccn3: string; //codigo numerico del pais, ejemplo: "724"
        cioc?: string; //codigo de 3 letras del pais, ejemplo: "ESP"
        alpha_3?: string; //codigo de 3 letras del pais, ejemplo: "ESP"
    }

    flag: {
        url_png: string;
        url_svg: string;
    };
    region: string; //region geografica del pais, ejemplo: "Europe"
    languages?: {
        name: string; //spanish
        native_name: string; //español
        iso639_3: string; //codigo de 3 letras: spa
    }[];
    currencies?: { //monedas oficiales
        [key: string]: { //es un array de objetos donde la clave es el codigo de la moneda y el valor es un objeto que contiene el nombre y el simbolo de la moneda
            name: string; //nombre de la moneda, ejemplo: "Euro"
            symbol: string; //simbolo de la moneda, ejemplo: "€"
        };
    };
    population: number;
    capitals?: [{
        name: string; //nombre de la capital, ejemplo: "Madrid"
    }]
}