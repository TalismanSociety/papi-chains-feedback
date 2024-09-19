import { avail } from '@polkadot-api/descriptors'
import { createClient } from 'polkadot-api'
import { getWsProvider } from 'polkadot-api/ws-provider/web'

async function main(rpcUrl: string) {
  const provider = getWsProvider(rpcUrl)
  const client = createClient(provider)
  const api = client.getTypedApi(avail)

  try {
    console.log('get ss58Prefix')
    const ss58Prefix = (await api.constants.System.SS58Prefix()).valueOf()
    console.log('got ss58Prefix:', ss58Prefix)
  } finally {
    client.destroy()
  }
}

main('https://avail-mainnet.public.blastapi.io')
