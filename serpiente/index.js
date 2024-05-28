document.addEventListener('DOMContentLoaded',()=>
{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('.score');
    const startBtn = document.querySelector('.start');


    //variables 
    const width = 10;
    var indexCurrent = 0; //so first div in our grid
    var appleIndex = 0;
    var currentSnake = [2,1,0]; // 2 la cabeza el resto, 0 1 cuerpo
    var direction = 1;
    var score = 0;
    var intervalTime = 0;
    var interval = 0;
    var speed = 0.9;

    //start y restar el juego
    function startGame()
    {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        radomApple();
        direction = 1;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        indexCurrent = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutComes, intervalTime)
        
    }

    //colisiones y entorno
    function moveOutComes()
    {
        // se ocupa de que se golpee con las paredes y asi misma
        if
        (
            (currentSnake[0] + width >= (width * width) && direction === width) || //si golpea abaajo
            (currentSnake[0] % width === width -1 && direction === 1) || //si la serpiente golpea la pared derecha
            (currentSnake[0] % width === 0 && direction === -1) || //si la serpiente golpea la pared izk
            (currentSnake[0] - width < 0 && direction === -width) || // si golpea arriba
            squares[currentSnake[0] + direction].classList.contains('snake') //si choca consigo misma
        )
        {
            alert('game over');
            scoreDisplay.textContent = 0;
            return clearInterval(interval); //esto borrará el intervalo
        }
        //definiendo la cola de la serpiente 
        const tail = currentSnake.pop(); //elimina el último elemento de la matriz
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction); //direction de la cabeza 
        
        // para que coma la manzana
        if(squares[currentSnake[0]].classList.contains('apple'))
        {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            radomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes,intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    //ke aparazca la manzana aletoriamente
    function radomApple()
    {
        do
        {
            appleIndex = Math.floor(Math.random() * squares.length);
        }
        while(squares[appleIndex].classList.contains('snake'))
        {
            squares[appleIndex].classList.add('apple');
        }
    }
    

    // captura de teclado 
    function control(e)
    {
        squares[indexCurrent].classList.remove('snake'); // removemos la clase serpiente
        if(e.keyCode === 39)
        {
            direction = 1; //flecha izk
        }
        else if(e.keyCode === 38)
        {
            direction = -width; //flecha de arriba
        }
        else if(e.keyCode === 37)
        {
            direction = -1; //flecha de derecha
        }
        else if(e.keyCode === 40)
        {
            direction = +width; //flecha de abajo 
        }
    }
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
})