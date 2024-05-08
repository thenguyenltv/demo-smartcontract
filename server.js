var express = require('express');
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
app.listen(3000);

app.get("/", function(req, res) {
    res.render("master");
});

////////// chưa xong

var SM_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "TotalFund",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "CoNguoiVuaDauTu",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "Invest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "money",
                "type": "uint256"
            }
        ],
        "name": "Master_SuccessfulVesting",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "vestingToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "arrInvest",
        "outputs": [
            {
                "internalType": "string",
                "name": "_Name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_Address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_Amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "CheckOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "GetOneInvestor",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GetTotalElement",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TotalFund",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "viewTotalFund",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
var SM_Address = "0xa8bc9950f16a03c20756cf6e5e3ef271797d8624";

// Copilot

const Web3 = require('web3');
const web3 = new Web3.Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/04d32559be594f9ca9b116b2a61624e6');
var web3_infura = new Web3.Web3(web3);
var MyContract = new web3_infura.eth.Contract(SM_ABI, SM_Address);

MyContract.events.CoNguoiVuaDauTu({filter: {}, fromBlock: "latest"}, function(error, event) {
    if (error) {
        console.log(error);
    } else {
        console.log(event);
        // use socket.io ...
    }
});


// Khoa Pham

// //import {Web3} from "web3";
// var Contract = require('web3-eth-contract');
  
// Contract.setProvider("wss://sepolia.infura.io/ws/v3/04d32559be594f9ca9b116b2a61624e6");
// const contract = new Contract(SM_ABI, SM_Address);

// contract.events.CoNguoiVuaDauTu({filter: {}, fromBlock: "latest"}, function(error, event) {
//     if (error) {
//         console.log(error);     
//     } else {
//         console.log("Sercer.js:", event);
//     }
// });

// web3

//import {Web3} from "web3";
// var Web3 = require('web3');
// var web3 = new Web3('http://localhost:8545');

// web3.setProvider('wss://sepolia.infura.io/ws/v3/04d32559be594f9ca9b116b2a61624e6');
  
// const contract = new Contract(SM_ABI, SM_Address);

// contract.events.CoNguoiVuaDauTu({filter: {}, fromBlock: "latest"}, function(error, event) {
//     if (error) {
//         console.log(error);     
//     } else {
//         console.log("Sercer.js:", event);
//     }
// });

