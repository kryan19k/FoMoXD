// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library FXDPuffsCalc {
    /** 計算提供一定 eth 可以獲得多少 key
     * @dev calculates number of keys received given X eth
     * @param _curEth current amount of eth in contract
     * @param _newEth eth being spent
     * @return amount of ticket purchased
     */
    function puffsReceive(
        uint256 _curEth,
        uint256 _newEth
    ) internal pure returns (uint256) {
        // 新總金額 - 舊總金額 = 可以買的鑰匙數
        return puffs((_curEth) + (_newEth)) - puffs(_curEth);
    }

    /** 計算賣掉鑰匙的獲利
     * @dev calculates amount of eth received if you sold X keys
     * @param _curPuffs current amount of keys that exist
     * @param _sellPuffs amount of keys you wish to sell
     * @return amount of eth received
     */
    function ethReceive(
        uint256 _curPuffs,
        uint256 _sellPuffs
    ) internal pure returns (uint256) {
        // 新總數換錢 - 舊總數換錢 = 這次賣的錢
        return eth(_curPuffs) - eth(_curPuffs - _sellPuffs);
    }

    /** 當前資金池如果是 _eth 會獲得的 Key 總量
     * @dev calculates how many keys would exist with given an amount of eth
     * @param _eth eth "in contract"
     * @return number of keys that would exist
     */
    function puffs(uint256 _eth) internal pure returns (uint256) {
        return
            (/** 鑰匙會越買越貴
                  a = 312500000000000000000000000
                  b = 74999921875000000000000000000000
                  //  b**2 = 5624988281256103515625000000000000000000000000000000000000000000
                  c = 156250000
                  keys(totalEth) = ((Math.sqrt( (totalEth * 1000000000000000000 * a) + b**2 )) - b) / e
                  keysRec(0,1)  = 13333 
                  keysRec(10000000000000000000,1) = 10690
                 */
            //
            (
                sqrt(
                    ((((_eth) * (1000000000000000000)) *
                        (312500000000000000000000000)) +
                        (
                            5624988281256103515625000000000000000000000000000000000000000000
                        ))
                )
            ) - (74999921875000000000000000000000)) / (156250000);
    }

    /** 當前 Key 總量可以換成多少 eth
     * @dev calculates how much eth would be in contract given a number of keys
     * @param _puffs number of keys "in contract"
     * @return eth that would exists
     */
    function eth(uint256 _puffs) internal pure returns (uint256) {
        return
            ((78125000) *
                (sq(_puffs)) +
                (((149999843750000) * (_puffs * (1000000000000000000))) /
                    (2))) / (sq(1000000000000000000));
    }

    /**
     * @dev gives square root of given x.
     */
    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (((x + 1)) / 2);
        y = x;
        while (z < y) {
            y = z;
            z = ((((x / z) + z)) / 2);
        }
    }

    /**
     * @dev gives square. multiplies x by x
     */
    function sq(uint256 x) internal pure returns (uint256) {
        return x * x;
    }
}
