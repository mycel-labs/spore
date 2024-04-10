const VAULT_ADDRESS = '0x6B722668933f6A6e5E6B681254aBf5BdC18C9864'

const VAULT_ABI = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'asset_',
        type: 'address',
        internalType: 'contract IERC20',
      },
      { name: 'name_', type: 'string', internalType: 'string' },
      { name: 'symbol_', type: 'string', internalType: 'string' },
      {
        name: 'twabController_',
        type: 'address',
        internalType: 'contract TwabController',
      },
      {
        name: 'yieldVault_',
        type: 'address',
        internalType: 'contract IERC4626',
      },
      { name: 'claimer_', type: 'address', internalType: 'address' },
      {
        name: 'yieldFeeRecipient_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'yieldFeePercentage_',
        type: 'uint32',
        internalType: 'uint32',
      },
      { name: 'owner_', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: '_claimablePrize',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'spender', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'asset',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'availableYieldBalance',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'availableYieldFeeBalance',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: '_account', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'calculateTeamTwabBetween',
    inputs: [
      {
        name: 'teamMembers',
        type: 'address[]',
        internalType: 'address[]',
      },
      { name: 'drawId', type: 'uint24', internalType: 'uint24' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'claimOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claimPrize',
    inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claimer',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertToAssets',
    inputs: [{ name: '_shares', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertToShares',
    inputs: [{ name: '_assets', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'currentDrawId',
    inputs: [],
    outputs: [{ name: '', type: 'uint24', internalType: 'uint24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decreaseAllowance',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      {
        name: 'subtractedValue',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      { name: '_assets', type: 'uint256', internalType: 'uint256' },
      { name: '_receiver', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositWithPermit',
    inputs: [
      { name: '_assets', type: 'uint256', internalType: 'uint256' },
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_deadline', type: 'uint256', internalType: 'uint256' },
      { name: '_v', type: 'uint8', internalType: 'uint8' },
      { name: '_r', type: 'bytes32', internalType: 'bytes32' },
      { name: '_s', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'distributePrizes',
    inputs: [{ name: 'drawId', type: 'uint24', internalType: 'uint24' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'drawIdToDraw',
    inputs: [{ name: '', type: 'uint24', internalType: 'uint24' }],
    outputs: [
      { name: 'drawId', type: 'uint24', internalType: 'uint24' },
      {
        name: 'drawStartTime',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'drawEndTime', type: 'uint256', internalType: 'uint256' },
      {
        name: 'availableYieldAtStart',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'availableYieldAtEnd',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'drawIdToPrize',
    inputs: [{ name: '', type: 'uint24', internalType: 'uint24' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'drawIdToWinningTeamIds',
    inputs: [
      { name: '', type: 'uint24', internalType: 'uint24' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'drawIdToWinningTeams',
    inputs: [
      { name: '', type: 'uint24', internalType: 'uint24' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'teamId', type: 'uint8', internalType: 'uint8' },
      { name: 'teamTwab', type: 'uint256', internalType: 'uint256' },
      { name: 'teamPoints', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'drawIsFinalized',
    inputs: [{ name: '', type: 'uint24', internalType: 'uint24' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'drawPrizeSet',
    inputs: [{ name: '', type: 'uint24', internalType: 'uint24' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'draws',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'drawId', type: 'uint24', internalType: 'uint24' },
      {
        name: 'drawStartTime',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'drawEndTime', type: 'uint256', internalType: 'uint256' },
      {
        name: 'availableYieldAtStart',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'availableYieldAtEnd',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'eip712Domain',
    inputs: [],
    outputs: [
      { name: 'fields', type: 'bytes1', internalType: 'bytes1' },
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'version', type: 'string', internalType: 'string' },
      { name: 'chainId', type: 'uint256', internalType: 'uint256' },
      {
        name: 'verifyingContract',
        type: 'address',
        internalType: 'address',
      },
      { name: 'salt', type: 'bytes32', internalType: 'bytes32' },
      {
        name: 'extensions',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'finalizeDraw',
    inputs: [
      { name: 'drawId', type: 'uint24', internalType: 'uint24' },
      {
        name: '_winningRandomNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: '_data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getCurrentDrawEndTime',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDistributions',
    inputs: [{ name: 'drawId', type: 'uint24', internalType: 'uint24' }],
    outputs: [
      { name: '', type: 'address[]', internalType: 'address[]' },
      { name: '', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDraw',
    inputs: [{ name: 'drawId', type: 'uint24', internalType: 'uint24' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct VaultV2.Draw',
        components: [
          { name: 'drawId', type: 'uint24', internalType: 'uint24' },
          {
            name: 'drawStartTime',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'drawEndTime',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'availableYieldAtStart',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'availableYieldAtEnd',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getHooks',
    inputs: [{ name: '_account', type: 'address', internalType: 'address' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct VaultHooks',
        components: [
          {
            name: 'useBeforeClaimPrize',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'useAfterClaimPrize',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'implementation',
            type: 'address',
            internalType: 'contract IVaultHooks',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'increaseAllowance',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'addedValue', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isVaultCollateralized',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'liquidationPair',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxDeposit',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxMint',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxRedeem',
    inputs: [{ name: '_owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxWithdraw',
    inputs: [{ name: '_owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      { name: '_shares', type: 'uint256', internalType: 'uint256' },
      { name: '_receiver', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mintYieldFee',
    inputs: [{ name: '_shares', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nonces',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'permit',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' },
      { name: 'deadline', type: 'uint256', internalType: 'uint256' },
      { name: 'v', type: 'uint8', internalType: 'uint8' },
      { name: 'r', type: 'bytes32', internalType: 'bytes32' },
      { name: 's', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'previewDeposit',
    inputs: [{ name: '_assets', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewMint',
    inputs: [{ name: '_shares', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewRedeem',
    inputs: [{ name: '_shares', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewWithdraw',
    inputs: [{ name: '_assets', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'redeem',
    inputs: [
      { name: '_shares', type: 'uint256', internalType: 'uint256' },
      { name: '_receiver', type: 'address', internalType: 'address' },
      { name: '_owner', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setClaimer',
    inputs: [{ name: 'claimer_', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setHooks',
    inputs: [
      {
        name: 'hooks',
        type: 'tuple',
        internalType: 'struct VaultHooks',
        components: [
          {
            name: 'useBeforeClaimPrize',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'useAfterClaimPrize',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'implementation',
            type: 'address',
            internalType: 'contract IVaultHooks',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setOddsRate',
    inputs: [{ name: 'oddsRate', type: 'int256', internalType: 'SD59x18' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setYieldFeePercentage',
    inputs: [
      {
        name: 'yieldFeePercentage_',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setYieldFeeRecipient',
    inputs: [
      {
        name: 'yieldFeeRecipient_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sponsor',
    inputs: [{ name: '_assets', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'startDrawPeriod',
    inputs: [
      {
        name: 'drawStartTime',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'drawEndTime', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sweep',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalAssets',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: '_newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'twabController',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      { name: '_assets', type: 'uint256', internalType: 'uint256' },
      { name: '_receiver', type: 'address', internalType: 'address' },
      { name: '_owner', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'yieldFeePercentage',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'yieldFeeRecipient',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'yieldFeeShares',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'yieldVault',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ClaimerSet',
    inputs: [
      {
        name: 'claimer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Deposit',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DrawFinalized',
    inputs: [
      {
        name: 'drawId',
        type: 'uint24',
        indexed: true,
        internalType: 'uint24',
      },
      {
        name: 'winningTeams',
        type: 'uint8[]',
        indexed: false,
        internalType: 'uint8[]',
      },
      {
        name: 'winningRandomNumber',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'prizeSize',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EIP712DomainChanged',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MintYieldFee',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NewDrawCreated',
    inputs: [
      {
        name: 'drawId',
        type: 'uint24',
        indexed: true,
        internalType: 'uint24',
      },
      {
        name: 'drawStartPeriod',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'drawEndPeriod',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NewVault',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'contract IERC20',
      },
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'symbol',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'twabController',
        type: 'address',
        indexed: false,
        internalType: 'contract TwabController',
      },
      {
        name: 'yieldVault',
        type: 'address',
        indexed: true,
        internalType: 'contract IERC4626',
      },
      {
        name: 'claimer',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'yieldFeeRecipient',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'yieldFeePercentage',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'owner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipOffered',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PrizeClaimed',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PrizeDistributed',
    inputs: [
      {
        name: 'drawId',
        type: 'uint24',
        indexed: true,
        internalType: 'uint24',
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetHooks',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'hooks',
        type: 'tuple',
        indexed: true,
        internalType: 'struct VaultHooks',
        components: [
          {
            name: 'useBeforeClaimPrize',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'useAfterClaimPrize',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'implementation',
            type: 'address',
            internalType: 'contract IVaultHooks',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Sponsor',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Sweep',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Withdraw',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'YieldFeePercentageSet',
    inputs: [
      {
        name: 'yieldFeePercentage',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'YieldFeeRecipientSet',
    inputs: [
      {
        name: 'yieldFeeRecipient',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'CallerNotClaimer',
    inputs: [
      { name: 'caller', type: 'address', internalType: 'address' },
      { name: 'claimer', type: 'address', internalType: 'address' },
    ],
  },
  { type: 'error', name: 'ClaimerZeroAddress', inputs: [] },
  {
    type: 'error',
    name: 'DepositMoreThanMax',
    inputs: [
      { name: 'receiver', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'max', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'DrawAlreadyFinalized',
    inputs: [{ name: 'drawId', type: 'uint24', internalType: 'uint24' }],
  },
  {
    type: 'error',
    name: 'DrawNotFinalized',
    inputs: [{ name: 'drawId', type: 'uint24', internalType: 'uint24' }],
  },
  { type: 'error', name: 'InvalidAmount', inputs: [] },
  {
    type: 'error',
    name: 'InvalidDrawPeriod',
    inputs: [{ name: 'timestamp', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'error',
    name: 'InvalidRecipient',
    inputs: [{ name: 'recipient', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'InvalidShortString', inputs: [] },
  { type: 'error', name: 'InvalidWithdrawal', inputs: [] },
  {
    type: 'error',
    name: 'MintMoreThanMax',
    inputs: [
      { name: 'receiver', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'max', type: 'uint256', internalType: 'uint256' },
    ],
  },
  { type: 'error', name: 'MintZeroShares', inputs: [] },
  { type: 'error', name: 'OwnerZeroAddress', inputs: [] },
  {
    type: 'error',
    name: 'PRBMath_MulDiv18_Overflow',
    inputs: [
      { name: 'x', type: 'uint256', internalType: 'uint256' },
      { name: 'y', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'PRBMath_MulDiv_Overflow',
    inputs: [
      { name: 'x', type: 'uint256', internalType: 'uint256' },
      { name: 'y', type: 'uint256', internalType: 'uint256' },
      { name: 'denominator', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'PRBMath_SD59x18_Convert_Overflow',
    inputs: [{ name: 'x', type: 'int256', internalType: 'int256' }],
  },
  {
    type: 'error',
    name: 'PRBMath_SD59x18_Convert_Underflow',
    inputs: [{ name: 'x', type: 'int256', internalType: 'int256' }],
  },
  {
    type: 'error',
    name: 'PRBMath_SD59x18_Div_InputTooSmall',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PRBMath_SD59x18_Div_Overflow',
    inputs: [
      { name: 'x', type: 'int256', internalType: 'SD59x18' },
      { name: 'y', type: 'int256', internalType: 'SD59x18' },
    ],
  },
  {
    type: 'error',
    name: 'PRBMath_SD59x18_Mul_InputTooSmall',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PRBMath_SD59x18_Mul_Overflow',
    inputs: [
      { name: 'x', type: 'int256', internalType: 'SD59x18' },
      { name: 'y', type: 'int256', internalType: 'SD59x18' },
    ],
  },
  {
    type: 'error',
    name: 'PermitAllowanceNotSet',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'allowance', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'PermitCallerNotOwner',
    inputs: [
      { name: 'caller', type: 'address', internalType: 'address' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
  },
  {
    type: 'error',
    name: 'PrizeAlreadySet',
    inputs: [{ name: 'drawId', type: 'uint24', internalType: 'uint24' }],
  },
  { type: 'error', name: 'RandomNumberIsZero', inputs: [] },
  {
    type: 'error',
    name: 'RedeemMoreThanMax',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'max', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'StringTooLong',
    inputs: [{ name: 'str', type: 'string', internalType: 'string' }],
  },
  { type: 'error', name: 'SweepZeroAssets', inputs: [] },
  {
    type: 'error',
    name: 'UnderlyingAssetMismatch',
    inputs: [
      { name: 'asset', type: 'address', internalType: 'address' },
      {
        name: 'yieldVaultAsset',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  { type: 'error', name: 'UpperBoundGtZero', inputs: [] },
  { type: 'error', name: 'VaultUndercollateralized', inputs: [] },
  { type: 'error', name: 'WinningTeamNotFound', inputs: [] },
  {
    type: 'error',
    name: 'WithdrawAssetsLTRequested',
    inputs: [
      {
        name: 'requestedAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'withdrawnAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'WithdrawMoreThanMax',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'max', type: 'uint256', internalType: 'uint256' },
    ],
  },
  { type: 'error', name: 'WithdrawZeroAssets', inputs: [] },
  {
    type: 'error',
    name: 'YieldFeeGTAvailableShares',
    inputs: [
      { name: 'shares', type: 'uint256', internalType: 'uint256' },
      {
        name: 'yieldFeeShares',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'YieldFeeGTAvailableYield',
    inputs: [
      { name: 'shares', type: 'uint256', internalType: 'uint256' },
      {
        name: 'availableYield',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'YieldFeePercentageGtePrecision',
    inputs: [
      {
        name: 'yieldFeePercentage',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'maxYieldFeePercentage',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  { type: 'error', name: 'YieldVaultZeroAddress', inputs: [] },
] as const

export const vaultContract = {
  address: VAULT_ADDRESS as `0x${string}`,
  abi: VAULT_ABI,
}
