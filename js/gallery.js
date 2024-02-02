
const gallery = document.getElementById("gallery");

const colorThief = new ColorThief();
const imageURLs = [
    'https://64.media.tumblr.com/d94d19391c086bbee804ead4ff934149/5bd73e928459b0c0-d8/s640x960/d59887c4f899aa110c26cde71a030e410b93ddf6.pnj',

    'https://64.media.tumblr.com/e4907a99d8025c9bd2360f839407249b/7dd15a61736b2c11-ee/s540x810/196662755576b76b90acf9bad270e423c6317543.pnj',
    'https://64.media.tumblr.com/5f0e0ac5ba3ef17a9310393e2e7e7732/ed5f428798396bad-8a/s540x810/65d537680a71a88cd1195a1ce2ab1060e3abbc9c.pnj',
    'https://64.media.tumblr.com/7c1c1314aad79f5f793a4dfb15d4af98/0b00674abbfcc9df-38/s540x810/97794479f7bf9fc4444cfca4479bafe84937c810.pnj',
    'https://64.media.tumblr.com/428afc467b877a3a8a6c435872999478/07f36c85ad1efe5a-0a/s400x600/dd22aff45de28e7d0eb9b8f4d00aa166fedbc80a.pnj',
    'https://64.media.tumblr.com/73d7ce2003a81f427681562b229aac63/d04aca22261b0aba-86/s540x810/400c198761a4ddbf54b19fed8347097f1462088d.jpg',

    'https://64.media.tumblr.com/896cc54d2014523dac125737f654c4d0/8285485735060580-f3/s540x810/45e667295a9be67d6a3f9228cf74d0849adfaeae.jpg',
    'https://64.media.tumblr.com/02fa32706a425d2876bebdac57710d81/aed9815e279039e9-1c/s540x810/c3839312b0760d0fd6a6a54f87e7db2eb09a92f7.jpg',
    'https://64.media.tumblr.com/9a3c6b3264f34c49665d9015195c0096/9b81c9fb9d305d00-6d/s540x810/5dcfe6c84c2787ea6de1412b9a8956cf19015c8b.pnj',
    'https://64.media.tumblr.com/b60c0bf1bf4755eea62d535fa5343913/306428954a4182d4-57/s540x810/f39f4c550c3c6970842c6c1c5ecf03bc3a7e43c5.jpg',
    'https://64.media.tumblr.com/e677c9a9fb32a6d309fc0119288c1b45/57ef18054d58ce17-d2/s540x810/c99a003a479347081b281d42b41e77c567b36c41.jpg',
    'https://64.media.tumblr.com/a742255fb86020f86df4ca1f43b1dd0a/9d5eef7e6bed6ed8-3e/s400x600/ddef5b768e5de9e378c2fd1f14fdeae99991c9b2.jpg',
    'https://64.media.tumblr.com/79672360c3ada48202b8a8cec838cfe3/9d5eef7e6bed6ed8-1b/s400x600/874c3cc6d1ef836cbdb80ee4b1e7ad0faaef47d1.jpg',
];

document.getElementById("loaderPath").style.stroke= randomColor();

preloadImages(imageURLs, (error, images) => {
    if (error) {
        console.error('Error preloading images:', error);
    } else {
        console.log('Images preloaded successfully:', images);
        setTimeout(()=>{
            document.getElementById("loader").style.display = "none";
            gallery.style.display="block";
            
            fillGallery(images);
            var largest = findLargestWidth(images);
            var docWidth = document.body.clientWidth
            if (largest >= docWidth) {
                gallery.style.columns = 1;
            }
            else {
                gallery.style.columns = Math.floor(docWidth / largest);
            }
        },"600");
        addEventListener("resize", (event) => {
            var largest = findLargestWidth(images);
            var docWidth = document.body.clientWidth
            if (largest >= docWidth) {
                gallery.style.columns = 1;
            }
            else {
                gallery.style.columns = Math.floor(docWidth / largest);
            }

        });
    }
});
function randomColor(){
    colors = ['#A0D1CC', '#195C80' , '#195C80', '#F9C437', '#D63927'];
    rand = Math.floor(Math.random() *5);
    return colors[rand];
}
function fillGallery(images) {
    let portraitCount = 0;
    let landscapeCount = 0;
    images.forEach(img => {
        const container = document.createElement('div');
        container.setAttribute('class', 'imgContainer');
        gallery.appendChild(container);
        container.appendChild(img);


        const data = document.createElement('div');
        const palette = document.createElement('div');

        if (height(img) > width(img)) {
            createPortrait(container, img, data, palette, portraitCount);
            portraitCount++;
        }
        if (height(img) <= width(img)) {
            createLandscape(container, img, data, palette, landscapeCount);
            landscapeCount++;
        }
        data.innerHTML = width(img) + "x" + height(img) + ":" + (portraitCount + landscapeCount);
        //  console.log(getColors(img));
        fillPalette(palette, img);
    }

    )
};

function createPortrait(container, img, data, palette, portraitCount) {
    data.setAttribute('class', 'dataVertical');
    palette.setAttribute('class', 'paletteHorizontal');
    const scale = .8;
    var newScale = scale;
    var h = height(img);
    while (h >= 800) {
        h = h * scale;
        newScale = newScale * scale;
    }
    container.style.width = width(img) * newScale + 'px';
    container.style.height = height(img) * newScale + 'px';
    if (portraitCount % 2 == 0) {
        img.style.float = "left";
        container.appendChild(data);
        container.appendChild(palette);
    }
    else {
        container.appendChild(palette);
        container.appendChild(img);
        container.appendChild(data);
        img.style.float = "left";
    }
}
function createLandscape(container, img, data, palette, landscapeCount) {
    palette.setAttribute('class', 'paletteVertical');
    container.appendChild(palette);
    data.setAttribute('class', 'dataHorizontal');
    container.appendChild(data);
    const scale = .7;
    var newScale = scale;
    var w = width(img);
    while (w >= 900) {
        w = w * scale;
        console.log(w);
        newScale = newScale * scale;
    }
    container.style.width = width(img) * newScale + 'px';
    container.style.height = height(img) * newScale + 'px';
    if (landscapeCount % 2 == 0) {
        img.style.float = "left";
        palette.style.float = "right";
    }
    else {
        palette.style.float = "left";
        img.style.float = "right";
    }
}

function findLargestWidth(images) {
    var largest = 0;
    images.forEach(img => {
        if (width(img) > largest) {
            largest = width(img);
        }
    })
    return largest * .7;
}


function height(img) {
    return img.naturalHeight;
}
function width(img) {
    return img.naturalWidth;
}
function getColors(img) {
    const colorThief = new ColorThief();
    return colorThief.getPalette(img);

    /*
     if (img.readyState==="complete") {  
         console.log("img loaded");
         return colorThief.getPalette(img); 
     }
     else {
         console.log("img not loaded");
         document.addEventListener('DOMContentLoaded', (event) => {
             console.log("-inside load function");
             return colorThief.getPalette(img);
         });
     }
          */
}
function fillPalette(palette, img) {
    var colors = getColors(img);
    for (let i = 0; i <= 5; i++) {
        const swatch = document.createElement('div');
        swatch.setAttribute('class', 'swatchHorizontal');
        palette.appendChild(swatch);
        swatch.style.backgroundColor = "RGB(" + colors[i] + ")";
    }

}

//preload
function preloadImages(imageUrls, callback) {
    const imagePromises = [];
    let loadedCount = 0;

    for (const imageUrl of imageUrls) {
        const image = document.createElement('img');
        image.crossOrigin = "Anonymous";
        image.src = imageUrl;

        const promise = new Promise((resolve, reject) => {
            image.onload = () => {
                loadedCount++;
                resolve(image);
            };

            image.onerror = () => {
                reject(new Error(`Failed to load image: ${imageUrl}`));
            };
        });
        imagePromises.push(promise);
    }

    Promise.all(imagePromises)
        .then((images) => {
            callback(null, images);
        })
        .catch((error) => {
            callback(error, null);
        });
}