var data;
var preImg = 0;    
var img;
var timer;
var peopleCount;
var nowUser;
var userSelectedCounter=0;

_initData();
showHeadIcon();
peopleCount = data.length - 1;

function _initData() {
    data = [
        {id:0, name:'Levi', headicon: 'headicon/levi.jpg', gift:'gifts/levi.jpg', selected:false},
        {id:1, name:'水鬼', headicon: 'headicon/tsl.jpg', gift:'gifts/tsl.jpg', selected:false},
        {id:2, name:'Gucci', headicon: 'headicon/gucci.jpg', gift:'gifts/gucci.jpg', selected:false},
        {id:3, name:'老二', headicon: 'headicon/jeff.jpg', gift:'gifts/jeff.jpg', selected:false},
        {id:4, name:'喬揚', headicon: 'headicon/joy.jpg', gift:'gifts/joy.jpg', selected:false},
        {id:5, name:'老翁', headicon: 'headicon/kai.jpg', gift:'gifts/kai.jpg', selected:false},
        {id:6, name:'小翊', headicon: 'headicon/yi.jpg', gift:'gifts/yi.jpg', selected:false},
        {id:7, name:'黑妹', headicon: 'headicon/yong.jpg', gift:'gifts/yong.jpg', selected:false}
    ];
}

function showHeadIcon() {
    data.forEach(function (element) {
        newImg = '<img data-username="'+element.name+'" data-user="'+element.id+'"href="#" class="headicon" style="margin-left:10px" width="100" height="100" src="'+element.headicon+'"/>';
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
        img = Math.round(Math.random() * peopleCount);
    }
    $('#lotteryImg').attr('src', data[img].gift) ;   
    $('#giftSender').text(data[img].name);
    preImg = img;
}

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
}

function ifGiftIsSelected(element) {
   return element.selected == false; 
}

function resetGiftLabel() {
    $('#lotteryImg').attr('src', '') ;   
    $('#giftSender').text('');
}

$('#stopLottery').on('click', function() {
    clearInterval(timer);
    data[img].selected = true;
    userSelectedCounter++;
});
