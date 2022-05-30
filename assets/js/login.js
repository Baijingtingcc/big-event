$(function() {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".reg-box").show();
    $(".login-box").hide()
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //自定义校验
  const form = layui.form
  form.verify({
    //密码校验
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (Value) => {
      //获取当前输入的值
      let pwd1 = $('#form_reg [name="password"]').val();
      if (pwd1 !== Value) return "两次密码不一致"
      //获取密码框的值
      //对比两者
    },

  })
  // const baseUrl = 'http://www.liulongbin.top:3007' 
  var layer = layui.layer //layui 的提示框信息样式
  //注册功能
  $('#form_reg').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name="username"]').val(),
        password: $('#form_reg [name="password"]').val()
      },
      success: function(res) {
        layer.msg(res.message)
        if (res.status !== 0) return
        $("#link_login").click()

      }
    })
  })

  //登录
  $('#form_login').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function(res) {
        layer.msg(res.message)
        console.log(res);
        if (res.status !== 0) return
        //将令牌存储到本地
        localStorage.setItem('token', res.token)
        //浏览器提供的方法 跳转
        location.href = './index.html'

      }
    })
  })
});