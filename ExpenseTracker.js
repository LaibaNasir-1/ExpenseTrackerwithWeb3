const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 
console.log("rpc", web3)

const contractAddress = "0x13D69d9C89F549d8801659fB2fe83e6D77f12042";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "amount",
				"type": "int256"
			}
		],
		"name": "addTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalBalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transactionCount",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactionsArr",
		"outputs": [
			{
				"internalType": "address",
				"name": "txOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "txDescription",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "amount",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const account1 = "0x8C91F839D66C21fA5E1edFE603aB8A69cEC8324A";
const privatekey1 = "3f88c028317a13955cbfd6db46c6d89710a7e548dea6f60ce86208ad2a12c31d";
const privatekey1Buffer = new ethereumjs.Buffer.Buffer(privatekey1, 'hex');

const contract = new web3.eth.Contract(contractABI, contractAddress); //object of a contract instantiated

function getNumberofTransactions(){
	contract.methods.transactionCount().call((err, result) => { //This is not a transaction only call
		if(err){
			console.log("Error",err)
		}
		else{
			console.log("Transactions count is: ", result)
			document.getElementById("mmm").innerHTML = `Transactions count: ${result}`
		}
	})
}
function addExpense(des, val){
	web3.eth.getTransactionCount(account1, (err, txCount) =>{
		if (err){
			console.log('error',err)
		}
		else{
			let txObject = { 
				nonce: web3.utils.toHex(txCount), //utils have web3 helper methods
				to: contractAddress,  
				data: contract.methods.addTransaction(`${des}`,val).encodeABI(), //converts abi to bytecode
				gasLimit: web3.utils.toHex(1000000), 
				gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei'))
			}
			const tx = new ethereumjs.Tx(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
			tx.sign(privatekey1Buffer);
			const serializedTx = tx.serialize();
			const raw = '0x' + serializedTx.toString('hex');
			console.log('txObject: ',txObject);
	
			web3.eth.sendSignedTransaction(raw, (err, txHash) => {
				if(err){
					console.log('error',err)
				}
				else{
					console.log('Transaction Hash: ',txHash)
					document.getElementById("newDiv").innerHTML = `Transaction Hash: ${txHash}`
				}
			})
		}
	})
}

function add(){
	var1 = prompt("Please add description of the expense", "For Example: Fee");
	var2 = prompt("Please enter value", "For Example: 100");
	addExpense(var1, var2);
}
