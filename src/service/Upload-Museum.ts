import { IncomingForm } from 'formidable'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import sharp from 'sharp'
const url = process.env.URL

 const uploadMuseum = (req: Request, res: Response) => {
  try {
    const form = new IncomingForm()
    form.encoding = 'utf-8'
    form.keepExtensions = true
    form.multiples = false
    form.maxFileSize = 8 * 1024 * 1024
    form.maxFieldsSize = 1

    let myFile: {} | null = {}
    let isCorrectFile: boolean = false
    form.on('progress', (bytesReceived, bytesExpected) => { })
    form.on('field', (name, field) => { })
    form.on('fileBegin', (name, file) => {
      const fileType = file.type.split('/').pop()
      const fileName = uuidv4() + '.' + fileType
      // tslint:disable-next-line:prefer-switch
      if (fileType.toLowerCase() === 'jpg' || fileType.toLowerCase() === 'png' || fileType.toLowerCase() === 'jpeg' || fileType.toLowerCase() === 'gif') {
        if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')
        if (!fs.existsSync('public')) fs.mkdirSync('public')
        if (!fs.existsSync('public/provider')) fs.mkdirSync('public/provider')

        file.path = 'tmp/' + fileName
        file.name = fileName
        isCorrectFile = true
      } else {
        isCorrectFile = false
      }
    })
    form.on('file', async (name, file) => {
      if (file.size === 0) return res.status(413).json({ message: 'Your file size is zero byte' })
      if (isCorrectFile) {
        const originalPath = 'tmp/' + file.name
        const mimeTypeAsJpeg = file.name.split('.')[0] + '.jpeg'
        const resizePath = 'public/customer/' + mimeTypeAsJpeg

        const data = await sharp(originalPath)
          .toFormat('jpeg')
          .jpeg({ quality: 40, force: true })
          .withMetadata() // add this line here
          .toFile(resizePath)

        return res.status(201).json({ link: 'provider/' + mimeTypeAsJpeg })
      } else {
        return res.status(400).json({ message: 'File type not matching' })
      }
    })
    form.on('aborted', () => {
      return res.status(400).json({ message: 'Request aborted by the user' })
    })
    form.on('error', (err) => {
      return res.status(400).json({ Message: 'Your file size is too large' })
    })
    form.parse(req)
  } catch (e) {
    return res.status(400).json(e)
  }
}
export default uploadMuseum