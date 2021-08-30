pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract Color is ERC721, IERC721Enumerable {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR") {}

    function mint(string memory _color) public {
        // require unique color
        require(!_colorExists[_color]);
        colors.push(_color);
        uint256 _id = colors.length; //solidity ^0.6 doesnt return the length anymore, can use openzep counter or use the new length to get an id
        _mint(msg.sender, _id);
        // color - add
        _colorExists[_color] = true;
        // call mint
        // track color
    }

    // UERC721Enumerable inferface requires overwriting the following 3 functions in order to call those functions
    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return 1;
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return colors.length;
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     */
    function tokenByIndex(uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return 1;
    }
}
