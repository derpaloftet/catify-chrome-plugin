/*
Background image
 */
const authorElement = document.getElementById("author");
try {
    const newBackgroundImage = await getBackgroundImage("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=cats")
    document.body.style.backgroundImage = `url(${ newBackgroundImage.url })`
    authorElement.textContent = `By: ${ newBackgroundImage.author }`
} catch (err) {
    console.error(err)
    // Set default background image
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
    authorElement.textContent = `By: Dodi Achmad`
}

async function getBackgroundImage(backgroundImageUrl) {
    const res = await fetch(backgroundImageUrl)
    if (!res.ok) {
        throw Error("Couldn't fetch background image")
    }
    const data = await res.json()
    return {
        url: data.urls.regular,
        author: data.user.name
    }
}

/*
Lyrics
 */
try {
    const taylorSwiftLyricsUrl = "https://taylor-swift-api.sarbo.workers.dev/lyrics?shouldRandomizeLyrics=true&numberOfParagraphs=1"
    const lyrics = await getLyricsData(taylorSwiftLyricsUrl)
    const lyricsElement = document.getElementById("lyrics")
    lyricsElement.innerHTML = lyrics
} catch (err) {
    console.error(err)
}

async function getLyricsData(lyricUrl) {
    const res = await fetch(lyricUrl)
    if (!res.ok) {
        throw Error("Couldn't fetch lyrics")
    }
    const data = await res.json()
    const paragraphs = data.lyrics.join().split('\n')
    let lyrics = ""
    paragraphs.forEach(paragraph => {
        lyrics += `<p>${ paragraph }</p>`
    })
    return lyrics
}

/*
Time
 */
function getCurrentTime() {
    const formatData = new Date().toLocaleTimeString("en-us", { timeStyle: "short" })
    const timeElement = document.getElementById("time")
    timeElement.textContent = formatData
}

setInterval(getCurrentTime, 60000)

/*
Weather
 */
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const {
            temperature,
            locationName,
            iconUrl
        } = await getWeather(position.coords.latitude, position.coords.longitude)
        document.getElementById("weather").innerHTML = `
            <img src=${ iconUrl } alt="weather icon" />
            <p class="weather-temp">${ Math.round(temperature) }º</p>
            <p class="weather-city">${ locationName }</p>
        `
    } catch (err) {
        console.error(err)
    }
})

async function getWeather(latitude, longitude) {
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&units=metric`)
    if (!res.ok) {
        throw Error("Weather data not available")
    }
    const data = await res.json()
    const iconUrl = `http://openweathermap.org/img/wn/${ data.weather[0].icon }@2x.png`
    return {
        temperature: data.main.temp,
        locationName: data.name,
        iconUrl: iconUrl,
    }
}
