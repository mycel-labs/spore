export const FAUCET_ADDRESS = '0x23c4b10FF712CAaf7DA6A9c9eeDFa7C7739b7802'

export const FAUCET_ABI = [
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_token', type: 'address' },
    ],
    name: 'drip',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
