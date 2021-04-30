pragma solidity ^0.8.0;

contract ExpenseTracker{
    int public totalBalance = 0;
    
    struct Transaction{
        address txOwner;
        string txDescription;
        int amount;
    }
    
    Transaction[] public transactionsArr;
    
    function addTransaction(string memory description , int amount) public {
        Transaction memory tx1 = Transaction(msg.sender,description,amount);
        transactionsArr.push(tx1);
        totalBalance += amount;
    }
    
    function transactionCount() public view returns (uint){
        return transactionsArr.length;
    }
}
