# papi-chains-feedback

## Repo Creation Steps

> NOTE: Please run `bun upgrade` before you execute these tests locally.  
> Even a bun version as recent as v1.1.3 will throw `No response received from RPC endpoint in 60s` errors.

```shell
bun init # using bun v1.1.26
bun add polkadot-api

# Note: this step does not work
# it throws with 'RpcError: Method not found: 'chainHead_unstable_follow' does not exist/is not available'
bun x papi add avail -w wss://avail-mainnet.public.blastapi.io

# Workaround for the previous step:
# Requirements: (install with brew / apt / etc)
# - `curl` make the http request
# - `jq` parse the json result
# - `xxd` convert the metadata from hex to binary
curl -sS https://avail-mainnet.public.blastapi.io \
    -H 'Content-Type: application/json' \
    -d '{"jsonrpc":"2.0","id":1,"method":"state_getMetadata","params":[]}' \
    | jq -r .result \
    | xxd -r -p \
    > avail.scale
bun x papi add avail -f avail.scale
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Log to results.log:

```bash
bun run index.ts >results.log 2>&1
```
