let video;
let poseNet;
let poses;
let noseX = 0;
let noseY = 0;
let lefteyeX = 0;
let lefteyeY = 0;
let righteyeX = 0;
let righteyeY = 0;
let c, msg, button2, r_slider, g_slider, b_slider, opacity;
function setup() {
  c = createCanvas(600, 400);
  c.parent("skk");
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
  let button = createButton("Take Snapshot");
  msg = select("#confirm_msg");
  msg.html("Clown and Spectacles Emoji<br></br>");
  button.mousePressed(savecanvas);
  button.style("margin", "0 5px");
  r_slider = createSlider(0, 255, 128, 10);
  r_slider.position(20, 420);
  g_slider = createSlider(0, 255, 0, 10);
  g_slider.position(120, 420);
  b_slider = createSlider(0, 255, 128, 10);
  b_slider.position(220, 420);
  opacity = createSlider(50, 255, 100, -10);
  opacity.position(320, 420);
  r_slider.style("width", "80px");
  r_slider.style("margin", "0 5px");
  g_slider.style("width", "80px");
  g_slider.style("margin", "0 5px");
  b_slider.style("width", "80px");
  b_slider.style("margin", "0 5px");
  opacity.style("width", "80px");
  opacity.style("margin", "0 5px");
}
function savecanvas() {
  let name = floor(random(1, 5000)).toString();
  saveCanvas(c, name, "jpg");
  msg.html(" File saved as " + name + ".jpg");
}
function gotPoses(results) {
  poses = results;
  if (poses.length > 0) {
    let nose = poses[0].pose.keypoints[0].position;
    let lefteye = poses[0].pose.keypoints[1].position;
    let righteye = poses[0].pose.keypoints[2].position;
    noseX = nose.x;
    noseY = nose.y;
    lefteyeX = lefteye.x;
    lefteyeY = lefteye.y;
    righteyeX = righteye.x;
    righteyeY = righteye.y;
  }
}
function modelReady() {
  console.log("Model Ready!");
}

function draw() {
  let d = dist(noseX, noseY, lefteyeX, lefteyeY);
  background(255);
  // scale(-1.0,1.0);
  let img = image(video, 0, 0);
  let offset = map(d, 1, 250, 0, 20);
  let yoffset = map(d, 1, 250, 12, 70);
  textSize(14);
  noStroke();
  fill(255, 0, 0);
  text("red", r_slider.x + r_slider.width / 2.5, 370);
  fill(0, 255, 0);
  text("green", g_slider.x + g_slider.width / 3, 370);
  fill(0, 0, 255);
  text("blue", b_slider.x + b_slider.width / 2.7, 370);
  fill(255);
  text("opacity", opacity.x + opacity.width / 4, 370);
  
  strokeWeight(1);
  stroke(255);

  fill(255, 0, 30);
  ellipse(noseX, noseY, d * 0.8);
  // fill(140,0,140,100);
  fill(r_slider.value(), g_slider.value(), b_slider.value(), opacity.value());
  stroke(255);
  ellipse(lefteyeX + offset, lefteyeY, d * 1.2);
  ellipse(righteyeX - offset, righteyeY, d * 1.2);
  strokeWeight(3);
  line(
    lefteyeX + offset - d * 1.25,
    lefteyeY - yoffset,
    righteyeX + offset + d * 1.25,
    righteyeY - yoffset
  );
}
