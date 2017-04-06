
(function(win,doc){
    var delayTime = 3200;
    var animateStatus = 'stop';
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
    function start(imgDatas){
        var imgDatas = imgDatas;
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

        function init(){
            // 初始化所有图片
            each(side,function(el){
                // show front , hidden other //
                el.style.backgroundImage = 'url('+imgDatas[i]+')';
            })
            imgDatas.forEach(function(item){
                var img = document.createElement('img') ;
                img.style.display = 'none' ;
                img.src = item ;
                doc.body.appendChild(img);
            })
            
        }
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
            init:init,
            next:next,
            prev:prev
        }
    }
    // 开始轮播图
    win.addEventListener('load',function(){
        var imgDatas = [
            './img/curb-1.jpeg',
            './img/curb-2.jpeg',
            './img/curb-3.jpeg',
            './img/curb-4.jpeg',
            './img/curb-5.jpeg'
        ]
        var game = start(imgDatas);
        game.init()
        query('.curb-r',true).addEventListener('click',function(){
            animateStatus==='stop' && game.next()
        })
        query('.curb-l',true).addEventListener('click',function(){
            animateStatus==='stop' && game.prev()
        })
    })
    
})(window,document)