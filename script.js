
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
    "da", "zi", "zu", "de", "do", 
    "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po",
    "vu"
]

let hiraType = true
let kataType = false
let hdakuType = false
let kdakuType = false

const kanaArray = []
const dakuArray = []
let kanaAmount = 25

let timerHidden = false
let currentTime = "0:00.000"
let startTime = null
let interval = null // stops timer from running multiple intervals with multiple starts

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
        index = Math.floor(Math.random() * kanaArray.length)
        quote.push(kanaArray[index])
        rquote.push(romanized[index % 46]) 
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
    interval = null
    return timerElement.innerText.replace(":", " ").replace(".", " ").split(" ")
}

//Buttons 
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
    if (hiraType) {
        console.log("hiratype")
        document.getElementById("hiraganaType").classList.add("activeButton")
        kanaArray.push(...hiragana)
    } if (kataType) {
        document.getElementById("katakanaType").classList.add("activeButton")
        kanaArray.push(...katakana)
    // } if (hdakuType) {
    //     document.getElementById("hdakutenType").classList.add("activeButton")
    //     dakuArray.push(...hdakuten)
    // } if (hdakuType) {
    //     document.getElementById("kdakutenType").classList.add("activeButton")
    //     dakuArray.push(...kdakuten)
    } console.log(kanaArray)
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
    } 
        // else if (event.target.id == "hdakutenType") {
        //     hdakuType = !hdakuType
        // }else if (event.target.id == "kdakutenType") {
        //     kdakuType = !kdakuType
        // }

    SetKanaType()
    }
})

SetKanaType()
displayKanaNumber()


    
