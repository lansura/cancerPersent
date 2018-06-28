const app = getApp()
Page({
  data: {
    age: 0,
    symptom: 0,
    proteinNum: 0,
    tubercle: 0,
    pagination: 0,
    calcification: 0,
    nickName: '',
    userInfoAvatar: '',
    tubercleArray: {},
    proteinNumArray:{},
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
    var proteinNumArray = [];
    var ageArray = [];
    var cancerPercent = 0;
    var that = this;
    //血清总蛋白取值范围
    for (var j = 0; j < 150; j++) {
      proteinNumArray.push(j);
    }
    //结节直径取值范围
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
      key: 'infoSymptom',
      success: function (res) {
        if (res.data) {
          that.setData({
            symptom: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoProteinNum',
      success: function (res) {
        if (res.data) {
          that.setData({
            proteinNum: res.data
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
  symptomChange: function (e) {
    console.log('症状表现：', e.detail.value);
    this.setData({
      symptom: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoSymptom', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  proteinNumChange: function (e) {
    console.log('血清总蛋白：', e.detail.value)
    this.setData({
      proteinNum: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoProteinNum', data: parseInt(e.detail.value) })
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
    var symptom = parseInt(this.data.symptom);
    var proteinNum = parseInt(this.data.proteinNum);
    var tubercle = parseInt(this.data.tubercle);
    var pagination = parseInt(this.data.pagination);
    var calcification = parseInt(this.data.calcification);
    var level = '';
    console.log('age : ' + age);
    console.log('symptom : ' + symptom);
    console.log('proteinNum : ' + proteinNum);
    console.log('tubercle : ' + tubercle);
    console.log('pagination : ' + pagination);
    console.log('calcification : ' + calcification);
    var baseNumber = -7.442 + (0.051 * age) + (0.711 * symptom) + (0.066 * proteinNum) + (0.032 * tubercle) + (1.071 * pagination) + (1.22 * calcification);
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