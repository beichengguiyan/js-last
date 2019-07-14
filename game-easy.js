window.onload = function () {

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;


    startBtn.addEventListener('click', function () {
        showBtnAnimation();
        startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);
    }


    function startGame() {
        resetScoreAndTime();
        peep();

        setTimeout(() => {
            timeUp=true;
            titleH1.innerHTML="TIME UP！";
            startBtn.style.display='inline';
            startBtn.innerHTML="Replay！";
            scoreBoard.innerHTML=score;
        }, gameTime)
    }

    /**
     * 初始化设置.
     */
    function resetScoreAndTime() {
        timeUp=true;
            titleH1.innerHTML="TIME UP！";
            startBtn.style.display='inline';
            startBtn.innerHTML="Replay！";
            scoreBoard.innerHTML=score;
    }

    /**
     * 出洞.
     */
    function peep() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        comeOutAndStop(hole, time);
    }

    /**
     * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
     *
     * @param min 随机数的下界.
     * @param max 随机数的上界.
     * @returns {number}
     */
    function randomTime(min, max) {
        if(max<min) return 0;
        else return Math.round(Math.random()*(max-min)+min);
        return 0;
    }

    /**
     * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
     *
     * @param holes
     * @returns {*}
     */
    function randomHole(holes) {
        var hole;
    		var numtest=Math.floor(Math.random()*6);
    		hole=holes[numtest];
    	if(lastHole!=null){

    		 if(hole==lastHole){
    		 	var numtest=Math.floor(Math.random()*6);
    		hole=holes[numtest];
    		 }
    	}else{
    		lastHole=hole;
    	}
       return hole;
    }

    /**
     * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
     *
     * @param hole 地鼠所出地洞.
     * @param time 地鼠停留时间.
     */
    function comeOutAndStop(hole, time) {
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
       if(!timeUp){
           peep();
       }
     },time);
    }

    /**
     * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
     */
    moles.forEach(mole => mole.addEventListener('click', function (e) {
        console.log(e);
    	if(!timeUp){
    		score=score+1;
    	scoreBoard.innerHTML=score;
    }));

};