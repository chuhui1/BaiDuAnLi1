var data = [{
    name: '白羊座',
    time: '3.21-4.19'
}, {
    name: '金牛座',
    time: '4.20-5.20'
}, {
    name: '双子座',
    time: '5.21-6.21'
}, {
    name: '巨蟹座',
    time: '6.22-7.22'
}, {
    name: '狮子座',
    time: '7.23-8.22'
}, {
    name: '处女座',
    time: '8.23-9.22'
}, {
    name: '天秤座',
    time: '9.23-10.23'
}, {
    name: '天蝎座',
    time: '10.24-11.22'
}, {
    name: '射手座',
    time: '11.23-12.21'
}, {
    name: '摩羯座',
    time: '12.22-1.19'
}, {
    name: '水瓶座',
    time: '1.20-2.18'
}, {
    name: '双鱼座',
    time: '2.19-3.20'
}];

function formateString(str, data) {
    return str.replace(/@\((\w+)\)/g, function(match, key) {
        return typeof data[key] === "undefined" ? '' : data[key]
    });
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '')
}

function camelCase(str) {
    return str.replace(/\-(\w)/g, function(all, letter) {
        return letter.toUpperCase();
    });
}

$(function() {
    var Xingzuo = function(data, num) {
        var hasMargin;

        this.data = data;
        hasMargin = num % 4 == 3 ? ' no-mr' : '';
        this.dom = $('<div></div>').addClass('item num-' + num + hasMargin);
        this.num = num;
        this.init();
    };
    Xingzuo.prototype = {
        init: function() {
            this.create();
            this.bindEvent();
        },
        create: function() {
            var html = '<div class="image"></div>' +
                '<div class="description">' +
                '<p class="name">@(name)</p>' +
                '<p class="time">@(time)</p>' +
                '<div class="mark"></div>' +
                '</div>';
            this.dom.html(formateString(html, this.data), true).appendTo($('.xingzuo'));
        },
        bindEvent: function() {
            var that = this;
            that.dom.on('click', function(e) {
                that.dom.toggleClass('selected');
            }).on('mouseenter', function(e) {
                that.dom.addClass('is-hover');
            }).on('mouseleave', function(e) {
                that.dom.removeClass('is-hover');
            })
        }
    };

    for (var i = 0, len = data.length; i < len; i++) {
        new Xingzuo(data[i], i);
    }
})
