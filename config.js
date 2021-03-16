const path = require('path')

module.exports = {
    mongoUri: 'mongodb+srv://CSE:3LpBfqLOrk2TyEit@tmt.zsfzj.mongodb.net/TMT?retryWrites=true&w=majority',
        //mongoUri: 'mongodb+srv://CSE:3LpBfqLOrk2TyEit@tmt.zsfzj.mongodb.net/TMT?retryWrites=true&w=majority',
    PORT: process.env.PORT || 3000,
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            'api': {
                target: 'http://localhost:5000'
            }
        }
    }
   
}
