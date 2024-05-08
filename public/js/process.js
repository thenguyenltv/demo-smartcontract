$(document).ready(async function(){
    
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
    var currentAccount = null;

    check_MetaMask();

    // contract MM
    const web3 = new Web3(window.ethereum);
    //window.ethereum.enable();
    // use eth_requestAccounts instead of enable
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    var contract_MM = new web3.eth.Contract(SM_ABI, SM_Address);

    // contract Infura
    var provider = new Web3.providers.WebsocketProvider("wss://sepolia.infura.io/ws/v3/04d32559be594f9ca9b116b2a61624e6");
    var web3_infura = new Web3(provider);
    var contract_Infura = new web3_infura.eth.Contract(SM_ABI, SM_Address);
    contract_Infura.events.CoNguoiVuaDauTu({filter: {}, fromBlock: "latest"}, function(err, event){
        if (err) {
            $("#notice").html(err);
        }
        else {
            // console.log(event);
            
            //web3.utils.fromWei(event.returnValues[0].toNumber().toString(), "ether") + " ETH"
            $("#tongTien").html(web3.utils.fromWei(event.returnValues.TotalFund.toString(), "ether") + "ETH");
            
            $("#dsDauTu").append(`
                <tr> 
                    <td>`+ event.returnValues.name +`</td>
                    <td>`+ event.returnValues.wallet +`</td>
                    <td>`+ web3.utils.fromWei(event.returnValues.amount.toString(), "ether") +`</td>
                </tr>
            `);
        }
    });

    $("#btn_ConnectMM").click(function(){
        connect_MetaMask()
        .then((data)=>{
            currentAccount = data[0];
            $("#currentAddress").html(currentAccount);
            console.log("Current account is: " + currentAccount);
        })
        .catch((err)=>{console.log(err)});
    });

    $("#btn_Invest").click(function(){
        if (currentAccount != null){
            var name = $("#txt_HoTen").val();
            var amount = $("#txt_SoTien").val();
            console.log(name + " - " + amount);
            amount = parseFloat(amount) + "";

            contract_MM.methods.Invest(name).send({
                from: currentAccount,
                value: web3.utils.toWei(amount, "ether")
            })
            .then((data)=>{
                console.log(data);
                $("#notice").html("Invest success");
            })
            .catch((err)=>{$("#notice").html(err.message)});
        }
        else{
            alert("Please connect to MetaMask");
        }
    });

    $("#btn_Unclock").click(function(){
        if (currentAccount != null){
            var account = $("#txt_Account").val();
            contract_MM.methods.vestingToken(account).send({
                from: currentAccount,
            })
            .catch((err)=>{console.log(err)});
        }
        else{
            alert("Please connect to MetaMask");
        }
    });

    window.ethereum.on('accountsChanged', function (accounts) {
        currentAccount = accounts[0];
        $("#currentAddress").html(currentAccount);
        console.log("Current account is: " + currentAccount);
    });

    loadDS();
    function loadDS(){
        contract_MM.methods.GetTotalElement().call().then((data)=>{
            //console.log(web3.utils.fromWei(data.toNumber().toString(), "ether") + " ETH");
            var tongDauTu = data.toNumber();
            console.log("Tong so nguoi dau tu: " + tongDauTu);
            if(tongDauTu > 0){
                for (var i = 0; i < tongDauTu; i++){
                    contract_MM.methods.GetOneInvestor(i).call().then((angle)=>{
                        console.log(angle);
                        var totalFund = contract_MM.methods.viewTotalFund().call();
                        $("#tongTien").html(web3.utils.fromWei(totalFund.toString(), "ether") + "ETH");
                        $("#dsDauTu").append(`
                            <tr> 
                                <td>`+ angle[0] +`</td>
                                <td>`+ angle[1] +`</td>
                                <td>`+ web3.utils.fromWei(angle[2].toString(), "ether") +`</td>
                            </tr>
                        `);
                    });
                }
            }
        });
    }

});

async function connect_MetaMask(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function check_MetaMask(){
    $("#install").hide();
    $("#info").hide();

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        $("#info").fadeIn(600);
    } else {
        console.log('MetaMask is not installed');
        $("#install").fadeIn(800);
    }
}