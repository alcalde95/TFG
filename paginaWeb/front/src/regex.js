
export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$');
//contraseña que empieze por cualquier símbolo 1 o más veces, continuado de un @, cualquier caracter alfanumérico, un . y cualquier letra

export const validPassword = new RegExp('.{8}.*');
//cualquier contraseña con 8 o más caracteres es más q suficiente