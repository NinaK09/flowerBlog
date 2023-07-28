function map() {
    var wspolrzedne = new google.maps.LatLng(51.3857145, 22.2110514);
    var opcjeMapy = {
        zoom: 10,
        center: wspolrzedne,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), opcjeMapy);
}

//================================
function sprawdzPole(pole_id, obiektRegex) {
    var obiektPole = document.getElementById(pole_id);
    if (!obiektRegex.test(obiektPole.value))
        return (false);
    else
        return (true);
}

function sprawdz_box(box_id)
{
    var obiekt=document.getElementById(box_id);
    if (obiekt.checked) return true;
    else return false;
}

function sprawdz()
{
    var ok = true;
    REGuser = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-]){4,20}/;
    REGpass = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-]){7,30}/;
    REGmail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;

    if (!sprawdzPole("user", REGuser)) {
        ok = false;
        window.alert("Niepoprawna nazwa użytkownika: nazwa może zawierać duże i małe litery, cyfry oraz znaki - _; nie powinna być dłuższa od 20 i mniejsza od 5");
    }

    if (!sprawdzPole("pass", REGpass)) {
        ok = false;
        window.alert("Niepoprawne hasło: hasło może zawierać duże i małe litery, cyfry oraz znaki - _; nie powinno być dłuższe od 30 i mniejsza od 8");
    }

    if (!sprawdzPole("mail", REGmail)) {
        ok = false;
        window.alert("Niepoprawny adres e-mail");
    }

    if (!sprawdz_box("reg")) {
        ok = false;
        window.alert("Musisz zaakceptować regulamin by korzystać ze strony");
    }
    
    if(ok==true){
        save();
    }
    
    return ok;
}

//========================STORAGE=============================
function sprawdzL(element) {
    var lista = JSON.parse(localStorage.getItem('lista'));
    if (lista === null) {
        return false;
    }
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].mail === element.mail || lista[i].user === element.user)
            return true;
    }
    return false;
}

function save() { 
    var element = {}; 
    element.user = document.getElementById('user').value; 
    element.pass = document.getElementById('pass').value; 
    element.mail = document.getElementById('mail').value; 
 
    if (sprawdzL(element)) { 
            alert('Istnieje już użytkownik o podanym loginie lub emailu.'); 
        } 
        else { 
            var lista = JSON.parse(localStorage.getItem('lista')); 
            if (lista === null) 
                lista = []; 
            lista.push(element); 
            localStorage.setItem('lista', JSON.stringify(lista)); 
            window.alert("Konto zostało utworzone!"); 
        } 
}

function show() {
    var lista = JSON.parse(localStorage.getItem('lista'));
    var element = document.getElementById('zawartosc');
    var tresc = "";

    if (lista === null || lista.length === 0)
        element.innerHTML = tresc + "<p>Nie istnieją żadne dane! Spróbuj dodać nowe konto.</p>";
    else {
        for (let i = 0; i < lista.length; i++) {
            tresc += `<p>Użytkownik: ${lista[i].user}, Email: ${lista[i].mail}, Hasło: ${lista[i].pass}</p>`;
        }
        element.innerHTML = tresc;
    }
}

function Delete() {
    if (confirm("Czy chcesz usunąć wszystkie konta?")) {
        localStorage.removeItem('lista');
        show();
    }
}
