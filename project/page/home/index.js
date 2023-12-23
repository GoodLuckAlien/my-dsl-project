

Page({
    data: {
        name: 'Alien',
        image: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg',
        myImage: 'https://p9-passport.byteacctimg.com/img/user-avatar/67ae50d1ec26c12c2ab04bc8ab52bd5f~80x80.awebp'
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log(mydsl.navigateTo)
    },
    onReady() {
        console.log('页面初始化完成=======>')
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏
    },
    handleClick() {
        console.log('点击事件')
        this.setData({
            name: '我不是外星人'
        })
    },
    handleRouterGo() {
        mydsl.navigateTo({ url: 'page/test/index' })
    }
})