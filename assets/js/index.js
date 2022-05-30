function getUserInfo() {
  $.ajax({
    type: "GET",
    url: '/my/userinfo',

    success: res => {
      console.log(res);
      if (res.status !== 0) return layer.msg('获取用户信息失败')
      layer.msg('获取用户信息成功')
      ranAvr(res.data)
    }
  })
}
const ranAvr = (user) => {
  console.log(user);
  let uname = user.nickname || user.username
  $('#welcome').html(`欢迎${uname}`)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic)
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    $('.text-avatar').html(uname[0].toUpperCase())
  }
}
// 退出功能
$('#btnOut').click(() => {
  layui.layer.confirm(
    "你要退出吗，邦邦就是两拳", { icon: 3, title: "你他喵确定退出？" },
    function(index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      // 重新跳转到登录页面
      location.href = "/login.html";
    }
  );
})
getUserInfo()