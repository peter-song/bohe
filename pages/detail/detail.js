// pages/detail/detail.js
import doctors from '../../data/doctors.js';
import cases from '../../data/cases.js';
import config from '../../config/index.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    data: {},
    caseData: undefined,
  },

  _mergeData: data => {
    let findData = doctors.find(doctor => doctor.id == data.id) || {};
    return {
      ...data,
      photo: config.imgPath + data.photo,
      ...findData,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: `${config.api}/doctor/doctorone?id=${options.id}`,
      success: (res) => {
        if (res.statusCode == 200){
          const data = this._mergeData(util.getFromObject(res, 'data.data', {}));
          console.log(data);
          wx.hideLoading();
          wx.setNavigationBarTitle({
            title: data.name,
          });
          this.setData({
            data,
            caseData: cases.find(item => item.id == data.id),
            loading: false,
          });
        }
      }
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