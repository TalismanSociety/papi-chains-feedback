import { avail } from '@polkadot-api/descriptors'
import { createClient } from 'polkadot-api'
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat'
import { getWsProvider } from 'polkadot-api/ws-provider/web'

async function main(rpcUrl: string) {
  const client = createClient(withPolkadotSdkCompat(getWsProvider(rpcUrl)))
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
