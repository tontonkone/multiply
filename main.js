window.addEventListener('load',()=> {
    const board = document.querySelector("#board");

    // creer le tableaux  du jeu
    const createBoard = (board) => {

        for (let i = 0; i < 1; i++) {
            let ul = document.createElement('ul');
            ul.classList.add('cards')
            board.appendChild(ul)
     
            for (let j = 1; j <= 90; j++) {

                let li = document.createElement('li');
                let divfront = document.createElement('div');
                let divback = document.createElement('div');

                let img = document.createElement('img');
                img.src = `img/colore.gif`;
                img.alt = 'picture of card';

                divback.classList.add('view', 'view-back');
                divfront.classList.add('view', 'view-front');
                divfront.innerHTML = j;
                li.classList.add('card');

                divback.appendChild(img)
                li.appendChild(divfront);
                li.appendChild(divback);
                ul.append(li)
            }
        }
    }
    createBoard(board);

    // SELECTEUR
    const CARDS = document.querySelectorAll('.card');
    const NUMBER_ONE = document.querySelector('.number_one');
    const NUMBER_TWO = document.querySelector('.number_two');
    const NUMBER_TOTAL = document.querySelector('.result');
    const TEXT_CONTENT = document.querySelector('.text_content');
    const TEXT_CONTENT_IA = document.querySelector('.text_content_ia');
    const USER_SCORE = document.querySelector('.user__score')
    const IA_SCORE = document.querySelector('.ia__score')

    //VARIABLE MODIFIABLE
    let result;
    let userResult = 0;
    let iaResult = 0;

    function displayNumber() {

        let num1 = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        NUMBER_ONE.innerHTML = num1;

        let num2 = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        NUMBER_TWO.innerHTML = num2

        result = num1 * num2;

    }

    displayNumber();

    CARDS.forEach((card, i) => {

        card.addEventListener('click', () => {
            if (result == i + 1) {
                if(card.classList.contains('flip')) return ;
                userResult++;
                let img = card.querySelector('.view-back img');
                img.alt = 'picture of card';
                img.src = `img/content.gif`;
                card.classList.add('flip', 'zoom');
                TEXT_CONTENT.innerHTML = `<img src='img/content.gif'> Bravo! `;
                NUMBER_TOTAL.innerHTML = result;
                USER_SCORE.innerHTML = 'SCORE = ' + userResult; 

                setTimeout(()=>{
                    displayNumber();
                    reset();  
                    TEXT_CONTENT.innerHTML = " ";
                    img.src = `img/colore.gif`;
                    NUMBER_TOTAL.innerHTML = " _"
                },3000);

                console.log(card);
            } else {
                if(card.classList.contains('flip')) return ;
                iaResult++;
                card.classList.add('vibration');
                card.classList.add('flip');
                IA_SCORE.innerHTML = 'SCORE = ' + iaResult;
                TEXT_CONTENT_IA.innerHTML = `<img src='img/colore.gif'> Essaie encore! `;

                setTimeout(()=> TEXT_CONTENT_IA.innerHTML = " ", 3000)
            }
        })
    })

    function reset(){
        CARDS.forEach((card)=>{
            card.classList.remove('flip');
        })
    }
})
