// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract fund {

    address private owner;
    Investor[] public arrInvest;

    uint public TotalFund;

    struct Investor{
        string _Name;
        address _Address;
        uint _Amount;
    }

    constructor() {
        owner = msg.sender;
        TotalFund = 0;
    }

    function viewTotalFund() public view returns(uint){
        return(TotalFund);
    }

    // events
    event CoNguoiVuaDauTu(uint TotalFund, address wallet, uint amount, string name);

    function CheckOwner() view public returns(address){
        return owner;
    }

    function Invest(string memory name) public payable {
        if(msg.value > 0){
            arrInvest.push(Investor(name, msg.sender, msg.value));
            TotalFund += msg.value;
            emit CoNguoiVuaDauTu(TotalFund, msg.sender, msg.value, name);
        }
    }

    // get one investor of list
    // Không nên trả về nguyên mảng
    // --> Chỉ nên trả về từng phần tử
    function GetTotalElement() public view returns(uint){
        return arrInvest.length;
    }
    function GetOneInvestor(uint index) public view returns(string memory, address, uint){
        if(index < GetTotalElement() && index >= 0){
            return (arrInvest[index]._Name, arrInvest[index]._Address, arrInvest[index]._Amount);
        } 
        else {
            return ("", address(0), 0);
        }
    }

    modifier onlyMaster(){
        require(msg.sender == owner, "Only master (who create this SM) can call this fuction");
        _;
    }

    event Master_SuccessfulVesting(address receiver, uint money);
    function vestingToken(address payable receiver) external onlyMaster{
        uint money = address(this).balance;
        (bool result, bytes memory data) = receiver.call{value:money}("");
        require(result, "Failed to unclock fund");
        TotalFund -= money;
        emit Master_SuccessfulVesting(receiver, money);
    }

}