window.addEventListener('load',()=> {

    //on verifie si on a un service worker 
    if( "serviceWorker" in navigator) {
        navigator.serviceWorker.register('/sw.js')

    }
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

    // 0244762195 2023 4715
     
    // 0251719115 2023 4724




    // SELECTEUR
    const CARDS = document.querySelectorAll('.card');
    const NUMBER_ONE = document.querySelector('.number_one');
    const NUMBER_TWO = document.querySelector('.number_two');
    const NUMBER_TOTAL = document.querySelector('.result');
    const TEXT_CONTENT = document.querySelector('.text_content');
    const TEXT_CONTENT_IA = document.querySelector('.text_content_ia');
    const USER_SCORE = document.querySelector('.user__score');
    const IA_SCORE = document.querySelector('.ia__score');
    const BTN_RESET = document.querySelector('.btn__reset');
    const FORM = document.querySelector('.form__input');
    const INPUT = document.querySelector('input');
    const OVERLAY = document.querySelector('.overlay');
    const INFO_NAME = document.querySelector('.info__name');


    //VARIABLE MODIF
    let name = localStorage.getItem('name') || "";
    let userResult = localStorage.getItem('user') || 0;
    let iaResult = localStorage.getItem('ia') || 0;
    let num1 = localStorage.getItem('num1') || 1;
    let num2 = localStorage.getItem('num2') || 1;
    let result = num1 * num2;


    NUMBER_ONE.innerHTML = num1;
    NUMBER_TWO.innerHTML = num2;
    USER_SCORE.innerHTML = userResult;
    IA_SCORE.innerHTML = iaResult;

    /**
     * recup du nom et l'envoyer dans le localstorage
     */
    FORM.addEventListener('submit', (e)=> {
        e.preventDefault();

        let setName = INPUT.value;
        if(setName && setName.length > 2){
            localStorage.setItem('name', setName);
            OVERLAY.style.display = "none";
            FORM.style.display = "none";
            INFO_NAME.innerHTML = setName;
            console.log(setName)
        }else {
            alert('Vous devez écrire un nom ! ')
        }

    })

    BTN_RESET.addEventListener('click', () =>{
        localStorage.clear();

        CARDS.forEach((card)=> {
            card.classList.remove('flip');
        });

        displayNumber();

        iaResult = 0;
        userResult = 0;

        USER_SCORE.innerHTML = 0;
        IA_SCORE.innerHTML = 0;
        OVERLAY.style.display = "block";
        FORM.style.display = "block";
    })

    
    // LES FONCTIONS 

    function displayNumber() {

        num1 = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        localStorage.setItem('num1', num1) ;
        NUMBER_ONE.innerHTML = num1;

        num2 = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        localStorage.setItem('num2', num2);
        NUMBER_TWO.innerHTML = num2;

        result = num1 * num2;

    }

    CARDS.forEach((card, i) => {

        card.addEventListener('click', () => {
            if (result === i + 1) {
                if(card.classList.contains('flip')) return ;
                userResult++;
                localStorage.setItem('user',userResult)
                let img = card.querySelector('.view-back img');
                img.alt = 'picture of card';
                img.src = `img/content.gif`;
                card.classList.add('flip', 'zoom');
                TEXT_CONTENT.innerHTML = `<img src='img/content.gif'> Bravo! `;
                NUMBER_TOTAL.innerHTML = result;
                USER_SCORE.innerHTML = userResult; 

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
                localStorage.setItem('ia',iaResult)
                card.classList.add('vibration');
                card.classList.add('flip');
                IA_SCORE.innerHTML = iaResult;
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
