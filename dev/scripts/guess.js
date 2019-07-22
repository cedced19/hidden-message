var CryptoJS = require('crypto-js');

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = decodeURIComponent(value);
    });
    return vars;
}

function createDiv() {
    var q = document.getElementById('q');
    var vars = getUrlVars();
    for (var property in vars) {
        if (property != 'text') {
            var p = document.createElement('p')
            var label = document.createElement('label');
            label.innerHTML = vars[property];
            p.appendChild(label);
            var input = document.createElement('input');
            input.type = 'text';
            p.classList.add('question');
            p.appendChild(input);
            q.appendChild(p);
        }
    }
}

function getInputValues() {
    var values = '';
    document.querySelectorAll('input').forEach(function (el) {
        values += el.value;
    });
    return values;
}

function decryptMessage() {
    try {
        var message = getUrlVars().text;
        var password = getInputValues();
        var result = CryptoJS.AES.decrypt(message, password).toString(CryptoJS.enc.Utf8);
        if (result != '') {
            document.getElementById('result').innerText = result
        }
    } catch (e) {
        document.getElementById('result').innerText = 'Error';
    }
}

window.onload = createDiv;
document.getElementById('btn').onclick = decryptMessage;