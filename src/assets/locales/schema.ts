import type zhCN from './zh-CN.json'

// define message schema as master mesage schema
export type MessageSchema = typeof zhCN

// define number format schema
export type NumberSchema = {
  currency: {
    style: 'currency'
    currencyDisplay: 'symbol'
    currency: string
  }
}
