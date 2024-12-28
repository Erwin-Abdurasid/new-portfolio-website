function js_responsibilities() {
    content_extractor('./home.html');
    downloadResumeAnimation();
    toggleTheme();
    registerHrefs();
}

js_responsibilities();

var globalHTMLInserted;

function registerHrefs() {
    var hrefSettings = document.querySelectorAll('.ref-setting');

    hrefSettings.forEach(el => {
        el.addEventListener('click', () => {
            let hrefData = el.dataset.ref;
            content_remover();
            content_extractor(hrefData);
        });
    });
}

function downloadResumeAnimation() {
    var downloadDiv = document.querySelector('.right-header a');

    downloadDiv.addEventListener('mousedown', () => {
        downloadDiv.classList.remove('unpinned');
        downloadDiv.classList.add('pinned');
    });

    downloadDiv.addEventListener('mouseup', () => {
        downloadDiv.classList.remove('pinned');
        downloadDiv.classList.add('unpinned');
    });
}

function toggleTheme() {
    var themeNav = document.querySelector('.theme');
    var themeBtn = document.querySelector('.theme input');

    themeBtn.addEventListener('change', () => {
        var footer = document.querySelector('footer');
        var clouds = document.querySelectorAll('.cloud');
        var stillClouds = document.querySelectorAll('.still-cloud');

        if (themeNav.contains(document.querySelector('.theme input:checked'))) {
            document.body.style.background = 'linear-gradient(to bottom, #000000, #0c1128, #1e2340, #2e3555)';
            footer.style.color = '#72db70';
            clouds.forEach(elem => {
                elem.style.background = 'radial-gradient(#000, #001, #011, #111)';
            });
            stillClouds.forEach(elem => {
                elem.style.background = 'radial-gradient(#000, #001, #011, #111)';
            });
        } else {
            document.body.style.background = 'linear-gradient(to bottom, #9AC5F4, #99DBF5, #A7ECEE, #FFEEBB)';
            footer.style.color = '#126a12';
            clouds.forEach(elem => {
                elem.style.background = 'radial-gradient(#fff, #ffe, #fee, #eee)';
            });
            stillClouds.forEach(elem => {
                elem.style.background = 'radial-gradient(#fff, #ffe, #fee, #eee)';
            });
        }
    });
}

function content_extractor(href) {
    var header = document.querySelector('header');
    fetch(href).then(res => {
        if (res.ok) {
            globalHTMLInserted = res.clone();
            return res.text();
        }
    }).then(htmlSnippet => {
        header.insertAdjacentHTML('afterend', htmlSnippet);
    });
}

function content_remover() {
    document.body.removeChild(globalHTMLInserted);
}