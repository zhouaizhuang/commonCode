$(function() {
  // 加载这个js的时候，先检查有没有这个script标签，id为olympic_guess_like_comment，有则删除，防止二次加载
  // <script id="olympic_guess_like_comment" src="xxxxx/xxx/xxx.js"></script>
  $('#content_box').find('#olympic_guess_like_comment').remove()
  // 获取cookie
  function og_getOgCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
  // 获取日期的函数
  function og_getDateStr(AddDayCount = 0, split = '') {
    const dt = new Date()
    dt.setDate(dt.getDate() + AddDayCount) // 获取AddDayCount天后的日期
    return `0000${dt.getFullYear()}`.slice(-4) + split + `00${(dt.getMonth() + 1)}`.slice(-2) + split + `00${dt.getDate()}`.slice(-2)
  }
  // 往body中添加弹窗。同时将关闭的时间绑定好
  function og_bindTip(type = 'like') {
    const og_innerHTML = `<div id="og_content" style="background-color: rgba(0, 0, 0, .7);position: fixed;z-index:20;top:0;bottom:0;right:0;left:0;">
      <div style="position: absolute;left:50%;transform: translateX(-50%);width:6rem;top:22%;background-color: #009BB4;border-radius:0.2rem; padding: 0.6rem 0.3rem 0.3rem;">
        <img src="${type === 'like' ? 'https://upload.qianfanyun.com/og_like_img.png' : 'https://upload.qianfanyun.com/og_remark_suc.png' }" style="width:3.34rem;height:1.08rem;display: block;margin:0 auto 0.16rem;">
        <img src="https://upload.qianfanyun.com/og_caidai.png" alt="彩带" style="width:90%;height:2.85rem;position: absolute;top:1rem;">
        <div style="font-size: 0.3rem;color: #fff;margin-bottom:0.55rem;font-weight:bold;text-align:center;position:relative;z-index:100;">恭喜你获得<span style="padding: 0 0.12rem;">1张</span>欧洲杯竞猜卡！</div>
        <img src="https://upload.qianfanyun.com/og_remark_card.png"  style="margin:0 auto 1rem;display:block;width:3.9rem;height:3.23rem;"/>
        <div id="og_bets" style="width:4.32rem;height:0.85rem;position:absolute;z-index:30;bottom:1.3rem;left:50%;transform: translateX(-50%);">
          <img src="https://upload.qianfanyun.com/og_index_btn.png" style="width:100%;height:100%;display: block;" />
          <div style="font-weight:bold;position:absolute;left:50%;top:50%;transform: translate(-50%, -50%);font-size: 0.32rem;color:#fff;">投注领现金</div>
        </div>
        <img src="https://upload.qianfanyun.com/og_remark_bottom.png" style="height:1.8rem;width:100%;position:absolute;bottom:0;left:0;z-index:10;"/>
        <img id="close_x" src="https://upload.qianfanyun.com/og_close_x.png" style="bottom: -1.4rem;width:0.8rem;height:0.8rem;position: absolute;left:50%;transform: translateX(-50%);" />
      </div>
    </div>`;
    $("#og_content").remove()
    $('body').append(og_innerHTML)
    $('#close_x').click(function(){
      $("#og_content").remove()
    })
    $('#og_bets').click(function (){
      $("#og_content").remove()
      // 这里现在是写死的。将来要配置成从后台获取
      QFH5.jumpNewWebview('http://gwBI5QhVeM-hd-917-15.haoshikou.net/h5/#/guess/index/30')
    })
  }
  // ！！！！！重置次数(用于调试的，否则点赞两次、评论满两次就不弹出了)
  // window.localStorage.setItem('comment_times', String(0))
  // window.localStorage.setItem('like_times', String(0))
  // window.localStorage.setItem('like_date', '')
  // 获取cookie
  var og_third_app_token = og_getOgCookie('third_app_token')
  // 监听点赞
  $(document).on('reply_callback', function (event) {
    // const {isTrusted, _args}  = event;const [tid, pid, current_user_id] = _args
    $.ajax({
      type: "GET",
      url: "https://hudong.qianfanyun.com/guess/app/game/is-new?guess_id=30",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", og_third_app_token);
      },
      success: function(res) {
        // 如果是新用户
        if(Boolean(res.data)) {
          const comment_date = window.localStorage.getItem('comment_date') || ''
          if(comment_date === og_getDateStr()) { return false }
          window.localStorage.setItem('comment_date', og_getDateStr())
          og_bindTip.call(this, 'comment')
        } else { // 如果是老用户
          const comment_date = window.localStorage.getItem('comment_date') || ''
          let comment_times = window.localStorage.getItem('comment_times') || '0'
          if(og_getDateStr() !== comment_date) { comment_times = '0' }
          // alert(Number(comment_times))
          if(Number(comment_times) >= 2) { return false }
          window.localStorage.setItem('comment_times', String(Number(comment_times) + 1))
          window.localStorage.setItem('comment_date', og_getDateStr())
          og_bindTip.call(this, 'comment')
        }
        $.ajax({
          type: "POST",
          url: "https://hudong.qianfanyun.com/guess/app/game/do-task?guess_id=30",
          data: { type: 2 },
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", og_third_app_token);
          },
          success: function (res) {
            console.log('评论成功')
          },
          error: function (err){
            console.log(JSON.stringify(err))
          }
        })
      },
      error: function(err){
        console.log(error)
      }
    })
  })
  // 监听点赞
  $(document).on('dianzan_callback', function (event) {
    // const {isTrusted, _args}  = event;const [tid, pid, current_user_id] = _args
    $.ajax({
      type: "GET",
      url: "https://hudong.qianfanyun.com/guess/app/game/is-new?guess_id=30",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", og_third_app_token);
      },
      success: function(res) {
        if(Boolean(res.data)) { // 如果是新用户
          const like_date = window.localStorage.getItem('like_date') || ''
          if(like_date === og_getDateStr()) { return false }
          window.localStorage.setItem('like_date', og_getDateStr())
          og_bindTip.call(this, 'like')
        } else { // 如果是老用户
          const like_date = window.localStorage.getItem('like_date') || ''
          let like_times = window.localStorage.getItem('like_times') || '0'
          if(og_getDateStr() !== like_date) { like_times = '0' }
          // alert(Number(comment_times))
          if(Number(like_times) >= 2) { return false }
          window.localStorage.setItem('like_times', String(Number(like_times) + 1))
          window.localStorage.setItem('like_date', og_getDateStr())
          og_bindTip.call(this, 'like')
        }
        $.ajax({
          type: "POST",
          url: "https://hudong.qianfanyun.com/guess/app/game/do-task?guess_id=30",
          data: { type: 3 },
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", og_third_app_token);
          },
          success: function (res) {
            console.log('点赞成功')
          },
          error: function (err){
            console.log(JSON.stringify(err))
          }
        })
      },
      error: function(err){
        console.log(err)
      }
    })
  })
})