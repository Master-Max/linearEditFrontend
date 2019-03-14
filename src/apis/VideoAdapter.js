const VID_URL = "http://69.119.240.38:4000/api/v1/videos"

export default class VideoAdapter {
  static postVideo(url) {
    return fetch(`${VID_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_url: url
      })
    })
    .then(r => r.json())
    .then(json => json)
  }
}
