Page({

  /**
   * 页面的初始数据
   */
  data: {
    orientation: 'back',
    cameraSrc: [],
    isShow: false,
    access_token: '',
    face_list: {}
  },
  timeId: -1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 更改摄像头朝向事件
   */
  handleChangeOrien: function () {
    let orientation = this.data.orientation
    orientation = orientation === 'back' ? 'front' : 'back'
    this.setData({
      orientation
    })
  },
  /**
   * 拍照事件
   */
  takePhoto: function () {
    let than = this
    wx.chooseImage({
      sourceType: ['camera'],
      success: function (res) {
        than.setData({
          cameraSrc: res.tempFilePaths,
          isShow: true
        }, () => {
          than.getFaceInfo()
        })
      }
    })
  },
  /**
   * 选择照片事件
   */
  handleChooseImg: function () {
    let than = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function (res) {
        than.setData({
          cameraSrc: res.tempFilePaths,
          isShow: true
        }, () => {
          than.getFaceInfo()
        })
      }
    })
  },
  /**
   * 照片重新选择事件
   */
  handleRechoose: function () {
    let than = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function (res) {
        than.setData({
          cameraSrc: res.tempFilePaths,
          isShow: true
        }, () => {
          than.getFaceInfo()
        })
      }
    })
  },
  /**
   * 测颜值方法
   */
  getFaceInfo: function () {
    let than = this
    // 转码为base64
    let fileManager = wx.getFileSystemManager()
    let fileStr = fileManager.readFileSync(this.data.cameraSrc[0], 'base64')
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + this.data.access_token,
      data: {
        image_type: 'BASE64',
        image: fileStr,
        face_field: 'age,beauty,expression,gender,glasses,emotion'
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: (result) => {
        than.setData({
          face_list: result.data.result.face_list[0]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let than = this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=XgGmEGAw6aLuBPYfZWmvY6la&client_secret=8CGTqL7rmDXYqTnK1YGu9NvF3qnL4hnK',
      method: 'POST',
      success: (result) => {
        let {
          access_token
        } = result.data
        than.setData({
          access_token
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})