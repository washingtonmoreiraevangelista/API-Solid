import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {

  // vai validar que o usuario esta autenticado , e olha os cokkie e olhar se tem o refreshtoken
  await request.jwtVerify({ onlyCookie: true })

  const { role} = await request.user

  const token = await reply.jwtSign(
    {role},
    {
      sign: {
        sub: request.user.sub
      },
    })

  const refleshToken = await reply.jwtSign(
    {role},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d'
      },
    })

  return reply
    .setCookie('refreshToken', refleshToken, {
      path: '/',
      // o front nao vai conseguir ler
      secure: true,
      // cookie so vai ser acessivel no mesmo site
      sameSite: true,
      // so vai ser acessado pelo back-end
      httpOnly: true
    })
    .status(200)
    .send({
      token,
    })




} 