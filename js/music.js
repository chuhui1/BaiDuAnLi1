var data = [
    '私人频道',
    '红心频道',
    '随便听听',
    '欧美',
    '经典老歌',
    'DJ舞曲',
    '热歌',
    '网络红歌',
    '成名曲',
    '火爆新歌',
    '流行',
    '快乐旋律',
    'KTV金曲',
    '伤感调频',
    '80后',
    '90后'
];
$(function() {
    var Yinyue = function(container, data) {
        this.container = container;
        this.data = data;
        this.init();
    };
    Yinyue.prototype = {
        init: function() {
            this.bindDOM();
            this.bindEvent();
        },
        bindDOM: function() {
            var str = '<h2>热门频道</h2>',
                description = '<a class="item-@(num)" onclick="return false;" hidefocus><span>@(title)</span></a>';
            for (var i = 0, len = this.data.length; i < len; i++) {
                str += $$.formateString(description, {
                    num: i,
                    title: this.data[i]
                });
            }
            $(this.container).html('<div class="yinyue">' + str + '</div>');
        },
        bindEvent: function() {
            $(this.container + ' a').on('click', function(e) {
                $(this.container + ' a').removeClass('choose');
                $(this).addClass('choose');
            });
        }
    }
    new Yinyue('#card', data);
})
