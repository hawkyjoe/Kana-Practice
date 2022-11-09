const quote = [] 
const rquote = [] 
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById("timer")
const hideTimerButton = document.getElementById("hideTimer")
const hiragana = [ 
    "あ", "い", "う", "え", "お",  
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ", 
    "た", "ち", "つ", "て", "と", 
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を", "ん"
]
const katakana = [
    "ア", "イ", "ウ", "エ", "オ", 
    "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ", 
    "タ", "チ", "ツ", "テ", "ト", 
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ", "ユ", "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ", "ヲ", "ン"
]
const hdakuten = [
    "が", "ぎ", "ぐ", "げ", "ご", 
    "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "ぢ", "づ", "で", "ど", 
    "ば", "び", "ぶ", "べ", "ぼ", 
    "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
]
const kdakuten = [
    "ガ", "ギ", "グ", "ゲ", "ゴ", 
    "ザ", "ジ", "ズ", "ゼ", "ゾ",
    "ダ", "ヂ", "ヅ", "デ", "ド", 
    "バ", "ビ", "ブ", "ベ", "ボ", 
    "パ", "ピ", "プ", "ペ", "ポ",
    "ヴ"
]
const hcomb = [
    "きゃ", "きゅ", "きょ", "ぎゃ", "ぎゅ", "ぎょ",
    "しゃ", "しゅ", "しょ", "じゃ", "じゅ","じょ",
    "ちゃ", "ちゅ", "ちょ", "ぢゃ", "ぢゅ", "ぢょ", 
    "にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ", 
    "びゃ", "びゅ", "びょ", "ぴゃ", "ぴゅ", "ぴょ",
    "みゃ", "みゅ", "みょ", "りゃ", "りゅ", "りょ",
]
const kcomb = [
    "キャ", "キュ", "キョ", "ギャ", "ギュ", "ギョ",
    "シャ", "シュ", "ショ", "ジャ", "ジュ","ジョ",
    "チャ", "チュ", "チョ", "ヂャ", "ヂュ", "ヂョ", 
    "ニャ", "ニュ", "ニョ", "ヒャ", "ヒュ", "ヒョ", 
    "ビャ", "ビュ", "ビョ", "ピャ", "ピュ", "ピョ",
    "ミャ", "ミュ", "ミョ", "リャ", "リュ", "リョ",
    "ヴァ", "ヴィ", "ヴェ", "ヴォ",
    "ウィ", "ウェ", "ウォ",
    "ファ", "フィ", "フェ", "フォ",
    "ツァ", "ツィ", "ツェ", "ツォ",
    "シェ", "ジェ", "チェ", "トゥ","ティ", "ドゥ", "ディ", 
]
const exceptions = ["じ", "ぢ", "づ"
]
const romanized = [
    "a", "i", "u", "e", "o", 
    "ka", "ki", "ku", "ke", "ko",
    "sa", "shi", "su", "se", "so", 
    "ta", "chi", "tsu", "te", "to", 
    "na", "ni", "nu", "ne", "no",
    "ha", "hi", "fu", "he", "ho",
    "ma", "mi", "mu", "me", "mo",
    "ya", "yu", "yo",
    "ra", "ri", "ru", "re", "ro",
    "wa", "wo", "n"
]
const rdakuten = [
    "ga", "gi", "gu", "ge", "go",
    "za", "ji", "zu", "ze", "zo", 
    "da", "ji", "zu", "de", "do", 
    "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po",
    "vu"
]
const rcomb = [
    "kya", "kyu", "kyo", "gya", "gyu", "gyo",
    "sha", "shu", "sho", "jya", "jyu","jyo",
    "cha", "chu", "cho", "jya", "jyu", "jyo",
    "nya", "nyu", "nyo", "hya", "hyu", "hyo",
    "bya", "byu", "byo", "pya", "pyu", "pyo",
    "mya", "myu", "myo", "rya", "ryu", "ryo",
    "va", "vi", "ve", "vo",
    "wi", "we", "wo",
    "fa", "fi", "fe", "fo",
    "tsa", "tsi", "tse", "tso",
    "she", "je", "che", "twu","ti", "dwu", "di", 
]
let hiraType = true
let kataType = false
let hdakuType = false
let kdakuType = false
let hcombType = false
let kcombType = false

const kanaArray = []
const romanizedArray = []
let kanaAmount = 25

let timerHidden = false
let currentTime = "0:00.000"
let startTime = null
let interval = null

const openModalButton = document.getElementById("openModal")
const closeModalButton = document.getElementById("closeModal")
const overlay = document.getElementById("overlay")

const test = document.getElementById("testing") //testing

//Modal
openModalButton.addEventListener("click", function(){
    const modal = document.querySelector(openModalButton.dataset.modalTarget)
    openModal(modal)
})

closeModalButton.addEventListener("click", function(){
    const modal = closeModalButton.closest(".modal")
    closeModal(modal)
})

overlay.addEventListener("click", function(){
    const modal = closeModalButton.closest(".modal")
    closeModal(modal)
})

function openModal(modal) {
    modal.classList.add("active")
    overlay.classList.add("active")
    openModalButton.classList.add("activeButton")
}

function closeModal(modal) {
    modal.classList.remove("active")
    overlay.classList.remove("active")
    openModalButton.classList.remove("activeButton")
}

//Quote Generation
function randomizeKana() {
    quote.splice(0, quote.length) //empty quote
    rquote.splice(0, rquote.length)
    for (let i = 0; i < kanaAmount; i++) {
        const arrayNumber = Math.floor(Math.random() * kanaArray.length)
        index = Math.floor(Math.random() * kanaArray[arrayNumber].length)
        quote.push(kanaArray[arrayNumber][index])
        rquote.push(romanizedArray[arrayNumber][index]) 
    }
    test.innerText = rquote
}

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayInput = quoteInputElement.value.split(" ")
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const splitInput = arrayInput[index]
        if ((splitInput == null) || (splitInput == "")) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("partial")
            characterSpan.classList.remove("incorrect")
            correct = false
        } else if (splitInput == rquote[index]) {
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("partial")
            characterSpan.classList.remove("incorrect")
        } else if (rquote[index].startsWith(splitInput)) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.add("partial")
            characterSpan.classList.remove("incorrect")
            correct = false
        } else {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("partial")
            characterSpan.classList.add("incorrect")
            correct = false
        }
    })
    if (correct) { // todo
        const time = stopTimer()
        if (!timerHidden) {
            document.getElementById("completed").innerText = `completed in ${time[0]}:${time[1]}.${time[2]} ` +
            `(${Math.round(kanaAmount/((time[0] + time[1])/60)*100)/100} kpm)`
        }
    }
})

function renderNewQuote() {
    quoteDisplayElement.innerHTML = "" // clear out old quote/input
    quoteInputElement.value = null 
    randomizeKana()
    quote.forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        characterSpan.classList.add("quote")
        quoteDisplayElement.appendChild(characterSpan)
    })
}

function displayKanaNumber() {
    if (kanaAmount == 25) {
        document.getElementById("Kana25").classList.add("activeButton")
        document.getElementById("Kana50").classList.remove("activeButton")
        document.getElementById("Kana100").classList.remove("activeButton")
    } else if (kanaAmount == 50) {
        document.getElementById("Kana25").classList.remove("activeButton")
        document.getElementById("Kana50").classList.add("activeButton")
        document.getElementById("Kana100").classList.remove("activeButton")
    } else {
        document.getElementById("Kana25").classList.remove("activeButton")
        document.getElementById("Kana50").classList.remove("activeButton")
        document.getElementById("Kana100").classList.add("activeButton")
    }
}   

function SetKanaType() { 
    kanaArray.splice(0, kanaArray.length) 
    romanizedArray.splice(0, romanizedArray.length)
    if (hiraType) {
        document.getElementById("hiraganaType").classList.add("activeButton")
        kanaArray.push(hiragana)
        romanizedArray.push(romanized)
    } if (kataType) {
        document.getElementById("katakanaType").classList.add("activeButton")
        kanaArray.push(katakana)
        romanizedArray.push(romanized)
    } if (hdakuType) {
        document.getElementById("hdakutenType").classList.add("activeButton")
        kanaArray.push(hdakuten)
        romanizedArray.push(rdakuten)
    } if (kdakuType) {
        document.getElementById("kdakutenType").classList.add("activeButton")
        kanaArray.push(kdakuten)
        romanizedArray.push(rdakuten)
    } if (hcombType) {
        document.getElementById("hcombType").classList.add("activeButton")
        kanaArray.push(hcomb)
        romanizedArray.push(rcomb)
    } if (kcombType) {
        document.getElementById("kcombType").classList.add("activeButton")
        kanaArray.push(kcomb)
        romanizedArray.push(rcomb)
    }  
    
    console.log(`kanaArray:${kanaArray}`, kanaArray)
    console.log(`romanizedArray:${romanizedArray}`, romanizedArray)
}

const kanaNumber = document.getElementById("kanaNumberContainer") 
kanaNumber.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON") {
        kanaAmount = Number(event.target.id.replace("Kana", ""))
        displayKanaNumber()
    }
})

const kanaType = document.getElementById("kanaTypeContainer")
kanaType.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON") {
        if ((event.target.classList.contains("activeButton"))&&(document.querySelectorAll(".kana-type.activeButton").length == 1)){
            return
        }
        event.target.classList.toggle("activeButton")
        if (event.target.id == "hiraganaType") {
            hiraType = !hiraType
        } else if (event.target.id == "katakanaType") {
            kataType = !kataType
        } else if (event.target.id == "hdakutenType") {
            hdakuType = !hdakuType
        } else if (event.target.id == "kdakutenType") {
            kdakuType = !kdakuType
        } else if (event.target.id == "hcombType") {
            hcombType = !hcombType
        } else if (event.target.id == "kcombType") {
            kcombType = !kcombType
        }
    } 
    SetKanaType()
})
//Timer 
function startTimer() {
    if (interval) {
        clearInterval(interval)
    }
    startTime = new Date()
    interval = setInterval(timerMilli, 10, startTime) // >:(
}

function timerMilli(startTime) {
    if (timerHidden) {
        return
    }
    let timeMilli = new Date() - startTime
    let milliseconds = timeMilli % 1000
    let seconds = Math.floor(timeMilli/1000)%60
    let minutes = Math.floor((timeMilli/60000))
    if (milliseconds.toString.length < 3){
        milliseconds = "0".repeat(3 - milliseconds.toString().length) + milliseconds
    }
    if (seconds.toString.length < 2){
        seconds = "0".repeat(2 - seconds.toString().length) + seconds
    }
    currentTime = `${minutes}:${seconds}.${milliseconds}`
    timerElement.innerText = currentTime
}

function stopTimer() {
    clearInterval(interval)
    return timerElement.innerText.replace(":", " ").replace(".", " ").split(" ")
}

document.getElementById("start").addEventListener("click", ()=> {
    startTimer()
    document.getElementById("completed").innerText = "" 
    renderNewQuote()
})

hideTimerButton.addEventListener("click", function() {
    if (hideTimerButton.classList.contains("activeButton")) {
        timerHidden = false
        timerElement.innerText = currentTime
        hideTimerButton.classList.toggle("activeButton")
        timerElement.style.transform  = "none"
        hideTimerButton.innerText = "hide timer"
    } else {
        timerHidden = true
        timerElement.innerText = ":)"
        hideTimerButton.classList.toggle("activeButton")
        timerElement.style.transform  = "rotate(90deg)"
        hideTimerButton.innerText = "show timer"
    }
})

SetKanaType()
displayKanaNumber()


    
