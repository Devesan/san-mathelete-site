var model

async function loadModel() {
    model = await tf.loadGraphModel('TFJS/model.json')
  }

function predictImage(){
    let img = cv.imread(canvas);
    cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(img,img,175,255,cv.THRESH_BINARY)


    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(img, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

    let cnt = contours.get(0);
    let dst = cv.Mat.zeros(img.rows, img.cols, cv.CV_8UC3);
    let rect = cv.boundingRect(cnt);
    img = img.roi(rect)

    var height = img.rows;
    var width = img.cols;

    if (height > width){
        height = 20;
        const scaleFactor = img.rows/height;
        width = Math.round(img.cols/scaleFactor);
    }else {
        width = 20;
        const scaleFactor = img.cols/width;
        height = Math.round(img.rows/scaleFactor)
    }

    let newSize = new cv.Size(width,height);
    cv.resize(img,img,newSize,0,0, cv.INTER_AREA)

    const LEFT = Math.ceil(4 + (20-width)/2)
    const RIGHT = Math.floor(4 + (20-width)/2)
    const TOP = Math.ceil(4 + (20-height)/2)
    const BOTTOM = Math.floor(4 + (20-height)/2)

    let s = new cv.Scalar(0, 0, 0, 255);
    cv.copyMakeBorder(img, img, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, s);

    // Center of mass
    cv.findContours(img, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    cnt = contours.get(0)
    let Moments = cv.moments(cnt, false);

    const cx = Moments.m10/Moments.m00;
    const cy = Moments.m01/Moments.m00;
    // console.log(cy,cx)

    const X_SHIFT = Math.round(img.cols/2 - cx);
    const Y_SHIFT = Math.round(img.rows/2 - cy);

    newSize = new cv.Size(img.cols,img.rows)
    const M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT]);
    cv.warpAffine(img, img, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());


    let pixelValues = img.data;
    pixelValues = new Float32Array(pixelValues)
    pixelValues = pixelValues.map(function(x){ return x/255});

    const X = tf.tensor([pixelValues]);
    const result = model.predict(X)
    result.print()
    const output = result.dataSync()[0];
    // console.log(tf.memory())


    // const canvas1 = document.createElement('CANVAS');
    // cv.imshow(canvas1,img);
    // document.body.appendChild(canvas1);

    //cleaning
    img.delete();
    contours.delete();
    cnt.delete();
    hierarchy.delete();    
    M.delete();
    X.dispose();
    result.dispose();

    return output;
}