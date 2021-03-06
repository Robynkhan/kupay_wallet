/**
 * Helper functions
 */
import { Web3 } from '../thirdparty/web3.min';

const web3 = new Web3();

/*
 * All the helper functions are wrapped from web3.js
 * Docs: https://github.com/ethereum/wiki/wiki/JavaScript-API
 * 
 */
export const toWei = (amt: number | string, unit: string): string | number => {
    return web3.toWei(amt, unit);
};

export const fromWei = (amt: number | string, unit: string): string | number => {
    return web3.fromWei(amt, unit);
};

export const isAddress = (hexString: string): boolean => {
    return web3.isAddress(hexString);
};

export const toAscii = (hexString: string): string => {
    return web3.toAscii(hexString);
};

export const fromAscii = (str: string, padding?: number): string => {
    return web3.fromAscii(str, padding);
};

/**
 * iban转标准eth地址
 */
export const ibanToAddress = (addr: string): string => {
    const i = new web3.eth.iban(addr);

    return `0x${i.address()}`;
};

/**
 * eth转iban地址
 */
export const addrToIban = (addr: string): string => {
    return web3.eth.iban.fromEthereumAddress(addr);
};

/**
 * 地址是否是有效的iban地址
 */
export const isValidIban = (addr: string): boolean => {
    return web3.eth.iban.isValid(addr);
};