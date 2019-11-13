function ZanShang(){
  this.author = $('.author');
  this.popbg = $('.zs-modal-bg');
  this.popcon = $('.zs-modal-box');
  this.closeBtn = $('.zs-modal-box .close');
  this.zsbtn = $('.zs-modal-btns .btn');
  this.zsPay = $('.zs-modal-pay');
  this.zsBtns = $('.zs-modal-btns');
  this.zsFooter = $('.zs-modal-footer');
  var that = this;
  $('.show-zs').on('click',function(){
    //点击赞赏按钮出现弹窗,加载图片(延迟加载，减少分享至LinkedIn的影响)
    var vendorls =  $('.zs-modal-footer img')
    for(var i = 0; i < vendorls.length; i++)
    {
      var type = vendorls[i].alt;
      var src = '/img/reward/'+type+'-'+'btn.png';
      vendorls[i].src = src;
    };
    that._show();
    that._init();
  })
}
ZanShang.prototype._hide = function(){
  this.popbg.hide();
  this.popcon.hide();
}
ZanShang.prototype._show = function(){
  this.author.show()
  this.popbg.show();
  this.popcon.show();
  this.zsBtns.show();
  this.zsFooter.show();
  this.zsPay.hide();
}
ZanShang.prototype._init = function(){
  var that = this;
  this.closeBtn.on('click',function(){
    //移除图片，减少分享至LinkedIn的影响
    payImage = $('#pay-image')
    payImage.attr('src', '')
    that._hide();
  })
  this.popbg.on('click',function(){
    //移除图片，减少分享至LinkedIn的影响
    payImage = $('#pay-image')
    payImage.attr('src', '')
    that._hide();
  })
  this.zsbtn.each(function(el){
    $(this).on('click',function(){
      var num = $(this).attr('data-num'); //按钮的对应的数字
      var type = $('.zs-type:radio:checked').val();//付款方式
      //根据不同付款方式和选择对应的按钮的数字来生成对应的二维码图片，你可以自定义这个图片的路径，默认放在/img/reward目录中
      //假如你需要加一个远程路径，比如我的就是
      //http://zhaohuabing.com/img/reward/'+type+'-'+num+'.png';
      var src = '/img/reward/'+type+'-'+num+'.png';
      var text = $(this).html();
      var payType=$('#pay-type'), payImage = $('#pay-image') //,payText = $('#pay-text');
      payImage.attr('src',src);
      if(type=='alipay'){
        payType.html('AliPay');
      } else if(type=='paypal'){
        payType.html('Paypal');
      } else{
        payType.html('WeChat');
      }
      //payText.html(text);
      that.zsPay.show();
      that.zsBtns.hide();
      var vendorls =  $('.zs-modal-footer img')
      for(var i = 0; i < vendorls.length; i++)
      {
        vendorls[i].src = '';
      };
      that.zsFooter.hide();
      that.author.hide();
    })
  })
}
var zs = new ZanShang();
