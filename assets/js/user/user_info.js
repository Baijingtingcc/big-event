$(function() {
  const form = layui.form
  form.verify({
    nickname: val => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！"
    }
  })

  const userInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败！");
        console.log(res);
        form.val("formUserInfo", res.data);
      },
    });

  }
  userInfo()

  //   重置功能
  $('#btnOut1').click((e) => {
    e.preventDefault()
    userInfo()
  })
  //   更新用户页面
  $('.layui-form').submit((e) => {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data:$('.layui-form').serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('修改用户信息失败！')
        layer.msg('修改用户信息成功！')
        window.parent.getUserInfo()
      }
    })
  })
})