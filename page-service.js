const pages = [
      {
        path:'page/home/index',
        js:function handleJS(Page,App,Component,getCurrentPages,mydsl){
      

Page({
    data:{
        name:'Alien',
        image:'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg',
        myImage:'https://p9-passport.byteacctimg.com/img/user-avatar/67ae50d1ec26c12c2ab04bc8ab52bd5f~80x80.awebp'
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        console.log(mydsl.navigateTo)
    },
    onReady(){
        console.log('页面初始化完成=======>')
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
    },
    onHide:function(){
        // 生命周期函数--监听页面隐藏
    },
    handleClick(){
        console.log('点击事件')
        this.setData({
            name:'我不是外星人'
        })
    },
    handleRouterGo(){
        mydsl.navigateTo({ url:'page/test/index' })
    }
})
        },
        render:function (context) {
      return [context.createNode("view", {
        "props":{ "class": "container"}}, function (context) {
          return [context.createNode("view", {
            "props":{ "class": "head"}}, function (context) {
              return [context.createNode("image", {
                "props":{ "class": "headimage","src":`${context.getValue('image')}`}}), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["首页"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["沸点"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["课程"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["直播"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["活动"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["竞赛"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["商城"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["APP"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "headName"}}, function (context) {
                    return ["插件"
                  ]
                }), context.createNode("view", {
                  "props":{ "class": "my"}}, function (context) {
                    return [context.createNode("view", {
                      "props":{ "class": "writeCenter"}}, function (context) {
                        return ["创作者中心"
                      ]
                    }), context.createNode("image", {
                      "props":{ "class": "myImage","src":`${context.getValue('myImage')}`}})
                    ]
                  })
                ]
              }), context.createNode("view", {
                "props":{ "class": "mainContent"}}, function (context) {
                  return [context.createNode("view", {
                    "props":{ "class": "main-left"}}, function (context) {
                      return [context.createNode("view", {
                        "props":{ "class": "main"}}, function (context) {
                          return [context.createNode("image", {
                            "props":{ "class": "mainImage","src":`${context.getValue('myImage')}`}}), context.createNode("view", {
                              "props":{ }}, function (context) {
                                return [context.createNode("view", {
                                  "props":{ "class": "mainName"}}, function (context) {
                                    return [context.getValue('name')
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "mainDes"}}, function (context) {
                                    return ["FE | 攻粽号：前端Sharing"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "mainDes"}}, function (context) {
                                    return ["连载小册《大前端跨端开发指南》出版啦🎉🎉，小册《React进阶实践指南》作者，强烈推荐一本书籍《深入浅出React 开发指南》🎉，"
                                  ]
                                })
                              ]
                            }), context.createNode("view", {
                              "props":{ "class": "mainSet","eventtap": "handleClick"}}, function (context) {
                                return ["设置名称"
                              ]
                            })
                          ]
                        }), context.createNode("view", {
                          "props":{ "class": "course"}}, function (context) {
                            return [context.createNode("view", {
                              "props":{ "class": "tab"}}, function (context) {
                                return [context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["动态"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["文章"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["专栏"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["沸点"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem active"}}, function (context) {
                                    return ["课程"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["收藏集"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["关注"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "tabItem"}}, function (context) {
                                    return ["赞"
                                  ]
                                })
                              ]
                            }), context.createNode("view", {
                              "props":{ "class": "courseItem"}}, function (context) {
                                return [context.createNode("image", {
                                  "props":{ "class": "courseImage","src": "./WechatIMG36792.png"}}), context.createNode("view", {
                                    "props":{ "class": "courseContent"}}, function (context) {
                                      return [context.createNode("view", {
                                        "props":{ "class": "courseName"}}, function (context) {
                                          return ["大前端跨端开发指南"
                                        ]
                                      }), context.createNode("view", {
                                        "props":{ "class": "courseDes"}}, function (context) {
                                          return ["小程序+ RN + DSL ，全方位讲解前端跨端技术"
                                        ]
                                      }), context.createNode("view", {
                                        "props":{ "class": "courseAuth"}}, function (context) {
                                          return [context.createNode("image", {
                                            "props":{ "class": "courseMyImage","src":`${context.getValue('myImage')}`}}), context.createNode("view", {
                                              "props":{ "class": "courseText"}}, function (context) {
                                                return [context.getValue('name')
                                              ]
                                            }), context.createNode("view", {
                                              "props":{ "class": "courseText"}}, function (context) {
                                                return ["👽 FE @攻粽号：前端Sharing"
                                              ]
                                            })
                                          ]
                                        }), context.createNode("view", {
                                          "props":{ "class": "courseRem"}}, function (context) {
                                            return ["已更新 28 节｜1,106人已购买"
                                          ]
                                        })
                                      ]
                                    })
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "courseItem"}}, function (context) {
                                    return [context.createNode("image", {
                                      "props":{ "class": "courseImage","src": "./WechatIMG36801.png"}}), context.createNode("view", {
                                        "props":{ "class": "courseContent"}}, function (context) {
                                          return [context.createNode("view", {
                                            "props":{ "class": "courseName"}}, function (context) {
                                              return ["React 进阶实践指南"
                                            ]
                                          }), context.createNode("view", {
                                            "props":{ "class": "courseDes"}}, function (context) {
                                              return ["彻底弄懂 React 基础和高阶用法，结合实践 Demo，告别技术瓶颈期，实现进阶~"
                                            ]
                                          }), context.createNode("view", {
                                            "props":{ "class": "courseAuth"}}, function (context) {
                                              return [context.createNode("image", {
                                                "props":{ "class": "courseMyImage","src":`${context.getValue('myImage')}`}}), context.createNode("view", {
                                                  "props":{ "class": "courseText"}}, function (context) {
                                                    return [context.getValue('name')
                                                  ]
                                                }), context.createNode("view", {
                                                  "props":{ "class": "courseText"}}, function (context) {
                                                    return ["👽 FE @攻粽号：前端Sharing"
                                                  ]
                                                })
                                              ]
                                            }), context.createNode("view", {
                                              "props":{ "class": "courseRem"}}, function (context) {
                                                return ["已更新 42 节｜7,918人已购买"
                                              ]
                                            })
                                          ]
                                        })
                                      ]
                                    })
                                  ]
                                })
                              ]
                            }), context.createNode("view", {
                              "props":{ "class": "main-right"}}, function (context) {
                                return [context.createNode("view", {
                                  "props":{ "class": "person"}}, function (context) {
                                    return ["个人成就"
                                  ]
                                }), context.createNode("view", {
                                  "props":{ "class": "personList"}}, function (context) {
                                    return [context.createNode("view", {
                                      "props":{ "class": "personListItem"}}, function (context) {
                                        return [context.createNode("image", {
                                          "props":{ "class": "personListItemImg","src": "./WechatIMG36806.png"}}), context.createNode("view", {
                                            "props":{ "class": "personListItemTxt"}}, function (context) {
                                              return ["2021年度人气作者No.40"
                                            ]
                                          })
                                        ]
                                      }), context.createNode("view", {
                                        "props":{ "class": "personListItem"}}, function (context) {
                                          return [context.createNode("image", {
                                            "props":{ "class": "personListItemImg","src": "./WechatIMG36806.png"}}), context.createNode("view", {
                                              "props":{ "class": "personListItemTxt"}}, function (context) {
                                                return ["社区共建者"
                                              ]
                                            })
                                          ]
                                        }), context.createNode("view", {
                                          "props":{ "class": "personListItem"}}, function (context) {
                                            return [context.createNode("image", {
                                              "props":{ "class": "personListItemImg","src": "./WechatIMG36806.png"}}), context.createNode("view", {
                                                "props":{ "class": "personListItemTxt"}}, function (context) {
                                                  return ["优秀创作者"
                                                ]
                                              })
                                            ]
                                          }), context.createNode("view", {
                                            "props":{ "class": "personListItem"}}, function (context) {
                                              return [context.createNode("image", {
                                                "props":{ "class": "personListItemImg","src": "./WechatIMG36806.png"}}), context.createNode("view", {
                                                  "props":{ "class": "personListItemTxt"}}, function (context) {
                                                    return ["文章被点赞 22,180"
                                                  ]
                                                })
                                              ]
                                            }), context.createNode("view", {
                                              "props":{ "class": "personListItem"}}, function (context) {
                                                return [context.createNode("image", {
                                                  "props":{ "class": "personListItemImg","src": "./WechatIMG36806.png"}}), context.createNode("view", {
                                                    "props":{ "class": "personListItemTxt"}}, function (context) {
                                                      return ["文章被阅读 924,588"
                                                    ]
                                                  })
                                                ]
                                              }), context.createNode("view", {
                                                "props":{ "class": "personListItem"}}, function (context) {
                                                  return [context.createNode("image", {
                                                    "props":{ "class": "personListItemImg","src": "./WechatIMG36806.png"}}), context.createNode("view", {
                                                      "props":{ "class": "personListItemTxt"}}, function (context) {
                                                        return ["掘力值 62,880"
                                                      ]
                                                    })
                                                  ]
                                                })
                                              ]
                                            }), context.createNode("view", {
                                              "props":{ "class": "follow"}}, function (context) {
                                                return [context.createNode("view", {
                                                  "props":{ "class": "followItem"}}, function (context) {
                                                    return [context.createNode("view", {
                                                      "props":{ "class": "itemTitle"}}, function (context) {
                                                        return ["关注了"
                                                      ]
                                                    }), context.createNode("view", {
                                                      "props":{ "class": "itemCount"}}, function (context) {
                                                        return ["50"
                                                      ]
                                                    })
                                                  ]
                                                }), context.createNode("view", {
                                                  "props":{ "class": "followItem"}}, function (context) {
                                                    return [context.createNode("view", {
                                                      "props":{ "class": "itemTitle"}}, function (context) {
                                                        return ["关注者"
                                                      ]
                                                    }), context.createNode("view", {
                                                      "props":{ "class": "itemCount"}}, function (context) {
                                                        return ["8,875"
                                                      ]
                                                    })
                                                  ]
                                                })
                                              ]
                                            })
                                          ]
                                        })
                                      ]
                                    })
                                  ]
                                })
                              ]
                            },
        css:"page{\n   background:#eee;\n}\n.container{\n    font-size:14rpx;\n    color: #fff;\n}\n.head{\n    height:60rpx;\n    display:flex;\n    background:#fff;\n    width:100%;\n    align-items: center; \n    padding-left:45rpx;\n    position: relative;\n}\n.headimage{\n    width:107rpx;\n    height:22rpx;\n}\n.headName{\n    padding-left:18rpx;\n    color: #86909c;\n}\n.my{\n   position: absolute;\n   right:80rpx;\n   top:10rpx;\n   display:flex;\n}\n.myImage{\n    border-radius:50%;\n    height: 36rpx;\n    width: 36rpx;\n}\n.writeCenter{\n    height: 36rpx;\n    width: 90rpx;\n    background-color: #1e80ff;\n    text-align: center;\n    line-height: 36rpx;\n    font-size: 16rpx;\n    color: #fff;\n    border-radius: 5rpx;\n    margin-right:20rpx;\n    padding:0 15rpx;\n}\n.mainContent{\n    margin-top: 20rpx;\n    display:flex;\n}\n.main-left{\n    margin-left:300rpx;\n    width:678rpx;\n}\n.main{\n    padding:30rpx;\n    display:flex;\n    background:#fff;\n    padding-bottom:50rpx;\n    position: relative;\n}\n.mainImage{\n    width:90rpx;\n    height:90rpx;\n    margin-right:28rpx;\n    border-radius:50%;\n}\n.mainName{\n    font-size:24rpx;\n    color:#000;\n    font-weight: bold;\n}\n.mainDes{\n    color:rgb(114, 119, 123);\n    font-size:14rpx;\n    margin-top:10rpx;\n}\n.mainSet{\n    width:118rpx;\n    height:34rpx;\n    color: #007fff;\n    border: 1px solid #007fff;\n    border-radius: 4px;\n    position:absolute;\n    bottom:15rpx;\n    right:15rpx;\n    font-weight:bold;\n    line-height:34rpx;\n    text-align:center;\n}\n.course{\n    margin-top:15rpx;\n}\n.tab{\n    width:100%;\n    height:48rpx;\n    border-bottom: 1px solid #e4e6eb;\n    display:flex;\n    background:#fff;\n}\n.tabItem{\n    margin-right:4rpx;\n    padding:16rpx;\n    color: #909090;\n    font-size:16rpx;\n}\n.active{\n    color: #252933;\n    font-weight: 500;\n}\n.courseItem{\n    padding:20rpx;\n    display:flex;\n    background:#fff;\n    border-bottom: 1px solid #e4e6eb;\n}\n.courseImage{\n   margin-right:16rpx;\n   height:147rpx;\n   width:97rpx;\n   border-radius:5rpx;\n}\n.courseName{\n   font-size:20rpx;\n   line-height:28rpx;\n   color:rgb(37, 41, 51);\n}\n.courseDes{\n   margin-top:4rpx;\n   font-size:14rpx;\n   line-height:22rpx;\n   color:rgb(81, 87, 103);\n}\n.courseAuth{\n   margin-top:8rpx;\n   height:20rpx;\n   display:flex;\n}\n.courseMyImage{\n    border-radius:50rpx;\n    height:20rpx;\n    width:20rpx;\n    margin-right:3rpx;\n}\n.courseText{\n   color:rgb(81, 87, 103);\n   font-size:14rpx;\n   line-height:20rpx;\n}\n.courseRem{\n   margin-top:16rpx;\n   font-size:12rpx;\n   line-height:22rpx;\n   color:rgb(138, 145, 159);\n}\n.main-right{\n    width:240rpx;\n    margin-left:15rpx;\n}\n.person{\n    height:52rpx;\n    line-height:52rpx;\n    font-size:16rpx;\n    color:rgb(49, 68, 91);\n    border-bottom: 1px solid #e4e6eb;\n    font-weight:600;\n    background:#fff;\n    padding-left:15rpx;\n}\n.personList{\n    padding:15rpx;\n    background:#fff;\n}\n.personListItem{\n    height:24rpx;\n    margin-bottom:10rpx;\n    display:flex;\n}\n.personListItemImg{\n    height:24rpx;\n    width:24rpx;\n    border-radius:50%; \n    margin-right:14rpx;\n}\n.personListItemTxt{\n    height:24rpx;\n    line-height:24rpx;\n    color:#000;\n    font-size:13rpx;\n}\n.follow{\n    margin-top:15rpx;\n    background:#fff;\n    display:flex;\n}\n.followItem{\n    flex:1;\n    padding-top:15rpx;\n    padding-bottom:15rpx;\n}\n.itemTitle{\n   height:19rpx;\n    font-size:16rpx;\n    color:rgb(49, 68, 91);\n    font-weight:500;\n    line-height:19rpx;\n    text-align:center;\n}\n.itemCount{\n    height:19rpx;\n    font-size:16rpx;\n    color:rgb(49, 68, 91);\n    font-weight:500;\n    line-height:19rpx;\n    text-align:center;\n    margin-top:6rpx;\n}"
    },
        {
        path:'page/test/index',
        js:function handleJS(Page,App,Component,getCurrentPages,mydsl){
      

Page({})
        },
        render:function (context) {
      return [context.createNode("view", {
        "props":{ }}, function (context) {
          return [context.createNode("view", {
            "props":{ }}, function (context) {
              return ["测试页面"
            ]
          })
        ]
      })
    ]
  },
        css:".test{\n    color:red;\n}"
    }
          
            ]
              function handleJS(Page,App,Component,getCurrentPages,mydsl){
      

App({
    onLaunch(){
        console.log(this,'###=========应用初始化')
    },
    globalData:{
        name:'《大前端跨端开发指南》',
    },
})
        }
                const app = require('./code/index')
                  handleJS(null,app.bind(null,pages))