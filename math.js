var answer;
var score = 0;
var backgroundImages = [];
function nextQuestion(){
    const n1 =Math.floor( Math.random()* 5);
    document.getElementById('n1').innerHTML = n1;
    const n2 = Math.round(Math.random()* 5);
    document.getElementById('n2').innerHTML = n2;
    answer = n1+ n2;
}

function checkAnswer(){
    if (answer == predictImage()){
        score++
        if(score < 7)
{        backgroundImages.push(`url(images/background${score}.svg)`)
        document.body.style.backgroundImage = backgroundImages
    }
    else{
        alert("Congratulations Mathlete!!")
        score = 0;
        backgroundImages = [];
        document.body.style.backgroundImage = backgroundImages
    }
    }
    else{
        if(score!=0){
            score--;
            alert('Oops!! Seems you need more practice')
            setTimeout(function(){
                backgroundImages.pop()
                document.body.style.backgroundImage = backgroundImages
            },100)
        } 
        
        // alert('wrong')
    }
    console.log(answer, predictImage(),score)

}