$(function() {
  const initCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: res => {
        const htmlStr = template('tpl-table', res)
        $('tbody').empty().html(htmlStr)
      }
    })
  }
  initCateList()
  const layer = layui.layer
  let indexAdd = null
  $('#btnAdd').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })
  $('html').on("submit", '#form-add', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('新增分类失败！')
        layer.msg('新增分类成功！')
        initCateList()
        layer.close(indexAdd)
      }
    })
  })
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function() {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "改巴改巴",
      content: $("#dialog-edit").html(),
    });
    const id = $(this).attr('data-id')
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success: res => {
        layui.form.val('form-edit', res.data)
      }
    })
  });

  $('html').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: res => {
          if (res.status !==0) return layer.msg('更新分类失败！')
          layer.msg('更新分类成功！')
          initCateList()
          layer.close(indexEdit)
      }
    })
  })
})