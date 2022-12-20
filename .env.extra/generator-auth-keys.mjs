import fs from 'fs'
import http from 'http'
import chalk from 'chalk'

const apiUrl = 'http://localhost:5296/api/Utility/GetAuthKeys'

const downloadAuthKeys = async () => {
  const fileContent = await new Promise((resolve, reject) => {
    http
      .get(apiUrl, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          resolve(data)
        })
      })
      .on('error', (err) => {
        reject(err)
      })
  })
  if (fileContent && fileContent.length > 0) {
    fs.writeFileSync('src/library/models/PermissionKeys.ts', fileContent, 'utf8')
    console.log(chalk.green('下载权限Key文件成功'))
  }
}

downloadAuthKeys()
