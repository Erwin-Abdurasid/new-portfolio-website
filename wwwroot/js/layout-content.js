function content_extractor() {
    var header = document.querySelector('header');
    fetch('./home.html')
        .then(res => {
            if (res.ok) {
                return res;
            }
        })
        .then(htmlSnippet => {
            header.insertAdjacentHTML('afterend', htmlSnippet.text());
        });
}

content_extractor();