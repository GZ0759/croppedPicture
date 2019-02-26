
init();


// 初始化
function init () {
  var t = this;
  t.inputPic = document.getElementById("inputPicture");
  t.containerPic = document.getElementById("containerPicture");
  t.croppedPic = document.getElementById('croppedPicture');
  t.regional = document.getElementById('mainBox');
  t.inputBox = document.getElementById('inputBox');
  uploadImage();
}

// 上传图片
function uploadImage () {
  var t = this;
  t.inputPic.addEventListener("change", function() {
    var reader = new FileReader();
    reader.readAsDataURL(t.inputPic.files[0]);
    reader.onload = function(event) {
      t.paintImage(event.target.result);
      t.inputBox.style.display = 'none';
    };
  });
}

// 绘制图片
function paintImage(url) {
  var t = this;
  var context = t.containerPic.getContext("2d");
  var img = new Image();
  img.src = url;
  img.onload = function() {
    if (
      img.width < t.regional.offsetWidth &&
      img.height < t.regional.offsetHeight
    ) {
      t.imgWidth = img.width;
      t.imgHeight = img.height;
    } else {
      var pWidth = img.width / (img.height / t.regional.offsetHeight);
      var pHeight = img.height / (img.width / t.regional.offsetWidth);
      if (img.width == img.height) {
        t.imgWidth = t.regional.offsetWidth;
        t.imgHeight = t.imgWidth;
      } else {
        t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
        t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
      }
    }



    t.containerPic.height = t.imgHeight;
    t.containerPic.width = t.imgWidth;

    console.log( t.regional.offsetWidth );
    console.log( t.regional.offsetHeight );

    context.drawImage(img, 0, 0, t.imgWidth, t.imgHeight); 

    t.cutImg();

  };
}
// 裁剪图片
function cutImg () {
  var t= this;
  var cropper = new Cropper(t.containerPic, {
    viewMode: 2,
    aspectRatio: 1 / 1,
    crop(event) {

    },
  });
}