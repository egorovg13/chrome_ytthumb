console.log('Content Script Has Been Run');


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        let titles = document.querySelectorAll('#video-title');
        let videoRenderers = document.querySelectorAll('#thumbnail');

        if (request === 'get video titles') {

            let payload = {};

            let titlesArray = Array.from(titles);

            let first12Titles = titlesArray.slice(0, 12);

            first12Titles.forEach(element => {
                let index = first12Titles.indexOf(element);
                payload[index] = element.innerText;
            });

            sendResponse(payload)

        } else {


        let videoId = request.videoId;
        let newTitle = request.title;
        let newThumbnail = request.image;

        let selectedThumb = videoRenderers[videoId];
        let selectedTitle = titles[videoId]

        let img = selectedThumb.querySelector('img')

        if (newTitle.length > 0) {
            selectedTitle.innerText = newTitle;
        }

        if (newThumbnail.length > 0) {
            img.src = newThumbnail;
        }}
        
    });

