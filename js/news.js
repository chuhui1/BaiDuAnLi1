 var imgData = [{
     url: 'http://photo.gmw.cn/2013-12/27/content_9938379.htm',
     title: '新浪图片，年度盘点',
     imgUrl: '1'
 }, {
     url: 'http://photo.gmw.cn/2013-12/27/content_9938379.htm',
     title: '意大利回流茅台拍出78.2万',
     imgUrl: '2'
 }, {
     url: 'http://photo.gmw.cn/2013-12/27/content_9938379.htm',
     title: '绵阳舰在失联海域发现可疑漂浮物',
     imgUrl: '3'
 }, {
     url: 'http://photo.gmw.cn/2013-12/27/content_9938379.htm',
     title: '曝奶茶妹妹与70后京东掌门热恋',
     imgUrl: '4'
 }, {
     url: 'http://photo.gmw.cn/2013-12/27/content_9938379.htm',
     title: '抢购年代，不抢就没了',
     imgUrl: '5'
 }];

 $(function() {
     var News = function(data) {
         this.data = data;
         this.num = 0;
         this.length = data.length;
         this.timerBar = null;
         this.init();
     };
     News.prototype = {
         init: function() {
             this.create();
             this.bindEvent();
             this.go();
         },
         create: function() {
             var frameTpl = [
                     '<div class="d-img-frame" num="0">',
                     // '<div class="d-img-cell-shadow">@(bigImgTpl)</div>',
                     '<div class="d-img-cell">@(bigImgTpl)</div>',
                     '<div class="d-img-mask"></div>',
                     '</div>',
                     '<div class="d-img-arrow go-pre">',
                     '<a href="#" onclick="return false;" hidefocus="" class="arrow"></a>',
                     '</div>',
                     '<div class="d-img-arrow go-next">',
                     '<a href="#" onclick="return false;" hidefocus="" class="arrow"></a>',
                     '</div>',
                     '<div class="d-title-mask"></div>',
                     '<a class="d-title" href="@(url)" target="_blank" hidefocus>@(title)</a>',
                     '<div class="d-bars">@(smallImgTpl)</div>',
                 ].join('')
                 //大图
                 ,
                 bigImg = [
                     '<a href="@(url)" class="d-img-link" target="_blank">',
                     '<img height="260" width="426" src="@(imgUrl)"/>',
                     '</a>'
                 ].join('')
                 //小图
                 ,
                 smallImg = [
                     '<span class="@(curspan) d-small" num="@(num)">',
                     '<img class="d-small-img" height="40" width="68" src="@(imgUrl)"/>',
                     '<span class="d-small-mask"></span>',
                     '</span>'
                 ].join(''),
                 bigTpl = '',
                 smallTpl = '';
             for (var i = 0; i < this.data.length; i++) {
                 this.data[i].curspan = i == 0 ? 'current' : '';
                 this.data[i].num = i;
                 this.data[i].imgUrl = 'img/' + this.data[i].imgUrl + '.jpg'
                 bigTpl += $$.formateString(bigImg, this.data[i]);
                 smallTpl += $$.formateString(smallImg, this.data[i]);
             }
             $('.loop-img').html($$.formateString(frameTpl, {
                 bigImgTpl: bigTpl,
                 smallImgTpl: smallTpl,
                 url: this.data[0].url,
                 title: this.data[0].title
             }))
         },
         bindEvent: function() {
             $('.loop-img').on('mouseenter', function() {
                 $('.loop-img').addClass('show-arrow');
             }).on('mouseleave', function() {
                 $('.loop-img').removeClass('show-arrow');
             });
         },
         stop: function() {
             clearInterval(this.timerBar);
             this.timerBar = null;
         },
         go: function() {
             var that = this;
             that.stop();
             that.timerBar = setInterval(function() {
                 that.num++;
                 if (that.num >= that.length) {
                     that.num = 0;
                 }
                 // 大图片
                 $('.d-img-cell').css('left', -that.num * 426 + 'px');
                 // 标题
                 $('.d-title').attr('href', that.data[that.num].url).html(that.data[that.num].title);
                 // 小图片
                 var $small = $('.d-small').eq(that.num);
                 $('.d-small').removeClass('current');
                 $small.addClass('current');
             }, 2000);
         }
     }
     new News(imgData);
 })
