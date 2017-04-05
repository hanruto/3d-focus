
(function(win,doc){
    var delayTime = 2000;
    var animateStatus = 'stop';
    var imgDatas = [
        './img/curb-1.jpeg',
        './img/curb-2.jpeg',
        './img/curb-3.jpeg',
        './img/curb-4.jpeg',
        './img/curb-5.jpeg'
    ]
    function query(sel,bool,el){
        if(!el){var el = doc}
        if(!bool){
            return el.querySelectorAll(sel)
        }else{
            return el.querySelector(sel)
        }
    }
    function each(el,fn){
        for(var i=0 ; i<el.length ; i++){
            fn(el[i],i)
        }
    }
    // get derection
    function getd(){
        var derect = parseInt(Math.random()*4);
        switch(derect){
            case 0:return 'up';
            case 1:return 'down';
            case 2:return 'left';
            case 3:return 'right';
        }
    }

    // 游戏开始
    function start(){
        var i = 0;
        var curb_group = query('.curb-group',true);
        var curb = query('.curb');
        var side = query('.side');
        var mark = query('.mark',true);
        function render(){
            renderReady()
            each(curb,function(el){
                var derect = 'up';
                var side = query('.side',false,el);
                each(side,function(el){
                    // show any
                    if(!el.classList.contains('front')){
                        el.style.backgroundImage = 'url('+imgDatas[i]+')';
                    }
                })
                // rotate
                el.classList.add(derect);
            })
            renderOver(i)
        }
        // ready stange
        function renderReady(i){
            animateStatus='animate'
            each(side,function(el){
                // show other not front
                if(!el.classList.contains('front')){
                    el.style.backgroundImage = 'url('+imgDatas[i]+')';
                }
            })
        }
        function renderOver(i){
           setTimeout(function(){
                each(curb,function(el){
                    el.classList.remove(el.classList[1]);
                    
                })
                each(side,function(el){
                    // show other not front
                    if(el.classList.contains('front')){
                        el.style.backgroundImage = 'url('+imgDatas[i]+')';
                    }
                })
                animateStatus='stop'
            },delayTime)
        }
        each(side,function(el){
            // show front , hidden other //
            el.style.backgroundImage = 'url('+imgDatas[i]+')';
        })
        function next(){
            i++;
            i = i%5
            render()
        }
        function prev(){
            i--;
            i<0 && (i=4)
            render()
        }
        return {
            next:next,
            prev:prev
        }
    }
    // 开始轮播图
    var game = start();
    query('.curb-r',true).addEventListener('click',function(){
        animateStatus==='stop' && game.next()
    })
    query('.curb-l',true).addEventListener('click',function(){
        animateStatus==='stop' && game.prev()
    })
})(window,document)