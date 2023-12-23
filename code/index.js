const AppInstance  = require('./app')

global.mydsl = {}

function App(pages,config){
   const app = new AppInstance(config,pages)
   global.app = app
   mydsl = global.mydsl
   const { navigateBack,navigateTo,redirectTo } = app.navigate 
   mydsl.navigateBack = navigateBack
   mydsl.navigateTo = navigateTo
   mydsl.redirectTo = redirectTo
}

module.exports = App