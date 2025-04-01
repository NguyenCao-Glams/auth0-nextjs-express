import express from 'express'

import { getAccessToken } from './../services/auth'

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const accessToken = await getAccessToken(req, res)
    if (!accessToken) {
      res.status(401).end('Cannot find the access token')
      return
    }
    req.headers['Authorization'] = `Bearer ${accessToken}`
    next()
  } catch (error) {
    const referer = req.headers.referer
    console.log({ referer, error })
    res.status(500).end('authMiddleware: internal server error')
  }
}
