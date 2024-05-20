let imgs = document.getElementById('imgs');
let img = document.querySelector('img');
let canvas = document.querySelector('canvas');
let upload = document.getElementById('upload');
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let huerotate = document.getElementById('huerotate');
let invert = document.getElementById('invert');
let buttons = document.querySelector('.buttons');
let restert = document.getElementById('restert');
let download = document.getElementById('download');

// make canvas ready to drow
let drow = canvas.getContext('2d')

// the maine function
// make buttons visible & reed the image and cut it to canvas
upload.onchange = function(){
    imgs.style.display = 'block';
    buttons.style.visibility = 'visible';
    // reed the image
    let reeder = new FileReader();
    reeder.readAsDataURL(upload.files[0]);
    reeder.onload = function(){
        img.src = reeder.result;
    }
    // cut it to canvas
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        drow.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    }
    difult()
}

// do the filters
let filters = document.querySelectorAll('ul li input')
filters.forEach( function(filter){
    filter.addEventListener('input', _ => {
        drow.filter =`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value}%)
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
        invert(${invert.value}%)
        `
        drow.drawImage(img,0,0,canvas.width,canvas.height);
        colorrang()
    } )
})

// make a color rang nice
function colorrang(){
    saturate.style.filter = `saturate(${saturate.value}%)`
    contrast.style.filter = `contrast(${contrast.value}%)`
    brightness.style.filter = `brightness(${brightness.value}%)`
    sepia.style.filter = `sepia(${sepia.value}%)`
    grayscale.style.filter = `grayscale(${grayscale.value}%)`
    blur.style.filter = `blur(${blur.value}px)`
    huerotate.style.filter = `hue-rotate(${-huerotate.value}deg)`
    invert.style.filter = `invert(${invert.value}%)`
}

// back the filters to the difult
function difult(){
    drow.filter = 'none';
    saturate.value = `100`;
    contrast.value = `100`;
    brightness.value = `100`;
    sepia.value = `0`;
    grayscale.value = `0`;
    blur.value = `0`;
    huerotate.value = "0";
    invert.value = "0";
    drow.drawImage(img,0,0,canvas.width,canvas.height)
    colorrang();
}

// downlod function
download.onclick = _ => {
    download.href = canvas.toDataURL()
}