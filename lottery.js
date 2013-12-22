var data;
var preImg = 0;    
var img;
var timer;
var peopleCount;
var nowUser;
var userSelectedCounter=0;
var exchangeGraph;

function _initData() {
    data = [
        {id:0, name:'Levi', headicon: 'headicon/levi.jpg', gift:'gifts/levi.jpg', selected:false},
        {id:1, name:'水鬼', headicon: 'headicon/tsl.jpg', gift:'gifts/tsl.jpg', selected:false},
        {id:2, name:'Gucci', headicon: 'headicon/gucci.jpg', gift:'gifts/gucci.jpg', selected:false},
        {id:3, name:'老二', headicon: 'headicon/jeff.jpg', gift:'gifts/jeff.jpg', selected:false},
        {id:4, name:'喬揚', headicon: 'headicon/joy.jpg', gift:'gifts/joy.jpg', selected:false},
        {id:5, name:'老翁', headicon: 'headicon/kai.jpg', gift:'gifts/kai.jpg', selected:false},
        {id:6, name:'小翊', headicon: 'headicon/yi.jpg', gift:'gifts/yi.jpg', selected:false},
        {id:7, name:'黑妹', headicon: 'headicon/yong.jpg', gift:'gifts/yong.jpg', selected:false},
        {id:8, name:'毛豆', headicon: 'headicon/book.jpg', gift:'gifts/book.jpg', selected:false},
        {id:9, name:'小麥', headicon: 'headicon/mai.jpg', gift:'gifts/mai.jpg', selected:false},
        {id:10, name:'一條線', headicon: 'headicon/yingcyun.jpg', gift:'gifts/yingcyun.jpg', selected:false},
        {id:11, name:'Hero', headicon: 'headicon/hero.jpg', gift:'gifts/hero.jpg', selected:false},
        {id:11, name:'小華', headicon: 'headicon/china.jpg', gift:'gifts/china.jpg', selected:false}
    ];
}

function showHeadIcon() {
    data.forEach(function (element) {
        newImg = '<img data-username="'+element.name+'" data-user="'+element.id+'"href="#" class="headicon" style="margin-left:10px" width="80" height="80" src="'+element.headicon+'"/>';
        $('#headiconRow').append(newImg);
    });
}

function ifPreCurrentImgSame() {
   return preImg == img; 
}

function ifTheImgIsSelected() {
    return data[img].selected;
}

function ifTheCurrentImgIsBelongNowUser() {
    return nowUser == img;
}

function parallel() {
    if(nowUser == 1 && img == 2) {
        return true;
    }
    else if(nowUser == 2 && img == 1) {
        return true;
    }
    return false;
}

function changeImg() {
    img = preImg;
    while(ifPreCurrentImgSame() || ifTheImgIsSelected() || ifTheCurrentImgIsBelongNowUser()) {
        if(userSelectedCounter == peopleCount -1 && !ifTheCurrentImgIsBelongNowUser() && !ifTheImgIsSelected()) break;
        img = Math.round(Math.random() * peopleCount);
    }
    $('#lotteryImg').attr('src', data[img].gift) ;   
    $('#giftSender').text(data[img].name);
    preImg = img;
}

function showHeadiconEffect(obj) {
    url = $(obj).attr('src');
    $('#headicon').attr('src', url);
    $(obj).css('border', 'yellow solid 5px');
    nowUser = $(obj).data('user');
    $('#userName').text($(obj).data('username'));
}

function setGiftLabel(element) {
    $('#lotteryImg').attr('src', element.gift) ;   
    $('#giftSender').text(element.name);
    img = element.id;
    linkLine();
}

function ifGiftIsSelected(element) {
   return element.selected == false; 
}

function resetGiftLabel() {
    $('#lotteryImg').attr('src', '') ;   
    $('#giftSender').text('');
}

function linkLine() {
    var result = {};
    result[nowUser] = img
    exchangeGraph.drawLine(result);
}

$('#stopLottery').on('click', function() {
    clearInterval(timer);
    data[img].selected = true;
    userSelectedCounter++;

    linkLine();
});

(function() {
    _initData();
    showHeadIcon();
    peopleCount = data.length - 1;

    $('body .modal .modal-dialog').height(window.innerHeight - 100);
    $('body .modal .modal-dialog').width(window.innerWidth);

    exchangeGraph = new ExchangeGraph(
        'exchange-result-container', 
        $('#resultContainer .modal-dialog').innerWidth(), 
        $('#resultContainer .modal-dialog').innerHeight()
    );
    exchangeGraph.initView(data);

    $('#startLottery').on('click', function() {
        timer = setInterval(changeImg, 100);  
    });

    $('.headicon').on('click', function() {
        showHeadiconEffect(this);

        if(userSelectedCounter==peopleCount) {
            data.forEach(function(element) {
                if(ifGiftIsSelected(element)) {
                    setGiftLabel(element);
                }
            }); 
        }
        else {
            resetGiftLabel();
        }
    });
})();
