/* Timer */
const timerElement = document.getElementById("timer")
const hideTimerButton = document.getElementById("hideTimer")
let timerHidden = false
let interval 

function startTimer() {
    if (interval) {
        clearInterval(interval)
    }
    let startTime = new Date()
    interval = setInterval(function () {
        if (timerHidden) {
            return
        }
        let timeMilli = new Date() - startTime
        let milliseconds = timeMilli % 1000
        let seconds = Math.floor(timeMilli/1000) % 60
        let minutes = Math.floor(timeMilli/60000)
        if (milliseconds.toString.length < 3){
            milliseconds = "0".repeat(3 - milliseconds.toString().length) + milliseconds
        }
        if (seconds.toString.length < 2){
            seconds = "0".repeat(2 - seconds.toString().length) + seconds
        }
        timerElement.innerText = `${minutes}:${seconds}.${milliseconds}`
    }, 10)
}

function stopTimer() {
    clearInterval(interval)
    return timerElement.innerText.replace(":", " ").replace(".", " ").split(" ")
}

function hideTimerListener () {
    document.getElementById("hideTimer").addEventListener("click", function() {
        timerHidden = !timerHidden
        if (hideTimerButton.classList.contains("activeButton")) {
            hideTimerButton.innerText = "hide timer"
            timerElement.style.transform  = "none"
            timerElement.innerText = "0:00.000"
        } else {
            hideTimerButton.innerText = "show timer"
            timerElement.style.transform  = "rotate(90deg)"
            timerElement.innerText = ":)"
        }
        hideTimerButton.classList.toggle("activeButton")
    })
}

/* Characters */
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
const rdakuten = [
    "ga", "gi", "gu", "ge", "go",
    "za", "ji", "zu", "ze", "zo", 
    "da", "ji", "zu", "de", "do", 
    "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po",
    "vu"
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

//Quote Generation
const quote = [] 
const rquote = [] 
let kanaAmount = 25
const kanaArray = []
const romanizedArray = []
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputElement = document.getElementById("quoteInput")
const infinrquote = []
const infinquote = []

function randomizeKana() {
    quote.splice(0, quote.length) //empty quote
    rquote.splice(0, rquote.length)
    let quoteLength = kanaAmount
    if (includeMistakes) {
        quoteLength = kanaAmount-incorrectArray.length
    }
    for (let i = 0; i < quoteLength; i++) {
        const arrayNumber = Math.floor(Math.random() * kanaArray.length)
        const index = Math.floor(Math.random() * kanaArray[arrayNumber].length)
        quote.push(kanaArray[arrayNumber][index])
        rquote.push(romanizedArray[arrayNumber][index]) 
    }
    if (includeMistakes) {
        addMistakesToQuote()
    }  
    if (infinite) {
        infinrquote.push(...rquote)
        infinquote.push(...quote)
        if (kanaAmount == 75) {
            document.getElementById("testing").innerText = infinrquote.slice(infinrquote.length - 75, infinrquote.length - 50).toString().replaceAll(",", " ")
        } else {
            document.getElementById("testing").innerText = infinrquote.slice(infinrquote.length - 50, infinrquote.length - 25).toString().replaceAll(",", " ")

        }
    } else {
        document.getElementById("testing").innerText = rquote.toString().replaceAll(",", " ")
    }
}

function renderNewQuote() {
    quote.forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
}

quoteInputElement.addEventListener("input", () => {
    let romanized = rquote
    let character = quote
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayInput = quoteInputElement.value.split(" ")
    let correct = true
    let correctNo = 0
    if (infinite) {
        romanized = infinrquote
        character = infinquote
    }
    arrayQuote.forEach((characterSpan, index) => {
        const splitInput = arrayInput[index]
        if ((splitInput == null) || (splitInput === "")) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("partial")
            characterSpan.classList.remove("incorrect")
            correct = false
        } else if (splitInput === romanized[index]) {
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("partial")
            characterSpan.classList.remove("incorrect")
            correctNo += 1
        } else if (romanized[index].startsWith(splitInput)) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.add("partial")
            characterSpan.classList.remove("incorrect")
            correct = false
        } else {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("partial")
            characterSpan.classList.add("incorrect")
            correct = false
            if (!(incorrectArray.includes(character[index]))){
                incorrectArray.push(character[index])
                rincorrectArray.push(romanized[index])
                document.getElementById("mistakes").innerText = incorrectArray
            }
        }
    })
    if (infinite == true) {
        infiniteRender(correctNo, arrayQuote.length)
    }
    if (correct) { 
        completed()
    }
})

function initiateInfinite() {
    kanaAmount = 75 // initial amount
    infinquote.splice(0, infinquote.length) //empty quote
    infinrquote.splice(0, infinrquote.length)
}

let infinite = false
function infiniteRender(correctNo, spanAmount) {
    if (correctNo == 25) {
        // first render
        const correctQuote = quoteDisplayElement.querySelectorAll(".correct")
        correctQuote.forEach(function(character) {
            character.style.opacity="0.6"
        })
        document.getElementById("testing").innerText = infinrquote.slice(infinrquote.length - 50, infinrquote.length - 25).toString().replaceAll(",", " ")
    } else if (spanAmount - correctNo == 25) {
        kanaAmount = 25
        randomizeKana()
        renderNewQuote()
        quoteDisplayElement.scrollTo({top: quoteDisplayElement.scrollHeight, behavior: 'smooth'})
        const correctQuote = quoteDisplayElement.querySelectorAll(".correct")
        correctQuote.forEach(function(character) {
            character.style.opacity="0.6"
        })
    }
}

function completed() {
    const time = stopTimer()
    const timeNum = time.map(Number)
    quoteInputElement.blur()
    if (!timerHidden) {
        document.getElementById("completed").innerText = `completed in ${time[0]}:${time[1]}.${time[2]}, ` +
        `${Math.round(kanaAmount/((timeNum[0] * 60 + timeNum[1])/60)*100)/100}kpm`
    } else {
        document.getElementById("completed").innerText = "completed"
    }
    document.addEventListener("keyup", restartIfEnter) //keypress makes key be recorded in input regardless of where .focus() is 
}

function restartIfEnter (e) { // needs to be named function for removeEventListener
    e.preventDefault() //229 comment
    if (e.key == "Enter") {
        restart()
    }
}

function clearQuote() {
    quoteDisplayElement.innerHTML = "" // clear out old quote/input
    quoteInputElement.focus()
    quoteInputElement.value = null
}

function restart() {
    clearQuote()
    randomizeKana()
    document.removeEventListener("keyup", restartIfEnter)
    startTimer()
    renderNewQuote()
    document.getElementById("completed").innerText = "" 
    clearMistakes()  
}

/* Mistakes */
const incorrectArray = []
const rincorrectArray = []
let includeMistakes = false

function fisherYatesShuffle(array, array2) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const x = array[i]
        const y = array2[i]
        array[i] = array[j]
        array2[i] = array2[j]
        array[j] = x
        array2[j] = y
    }
}

function addMistakesToQuote() { // script.js - randomizeKana()
    quote.push(...incorrectArray)
    rquote.push(...rincorrectArray)
    fisherYatesShuffle(quote, rquote)
}

function clearMistakes() { // script.js - restart()
    if (document.getElementById("clearMistakes").classList.contains("activeButton")) {
        incorrectArray.splice(0, incorrectArray.length)
        rincorrectArray.splice(0, incorrectArray.length)
        document.getElementById("mistakes").innerText = incorrectArray
    }
}

function mistakesListener() {
    document.getElementById("mistakesContainer").addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            if (event.target.id === "includeMistakes") {
                includeMistakes = !includeMistakes
            }
        event.target.classList.toggle("activeButton")
        } 
    })
}

/* Settings */
function displayKanaNumber() {
    if (kanaAmount === 25) {
        document.getElementById("Kana25").classList.add("activeButton")
        document.getElementById("Kana50").classList.remove("activeButton")
        document.getElementById("Kana100").classList.remove("activeButton")
        document.getElementById("KanaInfin").classList.remove("activeButton")
    } else if (kanaAmount === 50) {
        document.getElementById("Kana25").classList.remove("activeButton")
        document.getElementById("Kana50").classList.add("activeButton")
        document.getElementById("Kana100").classList.remove("activeButton")
        document.getElementById("KanaInfin").classList.remove("activeButton")
    } else if (kanaAmount === 100){
        document.getElementById("Kana25").classList.remove("activeButton")
        document.getElementById("Kana50").classList.remove("activeButton")
        document.getElementById("Kana100").classList.add("activeButton")
        document.getElementById("KanaInfin").classList.remove("activeButton")
    } else {
        document.getElementById("Kana25").classList.remove("activeButton")
        document.getElementById("Kana50").classList.remove("activeButton")
        document.getElementById("Kana100").classList.remove("activeButton")
        document.getElementById("KanaInfin").classList.add("activeButton")
    }
}   

let hiraType = true
let kataType = false
let hdakuType = false
let kdakuType = false
let hcombType = false
let kcombType = false

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
}

function settingListeners() {
    document.getElementById("kanaNumberContainer").addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            kanaAmount = Number(event.target.id.replace("Kana", ""))
            if (isNaN(kanaAmount)) {
                infinite = true
            } else {
                infinite = false
            }
            displayKanaNumber()
        }
    })
    
    document.getElementById("kanaTypeContainer").addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            if ((event.target.classList.contains("activeButton"))&&(document.querySelectorAll(".kana-type.activeButton").length == 1)){
                return
            }
            event.target.classList.toggle("activeButton")
            if (event.target.id === "hiraganaType") {
                hiraType = !hiraType
            } else if (event.target.id === "katakanaType") {
                kataType = !kataType
            } else if (event.target.id === "hdakutenType") {
                hdakuType = !hdakuType
            } else if (event.target.id === "kdakutenType") {
                kdakuType = !kdakuType
            } else if (event.target.id === "hcombType") {
                hcombType = !hcombType
            } else if (event.target.id === "kcombType") {
                kcombType = !kcombType
            }
        } 
        SetKanaType()
    })
}

/* Modal */
const modal = document.getElementById("modal")
const openModalButton = document.getElementById("openModal") 
const closeModalButton = document.getElementById("closeModal")
const overlay = document.getElementById("overlay")

function openModal() {
    modal.classList.add("active")
    overlay.classList.add("active")
    openModalButton.classList.add("activeButton")
}

function closeModal() {
    modal.classList.remove("active")
    overlay.classList.remove("active")
    openModalButton.classList.remove("activeButton")
}

function modalListeners() {
    openModalButton.addEventListener("click", openModal)
    closeModalButton.addEventListener("click", closeModal)
    overlay.addEventListener("click",  closeModal)
}

//Other
let altStyle = true

document.getElementById("alternateStyle").addEventListener("click", function() {
    document.getElementById("alternateStyle").classList.toggle("activeButton")
    altStyle = !altStyle
    style()
})

function style() {
    if (altStyle) {
        document.getElementById("alternateStyle").classList.add("activeButton")
        document.getElementsByTagName("body")[0].style.backgroundColor = "midnightblue";
        document.getElementById("mistakes").style.color = "white";
        document.getElementById("testing").style.color = "white";
    } else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "tomato";
        document.getElementById("mistakes").style.color = "black";
        document.getElementById("testing").style.color = "black";
    }
}

function initializeListeners() {
    document.getElementById("start").addEventListener("click", ()=> {
        if (infinite == true) {
            initiateInfinite()
        }
        restart()
    })
    hideTimerListener()
    mistakesListener()
    settingListeners()
    modalListeners()
}

function main () {
    initializeListeners()
    SetKanaType()
    displayKanaNumber()
    style()
}

main()