import BigNumber from 'bignumber.js/bignumber';

export const SUBTRACT_GAS_LIMIT = 100000;

const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
};

const chainId = 1; // 42

export let addressMap;

if (chainId === 1) {
  addressMap = {

    link_pool: "0x693c8D8256018ffCbd3A768bf6ef6Efc7B7B7eab",
    snx_pool: "0x17a4cBb7114b5AB0b874a3946bCA335c24a16C69",
    yfi_pool: "0xD52beE6663669d8B89B68080c786FBfe0c43CFBa",
    comp_pool: "0xa7164F5D3C9951963a274e78CdB740f4c322540f",
    chads_pool: "0x9f79908dCD964d7f278Ab749a4A71947869b0c16",
    lend_pool: "0xD61BF18a0A2747642B8E015EbA1545810f4B9cA1",
    uni_pool: "0xcce4158494ae8296E3936823058B17e03eEBa6c3",
    mkr_pool: "0x9C6C618C96d65b68E57773D6285a0d83d1Bd6760",
    bzrx_pool: "0x9E1A69A8164817219e79090330B529556B274c9D",
    srm_pool: "0x7845664310e205C979Aa067BCfE02704D1001BCf",
    farm_pool: "0xD74a66c60761231960b9A67daB72871E545C72f5",
    wnxm_pool: "0xCC3A2c4891740e2055f4C6875a28BB9EB32f2e69",
    mbbased_pool: "0x67bA643d6acDB7c12F913f0bbE4632df9889e0E5",
    unipool_pool: "0xA11cB7F893F3939f91d3c6E23025B41877190D6c",
    battlepool_pool: "0xa9CDb5e3C911884Ca6D4b32273c219B536Ee9e6A",

    link: "0x514910771af9ca656af840dff83e8264ecf986ca",
    snx: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
    yfi: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
    comp: "0xc00e94cb662c3520282e6f5717214004a7f26888",
    chads: "0x69692D3345010a207b759a7D1af6fc7F38b35c5E",
    lend: "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
    uni: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    wnxm: "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
    mkr: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    bzrx: "0x56d811088235f11c8920698a204a5010a788f4b3",
    srm: "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff", // 6 decimals
    farm: "0xa0246c9032bc3a600820415ae600c6388619a14d",
    mbbased: "0x26cF82e4aE43D31eA51e72B663d26e26a75AF729",
    unipool: "0x24004f6fCE7e3842e5a308eAC032E09f1883CeF8",
    battlepool: "0xf4a81c18816c9b0ab98fac51b36dcb63b0e58fde",

    war: "0xf4a81c18816c9b0ab98fac51b36dcb63b0e58fde",

    UNIRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

    Pricing: "0xA056b5a1fC97ea86D949cdB67Be4950e29942421",
  }
} else { // 42 = kovan
  addressMap = {

    link_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    snx_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    yfi_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    comp_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    chads_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    lend_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    uni_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    mkr_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    bzrx_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    srm_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    farm_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    wnxm_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    mbbased_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    unipool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",
    battlepool_pool: "0xcce4158494ae8296e3936823058b17e03eeba6c3",

    link: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    snx: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    yfi: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    comp: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    chads: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    lend: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    uni: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    wnxm: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    mkr: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    bzrx: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    srm: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    farm: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    mbbased: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",
    unipool: "0x2e475b3a66fb9bfd0087321aa3217562f4150a98",

    war: "0xf4a81c18816c9b0ab98fac51b36dcb63b0e58fde",

    UNIRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

    Pricing: "0xD61BF18a0A2747642B8E015EbA1545810f4B9cA1", // kovan
  }
}


