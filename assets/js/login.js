$(function() {
  // 登录注册的切换功能
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 从 LayUI 中获取 form 对象
  const form = layui.form;

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 确认密码的查验规则
    repwd: (value) => {
      const repwd1 = $('#form_reg [name=password]').val()
      if (repwd1 !== value) return "两次密码不一致"
    }
  })
  //   设置url路径
  // const baseUrl = 'http://www.liulongbin.top:3007'
  const layer = layui.layer
  $('#form_reg').on('submit', (e) => {
    //  阻止默认提交事件
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: res => {
        //   判断条件
        if (res.status != 0) return layer.msg(res.message)
        layer.msg('注册成功')
        // 模拟点击跳转登录
        $('#link_login').click()
      }
    })
    $('#form_login').on('submit', function(e) {
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function(res) {
          if (res.status !== 0) return layer.msg("登录失败")
          layer.msg('登录成功')
          localStorage.setItem('token', res.token)
          location.href = '/index.html'
        }
      })
    })
  })
})