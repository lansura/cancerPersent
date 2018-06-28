const app = getApp()
Page({
  data: {
    age: 0,
    smokeHistory: 0,
    cancerHistory: 0,
    tubercle: 0,
    spiculeSign: 0, 
    tubercleLocation: 0,   
    nickName: '',
    userInfoAvatar: '',
    tubercleArray: {},
    ageArray: {},
    cancerPercent: 0,
    level: '',
    check: [
      { name: '0', value: '无', checked: true },
      { name: '1', value: '有', checked: false },
    ],
  },

  onLoad: function (options) {
    var tubercleArray = [];
    var ageArray = [];
    var cancerPercent = 0;
    var that = this;
    for (var j = 0; j < 150; j++) {
      tubercleArray.push(j);
    }
    for (var k = 0; k < 80; k++) {
      ageArray.push(k);
    }
    this.setData({
      tubercleArray: tubercleArray,
      ageArray: ageArray,
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
      key: 'infoSmokeHistory',
      success: function (res) {
        if (res.data) {
          that.setData({
            smokeHistory: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoCancerHistory',
      success: function (res) {
        if (res.data) {
          that.setData({
            cancerHistory: res.data
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
      key: 'infoSpiculeSign',
      success: function (res) {
        if (res.data) {
          that.setData({
            spiculeSign: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoTubercleLocation',
      success: function (res) {
        if (res.data) {
          that.setData({
            tubercleLocation: res.data
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
  smokeHistoryChange:function(e){
    console.log('吸烟史：', e.detail.value);
    this.setData({
      smokeHistory: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoSmokeHistory', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  cancerHistoryChange: function (e) {
    console.log('五年内胸外肿瘤病史：', e.detail.value)
    this.setData({
      cancerHistory: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoCancerHistory', data: parseInt(e.detail.value) })
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
  spiculeSignChange: function (e) {
    console.log('毛刺征：', e.detail.value)
    this.setData({
      spiculeSign: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoSpiculeSign', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  tubercleLocationChange: function (e) {
    console.log('结节位于上叶：', e.detail.value)
    this.setData({
      tubercleLocation: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoTubercleLocation', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  
  //按钮事件响应
  click: function (e) {
    var age = parseInt(this.data.age);
    var smokeHistory = parseInt(this.data.smokeHistory);
    var cancerHistory = parseInt(this.data.cancerHistory);
    var tubercle = parseInt(this.data.tubercle);
    var spiculeSign = parseInt(this.data.spiculeSign);
    var tubercleLocation = parseInt(this.data.tubercleLocation);
    var level = '';
    console.log('age : ' + age);
    console.log('smokeHistory : ' + smokeHistory);
    console.log('cancerHistory : ' + cancerHistory);
    console.log('tubercle : ' + tubercle);
    console.log('spiculeSign : ' + spiculeSign);
    console.log('tubercleLocation : ' + tubercleLocation);
    var baseNumber = -6.8272 + (0.0391 * age) + (0.7917 * smokeHistory) + (1.3388 * cancerHistory) + (0.1274 * tubercle) + (1.0407 * spiculeSign) + (0.7838 * tubercleLocation);
    console.log('baseNumber : ' + baseNumber);
    var pow = Math.pow(Math.E, baseNumber);
    var cancerPercent = (pow / (1 + pow) * 100).toFixed(2);
    console.log('cancerPercent : ' + cancerPercent);
    if (cancerPercent < 5){
      level = '低'
    } else if (cancerPercent > 65){
      level = '高'
    }else{
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
    } catch (e) {}
    try {
      wx.setStorageSync('infoLevel1', level)
    } catch (e) { }
  },
  

});