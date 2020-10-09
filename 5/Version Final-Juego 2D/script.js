var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;

var ballRadius2 = 8;
var x2 = x;
var y2 = y;
var dx2 = -1.5;
var dy2 = -1.5;

var segundaBola = false;
if (Math.random() * 100 > 50) {
    segundaBola = true;
}

// Paleta
var alturaPaleta = 15;
var anchuraPaleta = 140;
if (segundaBola) {
    anchuraPaleta = 180;
}
var paletaPosX = (canvas.width - anchuraPaleta) / 2;
var flechaDerechaPulsada = false;
var flechaIzquierdaPulsada = false;

var numFilasLadrillos = 0;
var numColumnasLadrillos = 0;

do {
    numFilasLadrillos = Math.round(Math.random() * 100);
    numColumnasLadrillos = Math.round(Math.random() * 10);
} while (numFilasLadrillos < 1 || numFilasLadrillos > 14 || numColumnasLadrillos < 1 || numColumnasLadrillos > 8);

var anchoLadrillo = 70;
var alturaLadrillo = 20;
var rellenoLadrillos = 10;
var vacioSuperiorLadrillos = 50;
var vacioIzquierdoLadrillos = canvas.width;

var puntaje = 0;

// Misil
var imgMisil = new Image();
imgMisil.src = "img/misil.png";

var posY_Misil = canvas.height;
var posX_Misil = 0;

var explosion = new Image();
explosion.src = "img/explosion.png";

function misil(x) {
    ctx.drawImage(imgMisil, x, posY_Misil);
}

// Caracteristicas de los elementos
var dispararMisil = false;
var cantidadMisiles = 3;

var colorCanvas1 = "#f2f2f2f2";
canvas.style.backgroundColor = colorCanvas1;
var colorCanvas2 = "#222222";
var colorBola = "#6317B9";
var colorBola2 = "#2196f3";
var colorPaleta = "#f5d109";
var colorLadrillo = "#e61c1cdc";
var colorLadrillo2 = "#e4bb06fa";
var colorTexto = "#2196f3";
var vidas = 3;

var ladrillos = [];

function ponerLadrillos(){
    for (var columna = 0; columna < numColumnasLadrillos; columna++) {
        ladrillos[columna] = [];
        for (var fila = 0; fila < numFilasLadrillos; fila++) {
            ladrillos[columna][fila] = { x: 0, y: 0, estado: 10, ciclo: 10 };
        }
    }
}

document.addEventListener("keydown", teclaPresionada, false);
document.addEventListener("keyup", teclaLiberada, false);
document.addEventListener("mousemove", manejadorRaton, false);

function teclaPresionada(e) {
    if (e.keyCode == 39) {
        flechaDerechaPulsada = true;
    } else if (e.keyCode == 37) {
        flechaIzquierdaPulsada = true;
    } else if (e.keyCode == 32) {
        if (!dispararMisil && cantidadMisiles > 0) {
            posX_Misil = paletaPosX + anchuraPaleta / 2 - 20;
            dispararMisil = true;
            cantidadMisiles--;
        }
    }
}
function teclaLiberada(e) {
    if (e.keyCode == 39) {
        flechaDerechaPulsada = false;
    } else if (e.keyCode == 37) {
        flechaIzquierdaPulsada = false;
    }
}

function manejadorRaton(e) {
    var posXRatonDentroDeCanvas = e.clientX - canvas.offsetLeft;
    if (posXRatonDentroDeCanvas > anchuraPaleta / 2 && posXRatonDentroDeCanvas < canvas.width - anchuraPaleta / 2) {
        paletaPosX = posXRatonDentroDeCanvas - anchuraPaleta / 2;
    }
}

function dibujarBola(cordernaX, cordenaY, tamaño, color) {
    ctx.beginPath();
    ctx.arc(cordernaX, cordenaY, tamaño, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function dibujarPaleta() {
    ctx.beginPath();
    ctx.rect(paletaPosX, canvas.height - alturaPaleta, anchuraPaleta, alturaPaleta);
    ctx.fillStyle = colorPaleta;
    ctx.fill();
    ctx.closePath();
}

var colorLadrillos = false;

var moverDerecha = false;

function dibujarLadrillos() {
    for (var columnas = 0; columnas < numColumnasLadrillos; columnas++) {
        for (var filas = 0; filas < numFilasLadrillos; filas++) {
            if (ladrillos[columnas][filas].estado > 0) {
                var b = ladrillos[columnas][filas];

                var brickX = filas * (anchoLadrillo + rellenoLadrillos) + vacioIzquierdoLadrillos;
                var brickY = columnas * (alturaLadrillo + rellenoLadrillos) + vacioSuperiorLadrillos;

                if (b.estado < 10 && b.estado > 1) {
                    b.ciclo--;
                    if (b.ciclo == 0) {
                        if (b.estado > 1) {
                            b.estado--;
                            b.ciclo = 10;
                        }
                    }
                }

                ladrillos[columnas][filas].x = brickX;
                ladrillos[columnas][filas].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, anchoLadrillo, alturaLadrillo);

                if (b.estado == 10) {
                    if (colorLadrillos) {
                        if (filas % 2) {
                            ctx.fillStyle = colorLadrillo;
                        } else {
                            ctx.fillStyle = colorLadrillo2;
                        }
                    } else {
                        if (filas % 2) {
                            ctx.fillStyle = colorLadrillo2;
                        } else {
                            ctx.fillStyle = colorLadrillo;
                        }
                    }
                } else if (b.estado == 9) {
                    ctx.fillStyle = "#fad638";
                } else if (b.estado == 8) {
                    ctx.fillStyle = "#fbdb51";
                } else if (b.estado == 7) {
                    ctx.fillStyle = "#fbe16a";
                } else if (b.estado == 6) {
                    ctx.fillStyle = "#fce683";
                } else if (b.estado == 5) {
                    ctx.fillStyle = "#fceb9c";
                } else if (b.estado == 4) {
                    ctx.fillStyle = "#fdf0b4";
                } else if (b.estado == 3) {
                    ctx.fillStyle = "#fef5cd";
                } else if (b.estado == 2) {
                    ctx.fillStyle = "#fefae6";
                } else if (b.estado == 1) {
                    ctx.fillStyle = "transparent";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    if (!moverDerecha || vidas % 2 !== 0) {
        if (vacioIzquierdoLadrillos >= 50) {
            vacioIzquierdoLadrillos -= 10;
        } else {
            moverDerecha = true;
        }
    } else {
        if (vacioIzquierdoLadrillos + filas * (anchoLadrillo + rellenoLadrillos) - 50 <= canvas.width - 100) {
            vacioIzquierdoLadrillos += 10;
        }
    }
}

// Detectar la colision
function detectarColision() {
    for (var c = 0; c < numColumnasLadrillos; c++) {
        for (var f = 0; f < numFilasLadrillos; f++) {
            var b = ladrillos[c][f];
            function sumarPuntaje() {
                b.estado--;
                b.ciclo--;
                puntaje++;
                if (puntaje == numFilasLadrillos * numColumnasLadrillos) {
                    document.getElementById("miCanvas").classList.toggle("moverCanvas");
                    document.querySelector(".ganar").classList.toggle("mover");
                    clickJugar = false;
                }
            }
            if (b.estado == 10) {
                // se modifica si la bola llega al ladrillo
                if (x > b.x && x < b.x + anchoLadrillo + ballRadius / 2 && y > b.y && y < b.y + alturaLadrillo + ballRadius / 2) {
                    dy = -dy;

                    if (Math.round(Math.random() * 100) % 2) {
                        sumarPuntaje();
                    }
                }

                if (segundaBola) {
                    if (x2 > b.x && x2 < b.x + anchoLadrillo && y2 > b.y && y2 < b.y + alturaLadrillo) {
                        dy2 = -dy2;

                        if (Math.round(Math.random() * 100) % 2) {
                            sumarPuntaje();
                        }
                    }
                }
                if (posX_Misil + 20 > b.x && posX_Misil + 20 < b.x + anchoLadrillo && posY_Misil > b.y && posY_Misil < b.y + alturaLadrillo) {
                    ctx.drawImage(explosion, b.x, b.y);
                    dispararMisil = false;
                    posY_Misil = canvas.width / 2;
                    sumarPuntaje();
                }
            }
        }
    }
}

function dibujarPuntos_Misiles() {
    ctx.font = "24px Poppins";
    ctx.fillStyle = colorTexto;
    ctx.fillText("Puntaje: " + puntaje + "    |    Misiles: " + cantidadMisiles, 8, 20 );
}

function dibujarVidas() {
    ctx.font = "24px Poppins";
    ctx.fillStyle = colorTexto;
    ctx.fillText("Vidas: " + vidas, canvas.width - 100, 20);
}

function quitarVidas() {
    vidas--;
    if (!vidas) {
        document.getElementById("miCanvas").classList.toggle("moverCanvas");
        document.querySelector(".perder").classList.toggle("mover");
        clickJugar = false;
    } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        x2 = canvas.width / 2;
        y2 = canvas.height - 30;
        dx = 5;
        dy = -5;
        dx2 = -1.5;
        dy2 = -1.5;
        paletaPosX = (canvas.width - anchuraPaleta) / 2;
    }
}

function valor(documento) {
    var entregarValor = document.getElementById(documento);
    return entregarValor.value;
}

function comprobarColor(elemento, variable) {
    if ((valor(elemento).length == 4 || valor(elemento).length == 7) && valor(elemento).charAt(0) == "#") {
        if (elemento === "cT") {
            colorTexto = valor(elemento);
        } else if (elemento === "cC1") {
            colorCanvas1 = valor(elemento);
        } else if (elemento === "cC2") {
            colorCanvas2 = valor(elemento);
        } else if (elemento === "cB1") {
            colorBola = valor(elemento);
        } else if (elemento === "cB2") {
            colorBola2 = valor(elemento);
        } else if (elemento === "cL1") {
            colorLadrillo = valor(elemento);
        } else if (elemento === "cL2") {
            colorLadrillo2 = valor(elemento);
        } else if (elemento === "cP") {
            colorPaleta = valor(elemento);
        }
    } else if (valor(elemento).length !== 0) {
        alert("Introduce bien los valores.");
    }
}

var clickJugar = false;

function jugar() {
    event.preventDefault();
    document.querySelector(".inicio").classList.toggle("mover");
    document.getElementById("miCanvas").classList.toggle("moverCanvas");

    document.querySelector("body").style.overflow = 'hidden';
    window.location.href='#arriba';

    comprobarColor("cT");
    comprobarColor("cC1");
    comprobarColor("cC2");
    comprobarColor("cB1");
    comprobarColor("cB2");
    comprobarColor("cL1");
    comprobarColor("cL2");
    comprobarColor("cP");

    if (parseFloat(valor("tB1")) > 0 && parseFloat(valor("tB1")) <= 40) {
        ballRadius = parseFloat(valor("tB1"));
    } 
    
    if (parseFloat(valor("tB2")) > 0 && parseFloat(valor("tB2")) <= 40) {
        ballRadius2 = parseFloat(valor("tB2"));
    }

    if (parseInt(valor("numFilas")) > 0 && parseInt(valor("numFilas")) <= 14) {
        numFilasLadrillos = parseInt(valor("numFilas"));
    }
    
    if (parseInt(valor("numColumnas")) > 0 && parseInt(valor("numColumnas")) <= 8) {
        numColumnasLadrillos = parseInt(valor("numColumnas"));
    }

    if (document.getElementById("check").checked) {
        segundaBola = true;
    }

    if (parseInt(valor("vidas")) > 0) {
        vidas = parseInt(valor("vidas"));
    } 

    if (parseInt(valor("misiles")) > 0) {
        cantidadMisiles = parseInt(valor("misiles"));
    } 
    
    if (parseFloat(valor("paleta")) > 0) {
        anchuraPaleta = parseFloat(valor("paleta"));
    }

    ponerLadrillos();

    clickJugar = true;

    dibujar();
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarPuntos_Misiles();
    dibujarVidas();
    dibujarLadrillos();
    dibujarBola(x, y, ballRadius, colorBola);
    if (segundaBola) {
        dibujarBola(x2, y2, ballRadius2, colorBola2);
    }
    dibujarPaleta();
    detectarColision();

    // Rebote de la bola
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        colorLadrillos = false; // Cambia el color de los ladrillos si la bola principal rebota en x
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        canvas.style.backgroundColor = colorCanvas2;
        colorLadrillos = true;
    }

    if (x2 + dx2 > canvas.width - ballRadius2 || x2 + dx2 < ballRadius2) {
        dx2 = -dx2;
    }
    if (y2 + dy2 < ballRadius2) {
        dy2 = -dy2;
    }

    // Rebotar en Paleta o Game Over
    if (y + dy > canvas.height - ballRadius) {
        if (x > paletaPosX && x < paletaPosX + anchuraPaleta + ballRadius / 2) {
            dy = -dy;
            canvas.style.backgroundColor = colorCanvas1;
        } else {
            quitarVidas();
        }
    }
    if (segundaBola) {
        if (y2 + dy2 > canvas.height - ballRadius2) {
            if (x2 > paletaPosX && x2 < paletaPosX + anchuraPaleta) {
                dy2 = -dy2;
            } else {
                quitarVidas();
            }
        }
    }

    // Movimiento Paleta
    if (flechaDerechaPulsada && paletaPosX < canvas.width - anchuraPaleta) {
        paletaPosX += 15;
    } else if (flechaIzquierdaPulsada && paletaPosX > 0) {
        paletaPosX -= 15;
    }

    // Movimiento del misil
    if (dispararMisil) {
        misil(posX_Misil);
        posY_Misil -= 5;
    }
    if (posY_Misil == 0) {
        ctx.drawImage(explosion, posX_Misil - 50, posY_Misil);
        dispararMisil = false;
        posY_Misil = canvas.height;
    }

    // Se incrementan los valores de la pocion de las bolas
    x += dx;
    y += dy;
    x2 += dx2;
    y2 += dy2;

    if(clickJugar){
        requestAnimationFrame(dibujar);
    }
}
