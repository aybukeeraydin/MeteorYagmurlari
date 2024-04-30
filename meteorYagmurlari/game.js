    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    var arkaplan =  new Image();
    var astronot =  new Image();
    var meteor =  new Image();
    var altin =  new Image(); 

    arkaplan.src = "images/arkaplan.png";
    astronot.src = "images/astronot.png";
    meteor.src = "images/meteor.png";
    altin.src = "images/altin.png";

    var astronotWidth = 100; // Astronotun genişliği
    var astronotHeight = 100; // Astronotun yüksekliği
    
    // Astronotun başlangıç konumu (canvas'ın en alt ortasında)
    var bX = (cvs.width - astronotWidth) / 2;
    var bY = cvs.height - astronotHeight;
    
var score = 0; // Oyuncunun skoru
var isGameOver = false;

var altinlar = [];
var meteorlar = [];
var altinHizi = 2; // Altın düşüş hızı
var meteorHizi = 3; // Meteor düşüş hızı

// Altın nesnesi
function Altin(x, y) {
    this.x = x;
    this.y = y;
    this.type = "altin"; // Nesne türü (altin veya meteor)
}

// Meteor nesnesi
function Meteor(x, y) {
    this.x = x;
    this.y = y;
    this.type = "meteor"; // Nesne türü (altin veya meteor)
}

// Altın ve meteor ekleyen fonksiyon
function ekranayaAltinVeMeteorEkle() {
    setInterval(function() {
        var randomX = Math.random() * (cvs.width - altin.width);
        var randomY = -Math.random() * cvs.height; // Üst taraftan başlayacak

        // %50 ihtimalle altın, %50 ihtimalle meteor ekle
        if (Math.random() < 0.5) {
            altinlar.push(new Altin(randomX, randomY));
        } else {
            meteorlar.push(new Meteor(randomX, randomY));
        }
    }, 500); // Her 0.5 saniyede bir yeni altın veya meteor ekle
}


// Klavye olaylarını dinle
document.addEventListener("keydown", moveAstronaut);

function moveAstronaut(event) {
    if (!isGameOver) {
        var key = event.key;
        if (key === 'ArrowUp' ) {
            moveUp(); // Yukarı yöne basıldığında
        } else if (key === 'ArrowRight') {
            moveRight(); // Sağ yöne basıldığında
        } else if (key === 'ArrowLeft') {
            moveLeft(); // Sol yöne basıldığında
        }
        else if (key === 'ArrowDown') {
            moveDown(); // Aşağı yöne basıldığında
        }
        else if (key === ' ' ) {
            moveUpUp(); // Space tuşuna basıldığında
        }
    }
}

function moveUp() {
    if (bY > 0) { // Üst sınıra çarpma kontrolü
    bY -= 25; // Yukarı doğru hareket miktarı
}
}

function moveRight() {
    if (bX < cvs.width - astronot.width) { // Sağ sınıra çarpma kontrolü
        bX += 20; // Sağa doğru hareket miktarı
    }
}
function moveLeft() {  
    if (bX > 0) { // Sol sınıra çarpma kontrolü
    bX -= 20; // Sola doğru hareket miktarı
}
}
function moveDown() {
    if (bY < cvs.height - astronot.height) { // Alt sınıra çarpma kontrolü
        bY += 25; // Aşağı doğru hareket miktarı
    }
}

//space tuşu ile
function moveUpUp() {
    if (bY > 0) { // Üst sınıra çarpma kontrolü
    bY -= 35; // Yukarı doğru hareket miktarı
}
}

// Oyun döngüsü
function draw() {
    ctx.drawImage(arkaplan, 0, 0);

    // Astronotu çiz
    ctx.drawImage(astronot, bX, bY);

    // Altınları çiz ve hareket ettir
    for (var k = 0; k < altinlar.length; k++) {
        ctx.drawImage(altin, altinlar[k].x, altinlar[k].y);
        altinlar[k].y += altinHizi; // Altınları aşağı doğru hareket ettir
    }

    // Meteorları çiz ve hareket ettir
    for (var m = 0; m < meteorlar.length; m++) {
        ctx.drawImage(meteor, meteorlar[m].x, meteorlar[m].y);
        meteorlar[m].y += meteorHizi; // Meteorları aşağı doğru hareket ettir
    }
}
// Oyunun ana çizim fonksiyonu
function draw() {
    // Arka planı çiz
    ctx.drawImage(arkaplan, 0, 0);

    // Astronotu çiz
    ctx.drawImage(astronot, bX, bY);

    // Altınları çiz ve hareket ettir
    for (var k = 0; k < altinlar.length; k++) {
        ctx.drawImage(altin, altinlar[k].x, altinlar[k].y);
        altinlar[k].y += altinHizi; // Altınları aşağı doğru hareket ettir
        // Çarpışma kontrolü
        if (bX < altinlar[k].x + altin.width &&
            bX + astronot.width > altinlar[k].x &&
            bY < altinlar[k].y + altin.height &&
            bY + astronot.height > altinlar[k].y) {
            // Altına çarpma durumu
            score += 10; // Skoru artır
            altinlar.splice(k, 1); // Altın nesnesini listeden çıkar
        }
    }

    // Meteorları çiz ve hareket ettir
    for (var m = 0; m < meteorlar.length; m++) {
        ctx.drawImage(meteor, meteorlar[m].x, meteorlar[m].y);
        meteorlar[m].y += meteorHizi; // Meteorları aşağı doğru hareket ettir
        // Çarpışma kontrolü
        if (bX < meteorlar[m].x + meteor.width &&
            bX + astronot.width > meteorlar[m].x &&
            bY < meteorlar[m].y + meteor.height &&
            bY + astronot.height > meteorlar[m].y) {
            // Meteora çarpma durumu
            gameOver(); // Oyunu bitir
        }
    }

    // Skoru ekrana yazdır
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    // Yeniden çizim için frame iste
    if (!isGameOver) {
        requestAnimationFrame(draw);
    }
}

// Oyunu başlat
ekranayaAltinVeMeteorEkle(); // Altın ve meteorları ekle
draw();

// Oyunu bitir
function gameOver() {
    isGameOver = true;
    ctx.fillStyle = "#ffffff"; // Oyun bittiğinde metin rengi
    ctx.font = "bold 30px Verdana"; // Oyun bittiğinde metin fontu
    ctx.fillText("Game Over! Score: " + score, cvs.width / 2 - 150, cvs.height / 2);

}