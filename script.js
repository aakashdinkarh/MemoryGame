const images = ['panda.jpg', 'cat.jpg', 'panda.jpg', 'cat.jpg', 'mickey.jpg', 'mickey.jpg'];

function start() {
  let moves = 0;
  var points = document.createElement('p')
  points.setAttribute('id', 'points');
  points.innerHTML = 'points';
  document.getElementById("score").append(points)
  
  let imagesCopy = [];
  for(let i = 0; i < images.length; i++) {
    imagesCopy.push(images[i]);
  }
  var row = document.createElement('div')
  var n = images.length;
  for(let i = 1; i <=n; i++){
    var div = document.createElement('div');
    div.setAttribute('class', 'imageDiv')
    
    let randomImg = imagesCopy.splice(Math.floor(Math.random() * imagesCopy.length), 1);
    console.log(randomImg)
  
    var img = document.createElement('img')
    img.setAttribute('src', randomImg)
    img.setAttribute('class', 'hide')

    div.appendChild(img)
    row.appendChild(div)

    if( i%3 == 0) {
      document.getElementById('boardgame').appendChild(row);
      row = document.createElement('div');
    }

    div.addEventListener('click', function(event) {
      moves++;
      document.getElementById('points').innerHTML = moves;
      

      var curr = event.currentTarget.children
      var currImg = curr[0];

      var currShowing = document.getElementsByClassName('show')

      let flag = 0;
      if(currShowing.length >= 1) {
        for(let j = 0; j < currShowing.length; j++) {
          if(currShowing[j].src != currImg.src)
          currShowing[j].classList.remove('show')
          else {
            currShowing[j].classList.add('match')
            currImg.classList.add('match')
            flag = 1;
          }
        }
      }
      if(flag == 0) {
        currImg.classList.add('show');
      }

      if( document.getElementsByClassName('match').length == n ) {
        let button = document.createElement('button')
        button.setAttribute('class', 'warning')

        let node = document.createTextNode("You've won!! Moves = "+moves)
        button.appendChild(node);

        document.getElementById('score').appendChild(button)
      }
    });
  }
}
