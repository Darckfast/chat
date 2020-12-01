import CompactEncrypt from 'jose/jwe/compact/encrypt'
// import parseJwk from 'jose/jwk/parse'
import fromKeyLike from 'jose/jwk/from_key_like'
import compactDecrypt from 'jose/jwe/compact/decrypt'
import generateKeyPair from 'jose/util/generate_key_pair'

let publicKey = null; let privateKey = null

export async function genJwe (user: { username: string, chatId: string }): Promise<string> {
  if (!publicKey) {
    const { publicKeyTmp, privateKeyTmp } = await generateKeyPair('PS256')

    publicKey = publicKeyTmp
    privateKey = privateKeyTmp
  }

  const encoder = new TextEncoder()

  // const publicKeyJwk = fromKeyLike(publicKey)
  // console.log(publicKeyJwk)

  const jwe = await new CompactEncrypt(encoder.encode(JSON.stringify({ user })))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(publicKey)

  console.log(jwe)
  return jwe
}

async function decryptJwe (jwe: string): Promise<any> {
  const decoder = new TextDecoder()

  const { plaintext, protectedHeader } = await compactDecrypt(jwe, privateKey)

  console.log(protectedHeader)
  console.log(decoder.decode(plaintext))

  return plaintext
}

export async function getField (jwe: string, field: string): Promise<string> {
  if (field === '*') {
    return JSON.parse(await decryptJwe(jwe))
  }
  return JSON.parse(await decryptJwe(jwe))[field]
}
