// Error MODULE_NOT_FOUND
// import { auth0 } from "@/lib/auth0"
// Error ERR_PACKAGE_PATH_NOT_EXPORTED
import { auth0 } from "../../src/lib/auth0"
import express from 'express'

export const getAccessToken = async (
  req: express.Request,
  res: express.Response
): Promise<string | undefined> => {
  const session = await auth0.getSession(req)
  return session?.tokenSet.accessToken
}