
init();


// 初始化
function init () {
  var t = this;
  t.inputPic = document.getElementById("inputPicture");
  t.containerPic = document.getElementById("containerPicture");
  t.croppedPic = document.getElementById('croppedPicture');
  t.mainBox = document.getElementById('mainBox');
  t.inputBox = document.getElementById('inputBox');
  t.btnText = document.getElementById('btnText');
  t.containerBox = document.getElementById('containerBox');
  t.croppedBox = document.getElementById('croppedBox');
  t.containerTop = document.getElementById('containerTop');
  t.cancel = document.getElementById('cancel');
  t.confirm = document.getElementById('confirm');
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
      t.containerTop.style.display = 'block';
      t.croppedBox.style.display = 'none';
      t.cancel.addEventListener('click', function() {
        t.cancelCut();
      })
      t.confirm.addEventListener('click', function() {
        t.confirmCut();
      })
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
      img.width < t.mainBox.offsetWidth &&
      img.height < t.mainBox.offsetHeight
    ) {
      t.imgWidth = img.width;
      t.imgHeight = img.height;
    } else {
      var pWidth = img.width / (img.height / t.mainBox.offsetHeight);
      var pHeight = img.height / (img.width / t.mainBox.offsetWidth);
      if (img.width == img.height) {
        t.imgWidth = t.mainBox.offsetWidth;
        t.imgHeight = t.imgWidth;
      } else {
        t.imgWidth = img.width > img.height ? t.mainBox.offsetWidth : pWidth;
        t.imgHeight = img.height > img.width ? t.mainBox.offsetHeight : pHeight;
      }
    }
    t.containerPic.height = t.imgHeight;
    t.containerPic.width = t.imgWidth;

    context.clearRect(0, 0, t.mainBox.offsetHeight, t.mainBox.offsetWidth); 

    context.drawImage(img, 0, 0, t.imgWidth, t.imgHeight); 

    t.cutImg();

  };
}
// 裁剪图片
function cutImg () {
  var t= this;
  t.cropper = new Cropper(t.containerPic, {
    viewMode: 1,
    aspectRatio: 1 / 1,
    dragMode : "move",
    movable : true,//是否能移动图片
		cropBoxMovable :false,//是否允许拖动裁剪框
		cropBoxResizable :false,//是否允许拖动 改变裁剪框大小
    crop(event) {

    },
  });
}
// 取消裁剪
function cancelCut () {
  var t = this;
  t.inputBox.style.display = 'block';
  t.containerBox.style.display = 'none';
  t.croppedBox.style.display = 'none';
}
// 确定裁剪
function confirmCut () {
  var t = this;
  t.inputBox.style.display = 'block';
  t.containerBox.style.display = 'none';
  t.croppedBox.style.display = 'block';
  t.btnText.innerHTML = '重新选择';
  t.croppedPic.style.display = 'block';

  var CroppedCanvas =  t.cropper.getCroppedCanvas();
  if (CroppedCanvas) {
    fileImg = CroppedCanvas.toDataURL('image/jpg');
    t.croppedPic.src = fileImg;
  }
}