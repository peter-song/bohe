// pages/doctors/doctors.js

import doctors from '../../data/doctors.js';
import config from '../../config/index.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    list: []
  },

  _mergeData: data => data.reduce((origin, item) => {
    let findData = doctors.find(doctor => item.id == doctor.id);
    if (findData) {
      origin.push({
        ...item,
        photo: config.imgPath + item.photo,
        ...findData,
      });
    }
    return origin;
  }, []).sort((a, b) => {
    return a.sort - b.sort;
  }),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    console.log(`${config.api}/doctor/doctorlist?num=999`);
    wx.request({
      url: `${config.api}/doctor/doctorlist?num=999`,
      success: (res) => {
        if (res.statusCode == 200) {
          const list = this._mergeData(util.getFromObject(res, 'data.data', []));
          wx.hideLoading();
          this.setData({
            list,
            loading: false,
          });
        }
      }
    });
  },

  _consult: function (e) {
    console.log('consult', e);
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