const app = getApp()
Page({
  data: {
    age: 0,
    sexual: 0,
    FEV1Percent: 0,
    tubercle: 0,
    pagination: 0,
    calcification: 0,
    nickName: '',
    userInfoAvatar: '',
    tubercleArray: {},
    FEV1PercentArray: {},
    ageArray: {},
    cancerPercent: 0,
    level: '',
    check: [
      { name: '0', value: '否', checked: true },
      { name: '1', value: '是', checked: false },
    ],
  },

  onLoad: function (options) {
    var tubercleArray = [];
    var FEV1PercentArray = [];
    var ageArray = [];
    var cancerPercent = 0;
    var that = this;
    //FEV1Percent取值范围
    for (var j = 0; j < 150; j++) {
      FEV1PercentArray.push(j);
    }
    console.log(FEV1PercentArray);
    //结节直径取值范围
    for (var j = 0; j < 150; j++) {
      tubercleArray.push(j);
    }
    this.setData({
      FEV1PercentArray: FEV1PercentArray,
      tubercleArray: tubercleArray
    })
    wx.getUserInfo({
      success: function (res) {
        // success  
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
        })
      },
      fail: function () {
        // fail  
        console.log("获取失败！")
      },
      complete: function () {
        // complete  
        console.log("获取用户信息完成！")
      }
    })

    wx.getStorage({
      key: 'infoAge',
      success: function (res) {
        if (res.data) {
          that.setData({
            age: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoSexual',
      success: function (res) {
        if (res.data) {
          that.setData({
            sexual: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoFEV1Percent',
      success: function (res) {
        if (res.data) {
          that.setData({
            FEV1Percent: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoTubercle',
      success: function (res) {
        if (res.data) {
          that.setData({
            tubercle: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoPagination',
      success: function (res) {
        if (res.data) {
          that.setData({
            pagination: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoCalcification',
      success: function (res) {
        if (res.data) {
          that.setData({
            calcification: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoPercent1',
      success: function (res) {
        if (res.data) {
          that.setData({
            cancerPercent: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoLevel1',
      success: function (res) {
        if (res.data) {
          that.setData({
            level: res.data
          })
        }
      }
    })
  },
  bindAgeChange: function (e) {
    console.log('age值', this.data.ageArray[e.detail.value])
    this.setData({
      age: this.data.ageArray[e.detail.value]
    })
    try {
      wx.setStorage({ key: 'infoAge', data: this.data.ageArray[e.detail.value] })
    } catch (e) {

    }
  },
  bindSexualChange: function (e) {
    console.log('男性：', e.detail.value);
    this.setData({
      sexual: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoSexual', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  bindFEV1PercentChange: function (e) {
    console.log('FEV1Percent：', e.detail.value)
    this.setData({
      FEV1Percent: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoFEV1Percent', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  bindTubercleChange: function (e) {
    console.log('结节最大直径', this.data.tubercleArray[e.detail.value])
    this.setData({
      tubercle: this.data.tubercleArray[e.detail.value]
    })
    try {
      wx.setStorage({ key: 'infoTubercle', data: this.data.tubercleArray[e.detail.value] })
    } catch (e) {

    }
  },
  paginationChange: function (e) {
    console.log('分页征：', e.detail.value)
    this.setData({
      pagination: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoPagination', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  calcificationChange: function (e) {
    console.log('钙化征：', e.detail.value)
    this.setData({
      calcification: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoCalcification', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },

  //按钮事件响应
  click: function (e) {
    var age = parseInt(this.data.age);
    var sexual = parseInt(this.data.sexual);
    var FEV1Percent = parseInt(this.data.FEV1Percent);
    var tubercle = parseInt(this.data.tubercle);
    var pagination = parseInt(this.data.pagination);
    var calcification = parseInt(this.data.calcification);
    var level = '';
    console.log('age : ' + age);
    console.log('sexual : ' + sexual);
    console.log('FEV1Percent : ' + FEV1Percent);
    console.log('tubercle : ' + tubercle);
    console.log('pagination : ' + pagination);
    console.log('calcification : ' + calcification);
    var baseNumber = -6.192 + (-0.924 * sexual) + (0.042 * FEV1Percent) + (0.131 * tubercle) + (1.071 * pagination) + (2.424 * calcification);
    console.log('baseNumber : ' + baseNumber);
    var pow = Math.pow(Math.E, baseNumber);
    var cancerPercent = (pow / (1 + pow) * 100).toFixed(2);
    console.log('cancerPercent : ' + cancerPercent);
    if (cancerPercent < 5) {
      level = '低'
    } else if (cancerPercent > 65) {
      level = '高'
    } else {
      level = '中'
    }
    this.setData({
      cancerPercent: cancerPercent
    })
    this.setData({
      level: level
    })
    try {
      wx.setStorageSync('infoPercent1', cancerPercent)
    } catch (e) { }
    try {
      wx.setStorageSync('infoLevel1', level)
    } catch (e) { }
  },


});