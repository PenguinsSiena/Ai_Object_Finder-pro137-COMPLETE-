status = "";
objects = [];

function setup(){
    canvas = createCanvas(450, 330);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 330);
    video.hide();
}

function modelLoaded(){
    console.log("model is Loaded!");
    status = true;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("name1").value;
}


function gotResults(error, results)
{
    if(error) {
        console.log(error);}
        else {
        console.log(results);
        objects = results;}
}

function draw(){
    image(video, 0, 0, 480, 330);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: An Object Detected";
         
            fill("#512080");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#512080");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name)
         {
           video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("object").innerHTML =  object_name + " found";
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(object_name + " Found");
        synth.speak(utterThis);
    } else {

        document.getElementById("object").innerHTML =  "object mentioned not found";
    }
        }
    }
    
}

