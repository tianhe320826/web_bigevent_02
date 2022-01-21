// $(function () {
//   // 点击去注册账号的链接
//   $('#link_reg').on('click', function () {
//     $('.login-box').hide()
//     $('.reg-box').show()
//   })

//   // 点击去初测账号的链接
//   $('#link_login').on('click', function () {
//     $('.login-box').show()
//     $('.reg-box').hide()
//   })


//   // 从layui中获取 form对象
//   var form = layui.form
//   // 通过 form.verify() 函数自定义校验规则
//   form.verify({
//     // 校验两次密码是否一致的规则
//     pwd: [/^[\S]{6,12}$/, '密码必须是6到12位,且不能出现空格'],
//     // 校验两次密码是否一致的规则
//     repwd: function (value) {
//       // 通过形参拿到的是确认密码框中的内容
//       // 还需要拿到密码框中的内容
//       // 然后进行一次等于的判断
//       // 如果判断失败,则return一个提示消息即可
//       var pwd = $('.reg-box [name=password]').val()
//       if (pwd !== value) {
//         return '哈皮,你输入的两次密码不一致'
//       }
//     }
//   })

//   $('#form_reg').on('submit', function (e) {
//     // 阻止默认的提交行为
//     e.preventDefault()
//     // 2.发起Ajax的POST请求
//     const data = {
//       username: $('#form_reg [name=username]').val(),
//       password: $('#form_reg [name=password]').val(),
//       repassword: $('#form_reg [name=repassword]').val()
//     }

//     $.ajax({
//       method: 'POST',
//       url: 'http://www.liulongbin.top:3008/api/reg',
//       // 键和值是一致的时候,可以简写成一个
//       // data:{data}
//       data,
//       // 回调函数后面直接写上小括号,大括号这种形式写就好了
//       // success:function(res) {

//       //   console.log(res);
//       // }

//       // 使用解构
//       success({ status, message }) {
//         if (status !== 0) {
//           return layer.msg(message)

//         } else {
//           $('#link_login').click()
//         }
//       }
//     })
//   })
//   // 监听登录表单的提交时间
//   $('#form_login').submit(function (e) {
//     // 阻止默认提交行为
//     e.preventDefault()
//     $.ajax({
//       url: '/api/login',
//       method: 'POST',
//       // 1.$(this).
//       data: form.val('loginForm'),
//       success: function (res) {
//         if (res.code !== 0) {
//           return later.msg('登录失败!')
//         }
//         layer.msg('登录成功!')

//         setStorage('token', res.token)
//         location.href = '/index.html'
//       }
//     })
//   })

// })















$(function() {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: 'http://www.liulongbin.top:3008/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
