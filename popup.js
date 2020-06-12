document.addEventListener('DOMContentLoaded', function () {


    let submit = document.querySelector('#save');
    let cancel = document.querySelector('#cancel');
    let titleInput = document.querySelector('.title_input');
    let thumbInput = document.querySelector('#thumb_input');
    let imagePreview = document.querySelector('.upload_image');
    let selector = document.querySelector('.selector');

    let fileReader = new FileReader();

    let bufferedImage;


    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'get video titles', parseTitles);
    });

    const parseTitles = (res) => {
        console.log(res);
       let titleEntries = Object.entries(res);

       for (let [position, title] of titleEntries) {

            let option = document.createElement('option');
            option.value = position;
            option.innerText = title;
            selector.appendChild(option);
       }

    };

    thumbInput.addEventListener('change', (e) => {
        let file = e.target.files[0];
    
        if (file) {
            fileReader.readAsDataURL(file);
        }
    });
    
    fileReader.addEventListener('load', () => {
        bufferedImage = fileReader.result;
    
        imagePreview.src = bufferedImage;
    });


    const submitToContent = () => {
        
        let newTitle = titleInput.value;
        let selectedVideo = selector.value;
        titleInput.value = '';

        let payload = {
            videoId: selectedVideo,
            title: newTitle,
            image: bufferedImage
        }

        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, payload)
        });

        
    };


    const closePopUp = () => window.close();


submit.addEventListener('click', submitToContent, false);
cancel.addEventListener('click', closePopUp, false);

}, false);